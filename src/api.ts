// good read: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

// just in case we need to differentiate between prod and dev
export const domain =
  process.env.NODE_ENV === "production"
    ? "https://pokeapi.co/api/v2/"
    : "https://pokeapi.co/api/v2/";

const customFetch = async (
  route: string,
  options: { body?: any; conf?: any; params?: any } = {}
) => {
  const { body, conf } = options;

  const searchQuery = "?" + new URLSearchParams(options.params).toString();

  const response = await fetch(domain + route, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...conf,
    body: body && JSON.stringify(body),
  });

  if (response.status !== 200) {
    const error = await response.text();
    if (process.env.NODE_ENV !== "production") {
      const w = window.open(undefined, "_blank");
      w!.document.write(error);
    }
    return { error };
  }

  return await response.json();
};

export const getPokemons = async (
  offset = 20,
  limit = 20
): Promise<IPokemons> => {
  return await customFetch("pokemon", { params: { offset, limit } });
};

export const getPokemonDetail = async (id: number): Promise<IPokemonDetail> => {
  return await customFetch(`pokemon/${id}`);
};

export const getPokemonSpeciesDetail = async (
  id: number
): Promise<IPokemonSpecies> => {
  return await customFetch(`pokemon-species/${id}`);
};

// types
export interface ULR_NAME {
  name: string;
  url: string;
}

export interface IPokemons {
  count: number;
  next: string;
  previous: string;
  results: ULR_NAME[];
}

export interface IPokemonDetail {
  abilities: {
    ability: ULR_NAME;
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: ULR_NAME[];
  game_indices: {
    game_index: number;
    version: ULR_NAME;
  }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: ULR_NAME;
    version_group_details: {
      level_learned_at: number;
      move_learn_method: ULR_NAME;
      version_group: ULR_NAME;
    }[];
  }[];
  name: string;
  order: number;
  past_types: any[];
  species: ULR_NAME;
  sprites: {
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
    other: {
      dream_world: {
        front_default: string;
        front_female: null;
      };
      home: {
        front_default: string;
        front_female: null;
        front_shiny: string;
        front_shiny_female: null;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
        yellow: {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
      };
      "generation-ii": {
        crystal: {
          back_default: string;
          back_shiny: string;
          back_shiny_transparent: string;
          back_transparent: string;
          front_default: string;
          front_shiny: string;
          front_shiny_transparent: string;
          front_transparent: string;
        };
        gold: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
        silver: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
      };
      "generation-iii": {
        emerald: {
          front_default: string;
          front_shiny: string;
        };
        "firered-leafgreen": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        "ruby-sapphire": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      "generation-iv": {
        "diamond-pearl": {
          back_default: string;
          back_female: null;
          back_shiny: string;
          back_shiny_female: null;
          front_default: string;
          front_female: null;
          front_shiny: string;
          front_shiny_female: null;
        };
        "heartgold-soulsilver": {
          back_default: string;
          back_female: null;
          back_shiny: string;
          back_shiny_female: null;
          front_default: string;
          front_female: null;
          front_shiny: string;
          front_shiny_female: null;
        };
        platinum: {
          back_default: string;
          back_female: null;
          back_shiny: string;
          back_shiny_female: null;
          front_default: string;
          front_female: null;
          front_shiny: string;
          front_shiny_female: null;
        };
      };
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string;
            back_female: null;
            back_shiny: string;
            back_shiny_female: null;
            front_default: string;
            front_female: null;
            front_shiny: string;
            front_shiny_female: null;
          };
          back_default: string;
          back_female: null;
          back_shiny: string;
          back_shiny_female: null;
          front_default: string;
          front_female: null;
          front_shiny: string;
          front_shiny_female: null;
        };
      };
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string;
          front_female: null;
          front_shiny: string;
          front_shiny_female: null;
        };
        "x-y": {
          front_default: string;
          front_female: null;
          front_shiny: string;
          front_shiny_female: null;
        };
      };
      "generation-vii": {
        icons: {
          front_default: string;
          front_female: null;
        };
        "ultra-sun-ultra-moon": {
          front_default: string;
          front_female: null;
          front_shiny: string;
          front_shiny_female: null;
        };
      };
      "generation-viii": {
        icons: {
          front_default: string;
          front_female: null;
        };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: ULR_NAME;
  }[];
  types: {
    slot: number;
    type: ULR_NAME;
  }[];
  weight: number;
}

export interface IPokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: ULR_NAME;
  egg_groups: ULR_NAME[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: string | null;
  flavor_text_entries: {
    flavor_text: string;
    language: ULR_NAME;
    version: ULR_NAME;
  }[];
  form_descriptions: [];
  forms_switchable: false;
  gender_rate: 1;
  genera: {
    genus: string;
    language: ULR_NAME;
  }[];
  generation: ULR_NAME;
  growth_rate: ULR_NAME;
  habitat: ULR_NAME;
  has_gender_differences: false;
  hatch_counter: 20;
  id: 4;
  is_baby: false;
  is_legendary: false;
  is_mythical: false;
  name: string;
  names: {
    language: ULR_NAME;
    name: string;
  }[];
  order: number;
  pal_park_encounters: {
    area: ULR_NAME;
    base_score: number;
    rate: number;
  }[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: ULR_NAME;
  }[];
  shape: ULR_NAME;
  varieties: {
    is_default: boolean;
    pokemon: ULR_NAME;
  }[];
}
