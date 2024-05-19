import { Container, Image, Text, Title, Pill, AppShellMain, Stack, PillGroup, Group, Button, Popover, Box, Paper, SimpleGrid } from "@mantine/core"
import { Link, useParams } from "react-router-dom"

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
import { AbilityInfo } from "./ability"
import { useState } from "react";
import { TypeInfo } from "./poke-type";
import { IconQuestionMark } from "@tabler/icons-react";
import { CriesAudio } from "./cries-audio";
import { NavigationBottom } from "../../entity/navigation-bottom";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { NotFound } from "../../shared/not-found";
import { usePokeInfo } from "../../shared/api";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export const PokemonInfo = () => {
    const params = useParams()

    const TRANSITION_DURATION = 200;

    const [embla, setEmbla] = useState<Embla | null>(null);
    const [opened, setOpen] = useState('')

    useAnimationOffsetEffect(embla, TRANSITION_DURATION);
    const { data: poke, loading } = usePokeInfo(params.id || '')

    if (!poke?.id && !loading) return <NotFound />


    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke?.id}.png`;
    const data = {
        labels: poke?.stats?.map(st => st.stat.name),
        datasets: [{
            label: 'Base stats',
            data: poke?.stats?.map(st => st.base_stat),
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
    };

    return (<AppShellMain>
        {!loading && (
            <>
                <Box h='100dvh' style={{
                    background: `linear-gradient(0deg, color-mix(in srgb, var(--mantine-color-body), transparent 20%),color-mix(in srgb, var(--mantine-color-body), transparent 20%)), url(${imageUrl})`,
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
                    <SimpleGrid cols={{ base: 1, xs: 2 }} spacing='md'>
                        <Stack gap='xs' align='center'>
                            <Image miw={128} maw={240} src={imageUrl} />
                            <Carousel
                                align="start"
                                withIndicators
                                variant='default'
                                height={120}
                                getEmblaApi={setEmbla}
                                maw={240}
                                styles={{
                                    indicator: {
                                        background: 'var(--mantine-color-text)',
                                    }
                                }}
                                withControls={false}
                                slideGap='md'>
                                {poke?.sprites && Object.values(poke?.sprites).map(s => {
                                    if (!s) return null;
                                    if (s && typeof s === 'object') {
                                        return Object.values(s).map(s => {
                                            if (!s.front_default) return null;
                                            return (
                                                <Carousel.Slide key={s.front_default}>
                                                    <Paper h='100%' w={240} withBorder bg='color-mix(in srgb, var(--mantine-color-body) 40%, transparent)'>
                                                        <Image loading="lazy" fit='scale-down' h='100%' src={s.front_default} />
                                                    </Paper>
                                                </Carousel.Slide>
                                            )
                                        })
                                    }
                                    return (
                                        <Carousel.Slide key={s}>
                                            <Paper h='100%' w={240} bg='color-mix(in srgb, var(--mantine-color-body) 40%, transparent)' withBorder>
                                                <Image loading="lazy" fit='contain' h='100%' src={s} />
                                            </Paper>
                                        </Carousel.Slide>
                                    )
                                })}

                            </Carousel>
                        </Stack>
                        <Stack>
                            <Group>
                                <Title order={1} tt='capitalize' size='h4'>{poke?.name}</Title>
                                <CriesAudio cries={poke?.cries} />
                            </Group>
                            <Group gap='xs'>
                                <Text>Base Exp.:</Text>
                                <Text fw={500}>{poke?.base_experience}</Text>
                            </Group>
                            <Group gap='xs'>
                                <Text>Height:</Text>
                                <Text fw={500}>{poke?.height} cm</Text>
                            </Group>
                            <Group gap='xs'>
                                <Text>Weight:</Text>
                                <Text fw={500}>{poke?.weight} lbs</Text>
                            </Group>
                            <PillGroup>
                                <Text>Type</Text>
                                {poke?.types.map(t => (
                                    <Popover key={t.type.name} width={240} position="bottom" withArrow shadow="md" opened={opened === t.type.name}>
                                        <Popover.Target>
                                            <Pill onMouseEnter={() => setOpen(t.type.name)} onMouseLeave={() => setOpen('')} tt='capitalize' style={{ cursor: 'pointer' }} fw={500} c='orange'>{t.type.name} <IconQuestionMark size={12} /></Pill>
                                        </Popover.Target>
                                        <TypeInfo onMouseEnter={() => setOpen(t.type.name)} onMouseLeave={() => setOpen('')} url={t.type.url} />
                                    </Popover>
                                ))}
                            </PillGroup>
                            <PillGroup>
                                <Text>Abilities</Text>
                                {poke?.abilities.map(({ ability, is_hidden }) => (
                                    <Popover opened={opened === ability.name} key={ability.name} width={200} position="bottom" withArrow shadow="md">
                                        <Popover.Target>
                                            <Pill onMouseEnter={() => setOpen(ability.name)} onMouseLeave={() => setOpen('')} tt='capitalize' style={{ cursor: 'pointer' }} fw={500} c='indigo' key={ability.name}>{ability.name} {is_hidden && '(hidden)'}  <IconQuestionMark size={12} /></Pill>
                                        </Popover.Target>
                                        <AbilityInfo onMouseEnter={() => setOpen(ability.name)} onMouseLeave={() => setOpen('')} url={ability.url} />
                                    </Popover>
                                ))}
                            </PillGroup>

                        </Stack>
                    </SimpleGrid>
                    <Container size='xs'>
                        <Radar data={data} />
                    </Container>
                    <NavigationBottom>
                        <Button component={Link} to='/'>Go back to PokeList</Button>
                    </NavigationBottom>
                </Container>

            </>
        )
        }

    </AppShellMain>)
}