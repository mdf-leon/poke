import React from "react";

export const drawPokemonOptionList = (pkm: { url: string; name: string }, i: number) => {
  const id = pkm.url
    .replace("https://pokeapi.co/api/v2/pokemon/", "")
    .replace("/", ""); 

  return <PokemonOption key={i} id={id} pkmName={pkm.name} />;
};

const handleClick = (pkm: { pkmName: string; id: string }) => {
  const pokemonClicked = new CustomEvent("pokemonClicked", {
    detail: { pkm },
    bubbles: true,
    cancelable: true,
    // composed: false,
  });
  return (e: any) => {
    e.target.dispatchEvent(pokemonClicked);
  };
};

function PokemonOption(props: { pkmName: string; id: string }) {
  const { id, pkmName } = props;
  return (
    <button
      className="border my-2 flex items-center justify-around w-full rounded"
      onClick={handleClick({ id, pkmName })}
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      />
      <div className="flex flex-col">
        <span>Pokemon ID. {id}</span>
        <span>{pkmName}</span>
      </div>{" "}
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`}
      />
    </button>
  );
}
