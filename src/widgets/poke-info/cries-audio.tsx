import { ActionIcon } from "@mantine/core"
import { Pokemon } from "../../entity/poke"

import { useRef } from "react";
import { IconVolume } from "@tabler/icons-react";

type LatestCryProps = { cries?: Pokemon['cries'] }

export const CriesAudio = ({ cries }: LatestCryProps) => {

    if (!cries) return <></>

    const audioElement = useRef(null)

    const audioPlayHandler = () => {
        if (audioElement.current) {
            const audioPlayer = audioElement.current as HTMLAudioElement
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        }

    }

    return (
        <>
            <ActionIcon size='md' onClick={audioPlayHandler}><IconVolume size={14} /></ActionIcon>
            <audio ref={audioElement} src={cries.latest} />
        </>
    )
}