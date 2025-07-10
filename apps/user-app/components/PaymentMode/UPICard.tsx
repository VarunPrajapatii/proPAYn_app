import { useRef, useState } from 'react';

const UPICard = ({amount, onPay}: {amount: number, onPay: (amount: number, provider: string) => void}) => {
    const [selectedUPIApp, setSelectedUPIApp] = useState<string | null>(null);
    const [upiError, setUpiError] = useState<string>('');
    const upiIdRef = useRef<HTMLInputElement>(null);
    const upiApps = [
        { name: 'PhonePe', logo: '/logos/phonepe_logo.png' },
        { name: 'GPay', logo: '/logos/gpay_logo.png' },
        { name: 'Paytm', logo: '/logos/paytm_logo.png' },
        { name: 'BHIMUPI', logo: '/logos/bhim_logo.png' }
    ];

    // UPI ID validation regex
    const upiRegex = /^[a-z0-9.\-]+@[a-z0-9]+$/;

    return (
        <div>
            <div className="p-4 w-[130%]  h-[110%] text-black dark:text-white backdrop-blur-xl bg-black/15 dark:bg-white/15 rounded-2xl border-2 border-black/15 dark:border-white/10 shadow-lg">
                <div className="flex h-full">
                    {/* QR Code Section */}
                    <div className="flex-1 flex flex-col items-center justify-center pr-6">
                        <h3 className="text-lg font-semibold mb-4">Scan QR Code</h3>
                        
                        {/* Dummy QR Code */}
                        <div className="w-32 h-32 bg-white rounded-lg p-2 shadow-md mb-4">
                            <div className="w-full h-full bg-black rounded grid grid-cols-8 gap-px p-1">
                                {Array.from({ length: 64 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`${
                                            Math.random() > 0.5 ? 'bg-white' : 'bg-black'
                                        } w-full h-full rounded-sm`}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                            Open any UPI app to scan and pay
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-gray-300 dark:bg-gray-600 mx-4"></div>

                    {/* UPI Apps & Manual Entry Section */}
                    <div className="flex-1 flex flex-col pl-6">
                        <h3 className="font-semibold mb-3">Choose UPI App</h3>
                        
                        {/* UPI Apps Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {upiApps.map((app) => (
                                <button
                                    key={app.name}
                                    onClick={() => setSelectedUPIApp(app.name)}
                                    className={`p-1.5 rounded-xl border-2 transition-all duration-200 ${
                                        selectedUPIApp === app.name
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
                                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                                    }`}
                                >
                                    <div
                                        className="w-9 h-9 bg-gradient-to-r mx-auto mb-2"
                                        style={{
                                            backgroundImage: `url(${app.logo})`,
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                    ></div>
                                    <span className="text-xs font-medium">{app.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* UPI ID Input */}
                        <div className="mb-6">
                            <label className="text-sm font-semibold mb-2 block">
                                Enter UPI ID
                                {upiError && (
                                    <span className="ml-2 text-xs text-red-500 font-normal">{upiError}</span>
                                )}
                            </label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    ref={upiIdRef}
                                    placeholder="yourupi@okicicibank"
                                    pattern="^[a-z0-9.\-]+@[a-z0-9]+$"
                                    title="Enter a valid UPI ID (lowercase letters, numbers, dot, dash, @, e.g. varunprajapati123-1@okhdfc)"
                                    className="w-full px-1 py-1.5 bg-transparent  rounded-lg 
                                             text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                                             focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                    autoComplete="off"
                                    onChange={() => setUpiError('')}
                                />
                                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-white scale-x-0 group-focus-within:scale-x-100 origin-left transition-transform duration-300"></span>
                            </div>
                        </div>

                        {/* Verify & Pay Button */}
                        <button
                            type="button"
                            onClick={() => {
                                const upiId = upiIdRef.current?.value.trim() || '';
                                if (upiId) {
                                    upiRegex.test(upiId) ? onPay(amount, "UPIid") : setUpiError('Enter a valid UPI ID.');
                                } else if(selectedUPIApp) {
                                    onPay(amount, selectedUPIApp);
                                } else {
                                    setUpiError('Enter a valid UPI ID or select a UPI app.');
                                    return
                                }
                            }}
                            className="w-full py-2 text-lg font-semibold rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 text-white 
                                     shadow-lg shadow-indigo-200/30 dark:shadow-indigo-800/30 border-none outline-none 
                                     transition-all duration-200 hover:from-indigo-600 hover:to-emerald-500 hover:scale-105 
                                     focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
                        >
                            <span className="inline-flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                </svg>
                                Verify & Pay
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UPICard;