import { useLocalStorage } from "@mantine/hooks";
import { PokeAnimationContext } from "../shared/contexts/animation-disabled-context";
import { Outlet } from "react-router-dom";

export const Root = () => {
    const [animationDisabled, setAnimationDisabled] = useLocalStorage({
        key: 'animationDisabled',
        defaultValue: false
    });
    return (
        <PokeAnimationContext.Provider value={{ animationDisabled, setAnimationDisabled }}>
            <Outlet />
        </PokeAnimationContext.Provider>
    )
}
