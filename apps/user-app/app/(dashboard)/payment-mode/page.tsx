"use client";
import { useSearchParams } from "next/navigation"
import { createOnRampTransaction } from "../../lib/actions/createOnRamptxn";

export default function PaymentMode() {
    const searchParams = useSearchParams();
    
    const amount = Number(searchParams.get("amount"));

    return (
        <div className="flex items-center justify-center pt-10">
            <div className="relative bg-slate-100 p-10 px-44 pb-56 rounded-lg shadow-lg overflow-hidden">
                {/* Background blur pseudo-element */}
                <div className="absolute inset-0 bg-[url('/images/pay-page2.avif')] bg-cover bg-center filter opacity-40 blur-sm z-0"></div>
                
                {/* Content */}
                <div className="relative z-10">
                    <div className="pb-10  text-xl">
                        Total payment to be made: <span className="font-bold">Rs. 500</span>
                    </div>
                    <div className="flex justify-between pt-10">
                        <div className="ml-10 mr-20 pr-5 border-r-2 border-customBlue-light">
                            <div className="p-3 text-lg">Saved Details</div>
                            <div className="p-3 text-lg">Debit Card</div>
                            <div className="p-3 text-lg">Credit Card</div>
                            <div className="font-bold text-customBlue-dark text-xl p-3">
                                Net Banking
                            </div>
                            <div className="p-3 text-lg">UPI</div>
                            <div className="p-3 text-lg">IMPS</div>
                        </div>
                        <div className="p-7 mr-20 px-40">
                            <div className="border-2 rounded-lg border-customBlue-light bg-gray-100 p-8">
                                <div className="py-2 text-lg font-semibold mb-2">
                                    Select Bank:
                                </div>
                                <select className="border border-black p-2 rounded w-full" name="Select bank">
                                    <option value="SBI">SBI</option>
                                    <option value="CBI">CBI</option>
                                    <option value="HDFC">HDFC</option>
                                    <option value="AXIS">AXIS</option>
                                </select>
                            </div>
                            <div className="pt-10">
                                <button 
                                    className="bg-customBlue-dark text-white rounded-md px-64 py-3 hover:bg-customBlue-mid"
                                    onClick={async () => {
                                        await createOnRampTransaction(amount * 100, "HDFC Bank");
                                        console.log(amount);
                                        
                                        // window.location.href = "https://netbanking.hdfcbank.com";
                                    }}
                                >Proceed Securely</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
