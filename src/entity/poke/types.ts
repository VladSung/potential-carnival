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
export type Sprite = {
        front_default: string
        front_shiny: string
        front_shiny_female: string
        front_female: string
        back_default: string
        back_shiny: string
        back_shiny_female: string
        back_female: string
        other: {
            dream_world: {
                front_default: string
            }
            'official-artwork': {
                front_default: string
                front_shiny: string
            }
        }
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
    sprites: Partial<Sprite>
    types: Type[];
    abilities: Ability[]
}

// 20240515092924
// https://pokeapi.co/api/v2/pokemon/bulbasaur


export type PokeList = Pokemon[]
