import './App.css'
import { AppShellMain, Card, Container, Group, Image, Input, Paper, SimpleGrid, Text } from '@mantine/core'
import { PokeImageUrl } from './shared/api'
import { Link, useLoaderData } from 'react-router-dom'
import { PokeList } from './shared/types'
import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'

function App() {
  const pokemons = useLoaderData() as PokeList;
  const [nameFilter, setNameFilter] = useState('')

  const filteredPokemons = nameFilter ? pokemons?.filter((p => p.name.toLowerCase().includes(nameFilter))) : pokemons

  return (
    <AppShellMain>
      <Container  pb='xl' mih='calc(100dvh - 80px - 60px)'>
        <SimpleGrid cols={{ base: 2, xs: 4, sm: 6 }}>
          {filteredPokemons.map((poke, index) => {
            return (
              <Card className='mantine-active' to={`/${poke.name}`} key={poke.name} withBorder component={Link}>
                <Card.Section>
                  <Image src={`${PokeImageUrl}/${index + 1}.png`} loading='lazy' />
                </Card.Section>
                <Text ta='center'>{poke.name}</Text>
              </Card>
            )
          })}
        </SimpleGrid>
      </Container>
        <Paper bg='var(--mantine-primary-color-light)' mah={80} withBorder style={{ backdropFilter:'blur(16px)', position: 'sticky', bottom: 8, left: 24, right: 24 }}>
          <Group p='md'>
            <Input placeholder='Filter by name' onKeyDown={(e) => {e.key === 'Enter' && setNameFilter(e.currentTarget.value.toLowerCase())}} onBlur={(e) => setNameFilter(e.currentTarget.value.toLowerCase())} style={{ flexGrow: 1 }} leftSection={<IconSearch size={14} />} />
            {/* <Button onClick={}>Find</Button> */}
          </Group>
        </Paper>
    </AppShellMain>
  )
}

export default App
