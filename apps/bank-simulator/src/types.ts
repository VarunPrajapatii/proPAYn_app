export interface PaymentRequestBody {
    sessionId: string,
    merchantTxnId: string,
    userId: string,
    amount: number,
    provider: string,
    merchantId: string,
    webhookUrl: string,
    propayn_redirect_url: string,
    timestamp: number // ms timestamp
}