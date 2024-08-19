import { Card } from "@propayn/ui/card"

export default function P2pTxnList({
    transactions
}: {
    transactions: {
        user_no: string,
        time: Date,
        amount: number,
        transactionType: string,
        relatedUser_no: string | null
    }[]
}) {
    // if (!transactions.length) {
    //     return <Card title="Recent Transactions">
    //         <div className="text-center pb-8 pt-8">
    //             No Recent transactions
    //         </div>
    //     </Card>
    // }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}