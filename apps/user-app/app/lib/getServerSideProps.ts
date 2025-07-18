"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@propayn/db/client";
import { redirect } from 'next/navigation'

export async function getAuthSession() {
  const session = await getServerSession(authOptions)
  return session
}

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }
  
  return session
}

export async function requireNoAuth() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect('/dashboard')
  }
}



export const getP2pTransactions = async () => {
    const session = await getAuthSession();
    
    
    if (!session || !session.user?.id) {
        throw new Error("Unauthorized access: No valid session found.");
    }

    const number = session.user.number;

    if (!session.user.number) {
    throw new Error("Unauthorized access: User number is missing.");
}
    
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
    const session = await getAuthSession();

    if (!session || !session.user?.id) {
        throw new Error("Unauthorized access: No valid session found.");
    }

    const balance = await prisma.balance.findFirst({
        where: {
            userId: session.user.id
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
};


export const getOnRampTransactions = async () => {
    const session = await getAuthSession();
    // console.log("session when fetching on-ramp transactions:", session);
    // console.log("session when fetching on-ramp transactions:", session?.user?.id);

    if (!session || !session.user?.id) {
        throw new Error("Unauthorized access: No valid session found.");
    }


    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            startTime: 'desc'
        }
    });
    // console.log(txns);

    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}
