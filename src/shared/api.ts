import { Pokemon } from "../entity/poke";
import { useEffect, useState } from 'react';

export const PokeImageUrl = "https://img.pokemondb.net/artwork/";

export const baseUrl = 'https://pokeapi.co/api/v2/'

export const usePokeInfo = (name: string) => {
    const [pokeInfo, setPokeInfo] = useState<Pokemon | undefined | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if(!pokeInfo){
            setLoading(true)
            getPokeInfo(name).then((data)=>{
                setLoading(false)
                setPokeInfo(data)
            })
        }
    }, [pokeInfo?.name])

    if(name === '') return {data: null, loading};
    return {data: pokeInfo, loading}
}
export const getPokeInfo: (name?: string) => Promise<Pokemon | undefined | null> = async (name) => {
    try{
        const info = await (await fetch(baseUrl +'pokemon/'+ name))?.json()
        return info as unknown as Pokemon
    }catch(err){
        console.log(err)
        return null
    }
}

export const getPokeList: () => Promise<{results: {id:number,name:string, url:string}[]}> = async () => {
    const resp:{results :{name:string, url:string}[]} = (await (await fetch(baseUrl + 'pokemon/?limit=100000&offset=0')).json())
    
    return {results: resp.results.map((p, index)=>({...p, id: index+1 > 1000 ? (index+1)*10: index+1}))}
}