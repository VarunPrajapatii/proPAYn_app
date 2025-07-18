import express from 'express';
import crypto, { randomUUID } from 'crypto';
import axios from 'axios';
import db from '@propayn/db/client';
import { PaymentRequestBody } from './types';
import 'dotenv/config';
import path from 'path';



const app = express();
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

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


app.post("/provider/pay", async (req, res) => {
    const paymentRequest = req.body as PaymentRequestBody;

    const { ['bank-signature'] : signature } = req.headers;
    const isValidSignature = verifySignature(paymentRequest, (signature as string), process.env.BANK_SECRET as string);

    if (!isValidSignature) {
        return res.status(400).json({ message: "Invalid Signature" });
    }

    const bank_session_id = randomUUID();

    // Bank mock logic
    const userBalance = Math.ceil(Math.random()*9500000)+ 500000;

    let bank_msg = null;

    if(paymentRequest.amount > userBalance) {
        bank_msg = "Insufficient balance";
    } else if(Math.random() < 0.1) {
        bank_msg = "Bank server error";
    }

    const bank_webhook_payload = {
        pg_session_id: paymentRequest.sessionId,
        userId: paymentRequest.userId,
        amount: paymentRequest.amount,
        bank_session_id,
    }

    const bank_signature = generateSignature(bank_webhook_payload, process.env.BANK_SECRET as string);
    
    setTimeout(async () => {
        axios.post(paymentRequest.webhookUrl, {
            message: bank_msg || "Capture",
            payload: bank_webhook_payload
        }, {
            headers: {
                "bank-signature": bank_signature,
            }
        });
    }, 2000);

    console.log("Bank message:", bank_msg);
    
    res.status(200).json({ 
        message: "Success",
        bank_session_id 
    });
});


app.get('/checkout', (req, res) => {
    const { sessionId } = req.query;
    const {provider} = req.query;
    
    // Handle UPI providers - instant redirect
    if (provider === 'UPIid' || provider === 'PhonePe' || provider === 'GPay' || provider === 'Paytm' || provider === 'BHIMUPI') {
        setTimeout(() => {
            res.redirect(`${process.env.PAYMENT_GATEWAY_URL}/redirect?sessionId=${sessionId}`);
        }, 200);
        return;
    }
    
    // Handle Credit Card - show video animation
    if (provider === 'CreditCard') {
        res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Credit Card Payment</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        background: #f5f5f5;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }
                    .container {
                        text-align: center;
                        max-width: 600px;
                        padding: 20px;
                    }
                    .card-video {
                        width: 500px;
                        max-width: 100%;
                        height: auto;
                        border-radius: 10px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    }
                    .processing-text {
                        margin-top: 20px;
                        font-size: 18px;
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <video src="/cardAnimation.mp4" class="card-video" loop autoplay muted playsinline></video>
                    <div class="processing-text">Processing your card payment...</div>
                </div>
                
                <script>
                    // Redirect after 4 seconds
                    setTimeout(() => {
                        window.location.href = '${process.env.PAYMENT_GATEWAY_URL}/redirect?sessionId=${sessionId}';
                    }, 4000);
                </script>
            </body>
        </html>
        `);
        return;
    }
    
    // Handle NetBanking providers (HDFC, SBI, ICICI, AXIS)
    if(provider == 'HDFC' || provider == 'SBI' || provider == 'ICICI' || provider == 'AXIS') {
        res.send(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>NetBanking - Secure Login</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    background: #f5f5f5;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 50px auto;
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                .bank-logo {
                    text-align: center;
                    color: #d32f2f;
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 30px;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                input {
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                }
                .btn {
                    background: #d32f2f;
                    color: white;
                    padding: 12px 30px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    width: 100%;
                }
                .security-note {
                    background: #e3f2fd;
                    padding: 15px;
                    border-radius: 5px;
                    margin-top: 20px;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div>
                <div class="note" style="margin-bottom: 5px; text-align: center;">
                    <p>NOTE: Payment gateway gave the bank, payload with info such as session id, merchant's transaction id, user id, amount, provider, merchant id, gateway's webhook url, propayn's redirect url, timestamp, etc. And then bank gave a redirect url to gateway with the sessionId of bank. And gateway redirects the user to the bank's NetBanking page with sessionId. And while all this happens a lot of validations are done by the bank and gateway. When the bank validates the otp it redirects the user to the propayn redirect url for user to see what happened with the payment. And it hits the payment gateway webhook with the transaction details, so that if the user closes the browser or goes back to the app, it wont affect anything, and the gateway hit the propayn webhook/callback endpoint with the transaction details. All this process is very secure and encrypted. Close to industry standards validations and security checks are also been taken care of in this project.
                    </p>
                </div>
                <div class="container">
                    <div class="bank-logo">🏦 Bank NetBanking</div>
                    
                    <div class="form-group">
                        <label>Customer ID / User ID</label>
                        <input type="text" placeholder="Enter your Customer ID" value="demo_user_123" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your Password" value="••••••••" readonly>
                    </div>
                    
                    <button class="btn" onclick="processPayment()">Login & Pay</button>
                    
                    <div class="security-note">
                        🔒 <strong>Security Note:</strong> This is a demo simulation. In real scenarios, you would enter your actual banking credentials here.
                    </div>
                </div>
            </div>
            
            
            <script>
                function processPayment() {
                    document.querySelector('.btn').innerHTML = 'Processing Payment...';
                    document.querySelector('.btn').disabled = true;
                    
                    // Simulate OTP verification
                    setTimeout(() => {
                        document.querySelector('.container').innerHTML = \`
                            <div style="text-align: center;">
                                <h2>🔐 OTP Verification</h2>
                                <p>Please enter the OTP sent to your registered mobile number</p>
                                <input type="text" placeholder="Enter 6-digit OTP" style="width: 200px; text-align: center; font-size: 18px; padding: 10px; margin: 20px;">
                                <br><br>
                                <button onclick="finalizePayment()" style="background: #d32f2f; color: white; padding: 12px 30px; border: none; border-radius: 5px; cursor: pointer;">Verify & Pay</button>
                            </div>
                        \`;
                    }, 2000);
                }
                
                function finalizePayment() {
                    document.querySelector('.container').innerHTML = \`
                        <div style="text-align: center;">
                            <div style="font-size: 50px; color: #4caf50; margin-bottom: 20px;">✅</div>
                            <h2>Payment Processing...</h2>
                            <p>Please wait while we confirm your payment</p>
                        </div>
                    \`;
                    
                    // Redirect to success page after 3 seconds
                    setTimeout(() => {
                        window.location.href = '${process.env.PAYMENT_GATEWAY_URL}/redirect?sessionId=${sessionId}';
                    }, 3000);
                }
            </script>
        </body>
    </html>    
    `);
    }
});


// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'bank-simulator' });
});

const PORT = process.env.PORT || 4020;
app.listen(PORT, () => {
  console.log(`Bank Simulator running on port ${PORT}`);
});