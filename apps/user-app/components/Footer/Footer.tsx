import Image from "next/image";

const Footer = () => {
    return (
        <div className="flex bg-customWhite pl-72">
            <div className="">
                <Image src={"/images/header_Propayn_logo.png"} height={100} width={200} alt="propayn logo" />
            </div>
            <div className="pt-8 pl-48">
            ProPAYn is a project made by Varun. All money transmission is provided by dummy money. © 2024 ProPAYn, Inc.
            </div>
        </div>
    )
}

export default Footer;