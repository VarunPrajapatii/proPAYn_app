import prisma from '@propayn/db/client';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

interface GatewayWebhookPayload {
    status : "SUCCESS" | "FAILED",
    failure_reason: null | string,
    txn_id: string,
    userId: string,
    amount: number,
    provider: string,
    bank_session_id?: string,
}

function verifySignature(payload: any, signature: string, secret: string): boolean {
    const sortedKeys = Object.keys(payload).sort();
    const stringToSign = sortedKeys.map(key => `${key}=${payload[key]}`).join('&');

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(stringToSign)
        .digest('hex');
    
    return crypto.timingSafeEqual(
        Buffer.from(signature, 'hex'),
        Buffer.from(expectedSignature, 'hex')
    );
}


export async function POST(req: NextRequest) {
    const gatewaySignature = req.headers.get('gateway-signature');
    const callbackIdempotencyKey = req.headers.get('idempotency-key');

    if (!callbackIdempotencyKey) {
        return NextResponse.json({ message: "Missing Idempotency-Key header" }, { status: 400 });
    }

    const body: GatewayWebhookPayload = await req.json();

    if(!gatewaySignature || !verifySignature(body, gatewaySignature as string, process.env.PAYMENT_GATEWAY_SECRET as string)) {
        return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }
    
    const idempotencyCheck = await prisma.onRampTransaction.findFirst({
        where: {
            txn_id: body.txn_id,
            callbackIdempotencyKey: callbackIdempotencyKey
        }
    });

    if(idempotencyCheck) {
        return NextResponse.json({ 
            message: "Transaction already processed",
            status: idempotencyCheck.status 
        }, { status: 200 });
    }
    
    const { status, failure_reason, txn_id, userId, amount, provider, bank_session_id } = body;

    try {
        const result = await prisma.$transaction(async (tx) => {
            //try to update the transaction with idempotency key
            const updateResult = await tx.onRampTransaction.updateMany({
                where: { 
                    txn_id,
                    status: "Processing", // Only update if still processing
                    callbackIdempotencyKey: null // Only if not already processed
                },
                data: {
                    status: status === "SUCCESS" ? "Success" : "Failure",
                    failure_reason,
                    bank_session_id: bank_session_id || null,
                    completedTime: new Date(),
                    callbackIdempotencyKey: callbackIdempotencyKey // Store the key
                }
            });

            // If no rows were updated, transaction was already processed
            if (updateResult.count === 0) {
                throw new Error("Transaction already processed or not found");
            }

            if (status === "SUCCESS") {
                await tx.balance.upsert({
                    where: { userId: userId },
                    update: { amount: { increment: Number(amount) } },
                    create: { userId: userId, amount: Number(amount), locked: 0 }
                });
            }

            return { success: true };
        });

        return NextResponse.json({ message: "Transaction processed" });
    } catch (error) {
        console.error("Database error:", error);
        
        const existingTransaction = await prisma.onRampTransaction.findFirst({
            where: { txn_id, callbackIdempotencyKey: callbackIdempotencyKey }
        });

        if (existingTransaction) {
            return NextResponse.json({ 
                message: "Transaction already processed",
                status: existingTransaction.status 
            });
        }

        return NextResponse.json({ message: "Database error" }, { status: 500 });
    }
}



// // TODO: Add zod validation here?
// // TODO: HDFC bank should ideally send us a secret so we know this is sent by them
// // TODO: Check if the onRampTxn is processing or not, only if it is processing, we should update the balance and mark the transaction as success.
// const paymentInformation: {
//     token: string;
//     userId: string;
//     amount: string;
// } = {
//     token: req.body.token,
//     userId: req.body.user_identifier,
//     amount: req.body.amount
// };

// console.log(req.body);
// // from here we need to update the user's balance and mark the onRampTransaction as success.
// try {
//     await db.$transaction([
//         // TODO: Add zod validations here.
//         db.balance.updateMany({
//             where: {
//                 userId: Number(paymentInformation.userId),
//             },
//             data: {
//                 amount: {
//                     // You can also get this from your DB
//                     increment: Number(paymentInformation.amount)
//                 }
//             }
//         }),
//         db.onRampTransaction.updateMany({
//             where: {
//                 token: paymentInformation.token,
//             },
//             data: {
//                 status: "Success"
//             }
//         })
        
//     ]);

//     res.status(200).json({
//         message: "Captured"
//     })
// } catch (error) {
//     console.log(error);
//     res.status(411).json({
//         message: "Error while processing webhook"
//     })
// }