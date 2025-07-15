import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./provider";
import Mode from "./Mode";
import { authOptions } from "./lib/auth";
import { getServerSession } from "next-auth";
import Header from "../components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default async function RootLayout({children,}: {children: React.ReactNode}): Promise<JSX.Element> {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <Providers session={session}>
        <body className={inter.className}>
          <Mode>
            <div className={`min-w-screen`}>
              <Header />
              <div className="">
                <div className="w-screen min-h-screen fixed bg-gradient-to-br from-white/90 to-white/95 -z-50 dark:from-zinc-800 dark:to-black"></div>
                <div className="-z-50 absolute h-[240px] w-[650px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {/* circles added with vanilla as motion cant be used as server comp */}
                  <div className="moving-circle absolute h-[400px] w-[400px] rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-slate-500 dark:from-emerald-700 dark:via-emerald-800 dark:to-slate-700 opacity-60 top-[20px] -left-[50px]" />
                  <div className="moving-circle-small absolute h-[300px] w-[300px] rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-slate-500 dark:from-emerald-700 dark:via-emerald-800 dark:to-slate-700 opacity-60 bottom-[40px] -right-[100px]" />
                </div>
              </div>
              {children}
            </div>
          </Mode>
        </body>
      </Providers>
    </html>
  );
}