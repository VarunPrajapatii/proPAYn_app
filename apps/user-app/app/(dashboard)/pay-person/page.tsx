"use client";

import P2pTxnLists from "../../../components/P2PTxnLists";
import { useEffect, useState } from "react";
import { getBalance, getP2pTransactions } from "../../lib/getServerSideProps";
import { p2pTransfer } from "../../lib/actions/p2pTransfer";

type P2PTransactions = {
    user_no: string,
    time: Date,
    amount: number,
    transactionType: string,
    relatedUser_no: string | null
};

export default function PayPage() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState({ amount: 0, locked: 0 });
    const [transactions, setTransactions] = useState<P2PTransactions[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const balanceData = await getBalance();
                setBalance(balanceData);
                
                const transactionsData = await getP2pTransactions();
                setTransactions(transactionsData);

            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, [])


    return (
        // <div className="bg-[url('/images/couple_using_propayn.jpg')] bg-cover bg-center h-screen bg-opacity-85">
        //     <div className="">
        //         hi there
                
        //     </div>
        // </div>
        <div className="relative h-screen">
            <div className="absolute inset-0 bg-[url('/images/couple_using_propayn.jpg')] bg-cover bg-center opacity-65 blur-sm -z-20"> </div>
            <div className="relative z-10">
                <div className=" font-bold text-6xl flex justify-center pt-7 bg-">
                    Pay Friends
                </div>
                <div className="flex justify-between pt-12">
                    <div className=" pl-32 pr-5 w-full">
                        <div className="bg-slate-200 p-10 opacity-80 rounded-3xl">
                            <div className="">
                                <div className="flex items-center">
                                    <div className="">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            viewBox="0 0 512 512"
                                            className="w-12 h-12 mr-4 ml-4 text-customBlue-mid fill-current">
                                            <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                                        />
                                        </svg>
                                    </div>
                                    <div className="p-5">
                                        <div className="font-extrabold text-3xl">
                                            Rs. {balance.amount / 100}
                                        </div>
                                        <div className="font-light text-sm">
                                            Your Wallet Balance
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {/* <div className="text-center">
                                    Add Money to Wallet
                                </div> */}
                                <div className="m-8">
                                    <label className="text-2xl font-semibold">Amount</label>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">₹</div>
                                        <input 
                                            type="text" 
                                            name="price" 
                                            id="price" 
                                            className="mb-10 px-24 py-3 block w-full text-xl font-semibold rounded-md border-0 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customBlue-dark " 
                                            placeholder="0.00"
                                            onChange={(e) => setAmount(Number(e.target.value))}
                                        />
                                    </div>
                                    <label className="text-2xl font-semibold">Number</label>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 text-xl left-0 flex items-center pl-3">+91</div>
                                        <input 
                                            type="text" 
                                            name="price" 
                                            id="price" 
                                            className=" px-14 py-3 block w-full text-xl font-semibold rounded-md border-0  pr-20 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-customBlue-dark " 
                                            onChange={(e) => {setNumber(e.target.value)}}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center m-10 mt-20">
                                    <button 
                                        className="bg-customBlue-dark px-24 py-3 rounded-md font-bold text-xl text-white"
                                        onClick={() => {p2pTransfer(number, amount * 100)}}
                                    >Send Money</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pr-32 pl-5 w-full">
                        <div className="bg-slate-100  opacity-80 rounded-3xl">
                            <div className="flex justify-center py-8 text-2xl font-semibold ">
                                Wallet Transfers
                            </div>
                            {
                                transactions.map(t => <P2pTxnLists transaction={t} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


