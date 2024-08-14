"use client";

import Image from "next/image";
import HeaderOption from "./HeaderOption";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Providers } from "../../provider";


const Header = () => {
    const router = useRouter();
    return (
        <div className="flex bg-customWhite justify-between" >
            <Providers>
                <div className="flex pl-20">
                    <Image
                    src="/images/header_Propayn_logo.png" // Update the path to match where your image is stored
                    alt="Description of the image"
                    width={200} // Specify the width of the image
                    height={20} // Specify the height of the image
                    />
                    <div className=" pl-20 pt-6">
                        <HeaderOption href={"/transfer"} name="Add Money" />
                        <HeaderOption href={"/pay-person"} name="Send Money" />
                    </div>
                </div>
                <div className="pr-56 pt-3">
                    <button 
                        className="text-customWhite bg-customBlue-dark p-4 rounded-full font-bold hover:bg-customBlue-mid"
                        onClick={async () => {
                            await signOut()
                            router.push("/api/auth/signin")
                        }}
                    >Log Out</button>
                </div>
            </Providers>
        </div>
    );
}

export default Header;