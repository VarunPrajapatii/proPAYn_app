
const CreditCard = ({amount, onPay}: {amount: number, onPay: (amount: number, provider: string) => void}) => {
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
                    <div className="text-sm font-semibold h-[20%]">Card Number</div>
                    <div className="h-[80%] pt-2 text-4xl relative group">
                        <input
                            type="text"
                            maxLength={19}
                            className="w-[80%] bg-transparent text-black placeholder-black/40 dark:text-white dark:placeholder-white/40 outline-none border-none transition-all duration-300"
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
                        <div className="text-sm font-semibold h-[20%]">Card Holder</div>
                        <div className="h-[80%] pt-1.5 text-2xl relative group">
                            <input
                                type="text"
                                className="w-[90%] bg-transparent text-black placeholder-black/40 dark:text-white dark:placeholder-white/40 outline-none border-none transition-all duration-300 border-black"
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
                        <div className="text-sm font-semibold h-[20%]">Exp. Date</div>
                        <div className="h-[80%] pt-1.5 text-2xl relative group">
                            <input
                                type="text"
                                maxLength={5}
                                className="w-[80%] bg-transparent text-black placeholder-black/40 dark:text-white dark:placeholder-white/40 outline-none border-none transition-all duration-300"
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
                        <div className="text-sm font-semibold h-[20%]">CVV</div>
                        <div className="h-[80%] pt-1.5 text-2xl relative group">
                            <input
                                type="text"
                                maxLength={3}
                                className="w-full bg-transparent text-black placeholder-black/40 dark:text-white dark:placeholder-white/40 outline-none border-none transition-all duration-300"
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
                <button
                    type="button"
                    onClick={() => {
                        onPay(amount, "CreditCard");
                    }}
                    className=" mt-5 px-20 py-2 text-lg font-semibold rounded-2xl bg-gradient-to-r from-gray-500/60 via-green-500/60 to-emerald-400/60 text-white 
                    shadow-lg shadow-indigo-200/30 dark:shadow-indigo-800/30 border-none outline-none 
                    transition-all duration-200 hover:from-indigo-600/60 hover:to-emerald-500/50 hover:scale-105 
                     focus:ring-offset-white dark:focus:ring-offset-zinc-900"
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
    )
}

export default CreditCard