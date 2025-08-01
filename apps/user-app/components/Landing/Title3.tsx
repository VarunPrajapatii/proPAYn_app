import Image from "next/image";

const Title3 = () => {
    return (
        <div className="h-[180vh] md:h-[150vh] lg:h-[130vh] flex flex-col lg:flex-row justify-between bg-gradient-to-b from-slate-50 to-slate-100 dark:from-black dark:to-gray-900 pt-20 pb-10">
            {/* Mobile: Content first, then image */}
            <div className="lg:hidden order-1 px-6 pt-8 flex flex-col justify-center">
                <div className="space-y-8">
                    <div className="font-poppins text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 leading-tight">
                        Pay Friends
                    </div>
                    <div className="font-nunito font-semibold text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                        proPAYn helps settling up feel more like catching up.<br />
                        Send and receive money with proPAYn friends to split <br />
                        everyday necessities, bills, and shared activities like takeout or travel.
                    </div>
                    
                    {/* Additional feature cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div className="bg-white/50 dark:bg-black/20 rounded-xl p-4 backdrop-blur-sm">
                            <h4 className="font-poppins font-semibold text-slate-800 dark:text-slate-200 mb-2">Instant Transfers</h4>
                            <p className="font-nunito text-sm text-slate-600 dark:text-slate-400">Send money in seconds with just a phone number</p>
                        </div>
                        <div className="bg-white/50 dark:bg-black/20 rounded-xl p-4 backdrop-blur-sm">
                            <h4 className="font-poppins font-semibold text-slate-800 dark:text-slate-200 mb-2">Split Bills</h4>
                            <p className="font-nunito text-sm text-slate-600 dark:text-slate-400">Divide expenses effortlessly among friends</p>
                        </div>
                    </div>
                    
                    <div className="font-poppins text-3xl md:text-4xl font-bold text-slate-800 dark:text-neutral-100">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400">
                            Split it?
                        </span>
                        <br />
                        <span className="text-slate-800 dark:text-neutral-100">
                            proPAYn it!
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile: Image below content */}
            <div className="lg:hidden order-2 px-6 pt-8 flex justify-center">
                <Image
                    src={"/images/title3.jpg"}
                    height={500}
                    width={500}
                    alt="ProPAYn mobile app interface"
                    className="rounded-3xl h-[60vh] shadow-2xl hover:shadow-3xl transition-shadow brightness-75"
                />
            </div>

            {/* Desktop: Image on left */}
            <div className="hidden lg:flex pl-12 lg:pl-20 items-center">
                <Image
                    src={"/images/title3.jpg"}
                    height={600}
                    width={600}
                    alt="ProPAYn mobile app interface"
                    className="rounded-3xl h-[85vh] lg:h-[90vh] shadow-2xl hover:shadow-3xl transition-shadow brightness-75"
                />
            </div>

            {/* Desktop: Content on right */}
            <div className="hidden lg:flex pl-10 pt-32 lg:pt-40 h-screen max-w-4xl flex-col justify-center pr-8 lg:pr-16">
                <div className="space-y-8">
                    <div className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 leading-tight">
                        Pay Friends
                    </div>
                    <div className="font-nunito font-semibold text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed">
                        proPAYn helps settling up feel more like catching up.<br />
                        Send and receive money with proPAYn friends to split <br />
                        everyday necessities, bills, and shared activities like takeout or travel.
                    </div>
                    
                    {/* Additional feature cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div className="bg-white/50 dark:bg-black/20 rounded-xl p-4 backdrop-blur-sm">
                            <h4 className="font-poppins font-semibold text-slate-800 dark:text-slate-200 mb-2">Instant Transfers</h4>
                            <p className="font-nunito text-sm text-slate-600 dark:text-slate-400">Send money in seconds with just a phone number</p>
                        </div>
                        <div className="bg-white/50 dark:bg-black/20 rounded-xl p-4 backdrop-blur-sm">
                            <h4 className="font-poppins font-semibold text-slate-800 dark:text-slate-200 mb-2">Split Bills</h4>
                            <p className="font-nunito text-sm text-slate-600 dark:text-slate-400">Divide expenses effortlessly among friends</p>
                        </div>
                    </div>
                    
                    <div className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-neutral-100">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400">
                            Split it?
                        </span>
                        <br />
                        <span className="text-slate-800 dark:text-neutral-100">
                            proPAYn it!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Title3;