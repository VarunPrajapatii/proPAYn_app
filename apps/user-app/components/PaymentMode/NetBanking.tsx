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
                <div className="p-6 w-full h-80 text-black dark:text-white  backdrop-blur-xl bg-black/15 dark:bg-white/15 rounded-2xl border-2 border-black/15 dark:border-white/10 shadow-lg flex items-center justify-center ">
                    <div className="mx-20 my-4 relative inline-block text-left" ref={dropdownRef}>
                        <button
                            className="font-nunito py-2 px-8 font-semibold text-xl border border-gray-500 dark:border-gray-400 rounded-2xl focus:border-gray-300 dark:focus:border-gray-600 focus:text-gray-600 dark:focus:text-gray-300 text-center transition-colors duration-300 inline-flex items-center hover:bg-gray-100 dark:hover:bg-zinc-800 hover:border-gray-700 dark:hover:border-gray-300"
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
                            <div className="absolute left-0 mt-2 z-20 w-48 rounded-xl shadow-xl border border-white/20 bg-white/60 dark:bg-zinc-900/70 backdrop-blur-lg ring-1 ring-black/10 dark:ring-white/10 transition-all duration-200">
                                <ul className="py-2 text-base text-gray-800 dark:text-gray-100">
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
                            className='mt-4 rounded-2xl backdrop-blur-xl bg-emerald-500/20 dark:bg-emerald-400/20 border-2 border-emerald-500/30 dark:border-emerald-400/30 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-500/30 dark:hover:bg-emerald-400/30 hover:scale-105 shadow-lg hover:shadow-emerald-500/20'
                            onClick={handleClick}
                            disabled={disabled}
                        >
                            <span className="inline-flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
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