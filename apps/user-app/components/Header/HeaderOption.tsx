
interface ComponentProps {
    name: string;
}

const HeaderOption: React.FC<ComponentProps> = ({name}) => {
    return (
        <button className="px-4 py-1  hover:bg-customBlue-light hover:text-white font-bold rounded-full">
            {name}
        </button>
    );
}

export default HeaderOption;