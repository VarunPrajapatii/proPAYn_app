import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@propayn/db/client";


export default async function p2ptransactionslist() {
    const session = await getServerSession(authOptions);
    const number = session?.user?.number;

    const list = await prisma.p2PLedger.findMany({
        where: {
            OR: [
                {user_no: number},
                {relatedUser_no: number}
            ]
        },
        orderBy: {
            timestamp: 'desc'
        }
    });
    console.log(list);
    return list.map(l => ({
        user_no: l.user_no,
        time: l.timestamp,
        amount: l.amount,
        transactionType: l.transactionType,
        relatedUser_no: l.relatedUser_no
    }))
}