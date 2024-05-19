import { useDeferredValue, useState } from 'react'
import { AppShellMain, Container, Input, SimpleGrid } from '@mantine/core'
import { useLoaderData } from 'react-router-dom'
import { IconSearch } from '@tabler/icons-react'

import { PokeCard, PokeList } from '../entity/poke'
import './styles.css'
import { NavigationBottom } from '../entity/navigation-bottom'

function PokemonListPage() {
  const pokemons = useLoaderData() as PokeList;
  const [nameFilter, setNameFilter] = useState('')


  const filteredPokemons = useDeferredValue(nameFilter ? pokemons?.filter((p => p.name.toLowerCase().includes(nameFilter))) : pokemons)

  return (
    <AppShellMain>
      <Container pb='xl' mih='calc(100dvh - 80px - 60px)'>
        <SimpleGrid cols={{ base: 2, xs: 4, sm: 6 }}>
          {filteredPokemons.map((poke) => {
            return (
              <PokeCard key={poke.name} name={poke.name} />
            )
          })}
        </SimpleGrid>
      </Container>
      <NavigationBottom>
        <Input variant='filled' placeholder='Filter by name' onChange={(e) => (setNameFilter(e.currentTarget.value.toLowerCase()))} onKeyDown={(e) => { e.key === 'Enter' && setNameFilter(e.currentTarget.value.toLowerCase()) }} onBlur={(e) => setNameFilter(e.currentTarget.value.toLowerCase())} style={{ flexGrow: 1 }} leftSection={<IconSearch size={14} />} />
      </NavigationBottom>
    </AppShellMain>
  )
}

export default PokemonListPage
