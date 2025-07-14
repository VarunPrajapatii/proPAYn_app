"use client"
import { useMode } from "@propayn/store/useMode";

const Mode = ({ children }: { children: React.ReactNode }) => {
    const { isDarkMode, toggleMode } = useMode();

    return (
        <div className={isDarkMode ? "dark" : ""}>
            <div className="fixed top-4 right-6 z-50">
                <button
                    aria-label="Toggle dark mode"
                    onClick={toggleMode}
                    className="relative w-14 h-8 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-emerald-600 dark:from-zinc-700 dark:via-zinc-900 dark:to-black shadow-lg transition-colors duration-300 outline-none border-2 border-blue-400 dark:border-zinc-700"
                >
                    <span
                        className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-zinc-800 shadow-md transition-transform duration-300 ${
                            isDarkMode ? "translate-x-6" : ""
                        }`}
                    />
                    <span className="absolute left-2 top-2 w-4 h-4 pointer-events-none">
                        {/* Sun SVG */}
                        <svg
                            className={`transition-opacity duration-300 ${isDarkMode ? "opacity-0" : "opacity-100"}`}
                            fill="none"
                            stroke="orange"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="5" stroke="orange" fill="yellow" />
                            <g stroke="orange">
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </g>
                        </svg>
                    </span>
                    <span className="absolute right-2 top-2 w-4 h-4 pointer-events-none">
                        {/* Moon SVG */}
                        <svg
                            className={`transition-opacity duration-300 ${isDarkMode ? "opacity-100" : "opacity-0"}`}
                            fill="none"
                            stroke="white"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                                fill="currentColor"
                                stroke="currentColor"
                            />
                        </svg>
                    </span>
                </button>
            </div>
            {children}
        </div>
    );
};

export default Mode;