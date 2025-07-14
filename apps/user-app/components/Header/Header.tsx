import Image from "next/image";
import HeaderOption from "./HeaderOption";
import { useRouter } from "next/navigation";
import { Providers } from "../../provider";
import { Button } from "../AppbarClient";
import { useMode } from "@propayn/store/useMode";


interface HeaderProps {
    user?: {
        name?: string | null;
    },
    onSignin: any,
    onSignout: any
}

const Header = ({ onSignin, onSignout, user }: HeaderProps) => {

    const router = useRouter();
    const {isDarkMode} = useMode();
    return (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50">
            <Providers>
                <div className="backdrop-blur-xl bg-black/10 dark:bg-white/10 rounded-2xl border-2 border-black/15 dark:border-white/15 shadow-lg px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo Section */}
                        <div className="flex items-center space-x-8">
                            <div className="hover:cursor-pointer transition-transform hover:scale-105">
                                <Image
                                    src={`/${isDarkMode ? "header_Propayn_logo_dark.png" : "header_Propayn_logo.png"}`}
                                    alt="ProPAYn Logo"
                                    width={140}
                                    height={35}
                                    onClick={() => {router.push("/")}}
                                    className="object-contain"
                                />
                            </div>
                            
                            {/* Navigation Links */}
                            {
                                user ? (
                                    <div className="hidden md:flex items-center space-x-2">
                                        <HeaderOption href={"/add-money"} name="Add Money" />
                                        <HeaderOption href={"/pay-person"} name="Send Money" />
                                    </div>
                                ) : (
                                    <div className="hidden md:flex items-center space-x-2">
                                        
                                    </div>
                                )
                            }
                        </div>

                        <Button onClick={user ? onSignout : onSignin}>
                            <span className="text-black dark:text-white">
                                {user ? "Log Out" : "Log In"}
                            </span>
                        </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                        <div className="flex justify-center space-x-4">
                            <HeaderOption href={"/add-money"} name="Add Money" />
                            <HeaderOption href={"/pay-person"} name="Send Money" />
                        </div>
                    </div>
                </div>
            </Providers>
        </div>
    );
}

export default Header;