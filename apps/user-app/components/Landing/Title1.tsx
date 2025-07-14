import BackgroundGradientAnimation from "./BackgroundGradientAnimation";

const Title1 = () => {
    return (
        <BackgroundGradientAnimation size="100%">
            <div className="relative z-10 h-screen w-screen flex flex-col items-center justify-center px-4">
                <div className="text-center max-w-6xl mx-auto">
                    {/* Main heading */}
                    <div className="space-y-4">
                        {/* First line */}
                        <div className="flex flex-wrap items-center justify-center gap-2 text-xl lg:text-5xl md:text-4xl font-bold">
                            <span className="text-slate-800 dark:text-neutral-100">
                                This is proPAYn app, for
                            </span>
                            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300">
                                peer-to-peer transfer
                            </span>
                            <span className="text-slate-800 dark:text-neutral-100">
                                &amp;
                            </span>
                        </div>
                        
                        {/* Second line */}
                        <div className="flex flex-wrap items-center justify-center gap-2 text-xl lg:text-5xl md:text-4xl font-bold">
                            <span className="text-slate-800 dark:text-neutral-100 pb-1.5">
                                safely
                            </span>
                            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 pb-1.5">
                                adding Funds
                            </span>
                            <span className="text-slate-800 dark:text-neutral-100 pb-1.5">
                                with ease
                            </span>
                        </div>
                    </div>
                    
                    {/* Optional subtitle */}
                    <div className="mt-8 text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-medium">
                        India's Most-loved Payments App
                    </div>
                    <div className="mt-10">
                        <button className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-cyan-500 dark:via-blue-500 dark:to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </BackgroundGradientAnimation>
    );
}

export default Title1;

