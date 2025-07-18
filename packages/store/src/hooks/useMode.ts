import { useAtom } from "jotai";
import { useEffect } from "react";
import { themeSyncAtom } from "../atoms/mode";

export const useMode = () => {
    const [isDarkMode, setIsDarkMode] = useAtom(themeSyncAtom);
    
    // Ensure DOM is synchronized on mount and when mode changes
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        // Apply theme immediately
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);
    
    // Listen for system theme changes
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
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
        const newValue = !isDarkMode;
        setIsDarkMode(newValue);
    };
    
    const setLightMode = () => {
        setIsDarkMode(false);
    };
    
    const setDarkMode = () => {
        setIsDarkMode(true);
    };
    
    const setSystemMode = () => {
        if (typeof window === 'undefined') return;
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
