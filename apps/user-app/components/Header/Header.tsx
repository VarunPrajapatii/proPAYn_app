import Image from "next/image";
import HeaderOption from "./HeaderOption";

const Header = () => {
    return (
        <div className="flex bg-customWhite justify-between " >
            <div className="flex pl-20">
                <Image
                src="/images/header_Propayn_logo.png" // Update the path to match where your image is stored
                alt="Description of the image"
                width={200} // Specify the width of the image
                height={20} // Specify the height of the image
                />
                <div className=" pl-20 pt-6">
                    <HeaderOption name="Add Money" />
                    <HeaderOption name="Send Money" />
                </div>
            </div>
            <div className="pr-56 pt-3">
                <button className="bg-customBlue-dark p-4 rounded-full text-white font-bold hover:bg-customBlue-mid">Log Out</button>
            </div>
        </div>
    )
}

export default Header;