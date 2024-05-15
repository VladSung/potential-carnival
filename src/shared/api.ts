import { Pokemon } from "./types";

export const PokeImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export const baseUrl = 'https://pokeapi.co/api/v2/'

export const getPokeInfo: (name?: string) => Promise<Pokemon | undefined> = async (name) => {
    const info = await (await fetch(baseUrl +'pokemon/'+ name)).json()
    return info as unknown as Pokemon
}

export const getPokeList: () => Promise<{results :[{name:string, url:string}]}> = async () => {
    const resp = await (await fetch(baseUrl + 'pokemon/?limit=100000&offset=0')).json()
    return resp as {results :[{name:string, url:string}]}
}