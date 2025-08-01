"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTxnDetails, TxnDetails } from '../../../lib/actions/getTxnforStatus';
import FullPageLoader from '../../../../components/FullPageLoader';
import { useRequireAuth } from "../../../lib/hooks/useAuth";
import { redirect } from "next/navigation";

export default function PaymentStatusPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [txnDetails, setTxnDetails] = useState<TxnDetails | null>(null);
    const [error, setError] = useState<boolean>(false);
    const { isAuthenticated } = useRequireAuth();
    

    if (!isAuthenticated) {
        redirect('/auth/signin');
    }

    useEffect(() => {
        const fetchTransaction = async () => {
            const txn_id = searchParams.get('txn_id');
            
            if (!txn_id) {
                setError(true);
                setLoading(false);
                return;
            }

            try {
                const details = await getTxnDetails(txn_id);
                if (details) {
                    setTxnDetails(details);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Error fetching transaction:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchTransaction();
    }, [searchParams, router]);

    if (loading) {
        return <FullPageLoader />;
    }
    if (error) {
        return (
            <div className="w-full h-screen flex items-center justify-center ">
                <div className="max-w-md text-center">
                    <div className="text-6xl text-red-500 mb-4">❌</div>
                    <h2 className="font-poppins text-2xl font-bold text-red-600 mb-2">Error</h2>
                    <p className="font-nunito text-gray-600 dark:text-gray-200 mb-4">Failed to fetch transaction details. Please try again later.</p>
                    <button 
                        onClick={() => router.push('/add-money')}
                        className="font-nunito px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Go Back to Wallet
                    </button>
                </div>
            </div>
        );
    }

    const isSuccess = txnDetails?.txnStatus === 'Success';
    const videoSrc = isSuccess ? "/success.mp4" : "/failure.mp4";

    return (
        <div className="w-full h-screen flex items-center justify-center  p-4 pt-20 sm:pt-0">
            <div className="max-w-md w-full backdrop-blur-md rounded-2xl shadow-2xl border border-gray-500 overflow-hidden">
                {/* status vid */}
                <div className="bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-slate-100/80 dark:to-slate-200/80 p-8 text-center">
                    <video 
                        autoPlay 
                        muted 
                        playsInline 
                        className="w-32 h-32 mx-auto rounded-full object-cover dark:shadow-lg dark:brightness-90"
                        key={videoSrc} // Force re-render when src changes
                    >
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <h2 className={`font-poppins text-2xl font-bold mt-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                        Payment {isSuccess ? 'Successful!' : 'Failed'}
                    </h2>
                </div>

                {/* details */}
                <div className="p-6 space-y-4 bg-black/15 dark:bg-white/20 ">
                    <div className="flex justify-between">
                        <span className="font-nunito font-medium text-gray-600 dark:text-gray-200">Time/Date:</span>
                        <span className="font-nunito text-black dark:text-white">
                            {txnDetails?.completedTime?.toLocaleString() || 'N/A'}
                        </span>
                    </div>
                    
                    <div className="flex justify-between">
                        <span className="font-nunito font-medium text-gray-600 dark:text-gray-200">Reference Number:</span>
                        <span className="font-jetbrains text-black dark:text-white text-sm">
                            {txnDetails?.reference_number || 'N/A'}
                        </span>
                    </div>
                    
                    <div className="flex justify-between">
                        <span className="font-nunito font-medium text-gray-600 dark:text-gray-200">Payment Method:</span>
                        <span className="font-nunito text-black dark:text-white">{txnDetails?.provider || 'N/A'}</span>
                    </div>
                    
                    {txnDetails?.failure_reason && (
                        <div className="flex justify-between">
                            <span className="font-nunito font-medium text-gray-600 dark:text-gray-200">Failure Reason:</span>
                            <span className="font-nunito text-red-600">{txnDetails.failure_reason}</span>
                        </div>
                    )}
                </div>

                {/* amount */}
                <div className={`bg-black/15 dark:bg-white/20 ${isSuccess ? 'text-green-500' : 'text-red-500'} px-6 py-4`}>
                    <div className="flex justify-between items-center">
                        <span className="font-nunito font-semibold text-gray-700 dark:text-gray-200">Amount:</span>
                        <span className="font-jetbrains text-2xl font-bold ">
                            <span className='text-xl'>₹{" "}</span>{((txnDetails?.amount || 0) / 100).toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* footer */}
                <div className="text-center py-4 text-sm text-gray-500 bg-black/25 dark:bg-white/5">
                    <button 
                        onClick={() => router.push('/add-money')}
                        className="font-nunito px-4 py-2 text-white dark:text-white rounded-xl font-semibold text-sm 
                        hover:text-black dark:hover:text-white  
                        transition-all duration-200 border border-transparent 
                        hover:border-black/20 dark:hover:border-white/20 backdrop-blur-sm
                        bg-black/20 dark:bg-white/20  dark:border-white/30 hover:bg-black/30 dark:hover:bg-white/30 hover:scale-105 shadow-lg"
                    >
                        Go Back to Wallet
                    </button>
                </div>
            </div>
        </div>
    );
}