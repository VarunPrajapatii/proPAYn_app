import express from "express";
import crypto from 'crypto';
import axios from "axios";
import jwt from 'jsonwebtoken';
import prisma from "@propayn/db/client";
import { BankWebhookBody, BankWebhookPayload, PaymentSession, PropaynBEGatewayPayload } from "./types";
import 'dotenv/config';


const app = express();
app.use(express.json())

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

function generateSignature(payload: any, secret: string): string {
    const sortedKeys = Object.keys(payload).sort();
    const stringToSign = sortedKeys.map(key => `${key}=${payload[key]}`).join('&');

    return crypto
        .createHmac('sha256', secret)
        .update(stringToSign)
        .digest('hex');
}

function verifyPaymentSession(token: string): PaymentSession | null {
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



app.post("/initiate", async (req, res) => {
    const body: PropaynBEGatewayPayload = req.body;
    const { ['idempotency-key']: idempotencyKey, ['gateway-signature']: gatewaySignature, ['authorization']: Authorization } = req.headers;
    //Headers are checked for presence, then Authorization is checked for API key, then signature is verified, then idempotency is checked for duplication, then session expiry is checked

    if(!idempotencyKey || !gatewaySignature || !Authorization) {
        return res.status(400).json({
            message: "Missing required headers"
        });
    }


    const authorizationCheck = (Authorization as string).split(" ")[1] === process.env.PROPAYN_API_KEY;


    if(!authorizationCheck) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }


    const isValidSignature = verifySignature(body, gatewaySignature as string, process.env.PG_SECRET as string);

    if (!isValidSignature) {
        return res.status(401).json({
            message: "Invalid signature"
        });
    }
    const sessionExpires = Date.now() > body.checkoutExpires;

    if(sessionExpires) {
        return res.status(400).json({
            message: "Session Expired"
        });
    }
    const sessionData = verifyPaymentSession(body.session_token);

    if (!sessionData) {
        return res.status(400).json({
            message: "Invalid or expired session token"
        });
    }
    if (sessionData.txn_id !== body.merchantTxnId || sessionData.user_id !== body.userId || sessionData.amount !== body.amount || sessionData.provider !== body.provider) {
        return res.status(400).json({
            message: "Session data mismatch"
        });
    }


    const IdempotencyKeyCheck = await prisma.paymentSession.findFirst({
        where : {
            idempotencyKey: idempotencyKey as string
        }
    })

    if(IdempotencyKeyCheck) {
        return res.status(400).json({
            message: "Session Already Present"
        })
    }


    const sessionId = crypto.randomUUID();

    let paymentSession = null;
    try {
        paymentSession = await prisma.paymentSession.create({
            data: {
                id: sessionId as string,
                idempotencyKey: idempotencyKey as string,
                merchantTxnId : body.merchantTxnId,
                order_id : body.orderId,
                userId: body.userId,
                amount: body.amount,
                provider: body.provider,
                session_token: body.session_token,
                callbackUrl: body.propayn_redirect_url,
                checkoutExpires: new Date(body.checkoutExpires),
                status: "PENDING",
            }
        })
    } catch (error) {
        console.error("Error creating payment session:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }


    const bankPayload = {
        sessionId,
        merchantTxnId : body.merchantTxnId,
        userId: body.userId,
        amount: body.amount,
        provider: body.provider,
        merchantId: process.env.MERCHANT_ID,
        webhookUrl: `${process.env.PG_URL}/bankWebhook`,
        propayn_redirect_url: body.propayn_redirect_url,
        timestamp: Date.now()
    }

    const signature = generateSignature(bankPayload, process.env.BANK_SECRET as string);

    const bank_response = await axios.post(`${process.env.BANK_SERVICE_URL}/provider/pay`, bankPayload, {
        headers: {
            'bank-signature': `${signature}`
        }
    }).catch(error => console.error("Error sending request to bank:", error));

    console.log("Bank Response", bank_response ? bank_response.data : "No response from bank");

    if(bank_response) {
        try {
            await prisma.paymentSession.update({
                where: { id: paymentSession.id },
                data: {
                    bank_session_id: bank_response.data.bank_session_id,
                }
            })
        } catch (error) {
            console.error("Error updating payment session with bank session ID:", error);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    } else {
        res.status(500).json({
            message: "Bank service error"
        });
    }

    console.log("checkoutUrl", `${process.env.PG_URL}/checkout?sessionId=${paymentSession.id}`)

    res.status(200).json({
        message: "Payment initiated",
        paymentSessionId : paymentSession.id,
        sessionToken: paymentSession.session_token,
        checkoutUrl: `${process.env.PG_URL}/checkout?sessionId=${paymentSession.id}&provider=${body.provider}`, 
    });
})


// This is the enpoint that banks will hit when user bank transfer the amount to propayn bank account.
app.post("/bankWebhook", async (req, res) => {
    const {['bank-signature']: bankSignature} = req.headers;
    const body = req.body;
    const { message, payload } = body as BankWebhookBody;

    const isValidSignature = verifySignature(payload as BankWebhookPayload, bankSignature as string, process.env.BANK_SECRET as string);

    if (!isValidSignature) {
        return res.status(401).json({
            message: "Invalid signature"
        });
    }

    // checking if this specific bank session was already processed
    const bankSessionCheck = await prisma.bankWebhook.findFirst({
        where: {
            bank_session_id: payload.bank_session_id,
        }
    });

    if(bankSessionCheck) {
        return res.status(200).json({ // Return 200 for idempotency
            message: "Bank session already processed"
        });
    }

    try {
        await prisma.$transaction(async (tx) => {
            await tx.bankWebhook.create({
                data: {
                    bank_session_id: payload.bank_session_id,
                }
            });

            await tx.paymentSession.update({
                where: {
                    id: payload.pg_session_id,
                },
                data: {
                    bank_session_id: payload.bank_session_id,
                    status: message === "Capture" ? "SUCCESS" : "FAILED",
                }
            });
        });

        const paymentSession = await prisma.paymentSession.findUnique({
            where: { id: payload.pg_session_id }
        });

        const callbackIdempotencyKey = crypto.randomUUID();
        const webhook_payload = {
            status: message === "Capture" ? "SUCCESS" : "FAILED",
            failure_reason: message === "Capture" ? null : message,
            txn_id: paymentSession!.merchantTxnId,
            userId: paymentSession!.userId,
            amount: paymentSession!.amount,
            provider: paymentSession!.provider,
            bank_session_id: payload.bank_session_id,
        };

        const signature = generateSignature(webhook_payload, process.env.PG_SECRET as string);

        await axios.post(`${process.env.PROPAYN_CALLBACK_URL}`, webhook_payload, {
            headers: {
                'gateway-signature': signature,
                'idempotency-key': callbackIdempotencyKey,
            }
        });

        return res.status(200).json({
            message: "Webhook processed successfully",
        });

    } catch (error) {
        console.error("Error processing bank webhook:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


app.get('/checkout', (req, res) => {
    const { sessionId } = req.query;
    const { provider } = req.query;
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>ProPAYn Gateway - Processing</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    text-align: center; 
                    background: linear-gradient(135deg, #1c254e 0%, #4f2f6e 100%);
                    color: white;
                    margin: 0;
                    padding: 100px 20px;
                }
                .container {
                    max-width: 500px;
                    margin: 0 auto;
                    background: rgba(255,255,255,0.1);
                    padding: 40px;
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                }
                .spinner {
                    border: 4px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top: 4px solid white;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                    margin: 20px auto;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>ProPAYn Secure Gateway</h1>
                <div class="spinner"></div>
                <p>Connecting to your bank's secure servers...</p>
                <p>Please do not close this window.</p>
            </div>
            <script>
                setTimeout(() => {
                    window.location.href = '${process.env.BANK_SERVICE_URL}/checkout?sessionId=${sessionId}&provider=${provider}';
                }, 2000);
            </script>
        </body>
        </html>
    `);
});

app.get('/redirect', async (req, res) => {
    const { sessionId } = req.query;

    // Fetch the payment session to get the redirect URL
    const paymentSession = await prisma.paymentSession.findUnique({
        where: { id: sessionId as string }
    });

    if (!paymentSession) {
        return res.status(404).json({ message: "Payment session not found" });
    }

    const redirectUrl = paymentSession.callbackUrl;
    console.log("Redirecting to:", redirectUrl);

    // redirect to the original URL
    res.redirect(`${redirectUrl}?txn_id=${paymentSession.merchantTxnId}&status=${paymentSession.status}&sessionId=${sessionId}`);
})



app.get('/health', (req, res) => {
    console.log("Health check endpoint hit");
  res.json({ status: 'healthy', service: 'bank-simulator' });
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Bank Simulator running on port ${PORT}`);
});