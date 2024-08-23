"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@propayn/db/client";


export const getP2pTransactions = async () => {
    const session = await getServerSession(authOptions);
    const number = session?.user?.number;

    const list = await prisma.p2PLedger.findMany({
        where: {
            OR: [
                {user_no: number}
            ]
        },
        orderBy: {
            timestamp: 'desc'
        }
    });
    // console.log(list);
    return list.map(l => ({
        user_no: l.user_no,
        time: l.timestamp,
        amount: l.amount,
        transactionType: l.transactionType,
        relatedUser_no: l.relatedUser_no
    }))
}


export const getBalance = async () => {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
};


export const getOnRampTransactions = async () => {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        },
        orderBy: {
            startTime: 'desc'
        }
    });
    console.log(txns);

    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}
