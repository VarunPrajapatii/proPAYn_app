"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@propayn/db/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    const from_no = session?.user?.number;
    // console.log("Session: " ,session);
    // console.log("From Number: " ,from_no);

    if(!from) {
        return {
            message: "Error while sending"
        }
    }
    
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }

    await prisma.$transaction(async (tx) => {

        //TODO: Although Prisma handles SQL injection, the raw SQL query with template literals might be a concern. Ensure that any user input is properly sanitized.
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`

        const fromBalance = await tx.balance.findUnique({
            where: {
                userId: Number(from),
            }
        });
        
        // console.log("above sleep");
        // await new Promise(resolve => setTimeout(resolve, 4000));
        // console.log("after sleep");
        
        if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
        }
        await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
        });
        await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
        });
        // console.log("from_no:", from_no);
        // console.log("toUser.number:", toUser.number);
        // console.log("from:", from);
        await tx.p2PLedger.createMany({
            data: [
              {
                user_no: from_no, // `from` is the user number
                amount: -amount,
                transactionType: "Debit",
                relatedUser_no: toUser.number // `toUser.number` is the user number
              },
              {
                user_no: toUser.number, // `toUser.number` is the user number
                amount: amount,
                transactionType: "Credit",
                relatedUser_no: from_no // `from` is the user number
              }
            ]
        });
    })
}