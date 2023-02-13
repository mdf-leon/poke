import React from "react";
import {
  getPokemonDetail,
  getPokemonSpeciesDetail,
  IPokemonDetail,
  IPokemonSpecies,
} from "../api";

export default function PokemonDetail(props: { id: number }) {
  const { id } = props;

  const [detail, setdetail] = React.useState<IPokemonDetail>();
  const [speciesDetail, setspeciesDetail] = React.useState<IPokemonSpecies>();
  const [flavorText, setflavorText] = React.useState<string>();

  const fetchPokemonDetail = async () => {
    const _detail = await getPokemonDetail(id);

    const _speciesDetail = await getPokemonSpeciesDetail(id);

    const sanitizedEnglishFlavor =
      _speciesDetail?.flavor_text_entries
        ?.find((el) => el.language.name === "en")
        ?.flavor_text.replace("\n", " ")
        .replace("\f", " ") || "No POKéMON information";
    setflavorText(sanitizedEnglishFlavor);
    setdetail(_detail);
    setspeciesDetail(_speciesDetail);
    console.log(_speciesDetail);
  };

  React.useEffect(() => {
    fetchPokemonDetail();
  }, []);

  return (
    <div className="p-2 cmd:w-[400px] my-2 flex flex-col md:flex-row justify-around w-full">
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
        <div className="flex justify-center">
          {speciesDetail?.names && (
            <RandomText
              source={speciesDetail?.names}
              sourcekey="name"
              className="self-center flex text-center"
            />
          )}
        </div>
        <div className="md:w-[200px] flex flex-col">
          <span>{flavorText}</span>
        </div>
      </div>
      <TypeList types={detail?.types} />
      <div className="border rounded">
        <p className="border rounded px-2">species_information</p>
        <div className="p-1 w-full">
          <div className="flex justify-between">
            <span>genera</span>
            {speciesDetail?.genera && (
              <RandomText
                source={speciesDetail?.genera}
                sourcekey="genus"
                className=""
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="mr-3">has_gender_differences</span>{"  "}
            <span>{speciesDetail?.has_gender_differences + ""}</span>
          </div>
          <div className="flex justify-between">
            <span>hatch_counter</span>
            <span>{speciesDetail?.hatch_counter}</span>
          </div> 
          <div className="flex justify-between">
            <span>is_baby</span>
            <span>{speciesDetail?.is_baby + ""}</span>
          </div>
          <div className="flex justify-between">
            <span>is_legendary</span>
            <span>{speciesDetail?.is_legendary + ""}</span>
          </div>
          <div className="flex justify-between">
            <span>is_mythical</span>
            <span>{speciesDetail?.is_mythical + ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// helper components

function TypeList(props: { types: IPokemonDetail["types"] | undefined }) {
  if (!props.types) return null;
  return (
    <div className="my-1 flex flex-wrap md:flex-col">
      {props.types.map((type, i) => (
        <span
          key={i}
          style={{
            borderColor: TYPE_COLOR[type.type.name],
          }}
          className="border-2 rounded px-2 m-1"
        >
          {type.type.name}
        </span>
      ))}
    </div>
  );
}

function RandomText(
  props: {
    source: any[] | undefined;
    sourcekey: string;
  } & React.HTMLAttributes<HTMLDivElement>
) {
  if (props.source == undefined) <div></div>;
  const [text, settext] = React.useState<number>();
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  React.useEffect(() => {
    if (props.source == undefined) return;
    const intervalSpeed = 1000 + Math.random() * 100;
    const interval = setInterval(() => {
      settext(
        props.source![getRandomInt(0, props.source?.length || 0)][
          props.sourcekey
        ] as number
      );
    }, intervalSpeed);
    return () => clearInterval(interval);
  }, []);
  return <div {...props}>{text}</div>;
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
