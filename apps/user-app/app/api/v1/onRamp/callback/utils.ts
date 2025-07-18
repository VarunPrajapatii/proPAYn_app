import crypto from 'crypto';

export interface GatewayWebhookPayload {
    status : "SUCCESS" | "FAILED",
    failure_reason: null | string,
    txn_id: string,
    userId: string,
    amount: number,
    provider: string,
    bank_session_id?: string,
}

export function verifySignature(payload: any, signature: string, secret: string): boolean {
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
