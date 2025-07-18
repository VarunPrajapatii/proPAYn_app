"use server";

import prisma from "@propayn/db/client";

export interface TxnDetails {
    txnStatus: 'Success' | 'Failed' | 'Processing';
    amount: number;
    completedTime: Date | null;
    reference_number: string | null;
    failure_reason: string | null;
    provider: string | null;
}

export async function getTxnDetails(txn_id: string): Promise<TxnDetails | null> {
  if (!txn_id) {
    return null;
  }

  try {
    const dbTxn = await prisma.onRampTransaction.findUnique({ 
      where: { txn_id },
      select: {
          status: true,
          amount: true,
          completedTime: true,
          reference_number: true,
          failure_reason: true,
          provider: true,
      }
    });
    
    // console.log("Transaction details fetched:", dbTxn);

    if (!dbTxn) {
      return null;
    }

    return {
      txnStatus: dbTxn.status as 'Success' | 'Failed' | 'Processing',
      amount: dbTxn.amount,
      completedTime: dbTxn.completedTime,
      reference_number: dbTxn.reference_number,
      failure_reason: dbTxn.failure_reason,
      provider: dbTxn.provider,
    };
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    return null;
  }
}

