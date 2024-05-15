import { Container, Image, Text, Title, Pill, AppShellMain, Stack, PillGroup, Group, Button, Paper, Popover, Box, ActionIcon } from "@mantine/core"
import { Link, useLoaderData, useParams } from "react-router-dom"
import { PokeList } from "../../shared/types"
import { ErrorElement } from "../../shared/error"
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { AbilityInfo } from "./ability-info"
import {useRef, useState } from "react";
import { TypeInfo } from "./type-info";
import { IconQuestionMark, IconVolume } from "@tabler/icons-react";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export const PokemonPage = () => {
    const { id } = useParams();

    const audioPlayer = useRef(null)

    const poke = (useLoaderData() as PokeList[0])
    if (!id) return <ErrorElement />

    const [opened, setOpen] = useState('')

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`;
    const data = {
        labels: poke.stats?.map(st => st.stat.name),
        datasets: [{
            label: 'Base stats',
            data: poke.stats?.map(st => st.base_stat),
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
    };

    const audioPlayHandler = () => {
        if (audioPlayer.current) {
            const audioElement = audioPlayer.current as HTMLAudioElement
            if (audioElement.paused) {
                audioElement.play();
            } else {
                audioElement.pause();
            }
        }

    }

    return (<AppShellMain>
        <Box h='100dvh' style={{
            background: `linear-gradient(0deg, rgb(245 245 245 / 90%), rgb(255 255 255 / 90%)), url(${imageUrl})`,
            height: '100dvh',
            zIndex: 0,
            top: 0,
            width: '100%',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            filter: 'blur(47px)',
            backgroundSize: 'cover'
        }} pos='absolute' />
        <Container pb='xl' mih='calc(100dvh - 80px - 60px)' style={{ zIndex: 1, position: 'relative' }}>
            <Group grow>
                <Stack gap='xs' align='center'>
                    <Image miw={128} maw={240} src={imageUrl} />
                </Stack>
                <Stack>
                    <Group>
                        <Title order={1} tt='capitalize' size='h4'>{poke.name}</Title>
                        <ActionIcon size='md' onClick={audioPlayHandler}><IconVolume size={14} /></ActionIcon>
                        <audio ref={audioPlayer} src={poke.cries.latest} />
                    </Group>
                    <Group gap='xs'>
                        <Text>Base Exp.:</Text>
                        <Text fw={500}>{poke.base_experience}</Text>
                    </Group>
                    <Group gap='xs'>
                        <Text>Height:</Text>
                        <Text fw={500}>{poke.height} cm</Text>
                    </Group>
                    <Group gap='xs'>
                        <Text>Weight:</Text>
                        <Text fw={500}>{poke.weight} lbs</Text>
                    </Group>
                    <PillGroup>
                        <Text>Type</Text>
                        {poke.types.map(t => (
                            <Popover key={t.type.name} width={240} position="bottom" withArrow shadow="md" opened={opened === t.type.name}>
                                <Popover.Target>
                                    <Pill onMouseEnter={() => setOpen(t.type.name)} onMouseLeave={() => setOpen('')} tt='capitalize' style={{ cursor: 'pointer' }} fw={500} c='orange'>{t.type.name} <IconQuestionMark size={12} /></Pill>
                                </Popover.Target>
                                <TypeInfo url={t.type.url} />
                            </Popover>
                        ))}
                    </PillGroup>
                    <PillGroup>
                        <Text>Abilities</Text>
                        {poke.abilities.map(({ ability, is_hidden }) => (
                            <Popover opened={opened === ability.name} key={ability.name} width={200} position="bottom" withArrow shadow="md">
                                <Popover.Target>
                                    <Pill onMouseEnter={() => setOpen(ability.name)} onMouseLeave={() => setOpen('')} tt='capitalize' style={{ cursor: 'pointer' }} fw={500} c='indigo' key={ability.name}>{ability.name} {is_hidden && '(hidden)'}  <IconQuestionMark size={12} /></Pill>
                                </Popover.Target>
                                <AbilityInfo url={ability.url} />
                            </Popover>
                        ))}
                    </PillGroup>

                </Stack>
            </Group>
            <Container size='xs'>
                <Radar data={data} />
            </Container>
        </Container>


        <Paper mah={80} p='md' withBorder style={{ zIndex: 1, position: 'sticky', bottom: 8, left: 24, right: 24 }}>
            <Button component={Link} to='/'>Back</Button>
        </Paper>
    </AppShellMain>)
}