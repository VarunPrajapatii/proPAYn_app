import React from 'react'

const FullPageLoader = () => {
  return (
    <div>
        <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
            <div className='flex space-x-2 justify-center items-center'>
                <span className='sr-only'>Loading...</span>
                <div className='h-8 w-8 bg-black dark:bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-8 w-8 bg-black dark:bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-8 w-8 bg-black dark:bg-blue-600 rounded-full animate-bounce'></div>
            </div>
        </div>
    </div>
  )
}

export default FullPageLoader