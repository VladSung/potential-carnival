export type Stat = {
    "base_stat": number,
    "effort": number,
    "stat": {
        "name": string,
        "url": URL
    }
}

export type Ability = {
    "ability": {
        "name": string,
        "url": string
    },
    "is_hidden": boolean,
    "slot": number
}

export type Type = {
    "slot": number,
    "type": {
        "name": string,
        "url": string
    }
}
export type Pokemon = {
    id: number;
    height: string;
    weight: string;
    name: string;
    base_experience: number;
    cries:{
        latest: string
    };
    stats: Stat[];
    types: Type[];
    abilities: Ability[]
}

// 20240515092924
// https://pokeapi.co/api/v2/pokemon/bulbasaur


export type PokeList = Pokemon[]
