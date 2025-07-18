'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMode } from "@propayn/store/useMode";
import { signOut, useSession } from "next-auth/react";
import HeaderOption from "./HeaderOption";
import Button from "@propayn/ui/button";
import ModeToggle from "./ModeToggle";

const Header = () => {
  const { data: session, status } = useSession()
  const router = useRouter();
  const { isDarkMode } = useMode();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    })
  }

  const handleSignIn = () => {
    router.push('/auth/signin')
  }

  // console.log("session log from header: ", session, status)

  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="backdrop-blur-xl bg-black/10 dark:bg-white/10 rounded-2xl border-2 border-black/15 dark:border-white/15 shadow-lg px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="hover:cursor-pointer transition-transform hover:scale-105">
              <Image
                src={`/${isDarkMode ? "header_Propayn_logo_dark.png" : "header_Propayn_logo.png"}`}
                alt="ProPAYn Logo"
                width={100}
                height={25}
                onClick={() => { router.push("/") }}
                className="object-contain md:w-[140px] md:h-[35px]"
              />
            </div>

            {/* Navigation Links */}
            {
              session && (
                <div className="hidden md:flex items-center space-x-2">
                  <HeaderOption href={"/add-money"} name="Add Money" />
                  <HeaderOption href={"/pay-person"} name="Send Money" />
                </div>
              )
            }
          </div>
          

          {/* Right side - Mode toggle and Auth button */}
          <div className="flex items-center space-x-3">
            {/* Mode Toggle Button */}
            <ModeToggle />
            
            <Button 
              className="!py-1.5 !sm:py-1 !lg:py-1.5 !px-3 !sm:px-2 !lg:px-4 !text-sm !sm:text-xs !lg:text-sm rounded-full bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-800 dark:via-blue-900 dark:to-purple-900 text-slate-900 dark:text-white hover:from-slate-100 hover:via-blue-100 hover:to-indigo-200 dark:hover:from-slate-700 dark:hover:via-blue-800 dark:hover:to-purple-800 hover:scale-105 shadow-lg border-2 border-slate-200 dark:border-slate-700" 
              onClick={status === 'authenticated' ? handleSignOut : handleSignIn}
            >
              <span className="text-black dark:text-white">
                {status === 'authenticated' ? "Log Out" : "Log In"}
              </span>
            </Button>
          </div>
        </div>

        {session && (
          <div className="md:hidden mt-3 pt-3 border-t border-black/10 dark:border-white/10">
            <div className="flex justify-center space-x-6">
              <div className="text-sm">
                <HeaderOption href={"/add-money"} name="Add Money" />
              </div>
              <div className="text-sm">
                <HeaderOption href={"/pay-person"} name="Send Money" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

