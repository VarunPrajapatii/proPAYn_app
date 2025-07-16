import Button from "@propayn/ui/button";
import { useRouter } from "next/navigation";

const CreditCard = ({amount, onPay}: {amount: number, onPay: (amount: number, provider: string)=> Promise<string | { message: string }>}) => {
    const router = useRouter();

    const handleClick = async () => {
        const response = await onPay(amount, "CreditCard");
        if (typeof response === "string") {
            router.push(response);
        } else {
            alert(`Payment initiation failed. Please try again: ${response.message}`);
            console.error(response.message);
        }
    }

    return (
        <div>
            <div className="p-6 w-full max-w-2xl h-80 backdrop-blur-xl bg-black/25 dark:bg-white/15 rounded-2xl border-2 border-black/15 dark:border-white/10 shadow-lg shadow-black/20">
                {/* Logo */}
                <div className="">
                    <div className="grid grid-cols-2 w-12">
                        <div className="w-6 h-6 bg-black/60 dark:bg-white/70 rounded-full "></div>
                        <div className="w-6 h-6 bg-black/60 dark:bg-white/70 rounded-full "></div>
                        <div className="w-6 h-6 bg-black/60 dark:bg-white/70 rounded-full "></div>
                        <div className="w-6 h-6 bg-black/60 dark:bg-white/70 rounded-full "></div>
                    </div>
                </div>

                {/* Card Number */}
                <div className=" mt-8 w-full h-20  ">
                    <div className="font-nunito text-sm font-semibold h-[20%]">Card Number</div>
                    <div className="h-[80%] pt-2 text-4xl relative group">
                        <input
                            type="text"
                            maxLength={19}
                            className="font-jetbrains w-[80%] bg-transparent text-black placeholder-black/40 dark:text-white dark:placeholder-white/40 outline-none border-none transition-all duration-300"
                            placeholder="1234 1234 1234 1234"
                            onInput={e => {
                                const input = e.currentTarget;
                                let value = input.value.replace(/\D/g, '').slice(0, 16);
                                value = value.replace(/(.{4})/g, '$1 ').trim();
                                input.value = value;
                            }}
                        />
                        <span
                            className="
                                absolute left-0 bottom-0 h-[2px] w-[80%] bg-black dark:bg-white
                                scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100
                                origin-left  transition-transform duration-300
                                pointer-events-none
                            "
                        />
                    </div>
                </div>

                {/* Card Holder Details*/}
                <div className="w-full h-10 mt-8 grid grid-cols-12 ">
                    {/* Card Holder Name */}
                    <div className="col-span-6 ">
                        <div className="font-nunito text-sm font-semibold h-[20%]">Card Holder</div>
                        <div className="h-[80%] pt-1.5 text-2xl relative group">
                            <input
                                type="text"
                                className="font-jetbrains w-[90%] bg-transparent text-black placeholder-black/40 dark:text-white dark:placeholder-white/40 outline-none border-none transition-all duration-300 border-black"
                                placeholder="VARUN KUMAR"
                                onInput={e => {
                                    const input = e.currentTarget;
                                    const value = input.value.replace(/[^a-zA-Z ]/g, '').toUpperCase();
                                    input.value = value;
                                }}
                            />
                            <span
                                className="
                                absolute left-0 bottom-0 h-[2px] w-[90%] bg-black dark:bg-white
                                scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100
                                origin-left  transition-transform duration-300
                                pointer-events-none
                                "
                            />
                        </div>
                    </div>
                    {/* Card Expiry Date */}
                    <div className="col-span-3 ">
                        <div className="font-nunito text-sm font-semibold h-[20%]">Exp. Date</div>
                        <div className="h-[80%] pt-1.5 text-2xl relative group">
                            <input
                                type="text"
                                maxLength={5}
                                className="font-jetbrains w-[80%] bg-transparent text-black placeholder-black/40 dark:text-white dark:placeholder-white/40 outline-none border-none transition-all duration-300"
                                placeholder="05/24"
                                onInput={e => {
                                    let value = e.currentTarget.value.replace(/\D/g, '');
                                    let month = value.slice(0, 2);
                                    let year = value.slice(2, 4);

                                    // Restrict month to 01-12
                                    if (month.length === 2) {
                                        let m = parseInt(month, 10);
                                        if (m < 1) m = 1;
                                        if (m > 12) m = 12;
                                        month = m.toString().padStart(2, '0');
                                    }

                                    // Restrict year to >24
                                    if (year.length === 2) {
                                        let y = parseInt(year, 10);
                                        if (y <= 24) y = 25;
                                        year = y.toString().padStart(2, '0');
                                    }

                                    let formatted = month;
                                    if (value.length > 2) {
                                        formatted += '/' + year;
                                    }
                                    e.currentTarget.value = formatted.slice(0, 5);
                                }}
                            />
                            <span
                                className="
                                absolute left-0 bottom-0 h-[2px] w-[60%] bg-black dark:bg-white
                                scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100
                                origin-left  transition-transform duration-300
                                pointer-events-none
                                "
                            />
                        </div>
                    </div>
                    {/* Card CVV */}
                    <div className="col-span-3 ">
                        <div className="font-nunito text-sm font-semibold h-[20%]">CVV</div>
                        <div className="h-[80%] pt-1.5 text-2xl relative group">
                            <input
                                type="text"
                                maxLength={3}
                                className="font-jetbrains w-full bg-transparent text-black placeholder-black/40 dark:text-white dark:placeholder-white/40 outline-none border-none transition-all duration-300"
                                placeholder="000"
                                onInput={e => {
                                    const input = e.currentTarget;
                                    input.value = input.value.replace(/\D/g, '').slice(0, 3);
                                }}
                            />
                            <span
                                className="
                                absolute left-0 bottom-0 h-[2px] w-[40%] bg-black dark:bg-white
                                scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100
                                origin-left  transition-transform duration-300
                                pointer-events-none
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Button 
                    className='mt-4 rounded-2xl backdrop-blur-xl bg-emerald-500/20 dark:bg-emerald-400/20 border-2 border-emerald-500/30 dark:border-emerald-400/30 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-500/30 dark:hover:bg-emerald-400/30 hover:scale-105 shadow-lg hover:shadow-emerald-500/20'
                    onClick={handleClick}
                >
                    <span className="inline-flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                        Verify & Pay
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default CreditCard