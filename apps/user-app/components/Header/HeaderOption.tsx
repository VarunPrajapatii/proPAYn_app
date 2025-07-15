"use client";
import { useRouter } from "next/navigation";

const HeaderOption = ({ name, href }: { name: string; href: string }) => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(href)}
            className="px-4 py-2  dark:text-white rounded-xl font-semibold text-sm 
                    hover:text-black dark:hover:text-white  
                    transition-all duration-200 border border-transparent 
                    hover:border-black/20 dark:hover:border-white/20 backdrop-blur-sm
                    bg-black/20 dark:bg-white/20  dark:border-white/30 text-slate-900 hover:bg-black/30 dark:hover:bg-white/30 hover:scale-105 shadow-lg"
        >
            {name}
        </button>
    );
};

export default HeaderOption;
