import { useLocalStorage } from "@mantine/hooks";
import { PokeAnimationContext } from "../shared/contexts/animation-disabled-context";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Modal } from "@mantine/core";

export const Root = () => {
    const [animationDisabled, setAnimationDisabled] = useLocalStorage({
        key: 'animationDisabled',
        defaultValue: false
    });
    const [videoEnded, setVideoEnded] = useState<boolean>(false)

    const handleVideoEnded = () => {
        setVideoEnded(true)
    }


    return (
        <PokeAnimationContext.Provider value={{ animationDisabled, setAnimationDisabled }}>
            {!(animationDisabled || videoEnded) && <Modal
                fullScreen opened={!videoEnded && !animationDisabled}
                onClose={handleVideoEnded} radius={0} bg='#000'
                styles={{
                    root: { zIndex: 9 },
                    body: {
                        display: 'flex',
                        alignItems: 'center',
                        height: 'calc(100% - 60px)',
                        position: 'relative',
                        overflow: 'hidden'
                    }
                }}
            >
                <video onError={handleVideoEnded} onEnded={handleVideoEnded} style={{ maxWidth: '100%', zIndex: 1, width: '100%', objectFit: 'cover' }}
                    autoPlay muted src='/potential-carnival/preview.webm' />
                <video onEnded={handleVideoEnded} style={{ position: 'absolute', zIndex: 0, width: '105%', height: '105%', objectFit: 'fill', top: '50%', transform: 'translateY(-50%)', filter: 'blur(256px)' }}
                    autoPlay muted src='/potential-carnival/preview.webm' />
            </Modal>}
            <Outlet />
        </PokeAnimationContext.Provider>
    )
}
