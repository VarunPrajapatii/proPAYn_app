import crypto from "crypto";
import jwt from 'jsonwebtoken';


export interface PaymentSession {
    txn_id: string;
    user_id: string;
    amount: number;
    provider: string;
    expires_at: number;
    checksum: string;
}

export function verifySignature(payload: any, signature: string, secret: string): boolean {
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

export function generateSignature(payload: any, secret: string): string {
    const sortedKeys = Object.keys(payload).sort();
    const stringToSign = sortedKeys.map(key => `${key}=${payload[key]}`).join('&');

    return crypto
        .createHmac('sha256', secret)
        .update(stringToSign)
        .digest('hex');
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
