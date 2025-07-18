export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4 p-8 backdrop-blur-xl bg-black/10 dark:bg-white/10 rounded-2xl border-2 border-black/15 dark:border-white/15 shadow-lg">
        <h1 className="font-poppins text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="font-poppins text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Page Not Found</h2>
        <p className="font-nunito text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/"
          className=" px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base lg:px-8 lg:py-4 lg:text-lg !sm:py-1.5 !lg:py-1.5 rounded-full bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-800 dark:via-blue-900 dark:to-purple-900 text-slate-900 dark:text-white hover:from-slate-100 hover:via-blue-100 hover:to-indigo-200 dark:hover:from-slate-700 dark:hover:via-blue-800 dark:hover:to-purple-800 hover:scale-105 shadow-lg border-2 border-slate-200 dark:border-slate-700 font-nunito relative overflow-hidden font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
        >
          Go Back Home
        </a>
      </div>
    </div>
  )
}
