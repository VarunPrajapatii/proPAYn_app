import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./provider";
import Mode from "./Mode";
import { authOptions } from "./lib/auth";
import { getServerSession } from "next-auth";
import Header from "../components/Header/Header";
import { poppins, nunito, jetbrains } from "./fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "proPAYn",
  description: "Wallet application to add and transfer funds.",
};

export default async function RootLayout({children,}: {children: React.ReactNode}): Promise<JSX.Element> {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${nunito.variable} ${jetbrains.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme-mode');
                  var isDark = stored === null 
                    ? window.matchMedia('(prefers-color-scheme: dark)').matches 
                    : stored === 'dark';
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // Fallback to light mode if there's an error
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <Providers session={session}>
        <body className={inter.className}>
          <Mode>
            <div className={`min-w-screen relative`}>
              <div className="">
                {/* Background visible on all screen sizes */}
                <div className="w-full h-full lg:w-screen lg:min-h-screen fixed bg-gradient-to-br from-white/90 to-white/95 -z-50 dark:from-zinc-800 dark:to-black"></div>
                <div className="hidden lg:block -z-50 absolute h-[240px] w-[650px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {/* circles added with vanilla as motion cant be used as server comp */}
                  <div className="moving-circle absolute h-[400px] w-[400px] rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-slate-500 dark:from-blue-500/70 dark:via-blue-700/70 dark:to-purple-500 opacity-60 top-[20px] -left-[50px]" />
                  <div className="moving-circle-small absolute h-[300px] w-[300px] rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-slate-500 dark:from-blue-500/50 dark:via-blue-700/50 dark:to-purple-500/60 opacity-60 bottom-[40px] -right-[100px]" />
                </div>
              </div>
              <Header />
              {children}
            </div>
          </Mode>
        </body>
      </Providers>
    </html>
  );
}