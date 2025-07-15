"use client"
import { useMode } from "@propayn/store/useMode";
import { useEffect, useState } from "react";

const Mode = ({ children }: { children: React.ReactNode }) => {
    const { isDarkMode, toggleMode } = useMode();
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
            <div className="fixed top-6 right-6 z-50">
                <button
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                    onClick={toggleMode}
                    className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white/20 dark:border-slate-600/50 backdrop-blur-sm"
                >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-yellow-400 dark:via-orange-500 dark:to-red-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-lg"></div>
                    
                    {/* Inner circle */}
                    <div className="relative w-full h-full rounded-full bg-white dark:bg-slate-800 shadow-inner flex items-center justify-center transition-colors duration-500">
                        
                        {/* Sun Icon */}
                        <div className={`absolute transition-all duration-500 transform ${
                            isDarkMode 
                                ? 'opacity-0 scale-0 rotate-180' 
                                : 'opacity-100 scale-100 rotate-0'
                        }`}>
                            <svg 
                                className="w-6 h-6 text-yellow-500"
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z"/>
                            </svg>
                        </div>
                        
                        {/* Moon Icon */}
                        <div className={`absolute transition-all duration-500 transform ${
                            isDarkMode 
                                ? 'opacity-100 scale-100 rotate-0' 
                                : 'opacity-0 scale-0 -rotate-180'
                        }`}>
                            <svg 
                                className="w-6 h-6 text-slate-300"
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
                            </svg>
                        </div>
                        
                        {/* Floating particles effect */}
                        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                            <div className={`absolute w-1 h-1 bg-yellow-400 rounded-full transition-all duration-1000 ${
                                isDarkMode ? 'opacity-0' : 'opacity-100'
                            }`} 
                            style={{
                                top: '20%',
                                left: '30%',
                                animationDelay: '0s'
                            }}>
                                <div className="w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
                            </div>
                            <div className={`absolute w-1 h-1 bg-blue-400 rounded-full transition-all duration-1000 ${
                                isDarkMode ? 'opacity-100' : 'opacity-0'
                            }`} 
                            style={{
                                top: '70%',
                                right: '25%',
                                animationDelay: '0.5s'
                            }}>
                                <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded whitespace-nowrap">
                            {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        </div>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-black dark:bg-white"></div>
                    </div>
                </button>
            </div>
            {children}
        </div>
    );
};

export default Mode;