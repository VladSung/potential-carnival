import { Card, Flex, Image, Text } from "@mantine/core"
import { Link } from "react-router-dom"
import { PokeImageUrl } from "../../shared/api"
import { Pokemon } from "./types"

type PokeCardProps = Pick<Pokemon, 'name'>

export const PokeCard = ({name}:PokeCardProps) => {

    return (
        <Card component={Link} className='mantine-active' to={`/${name}`} withBorder>
            <Flex align='center' style={{ flexGrow: 1 }}>
                <Image mb='sm' radius='md' style={{ objectFit: 'cover' }} mx='auto' maw='100%' w='max-content' mah={108} src={`${PokeImageUrl}/${name}.jpg`} loading='lazy' />
            </Flex>
            <Text ta='center'>{name}</Text>
        </Card>
    )
}