"use client";

import P2pTxnLists from "../../../components/P2PTxnLists";
import { useEffect, useState } from "react";
import { getBalance, getP2pTransactions } from "../../lib/getServerSideProps";
import { p2pTransfer } from "../../lib/actions/p2pTransfer";
import { useRequireAuth } from "../../lib/hooks/useAuth";
import FullPageLoader from "../../../components/FullPageLoader";
import { redirect } from "next/navigation";
import Button from "@propayn/ui/button";

type P2PTransactions = {
    user_no: string,
    time: Date,
    amount: number,
    transactionType: string,
    relatedUser_no: string | null
};

export default  function PayPage() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState({ amount: 0, locked: 0 });
    const [transactions, setTransactions] = useState<P2PTransactions[]>([]);
    const [amountError, setAmountError] = useState("");
    const [numberError, setNumberError] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);

    const { isAuthenticated, isLoading, session } = useRequireAuth();
    if (isLoading) {
        return <FullPageLoader />;
    }

    if (!isAuthenticated) {
        redirect('/auth/signin');
    }

    const currentUserNumber = (session?.user as any)?.number;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoadingTransactions(true);
                const balanceData = await getBalance();
                setBalance(balanceData);

                const transactionsData = await getP2pTransactions();
                setTransactions(transactionsData);

            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setIsLoadingTransactions(false);
            }
        };

        fetchData();
    }, []);

    const handleSend = async () => {
        let valid = true;
        
        // Reset all errors
        setAmountError("");
        setNumberError("");
        
        if (amount <= 0) {
            setAmountError("Enter a valid amount.");
            valid = false;
        }
        
        if (number.length !== 10) {
            setNumberError("Enter a valid 10-digit phone number.");
            valid = false;
        }

        // Check if user is trying to send money to themselves
        if (number === currentUserNumber) {
            setNumberError("You cannot send money to yourself.");
            valid = false;
        }
        
        // Check if user has sufficient balance
        if (amount * 100 > balance.amount) {
            setAmountError("Not enough balance! Available balance: ₹" + (balance.amount / 100));
            valid = false;
        }
        
        if (valid) {
            setIsSending(true);
            try {
                const result = await p2pTransfer(number, amount * 100);
                
                if (result?.message) {
                    // Handle server-side error messages
                    if (result.message === "User not found") {
                        setNumberError("User with this phone number not found.");
                    } else {
                        setAmountError(result.message);
                    }
                    setIsSending(false);
                } else {
                    // Success - refresh the page after 2 seconds
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } catch (error: any) {
                console.error("Transfer failed:", error);
                if (error.message === "Insufficient funds") {
                    setAmountError("Insufficient funds in your account.");
                } else {
                    setAmountError("Transfer failed. Please try again.");
                }
                setIsSending(false);
            }
        }
    };


    return (
        <div className="min-h-screen pt-36 sm:pt-24 px-8 bg-transparent text-black dark:text-white">
            <div className="max-w-7xl mx-auto">
                <h1 className="font-poppins font-bold text-3xl text-center mb-10">Pay Friends</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Wallet Balance & Pay Form */}
                    <div className="lg:w-1/2 w-full">
                        <div className="p-8 backdrop-blur-xl bg-black/10 dark:bg-white/10 rounded-2xl border-2 border-black/15 dark:border-white/15 shadow-lg">
                            <div className="flex items-center mb-6">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 512 512"
                                    className="w-12 h-12 mr-4 text-customBlue-mid fill-current">
                                    <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                                </svg>
                                <div>
                                    <div className="font-jetbrains font-bold text-3xl">
                                        <span className='text-xl'>₹{" "}</span> {balance.amount / 100}
                                    </div>
                                    <div className="font-light text-sm">
                                        Your Wallet Balance
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 space-y-8">
                                {/* Amount Input */}
                                <div className="mt-8 w-full h-20">
                                    <div className="font-nunito text-sm font-semibold h-[20%]">Amount</div>
                                    <div className="h-[80%] pt-2 text-4xl relative group">
                                        <span className="font-jetbrains absolute left-0 top-1/2 -translate-y-1/2 text-2xl text-black/60 dark:text-white/60 pl-1 pointer-events-none select-none">
                                            ₹
                                        </span>
                                        <input
                                            type="number"
                                            maxLength={9}
                                            className="font-jetbrains pl-8 w-[80%] bg-transparent text-black placeholder-black/40 dark:text-white dark:placeholder-white/40 outline-none border-none transition-all duration-300
                                                [&::-webkit-outer-spin-button]:appearance-none
                                                [&::-webkit-inner-spin-button]:appearance-none
                                                appearance-none
                                            "
                                            placeholder="0.00"
                                            value={amount === 0 ? "" : amount}
                                            onChange={e => {
                                                const value = e.currentTarget.value;
                                                if (/^\d{0,6}(\.\d{0,2})?$/.test(value) || value === "") {
                                                    setAmountError(""); // clear error on change
                                                    setAmount(value === "" ? 0 : Number(value));
                                                } else {
                                                    setAmountError("You can only enter up to 6 digits before the decimal and up to 2 non-zero digits after (max 9 characters).");
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
                                    </div>
                                    {amountError && (
                                        <div className="font-nunito text-xs text-red-500 mt-1">{amountError}</div>
                                    )}
                                </div>
                                {/* Number Input */}
                                <div className="mt-8 w-full h-20">
                                    <div className="font-nunito text-sm font-semibold h-[20%]">Number</div>
                                    <div className="h-[60%] sm:h-[80%] pt-2 text-2xl sm:text-4xl relative group">
                                        <span className="font-jetbrains absolute left-0 top-1/2 -translate-y-1/2 text-xl text-black/60 dark:text-white/60 pl-1 pointer-events-none select-none">
                                            +91
                                        </span>
                                        <input
                                            type="text"
                                            name="number"
                                            id="number"
                                            maxLength={10}
                                            className="font-jetbrains pl-14 w-[80%] bg-transparent text-black placeholder-black/40 dark:text-white dark:placeholder-white/40 outline-none border-none transition-all duration-300
                                                focus:ring-0
                                            "
                                            placeholder="Phone number"
                                            value={number}
                                            onChange={e => {
                                                const value = e.target.value;
                                                if (/^\d{0,10}$/.test(value)) {
                                                    setNumber(value);
                                                    setNumberError("");
                                                    
                                                    // Check if user is trying to enter their own number
                                                    if (value === currentUserNumber && value.length === 10) {
                                                        setNumberError("You cannot send money to yourself.");
                                                    }
                                                } else if (value.length > 10) {
                                                    setNumberError("Phone number cannot exceed 10 digits.");
                                                } else {
                                                    setNumberError("Invalid phone number.");
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
                                    </div>
                                    {numberError && (
                                        <div className="font-nunito text-xs text-red-500 mt-1">{numberError}</div>
                                    )}
                                </div>
                                <div className="flex justify-center mt-2 sm:mt-8">
                                    <Button
                                        className="!font-bold rounded-2xl bg-emerald-200/50 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100 dark:hover:bg-emerald-800 hover:scale-105 shadow-lg border-2 border-emerald-200 dark:border-emerald-700 hover:border-emerald-300 dark:hover:border-emerald-600"
                                        disabled={isSending}
                                        onClick={() => {
                                            if (amount <= 0 || isNaN(amount*1000)) {
                                                setAmountError("Please enter a valid amount greater than 0.");
                                                return;
                                            }
                                            handleSend();
                                        }}
                                    >
                                        {isSending ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <svg 
                                                    className="animate-spin h-5 w-5 text-emerald-900 dark:text-emerald-100" 
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
                                                <span>Sending...</span>
                                            </div>
                                        ) : (
                                            "Send Money"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Wallet Transfers List */}
                    <div className="lg:w-1/2 w-full flex flex-col">
                        <div className="backdrop-blur-xl bg-black/10 dark:bg-white/10 rounded-2xl border-2 border-black/15 dark:border-white/15 shadow-lg flex flex-col h-full">
                            <div className="font-poppins flex justify-center pt-6 pb-2 text-xl md:text-2xl font-semibold">
                                Wallet Transfers
                            </div>
                            <div className="flex-1 overflow-y-auto max-h-[66vh] px-1 sm:px-6 pb-6">
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
                                            <div className="font-poppins text-xl font-bold text-center mt-8">No Transactions</div>
                                        : transactions.map((t, idx) => <P2pTxnLists key={idx} transaction={t} />)
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


