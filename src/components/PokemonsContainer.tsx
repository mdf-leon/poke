import React from "react";
import { getPokemons, ULR_NAME } from "../api";
import { drawPokemonOptionList } from "./PokemonOption";

function PokemonsContainer() {
  const [pokemons, setpokemons] = React.useState<ULR_NAME[]>([]);

  const fetchPokemonList = async () => {
    const pokemonList = await getPokemons();
    setpokemons(pokemonList.results);
  };

  React.useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <div className="md:px-2 md:overflow-auto md:max-h-[100vh]">
      {pokemons.map(drawPokemonOptionList)}
    </div>
  );
}

export default PokemonsContainer;
