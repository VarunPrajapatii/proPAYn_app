import BackgroundGradientAnimation from "./BackgroundGradientAnimation";
import GetStartedButton from "./GetStartedButton";

const Title1 = () => {
    return (
        <BackgroundGradientAnimation size="100%">
            <div className="scroll-smooth relative z-10 h-screen w-screen flex flex-col items-center justify-center px-4 mt-10 sm:mt-0">
                <div className="text-center max-w-7xl mx-auto">
                    {/* Main heading */}
                    <div className="space-y-6 mb-8 font-poppins ">
                        {/* First line */}
                        <div className="flex flex-wrap items-center justify-center gap-3 text-2xl lg:text-5xl md:text-5xl font-semibold leading-tight">
                            <span className="text-slate-800 dark:text-neutral-100">
                                This is proPAYn app, for
                            </span>
                            <span className="pb-1.5 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300">
                                peer-to-peer transfer
                            </span>
                            <span className="text-slate-800 dark:text-neutral-100">
                                &amp;
                            </span>
                        </div>
                        
                        {/* Second line */}
                        <div className="flex flex-wrap items-center justify-center gap-3 text-2xl lg:text-5xl md:text-5xl font-semibold leading-tight">
                            <span className="text-slate-800 dark:text-neutral-100">
                                safely
                            </span>
                            <span className="pb-1.5 font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300">
                                adding Funds
                            </span>
                            <span className="text-slate-800 dark:text-neutral-100">
                                with ease
                            </span>
                        </div>
                    </div>
                    
                    {/* Enhanced subtitle section */}
                    <div className="space-y-4 mb-12">
                        
                        <div className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                            Experience seamless digital payments with built-in wallet, UPI integration, and instant peer-to-peer transfers powered by our in-house payment gateway
                        </div>
                    </div>
                    
                    <div className="flex font-nunito flex-col sm:flex-row items-center justify-center gap-4">
                        <GetStartedButton>Get Started</GetStartedButton>
                        <div className="text-sm text-neutral-400 dark:text-neutral-500">
                            Demo project made by <a href="https://portfolio.varuntd.com" className="font-semibold hover:text-black dark:hover:text-white hover:scale-110 hover:underline text-neutral-500">Varun Prajapati</a> • Banks and all transactions simulated
                        </div>
                    </div>
                </div>
            </div>
        </BackgroundGradientAnimation>
    );
}

export default Title1;