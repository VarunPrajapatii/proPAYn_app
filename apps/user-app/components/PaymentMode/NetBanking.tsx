import Button from '@propayn/ui/button';
import { useRouter } from 'next/navigation';
import  { useEffect, useState, useRef } from 'react';

const banks = ["SBI", "HDFC", "ICICI", "AXIS"];

const NetBanking = ({amount, onPay}: {amount: number, onPay: (amount: number, provider: string)=> Promise<string | { message: string }>}) => {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [selected, setSelected] = useState<string>("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleClick = async () => {
        const response = await onPay(amount, selected);
        if (typeof response === "string") {
            router.push(response);
        } else {
            alert(`Payment initiation failed. Please try again: ${response.message}`);
            console.error(response.message);
        }
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <>
            <div>
                <div className="p-6 w-full h-80 text-black dark:text-white backdrop-blur-xl bg-black/15 dark:bg-white/15 rounded-2xl border-2 border-black/15 dark:border-white/10 shadow-lg flex items-center justify-center
                                lg:p-6 lg:h-80
                                md:p-4 md:h-64
                                sm:p-4 sm:h-auto sm:min-h-64">
                    <div className="mx-20 my-4 relative inline-block text-left lg:mx-20 md:mx-10 sm:mx-0 sm:w-full" ref={dropdownRef}>
                        <button
                            className="font-nunito py-2 px-8 font-semibold text-xl border border-gray-500 dark:border-gray-400 rounded-2xl focus:border-gray-300 dark:focus:border-gray-600 focus:text-gray-600 dark:focus:text-gray-300 text-center transition-colors duration-300 inline-flex items-center hover:bg-gray-100 dark:hover:bg-zinc-800 hover:border-gray-700 dark:hover:border-gray-300
                                       lg:py-2 lg:px-8 lg:text-xl
                                       md:py-2 md:px-6 md:text-lg
                                       sm:py-3 sm:px-4 sm:text-base sm:w-full sm:justify-center"
                            type="button"
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            {selected || "Select Bank"}
                            <svg className="w-2.5 h-2.5 ml-3" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        {/* Dropdown menu */}
                        {open && (
                            <div className="absolute left-0 mt-2 z-20 w-48 rounded-xl shadow-xl border border-white/20 bg-white/60 dark:bg-zinc-900/70 backdrop-blur-lg ring-1 ring-black/10 dark:ring-white/10 transition-all duration-200
                                            lg:w-48 lg:left-0
                                            md:w-44 md:left-0
                                            sm:w-full sm:left-0">
                                <ul className="py-2 text-base text-gray-800 dark:text-gray-100 lg:text-base md:text-sm sm:text-base">
                                    {banks.map((bank) => (
                                        <li key={bank}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelected(bank);
                                                    setDisabled(false);
                                                    setOpen(false);
                                                }}
                                                className="w-full text-left block px-5 py-2 rounded-lg transition-all duration-150 hover:bg-white/70 hover:backdrop-blur-md hover:font-semibold dark:hover:bg-zinc-800/80 dark:hover:text-indigo-400"
                                            >
                                                {bank}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <br/>
                        <Button 
                            className='mt-4 rounded-2xl backdrop-blur-xl bg-emerald-500/20 dark:bg-emerald-400/20 border-2 border-emerald-500/30 dark:border-emerald-400/30 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-500/30 dark:hover:bg-emerald-400/30 hover:scale-105 shadow-lg hover:shadow-emerald-500/20
                                       lg:mt-4
                                       md:mt-3 md:text-sm md:py-2
                                       sm:mt-4 sm:text-base sm:py-3 sm:w-full'
                            onClick={handleClick}
                            disabled={disabled}
                        >
                            <span className="inline-flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 md:size-4 sm:size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                Proceed Securely
                            </span>
                        </Button>

                    </div>
                </div>
            </div>
        </>
    );
};

export default NetBanking;