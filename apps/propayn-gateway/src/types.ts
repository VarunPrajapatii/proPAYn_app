export interface PropaynBEGatewayPayload {
    merchantTxnId: string,
    orderId: string,
    referenceNumber: string,
    userId: string,
    amount: number,
    provider: string,
    session_token: string,
    propayn_redirect_url: string,
    checkoutExpires: number  // ms timestamp
}

export interface PaymentSession {
    txn_id: string;
    user_id: string;
    amount: number;
    provider: string;
    expires_at: number;
    checksum: string;
}


export interface BankWebhookPayload {
    pg_session_id: string;
    userId: string;
    amount: number;
    bank_session_id: string;
}

export interface BankWebhookBody {
    payload: BankWebhookPayload;
    message: string
}