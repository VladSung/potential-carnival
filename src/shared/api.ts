import { Pokemon } from "./types";

export const PokeImageUrl = "https://img.pokemondb.net/artwork/";

export const baseUrl = 'https://pokeapi.co/api/v2/'

export const getPokeInfo: (name?: string) => Promise<Pokemon | undefined> = async (name) => {
    const info = await (await fetch(baseUrl +'pokemon/'+ name)).json()
    return info as unknown as Pokemon
}

export const getPokeList: () => Promise<{results: {id:number,name:string, url:string}[]}> = async () => {
    const resp:{results :{name:string, url:string}[]} = (await (await fetch(baseUrl + 'pokemon/?limit=100000&offset=0')).json())
    
    return {results: resp.results.map((p, index)=>({...p, id: index+1 > 1000 ? (index+1)*10: index+1}))}
}