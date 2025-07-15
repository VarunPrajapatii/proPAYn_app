import { useAtom } from "jotai";
import { useEffect } from "react";
import { modeAtom } from "../atoms/mode";

export const useMode = () => {
    const [isDarkMode, setIsDarkMode] = useAtom(modeAtom);
    
    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (e: MediaQueryListEvent) => {
            // Only update if user hasn't explicitly set a preference
            const stored = localStorage.getItem('theme-mode');
            if (stored === null) {
                setIsDarkMode(e.matches);
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [setIsDarkMode]);
    
    const toggleMode = () => {
        setIsDarkMode(prev => !prev);
    };
    
    const setLightMode = () => {
        setIsDarkMode(false);
    };
    
    const setDarkMode = () => {
        setIsDarkMode(true);
    };
    
    const setSystemMode = () => {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(systemDark);
    };
    
    return {
        isDarkMode,
        isLightMode: !isDarkMode,
        setIsDarkMode,
        toggleMode,
        setLightMode,
        setDarkMode,
        setSystemMode
    };
};
