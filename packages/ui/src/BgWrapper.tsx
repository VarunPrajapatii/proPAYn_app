import {motion} from "motion/react"
const BgWrapper = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="">
        <div className="w-screen h-screen absolute bg-gradient-to-br from-white/90  to-white/95 -z-50 dark:from-zinc-800 dark:to-black"></div>
        <div className="-z-50 absolute h-[240px] w-[650px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
            className="absolute h-[400px] w-[400px] rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-slate-500 dark:from-emerald-700 dark:via-emerald-800 dark:to-slate-700 opacity-60 top-[20px] -left-[50px]"
            animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
            }}
            transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: 3.5,
            }}
            />
            <motion.div
            className="absolute h-[300px] w-[300px] rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-slate-500 dark:from-emerald-700 dark:via-emerald-800 dark:to-slate-700 opacity-60 bottom-[40px] -right-[100px]"
            animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
            }}
            transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: 2,
            }}
            />
        </div>
        {children}

    </div>
  )
}

export default BgWrapper