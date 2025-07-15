"use client";

import React from 'react'
import Button from "@propayn/ui/button";
import { useRouter } from 'next/navigation';

const GetStartedButton = ({children}: {children: React.ReactNode}) => {
    const router = useRouter();
  return (
    <Button
        className="rounded-full bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-800 dark:via-blue-900 dark:to-purple-900 text-slate-900 dark:text-white hover:from-slate-100 hover:via-blue-100 hover:to-indigo-200 dark:hover:from-slate-700 dark:hover:via-blue-800 dark:hover:to-purple-800 hover:scale-105 shadow-lg border-2 border-slate-200 dark:border-slate-700" 
        onClick={() => {router.push('/auth/signin')}}
        >
        {children}
    </Button>
  )
}

export default GetStartedButton
