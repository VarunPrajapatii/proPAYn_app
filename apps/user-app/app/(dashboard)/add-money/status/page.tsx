"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTxnDetails, TxnDetails } from '../../../lib/actions/getTxnforStatus';

export default function PaymentStatusPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [txnDetails, setTxnDetails] = useState<TxnDetails | null>(null);
    const [error, setError] = useState<boolean>(false);

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

        // Auto redirect after 5 seconds will add lateer
        // const timer = setTimeout(() => {
        //     router.push('/add-money');
        // }, 50000);

        // return () => clearTimeout(timer);
    }, [searchParams, router]);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-black">
                <div className='flex space-x-2 justify-center items-center'>
                    <span className='sr-only'>Loading...</span>
                    <div className='h-8 w-8 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div className='h-8 w-8 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div className='h-8 w-8 bg-blue-600 rounded-full animate-bounce'></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-black">
                <div className="max-w-md text-center">
                    <div className="text-6xl text-red-500 mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
                    <p className="text-gray-600 mb-4">Failed to fetch transaction details. Please try again later.</p>
                    <button 
                        onClick={() => router.push('/add-money')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
        <div className="w-full h-screen flex items-center justify-center  p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* status vid */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 text-center">
                    <video 
                        autoPlay 
                        muted 
                        playsInline 
                        className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
                        key={videoSrc} // Force re-render when src changes
                    >
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <h2 className={`text-2xl font-bold mt-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                        Payment {isSuccess ? 'Successful!' : 'Failed'}
                    </h2>
                </div>

                {/* details */}
                <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Time/Date:</span>
                        <span className="text-gray-900">
                            {txnDetails?.completedTime?.toLocaleString() || 'N/A'}
                        </span>
                    </div>
                    
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Reference Number:</span>
                        <span className="text-gray-900 font-mono text-sm">
                            {txnDetails?.reference_number || 'N/A'}
                        </span>
                    </div>
                    
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Payment Method:</span>
                        <span className="text-gray-900">{txnDetails?.provider || 'N/A'}</span>
                    </div>
                    
                    {txnDetails?.failure_reason && (
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-600">Failure Reason:</span>
                            <span className="text-red-600">{txnDetails.failure_reason}</span>
                        </div>
                    )}
                </div>

                {/* amount */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Amount:</span>
                        <span className="text-2xl font-bold text-gray-900">
                            ₹{((txnDetails?.amount || 0) / 100).toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* footer */}
                <div className="text-center py-4 text-sm text-gray-500 bg-gray-50">
                    <button 
                        onClick={() => router.push('/add-money')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Go Back to Wallet
                    </button>
                </div>
            </div>
        </div>
    );
}