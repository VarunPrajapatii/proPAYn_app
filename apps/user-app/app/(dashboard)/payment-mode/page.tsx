"use client";
import { useSearchParams } from "next/navigation"
import { createOnRampTransaction } from "../../lib/actions/createOnRamptxn";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import CreditCard from "../../../components/PaymentMode/CreditCard";
import NetBanking from "../../../components/PaymentMode/NetBanking";
import UPICard from "../../../components/PaymentMode/UPICard";
import { useRequireAuth } from "../../lib/hooks/useAuth";
import FullPageLoader from "../../../components/FullPageLoader";
import { redirect } from "next/navigation";

export default function PaymentMode() {
    const [currentPage, setCurrentPage] = useState('Net Banking')

    const { isAuthenticated, isLoading } = useRequireAuth();
    if (isLoading) {
        return <FullPageLoader />;
    }

    if (!isAuthenticated) {
        redirect('/auth/signin');
    }

    const searchParams = useSearchParams();

    let amount = Number(searchParams.get("amount"));
    if (!amount || isNaN(amount)) {
        amount = 0;
    }

    return (
        <>
            <div className="">
                {/* for laptop and desktop screens */}
                <div className="hidden lg:block h-screen text-black dark:text-white relative">
                    {/* Payment Mode Selection */}
                    <div className="p-6 w-80 h-[32rem] absolute top-32 left-32 backdrop-blur-xl bg-black/15 dark:bg-white/15 rounded-2xl border-2 border-black/15 dark:border-white/10 shadow-lg shadow-black/20">
                        <div>
                            <h3 className="font-poppins text-xl font-light mt-16 mb-4">Payment Mode</h3>
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
                        <div className="font-nunito text-xl">
                            Total payment to be made: <span className="font-jetbrains font-bold text-3xl text-red-500">{amount}</span> INR
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
                                            <CreditCard amount={amount * 100} onPay={createOnRampTransaction} />
                                        </motion.div>
                                    </div>
                                )}

                                {currentPage === 'Net Banking' && (
                                    <div>
                                        <NetBanking amount={amount * 100} onPay={createOnRampTransaction} />
                                    </div>
                                )}

                                {currentPage === 'UPI' && (
                                    <div>
                                        <UPICard amount={amount * 100} onPay={createOnRampTransaction} />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* for mobile and tablet screens */}
                <div className="lg:hidden min-h-screen text-black dark:text-white px-4 py-6 pt-36 sm:pt-24 ">
                    {/* Payment Amount Bar */}
                    <div className="mb-6 flex items-center justify-center w-full h-16 backdrop-blur-xl bg-black/15 dark:bg-white/15 rounded-2xl border-2 border-black/15 dark:border-white/10 shadow-lg">
                        <div className="font-nunito text-lg md:text-xl text-center">
                            Total payment to be made: <span className="font-jetbrains font-bold text-2xl md:text-3xl text-red-500">₹{amount}</span> <span className="block sm:inline">INR</span>
                        </div>
                    </div>

                    {/* Payment Mode Selection */}
                    <div className="mb-6 p-4 backdrop-blur-xl bg-black/15 dark:bg-white/15 rounded-2xl border-2 border-black/15 dark:border-white/10 shadow-lg">
                        <h3 className="font-poppins text-lg md:text-xl font-semibold mb-4 text-center">Payment Mode</h3>
                        <div className="space-y-3">
                            {['Credit/Debit Card', 'Net Banking', 'UPI'].map((page) => (
                                <motion.button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-full py-3 px-4 text-black dark:text-white text-base md:text-lg font-semibold rounded-xl transition-all duration-300 relative ${
                                        currentPage === page
                                            ? 'bg-black/30 dark:bg-white/30 scale-105'
                                            : 'bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20'
                                    }`}
                                    whileTap={{ scale: 0.95 }}
                                    layout
                                >
                                    {page}
                                    {currentPage === page && (
                                        <motion.div
                                            layoutId="activeTabMobile"
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl -z-10"
                                            initial={false}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Payment Details Section */}
                    <div className="w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {currentPage === 'Credit/Debit Card' && (
                                    <div className=" p-4">
                                        <CreditCard amount={amount * 100} onPay={createOnRampTransaction} />
                                    </div>
                                )}

                                {currentPage === 'Net Banking' && (
                                    <div className=" p-4">
                                        <NetBanking amount={amount * 100} onPay={createOnRampTransaction} />
                                    </div>
                                )}

                                {currentPage === 'UPI' && (
                                    <div className=" p-4">
                                        <UPICard amount={amount * 100} onPay={createOnRampTransaction} />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    )
}
