"use client";
import OnRampTxnlist from "../../../components/OnRampTxnList";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { getBalance, getOnRampTransactions } from "../../lib/getServerSideProps";
import FullPageLoader from '../../../components/FullPageLoader';
import { useRequireAuth } from "../../lib/hooks/useAuth";
import { redirect } from "next/navigation";
import Button from "@propayn/ui/button";

type OnRampTransaction = {
    time: Date;
    amount: number;
    status: string;
    provider: string;
};

export default function TransferPage() {
    const [amount, setAmount] = useState(0);
    const [amountError, setAmountError] = useState("");
    const [balance, setBalance] = useState({ amount: 0, locked: 0 });
    const [transactions, setTransactions] = useState<OnRampTransaction[]>([]);
    const [isValidAmount, setIsValidAmount] = useState(false);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
    const router = useRouter();
    const { isAuthenticated, isLoading } = useRequireAuth();
    if (isLoading) {
        return <FullPageLoader />;
    }

    if (!isAuthenticated) {
        redirect('/auth/signin');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoadingTransactions(true);
                const balanceData = await getBalance();
                setBalance(balanceData);

                const transactionsData = await getOnRampTransactions();
                setTransactions(transactionsData);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setIsLoadingTransactions(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="">
            <div className="min-h-screen pt-24 px-8 bg-transparent text-black dark:text-white">
                <div className="max-w-7xl mx-auto">
                    <h1 className="font-poppins font-bold text-3xl text-center mb-10 text-black dark:text-white">Money Transfer</h1>
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Wallet Balance Card */}
                        <div className="lg:w-1/2 w-full">
                            <div className="p-8 backdrop-blur-xl bg-black/10 dark:bg-white/10 rounded-2xl border-2 border-black/15 dark:border-white/15 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 512 512"
                                        className="w-12 h-12 mr-4 text-customBlue-mid dark:text-blue-400 fill-current">
                                        <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                                    </svg>
                                    <div>
                                        <div className="font-jetbrains font-extrabold text-3xl text-black dark:text-white">
                                            <span className='text-xl'>₹{" "}</span>{balance.amount / 100}
                                        </div>
                                        <div className="font-nunito font-light text-sm text-black/70 dark:text-white/70">
                                            Your Wallet Balance
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <div className="mt-8 w-full h-20">
                                        <div className="font-nunito text-sm font-semibold h-[20%] text-black dark:text-white">Amount</div>
                                        <div className="h-[80%] pt-2 text-4xl relative group">
                                            {/* Rupee icon */}
                                            <span className="font-jetbrains absolute left-0 top-1/2 -translate-y-1/2 text-2xl text-black/60 dark:text-white/60 pl-1 pointer-events-none select-none">
                                                <span className='text-2xl'>₹{" "}</span>
                                            </span>
                                            <input
                                                type="number"
                                                pattern="^\d{0,6}(\.\d{0,2})?$"
                                                // 6 digits + dot + up to 2 decimals, but not zero after decimal
                                                className="font-jetbrains pl-8 w-[80%] bg-transparent text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 outline-none border-none transition-all duration-300
                                                    [&::-webkit-outer-spin-button]:appearance-none
                                                    [&::-webkit-inner-spin-button]:appearance-none
                                                    appearance-none
                                                "
                                                placeholder="0.00"
                                                value={amount === 0 ? "" : amount}
                                                maxLength={9}
                                                onChange={(e) => {
                                                    const value = e.currentTarget.value;
                                                    
                                                    // Check regex pattern first
                                                    if (!/^\d{0,6}(\.(?!0{1,2}$)\d{1,2})?$/.test(value) && value !== "") {
                                                        setAmountError("Invalid amount format");
                                                        setAmount(0);
                                                        setIsValidAmount(false);
                                                        return;
                                                    }
                                                    
                                                    // Clear error and set amount
                                                    setAmountError("");
                                                    const numValue = value === "" ? 0 : Number(value);
                                                    setAmount(numValue);
                                                    
                                                    // Check amount range
                                                    if (numValue < 100 || numValue > 100000) {
                                                        if (numValue > 0) { // Only show error if user has entered something
                                                            setAmountError("Amount must be between ₹100 and ₹1,00,000");
                                                        }
                                                        setIsValidAmount(false);
                                                    } else {
                                                        setIsValidAmount(true);
                                                    }
                                                }}
                                            />
                                            <span
                                                className="
                                                    absolute left-0 bottom-0 h-[2px] w-[80%] bg-black dark:bg-white
                                                    scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100
                                                    origin-left transition-transform duration-300
                                                    pointer-events-none
                                                "
                                            />
                                            {amountError && (
                                                <div className="font-nunito text-xs font-semibold text-red-500 dark:text-red-400 mt-5">{amountError}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-8">
                                        <Button 
                                            className="!font-bold rounded-2xl bg-emerald-200/50 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100 dark:hover:bg-emerald-800 hover:scale-105 shadow-lg border-2 border-emerald-200 dark:border-emerald-700 hover:border-emerald-300 dark:hover:border-emerald-600"
                                            disabled={!isValidAmount || !!amountError}
                                            onClick={() => {
                                                if (amount <= 0 || isNaN(amount * 100)) {
                                                    setAmountError("Please enter a valid amount greater than 0.");
                                                    return;
                                                }
                                                router.push(`/payment-mode?amount=${amount}`);
                                            }}
                                        >
                                            Add Money to Wallet
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Bank to Wallet Transfer List */}
                        <div className="lg:w-1/2 w-full flex flex-col">
                            <div className="backdrop-blur-xl bg-black/10 dark:bg-white/10 rounded-2xl border-2 border-black/15 dark:border-white/15 shadow-lg flex flex-col h-full">
                                <div className="font-poppins flex justify-center pt-6 pb-2 text-2xl font-semibold text-black dark:text-white">
                                    Bank to Wallet Transfers
                                </div>
                                <div className="flex-1 overflow-y-auto max-h-[66vh] px-6 pb-6">
                                    {
                                        isLoadingTransactions ? (
                                            <div className="flex flex-col items-center justify-center mt-12 space-y-4">
                                                <svg 
                                                    className="animate-spin h-8 w-8 text-black dark:text-white" 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle 
                                                        className="opacity-25" 
                                                        cx="12" 
                                                        cy="12" 
                                                        r="10" 
                                                        stroke="currentColor" 
                                                        strokeWidth="4"
                                                    />
                                                    <path 
                                                        className="opacity-75" 
                                                        fill="currentColor" 
                                                        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                <div className="font-nunito text-lg font-medium text-black/70 dark:text-white/70">Loading Transactions...</div>
                                            </div>
                                        ) : (
                                            (!transactions.length) ? 
                                                <div className="font-poppins text-xl font-bold text-center mt-8 text-black dark:text-white/70">No Transactions</div>
                                            : transactions.map((t, index) => <OnRampTxnlist key={index} transaction={t} />)
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
