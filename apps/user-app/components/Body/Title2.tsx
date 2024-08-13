import Image from "next/image";




const Title2 = () => {
    return (
        <div className="flex justify-between">
            <div className="pl-36">
                <Image src={"/images/title2.jpg"} height={800} width={700} alt="title1"/>
            </div>
            <div className=" pr-20 pt-52 h-screen">
                <div className=" font-bold pb-3 text-customBlue-mid text-4xl">
                    Guard your finances with<br/> military-grade encryption<br/>because your peace of mind is priceless.
                </div>
                
                <div className=" pt-10 text-6xl font-bold text-customBlue-dark">
                    Spending it? ProPAYn it!
                </div>
            </div>            
        </div>
    );
}

export default Title2;