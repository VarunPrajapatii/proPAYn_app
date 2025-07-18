'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
        <h1 className="font-poppins text-6xl font-bold text-red-600 mb-4">500</h1>
        <h2 className="font-poppins text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Something went wrong!</h2>
        <p className="font-nunito text-gray-600 dark:text-gray-400 mb-8">
          An error occurred while processing your request. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-nunito font-medium hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
          <a 
            href="/"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-nunito font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  )
}
