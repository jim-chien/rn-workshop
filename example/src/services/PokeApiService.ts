import { statsColors } from "components/theme";
import { capitalizeFirstLetter } from "helpers";
import {
  Pokemon,
  PokemonListRow,
  PokemonResponse,
  PokemonType,
  PokemonTypeColor,
  Stat,
} from "types";

const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const PAGE_SIZE = 20;

export const PokeAPIService = {
  async getPokemon(name: string): Promise<Pokemon> {
    const response = await api<PokemonResponse>(
      `${API_BASE_URL}/${name.toLocaleLowerCase()}`
    );

    return {
      id: response.id,
      name: capitalizeFirstLetter(response.name),
      imageURI: response.sprites.other["official-artwork"].front_default,
      stats: response.stats.map(parseStatData),
      types: response.types.map((type) => {
        const typeName = capitalizeFirstLetter(type.type.name) as PokemonType;
        return { name: typeName, color: PokemonTypeColor[typeName] };
      }),
    };
  },
  async listPokemon(page = 1): Promise<PokemonListRow[]> {
    const offset = PAGE_SIZE * (page - 1);
    const response = await api<{ results: PokemonListRow[] }>(
      `${API_BASE_URL}?offset=${offset}&limit=${PAGE_SIZE}`
    );
    return response.results;
  },
};

/**
 * Private Functions
 */

async function api<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

function parseStatData(stat: PokemonResponse["stats"][number]): Stat {
  const data: Pick<Stat, "name" | "color" | "backgroundColor"> = (() => {
    switch (stat.stat.name) {
      case "hp":
        return { name: "HP", ...statsColors.hp };
      case "attack":
        return { name: "Attack", ...statsColors.attack };
      case "defense":
        return { name: "Defense", ...statsColors.defense };
      case "special-attack":
        return { name: "Sp. Atk", ...statsColors.specialAttack };
      case "special-defense":
        return { name: "Sp. Def", ...statsColors.specialDefense };
      case "speed":
        return { name: "Speed", ...statsColors.speed };
    }
  })();

  return { ...data, value: stat.base_stat };
}
