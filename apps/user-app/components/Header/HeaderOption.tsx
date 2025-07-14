"use client";
import { useRouter } from "next/navigation";

const HeaderOption = ({name, href}: {name: string, href: string}) => {
    const router = useRouter();

    return (
        <button 
            onClick={() => router.push(href)} 
            className="px-4 py-2 text-black dark:text-white rounded-xl font-semibold text-sm 
                     hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 
                     transition-all duration-200 border border-transparent 
                     hover:border-black/20 dark:hover:border-white/20 backdrop-blur-sm"
        >
            {name}
        </button>
    );
}

export default HeaderOption;