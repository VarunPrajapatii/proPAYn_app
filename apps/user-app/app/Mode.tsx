"use client"
import { useMode } from "@propayn/store/useMode";
import { useEffect, useState } from "react";

const Mode = ({ children }: { children: React.ReactNode }) => {
    const { isDarkMode } = useMode();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return children without theme class during SSR to prevent hydration mismatch
        return <div>{children}</div>;
    }

    return (
        <div className={isDarkMode ? "dark" : ""}>
            {children}
        </div>
    );
};

export default Mode;