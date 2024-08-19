"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@propayn/db/client";


export async function createOnRampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session.user.id;
    // console.log(session);
    
    if(!userId) {
        return {
            message: "User not logged in."
        }
    }
    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount: amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token
        }
    })

    return {
        message: "On Ramp Transaction Added"
    }
}