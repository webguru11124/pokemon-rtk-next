export type PokemonType = {
  name: string;
  url: string;
};

export type PokemonTypes = {
  slot: number;
  type: PokemonType;
};

export interface Pokemon {
  url: string;
  name: string;
  image?: any;
  types?: PokemonTypes[];
}

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type PokemonForm = {
  name: string;
  url: string;
};

export type PokemonGameIndices = {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
};

export type PokemonVersionGroupDetails = {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
};

export type PokemonMoves = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: PokemonVersionGroupDetails[];
};

export type PokemonStats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonSpieces = {
  name: string;
  url: string;
};

export type PokemonSprites = {
  back_default: string | null;
  back_female: null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: Record<string, any>;
  versions: Record<string, any>;
};

export interface PokemonDetails {
  abilities: PokemonAbility[];
  base_experience: number;
  forms: PokemonForm[];
  game_indices: PokemonGameIndices[];
  height: number;
  held_items: Array<any>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMoves[];
  name: string;
  order: number;
  past_types: Array<any>;
  species: PokemonSpieces;
  sprites: PokemonSprites;
  stats: PokemonStats[];
  types: PokemonTypes[];
  weight: number;
  bgColor?: string;
}

export type PokemonResponse = Pokemon[];

export type SpiecesEggGroup = {
  name: string;
  url: string;
};

export type SpiecesFlavor = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
};

export type PokemonSpiecesResponse = {
  base_happiness: number;
  capture_rate: number;
  color: {
    name: string;
    url: string;
  };
  egg_groups: SpiecesEggGroup[];
  evolution_chain: string;
  evolves_from_species: {
    name: string;
    url: string;
  };
  flavor_text_entries: SpiecesFlavor[];
};
