import prisma from "@propayn/db/client";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { authOptions } from "../../../../lib/auth";
import { z } from 'zod';
import { createPaymentSession, generateOrderId, generateReferenceNumber, generateSignature, generateTransactionId } from "./utils";




const OnRampRequestSchema = z.object({
    amount: z.number().min(10000).max(10000000), // ₹1,000 to ₹1,00,000
    provider: z.enum(['HDFC', 'SBI', 'ICICI', 'AXIS', 'CreditCard', 'UPIid', 'PhonePe', 'GPay', 'Paytm', 'BHIMUPI'])
});

export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized", redirectUrl: `${process.env.NEXTAUTH_URL}/` }, { status: 401 });
    }
    const userId = session.user.id;
    let amount, provider;

    try {
        const body = await req.json();
        const validatedData = OnRampRequestSchema.parse(body);
        amount = validatedData.amount;
        provider = validatedData.provider;
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ 
                message: `${amount} or ${provider} is not valid`,
                errors: error.issues
            }, { status: 400 });
        }
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }



    const txn_id = generateTransactionId();
    const order_id = generateOrderId();
    const reference_number = generateReferenceNumber();
    const IdempotencyKey = crypto.randomUUID();
    const session_token = createPaymentSession(txn_id, userId, amount, provider);


    try {
        await prisma.onRampTransaction.create({
            data: {
                txn_id,
                order_id,
                reference_number,
                userId,
                amount,
                provider,
                session_token,
                status: "Processing",
                startTime: new Date(),
            }
        })

    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

    const gateway_payload: {
        merchantTxnId: string;
        orderId: string;
        userId: string;
        amount: number;
        provider: string;
        session_token: string;
        propayn_redirect_url: string;
        checkoutExpires: number;
    } = {
        merchantTxnId: txn_id,
        orderId: order_id,
        userId,
        amount,
        provider,
        session_token,
        propayn_redirect_url: `${process.env.NEXTAUTH_URL}/add-money/status`,
        checkoutExpires: Date.now() + 5 * 60 * 1000,
    }

    const signature = generateSignature(gateway_payload, process.env.PAYMENT_GATEWAY_SECRET as string);
    try {
        // console.log("Sending request to payment gateway");
        const gateway_response = await axios.post(`${process.env.PAYMENT_GATEWAY_URL}/initiate`, gateway_payload, {
            headers: {
                'content-type': 'application/json',
                'idempotency-key': IdempotencyKey,
                'gateway-signature': signature,
                Authorization: `Bearer ${process.env.PAYMENT_GATEWAY_API_KEY}`,
            }
        })

        // console.log("Gateway response:", gateway_response.data);

        await prisma.onRampTransaction.update({
            where: { txn_id },
            data: {
                gateway_txn_id: gateway_response.data.paymentSessionId
            }
        });

        return NextResponse.json({
            redirectUrl: gateway_response.data.checkoutUrl,
            sessionId: gateway_response.data.paymentSessionId,
            orderId: order_id,
            referenceNumber: reference_number
        });
    } catch (error) {
        return NextResponse.json({ message: "Gateway error" }, { status: 500 });
    }
}