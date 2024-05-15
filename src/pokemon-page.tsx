import { Container, Image, Text, Title, Pill, AppShellMain, Stack, PillGroup, Group, Button, Paper, Popover } from "@mantine/core"
import { Link, useLoaderData, useParams } from "react-router-dom"
import { PokeList } from "./shared/types"
import { ErrorElement } from "./shared/error"
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
import { Info } from "./modal-info"

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

    const poke = (useLoaderData() as PokeList[0])
    console.log(poke)
    if (!id) return <ErrorElement />

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

    return (<AppShellMain>
        <Container pb='xl' mih='calc(100dvh - 80px - 60px)'>
            <Title order={1} tt='capitalize' size='h2'>{poke.name}</Title>
            <Group grow align="flex-start">
                <Stack gap='xs'>
                    <Image miw={128} maw={240} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`} />
                </Stack>
                <Stack>
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
                            <Popover key={t.type.name} width={200} position="bottom" withArrow shadow="md">
                                <Popover.Target>
                                    <Pill tt='capitalize' fw={500} c='orange'>{t.type.name}</Pill>
                                </Popover.Target>
                                <Info url={t.type.url}/>
                            </Popover>
                        ))}
                    </PillGroup>
                    <PillGroup>
                        <Text>Abilities</Text>
                        {poke.abilities.map(({ ability, is_hidden }) => (
                            <Popover key={ability.name} width={200} position="bottom" withArrow shadow="md">
                            <Popover.Target>
                                <Pill tt='capitalize' style={{cursor:'pointer'}} fw={500} c='indigo' key={ability.name}>{ability.name} {is_hidden && '(hidden)'}</Pill>
                            </Popover.Target>
                                <Info url={ability.url}/>
                            </Popover>
                        ))}
                    </PillGroup>

                </Stack>
            </Group>
            <Container size='sm'>
                <Radar data={data} />
            </Container>
        </Container>


        <Paper mah={80} p='md' withBorder style={{ position: 'sticky', bottom: 8, left: 24, right: 24 }}>
            <Button component={Link} to='/'>Back</Button>
        </Paper>
    </AppShellMain>)
}