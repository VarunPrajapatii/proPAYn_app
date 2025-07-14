"use client"
import { Provider } from "jotai";

export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider>
            {children}
        </Provider>
    );
};
