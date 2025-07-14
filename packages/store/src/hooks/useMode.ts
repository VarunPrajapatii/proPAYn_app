import { useAtom } from "jotai";
import { modeAtom } from "../atoms/mode";

export const useMode = () => {
    const [isDarkMode, setIsDarkMode] = useAtom(modeAtom);
    
    const toggleMode = () => {
        setIsDarkMode(prev => !prev);
    };
    
    return {
        isDarkMode,
        isLightMode: !isDarkMode,
        setIsDarkMode,
        toggleMode
    };
};
