import React from "react";
import {
  getPokemonDetail,
  getPokemonSpeciesDetail,
  IPokemonDetail,
  IPokemonSpecies,
} from "../api";

export default function PokemonDetail(props: any) {
  const { id } = props;

  const [detail, setdetail] = React.useState<IPokemonDetail>();
  const [speciesDetail, setspeciesDetail] = React.useState<IPokemonSpecies>();
  const [flavorText, setflavorText] = React.useState<string>();

  const fetchPokemonDetail = async () => {
    const _detail = await getPokemonDetail(id);

    const _speciesDetail = await getPokemonSpeciesDetail(id);

    setdetail(_detail);
    setspeciesDetail(_speciesDetail);
    const sanitizedEnglishFlavor =
      _speciesDetail?.flavor_text_entries
        ?.find((el) => el.language.name === "en")
        ?.flavor_text.replace("\n", " ")
        .replace("\f", " ") || "No POKéMON information";
    setflavorText(sanitizedEnglishFlavor);
  };

  React.useEffect(() => {
    fetchPokemonDetail();
  }, []);

  return (
    <div className=" md:w-[400px] my-2 flex flex-col md:flex-row justify-around w-full">
      <div>
        <div className="m-1 p-1 border rounded flex flex-col items-center">
          <select className="border rounded outline-none bg">
            {detail?.sprites &&
              getValidPokeImages(detail.sprites).map((el, i) => (
                <option value={el.sprite_url} key={i}>
                  {el.sprite_name}
                </option>
              ))}
          </select>
          <div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span>{flavorText}</span>
        </div>
      </div>
      <TypeList types={detail?.types} />
    </div>
  );
}

// helper components

function TypeList(props: { types: IPokemonDetail["types"] | undefined }) {
  if (!props.types) return null;
  return (
    <div className="my-1">
      {props.types.map((type) => (
        <span
          style={{
            borderColor: TYPE_COLOR[type.type.name], 
          }}
          className="border-2 rounded px-2"
        >
          {type.type.name}
        </span>
      ))}
    </div>
  );
}

// helper functions

const getValidPokeImages = (
  spritesObject: Record<string, string | null | object>
): { sprite_name: string; sprite_url: string }[] => {
  const sprites = spritesObject;
  const sanitizedSprites: Record<string, string>[] = Object.keys(sprites)
    .filter((spriteKey) => typeof sprites[spriteKey] == "string")
    .map<Record<string, string>>((spriteKey) => {
      return {
        sprite_name: spriteKey,
        sprite_url: sprites[spriteKey] as string,
      };
    });
  return sanitizedSprites as { sprite_name: string; sprite_url: string }[];
};

// helper constants

const TYPE_COLOR: Record<string, string> = {
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  unknown: "#68A090",
  shadow: "#ffffff",
};
