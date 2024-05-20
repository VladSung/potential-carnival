import { AppShellMain, Container, Input, SimpleGrid } from '@mantine/core'
import { useLoaderData } from 'react-router-dom'
import { IconSearch } from '@tabler/icons-react'

import { PokeCard, PokeList } from '../entity/poke'
import './styles.css'
import { NavigationBottom } from '../entity/navigation-bottom'
import { useDebouncedState } from '@mantine/hooks'

function PokemonListPage() {
  const pokemons = useLoaderData() as PokeList;
  const [nameFilter, setNameFilter] = useDebouncedState('', 700)


  return (
    <AppShellMain>
      <Container pb='xl' mih='calc(100dvh - 80px - 60px)'>
        <List pokemons={pokemons} nameFilter={nameFilter.length > 3 ? nameFilter : ''} />
      </Container>
      <NavigationBottom>
        <Input variant='filled' placeholder='Enter more than 3 characters' onChange={(e) => (setNameFilter(e.currentTarget.value.toLowerCase()))} onKeyDown={(e) => { e.key === 'Enter' && setNameFilter(e.currentTarget.value.toLowerCase()) }} onBlur={(e) => setNameFilter(e.currentTarget.value.toLowerCase())} style={{ flexGrow: 1 }} leftSection={<IconSearch size={14} />} />
      </NavigationBottom>
    </AppShellMain>
  )
}

const List = (({ pokemons, nameFilter }: { pokemons: PokeList, nameFilter: string }) => {
  const filteredPokemons = ((nameFilter ? pokemons?.filter((p => p.name.toLowerCase().includes(nameFilter))) : pokemons))

  return (
    <SimpleGrid cols={{ base: 2, xs: 4, sm: 6 }}>
      {
        filteredPokemons.map((poke) => {
          return (
            <PokeCard key={poke.name} name={poke.name} />
          )
        })
      }
    </SimpleGrid>
  )
})

export default PokemonListPage
