"use client";

import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  const BackIcon = () => (
    <svg className="rotate-180" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <path
        d="M10.75 8.75L14.25 12L10.75 15.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );


  return (
    <button
      onClick={() => router.push("/")}
      className={`absolute top-20 lg:top-4 left-4 z-50 no-underline group cursor-pointer transition-all duration-300 transform active:scale-95 text-xs sm:text-sm backdrop-blur-xl bg-black/20 dark:bg-white/20 rounded-2xl border-2 border-black/30 dark:border-white/30 shadow-lg font-semibold text-slate-900 dark:text-white inline-block`}
    >
      <div className={`relative flex space-x-2 items-center z-10 py-1 px-3 sm:py-2 sm:px-4`}>
        <BackIcon />
        <span>Back</span>
      </div>
    </button>
  );
}