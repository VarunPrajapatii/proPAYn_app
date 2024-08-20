

export default function OnRampTxnlist({
    transaction    
}: {
    transaction: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }
}) {
    return (
        <div>
            <div className="flex justify-between px-5">
                <div className="flex p-3">
                    <div className="p-4">
                        <div className="">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                shapeRendering="geometricPrecision"
                                textRendering="geometricPrecision"
                                imageRendering="optimizeQuality"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                viewBox="0 0 512 367.79"
                                className="w-16 fill-current text-customBlue-mid" // Example Tailwind CSS classes
                            >
                                <path d="m0 147.04 119.81-84.96 120.43 84.96H0zm398.51-21.34h63.23v-12.24c-3.62-13.39-9.37-22.46-16.83-27.98-7.44-5.51-17.09-7.87-28.4-7.79l-1.18.06H228.66c-6.38 0-11.56-5.18-11.56-11.56 0-6.38 5.18-11.56 11.56-11.56l187.55.04c16.28-.14 30.62 3.57 42.41 12.31 1.07.79 2.1 1.61 3.12 2.47v-6.94c0-10.79-4.45-20.65-11.61-27.81-7.14-7.14-16.98-11.59-27.79-11.59H170.76c-10.85 0-20.71 4.42-27.82 11.54l-.05.04c-2.5 2.5-4.66 5.34-6.42 8.45l-2.23-1.58c-6.06-4.25-13.73-5.62-20.87-3.72A63.05 63.05 0 0 1 126.6 18.4l.05-.05C138.02 7.02 153.63 0 170.76 0h251.58c17.19 0 32.82 7.05 44.13 18.37 11.34 11.33 18.38 26.98 18.38 44.14v63.85c6.6 1.34 12.54 4.63 17.17 9.24l.12.12c6.08 6.13 9.86 14.54 9.86 23.73v75.99c0 9.7-3.96 18.51-10.32 24.87-.56.56-1.14 1.08-1.74 1.55a35.292 35.292 0 0 1-15.09 7.83v35.58c0 17.13-7.07 32.77-18.41 44.11l-.73.66c-11.3 10.96-26.64 17.75-43.37 17.75H170.76c-17.09 0-32.73-7.05-44.09-18.39l-.05-.05c-11.33-11.36-18.37-26.96-18.37-44.08v-2.82h23.11v2.82c0 10.83 4.44 20.68 11.55 27.79l.05.04c7.14 7.14 17 11.58 27.8 11.58h251.58c10.51 0 20.14-4.24 27.23-11.08l.53-.56c7.17-7.17 11.64-17.02 11.64-27.77v-34.63h-63.23c-19.47 0-37.19-7.98-50.04-20.82l-.08-.08c-12.84-12.85-20.82-30.57-20.82-50.05v-3.05c0-19.48 7.98-37.19 20.82-50.04v-.08c12.85-12.84 30.6-20.82 50.12-20.82zm5.86 44.8c7.6 0 14.51 3.1 19.53 8.1l.03.04c5.02 5.03 8.11 11.94 8.11 19.53 0 7.63-3.1 14.56-8.11 19.57l-.62.56c-4.97 4.68-11.63 7.54-18.94 7.54-7.63 0-14.56-3.09-19.57-8.1s-8.11-11.94-8.11-19.57c0-7.61 3.11-14.53 8.13-19.55a27.496 27.496 0 0 1 19.55-8.12zM4.22 261.7h11.32v-6.17h7.87v-74.02H7.33v-17.73h224.94v17.73h-16.05v74.02h7.86v6.17h12.98v15.61H4.22V261.7zm65.73 0v-6.17h7.86v-74.02h-24.8v74.02h7.87v6.17h9.07zm54.42 0v-6.17h7.84v-74.02h-24.8v74.02h7.87v6.17h9.09zm54.4 0v-6.17h7.87v-74.02h-24.83v74.02h7.87v6.17h9.09z" />
                            </svg>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div className="font-extrabold text-lg">
                            Added to ProPAYn account
                        </div>
                        {
                            (transaction.status === "Processing") 
                            ? 
                                (<div className="font-light text-sm">From: {transaction.provider} <span className="font-semibold text-yellow-600">(Processing)</span></div>) 
                            : 
                                ((transaction.status === "Failure")
                                ?
                                    (<div className="font-light text-sm">From: {transaction.provider} <span className="font-semibold text-red-600">(Failure)</span></div>)
                                :
                                    (<div className="font-light text-sm">From: {transaction.provider} <span className="font-semibold text-green-600">(Success)</span></div>)
                                )
                        }
                        
                        <div>
                            {transaction.time.toDateString()}
                        </div>
                    </div>
                </div>
                <div className="px-8 py-10 text-xl  font-bold">
                    + ₹{transaction.amount / 100}
                </div>
            </div>
            <div className="border border-y-gray-400 mx-8">

            </div>
        </div>
    )
}