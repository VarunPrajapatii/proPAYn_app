import express from "express";
import db from "@propayn/db/client"

const app = express();

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await db.$transaction([
            // TODO: Add zod validations here.
            db.balance.update({
                where: {
                    userId: paymentInformation.userId,
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: "Success"
                }
            })
        ]);

        res.status(200).json({
            message: "captured"
        })
    } catch (error) {
        console.log(error);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(3003);