import express from "express";
import db from "@propayn/db/client"

const app = express();
app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //  TODO: Add zod validation here?
    //  TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    //  TODO:  Check if the onRampTxn is processing or not
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string;
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await db.$transaction([
            // TODO: Add zod validations here.
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId),
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: "Success"
                }
            })
        ]);

        res.status(200).json({
            message: "Captured"
        })
    } catch (error) {
        console.log(error);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(3003);