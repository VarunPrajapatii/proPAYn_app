import prisma from "@propayn/db/client";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { authOptions } from "../../../../lib/auth";
import jwt from 'jsonwebtoken';
import { z } from 'zod';

export interface PaymentSession {
    txn_id: string;
    user_id: string;
    amount: number;
    provider: string;
    expires_at: number;
    checksum: string;
}


export function generateTransactionId(): string {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
    
    return `PPN_${dateStr}_${timeStr}_${randomHex}`;
}

export function generateOrderId(): string {
    // Format: ORD_TIMESTAMP_RANDOM
    const timestamp = Date.now().toString(36);
    const random = crypto.randomBytes(3).toString('hex').toUpperCase();
    return `PPNORDER_${timestamp}_${random}`;
}

export function generateReferenceNumber(): string {
    const random = crypto.randomInt(100000000000, 999999999999);
    return `PPNREF${random}`;
}

export function createPaymentSession(txn_id: string, userId: string, amount: number, provider: string): string {
    const payload: PaymentSession = {
        txn_id,
        user_id: userId,
        amount,
        provider,
        expires_at: Date.now() + (5 * 60 * 1000),
        checksum: crypto.createHash('sha256').update(`${txn_id}${userId}${amount}`).digest('hex').slice(0, 8)
    };
    
    return jwt.sign(payload, process.env.SESSION_SECRET!, { expiresIn: '5m' });
}

export function verifyPaymentSession(token: string): PaymentSession | null {
    try {
        const decoded = jwt.verify(token, process.env.SESSION_SECRET!) as PaymentSession;
        
        // Verify checksum to prevent tampering
        const expectedChecksum = crypto.createHash('sha256')
            .update(`${decoded.txn_id}${decoded.user_id}${decoded.amount}`)
            .digest('hex').slice(0, 8);
            
        if (decoded.checksum !== expectedChecksum) {
            throw new Error('Session integrity check failed');
        }
        
        return decoded;
    } catch {
        return null;
    }
}

function verifySignature(payload: any, signature: string, secret: string): boolean {
    const { signature: receivedSig, ...payloadWithoutSig } = payload;
    const sortedKeys = Object.keys(payloadWithoutSig).sort();
    const stringToSign = sortedKeys.map(key => `${key}=${payloadWithoutSig[key]}`).join('&');

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(stringToSign)
        .digest('hex');

    return crypto.timingSafeEqual(
        Buffer.from(signature, 'hex'),
        Buffer.from(expectedSignature, 'hex')
    );
}

function generateSignature(payload: any, secret: string): string {
    const sortedKeys = Object.keys(payload).sort();
    const stringToSign = sortedKeys.map(key => `${key}=${payload[key]}`).join('&');

    return crypto
        .createHmac('sha256', secret)
        .update(stringToSign)
        .digest('hex');
}

const OnRampRequestSchema = z.object({
    amount: z.number().min(10000).max(10000000), // ₹1,000 to ₹1,00,000
    provider: z.enum(['HDFC', 'SBI', 'ICICI', 'AXIS'])
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
                message: "Max One Lakh allowed",
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
        console.log("Sending request to payment gateway");
        const gateway_response = await axios.post(`${process.env.PAYMENT_GATEWAY_URL}/initiate`, gateway_payload, {
            headers: {
                'content-type': 'application/json',
                'idempotency-key': IdempotencyKey,
                'gateway-signature': signature,
                Authorization: `Bearer ${process.env.PAYMENT_GATEWAY_API_KEY}`,
            }
        })

        console.log("Gateway response:", gateway_response.data);

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