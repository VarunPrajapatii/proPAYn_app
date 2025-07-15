"use client"
import { Provider } from "jotai";
import { SessionProvider } from "next-auth/react";

export const Providers = ({children, session}: {children: React.ReactNode, session: any}) => {
    return <Provider>
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    </Provider>
}