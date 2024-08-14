"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

// interface ComponentProps {
//     name: string;
// }
// interface ButtonProps {
//     onClick: () => void;
//   }

const HeaderOption = ({name, href}: {name: string, href: string}) => {
    const router = useRouter();

    return (
        <button onClick={() => router.push(href)} className="px-4 py-1  hover:bg-customBlue-light hover:text-white font-bold rounded-full">
            {name}
        </button>
    );
}

export default HeaderOption;