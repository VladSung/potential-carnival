import { useLocalStorage } from "@mantine/hooks";
import { PokeAnimationContext } from "../shared/contexts/animation-disabled-context";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Paper } from "@mantine/core";

export const Root = () => {
    const [animationDisabled, setAnimationDisabled] = useLocalStorage({
        key: 'animationDisabled',
        defaultValue: false
    });
    const [videoEnded, setVideoEnded] = useState<boolean>(false)
    return (
        <PokeAnimationContext.Provider value={{ animationDisabled, setAnimationDisabled }}>
            {!(animationDisabled || videoEnded) && <Paper radius={0} bg='#000' style={{ position: 'fixed', width: '100%', zIndex: 2, top: 0, bottom: 0, left: 0, right: 0 }}>
                <video onEnded={() => setVideoEnded(true)} style={{ position: 'absolute', zIndex: 1, width: '100%', objectFit: 'cover', top: '50%', transform: 'translateY(-50%)' }}
                    autoPlay muted src='/potential-carnival/preview.webm' />
                <video onEnded={() => setVideoEnded(true)} style={{ position: 'absolute', zIndex: 0, width: '105%', height: '105%', objectFit: 'fill', top: '50%', transform: 'translateY(-50%)', filter: 'blur(256px)' }}
                    autoPlay muted src='/potential-carnival/preview.webm' />
            </Paper>}
            <Outlet />
        </PokeAnimationContext.Provider>
    )
}
