"use client";
import { useSearchParams } from "next/navigation"
import { createOnRampTransaction } from "../../lib/actions/createOnRamptxn";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import BgWrapper from "@propayn/ui/BgWrapper";
import CreditCard from "../../../components/PaymentMode/CreditCard";
import NetBanking from "../../../components/PaymentMode/NetBanking";
import UPICard from "../../../components/PaymentMode/UPICard";

export default function PaymentMode() {
    const [currentPage, setCurrentPage] = useState('Net Banking')

    const searchParams = useSearchParams();

    let amount = Number(searchParams.get("amount"));
    if(!amount || isNaN(amount)) {
        amount = 0;
    }

    return (
        <BgWrapper>
            <div className="">
            <div className="h-screen text-black dark:text-white relative">
                {/* Payment Mode Selection */}
                <div className="p-6 w-80 h-[32rem] absolute top-32 left-32 backdrop-blur-xl bg-black/15 dark:bg-white/15 rounded-2xl border-2 border-black/15 dark:border-white/10 shadow-lg shadow-black/20">
                    <div>
                        <h3 className="text-xl font-light mt-16 mb-4">Payment Mode</h3>
                        <nav className="">
                            <div className="space-y-2">
                                {['Credit/Debit Card', 'Net Banking', 'UPI'].map((page) => (
                                    <motion.nav
                                        key={page}
                                        className=""
                                        layout
                                    >
                                        <motion.button
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-6 w-full py-2 text-black dark:text-white text-lg tracking-wide rounded-2xl font-semibold capitalize relative ${currentPage === page
                                                ? 'bg-black/30 dark:bg-white/30 translate-x-2'
                                                : 'bg-black/10 dark:bg-white/10'
                                                }`}
                                            whileHover={{ x: 8 }}
                                            whileTap={{ scale: 0.97 }}
                                            transition={{ duration: 0.18 }}
                                            layout
                                        >
                                            {page}
                                            {currentPage === page && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 rounded-lg -z-10"
                                                />
                                            )}
                                        </motion.button>
                                    </motion.nav>
                                ))}
                            </div>
                        </nav>
                    </div>
                </div>

                {/* Payment Amount */}
                <div className="flex items-center ml-[2rem] justify-center w-[50rem] h-16 absolute top-40 left-[28rem] backdrop-blur-xl bg-black/15 dark:bg-white/15 rounded-2xl border-2 border-black/15 dark:border-white/10 shadow-lg shadow-black/20">
                    <div className="text-xl">
                        Total payment to be made: <span className="font-bold text-3xl text-red-500">{amount}</span> INR
                    </div>
                </div>

                {/* Payment Details Section */}
                <div className="w-[38rem] h-[25rem] ml-[2rem] absolute top-[15rem] left-[28rem]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className=""
                        >
                            {currentPage === 'Credit/Debit Card' && (
                                <div>
                                    <motion.div
                                        className=""
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <CreditCard amount={amount*100} onPay={createOnRampTransaction}/>
                                    </motion.div>
                                </div>
                            )}

                            {currentPage === 'Net Banking' && (
                                <div>
                                    <NetBanking amount={amount*100} onPay={createOnRampTransaction}/>
                                </div>
                            )}

                            {currentPage === 'UPI' && (
                                <div>
                                    <UPICard amount={amount*100} onPay={createOnRampTransaction}/>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
        </BgWrapper>
    )
}
