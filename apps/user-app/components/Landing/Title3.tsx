import Image from "next/image";

const Title3 = () => {
    return (
        <div className="flex justify-between bg-gradient-to-b from-slate-50 to-slate-100 dark:from-black dark:to-gray-900 pt-20 pb-10">
            <div className="pl-20 flex items-center">
                <Image
                    src={"/images/title3.png"}
                    height={600}
                    width={600}
                    alt="title1"
                    className="rounded-3xl shadow-xl"
                />
            </div>
            <div className="pt-40 h-screen max-w-3xl flex flex-col justify-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 leading-tight pb-1.5">
                    Pay Friends
                </div>
                <div className="font-semibold text-lg md:text-2xl text-slate-600 dark:text-slate-300 pt-6 leading-relaxed">
                    ProPAYn helps settling up feel more like catching up.<br />
                    Send and receive money with ProPAYn friends to split <br />
                    everyday necessities, bills, and shared activities like takeout or travel.
                </div>
                <div className="mt-8 text-3xl md:text-4xl font-bold text-slate-800 dark:text-neutral-100">
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
    );
}


export default Title3;