// RootStackParamList has to be a `type` and not an `interface` due to how React Navigation sets up the automatic inference
export type RootStackParamList = {
  Home: undefined;
  WebView: { uri: string };
  Pokedex: undefined;
  Pokemon: { name: string };
};

// Type-safes React Navigation entities, such as useNavigation, Link, ref, etc
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

/***********************************
 * API DATA
 ***********************************/

/**
 * @example https://pokeapi.co/api/v2/pokemon/1/
 */
export interface PokemonResponse {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
        back_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: PokemonResponseStatName };
  }[];
  types: {
    slot: number;
    type: { name: string };
  }[];
}

export type PokemonResponseStatName =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed";

export interface Pokemon {
  id: number;
  name: string;
  imageURI: string;
  stats: Stat[];
  types: Type[];
}

type StatName = "HP" | "Attack" | "Defense" | "Sp. Atk" | "Sp. Def" | "Speed";

export interface Stat {
  name: StatName;
  value: number;
  color: string;
  backgroundColor: string;
}

export interface Type {
  name: PokemonType;
  color: PokemonTypeColor;
}

export type PokemonListRow = Pick<Pokemon, "name">;

export type PokemonType =
  | "Normal"
  | "Fire"
  | "Water"
  | "Electric"
  | "Grass"
  | "Ice"
  | "Fighting"
  | "Poison"
  | "Ground"
  | "Flying"
  | "Psychic"
  | "Bug"
  | "Rock"
  | "Ghost"
  | "Dragon"
  | "Dark"
  | "Steel"
  | "Fairy";

/**
 * HELPERS
 */
export enum PokemonTypeColor {
  Normal = "#A8A77A",
  Fire = "#EE8130",
  Water = "#6390F0",
  Electric = "#F7D02C",
  Grass = "#7AC74C",
  Ice = "#96D9D6",
  Fighting = "#C22E28",
  Poison = "#A33EA1",
  Ground = "#E2BF65",
  Flying = "#A98FF3",
  Psychic = "#F95587",
  Bug = "#A6B91A",
  Rock = "#B6A136",
  Ghost = "#735797",
  Dragon = "#6F35FC",
  Dark = "#705746",
  Steel = "#B7B7CE",
  Fairy = "#D685AD",
}

/***********************************
 * WEBVIEW
 ***********************************/

/**
 * WebView internal URLs
 */

export enum WebViewInternalUrls {
  WorkshopUrl = "https://rn-workshop.development.useorigin.com",
}

/**
 * WebView messages
 */

type WebViewMessage<T extends string, D> = {
  code: T;
  data: D;
};

export type CapturePokemonsWebViewMessage = WebViewMessage<
  "capture_pokemons",
  Pokemon[]
>;

export type ReleasePokemonWebViewMessage = WebViewMessage<
  "release_pokemon",
  Pokemon["id"]
>;

export type NavigateToPokemonWebViewMessage = WebViewMessage<
  "navigate_to_pokemon",
  Pokemon["name"]
>;

export type PokemonWebViewMessage =
  | CapturePokemonsWebViewMessage
  | ReleasePokemonWebViewMessage
  | NavigateToPokemonWebViewMessage;
