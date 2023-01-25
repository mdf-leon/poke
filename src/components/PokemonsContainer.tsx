import React from "react";
import { getPokemons } from "../api";
import  {drawPokemon} from "./Pokemon";

function PokemonsContainer() {
  const [pokemons, setpokemons] = React.useState<any[]>([]);

  const fetchPokemonList = async () => {
    const pokemonList = await getPokemons();
    setpokemons(pokemonList.results);
  };

  React.useEffect(() => {
    fetchPokemonList();
  }, []);

  return <div className="md:px-2 md:overflow-auto md:max-h-[100vh]">
    {pokemons.map(drawPokemon)}
  </div>;
}

export default PokemonsContainer;
