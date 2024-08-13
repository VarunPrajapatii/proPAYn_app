/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";



const Title1 = () => {
    return (
        <div className="flex justify-between">
            <div className=" pl-36 pt-52 h-screen">
                <div className=" font-bold pb-3 text-customBlue-mid text-4xl">
                    The ProPAYn app
                </div>
                <div className=" font-semibold text-2xl text-customBlue-mid pt-2 pb-4">
                    India's Most-loved Payments App.
                </div>
                <div className=" text-6xl font-bold text-customBlue-dark">
                    Spending it? ProPAYn it!
                </div>
            </div>
            <div className="pr-20">
                <Image src={"/images/title1.jpg"} height={600} width={600} alt="title1"/>
            </div>
        </div>
    );
}

export default Title1;