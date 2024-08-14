import Image from "next/image";

const Title3 = () => {
    return (
        <div className="flex justify-between bg-white pt-44 pb-44">
            <div className=" pl-36 pt-52 h-screen">
                <div className=" text-6xl font-bold text-customBlue-dark">
                    Pay Friends
                </div>
                
                <div className=" font-semibold text-2xl text-customBlue-mid pt-2 pt-4">
                ProPAYn helps settling up feel more like catching up.<br />Send and receive money with Venmo friends to split <br/>everyday necessities, bills, and shared activities like takeout or travel.
                </div>
            </div>
            <div className="pr-20">
                <Image src={"/images/title3.png"} height={600} width={600} alt="title1"/>
            </div>
        </div>
    );
}


export default Title3;