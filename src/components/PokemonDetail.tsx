import React from "react";
import {getPokemonDetail, getPokemonSpeciesDetail} from "../api"

function PokemonDetail(props: any) {
  const { id, pkmName } = props;

  const [detail, setdetail] = React.useState<any>();
  const [speciesDetail, setspeciesDetail] = React.useState<any>();
  const [flavorText, setflavorText] = React.useState<any>();

  const fetchPokemonDetail = async () => {
    const _detail = await getPokemonDetail(id);
    const _speciesDetail = await getPokemonSpeciesDetail(id);
    
    setdetail(_detail);
    setspeciesDetail(_speciesDetail);
    setflavorText(_speciesDetail.flavor_text_entries.find(el => el.language.name === 'en'));
  };

  React.useEffect(() => {
    fetchPokemonDetail();
  }, []);

  return (
    <div className="md:w-[400px] my-2 flex justify-around w-full">
      <div className="m-1 p-1 border rounded">
        <select className="border rounded outline-none bg">
          <option value="A">Apple</option>
          <option value="B">Banana</option>
          <option value="C">Cranberry</option>
        </select>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        />
      </div>
      <div className="flex flex-col">
        <span>{flavorText?.flavor_text}</span>
      </div>
    </div>
  );
}

export default PokemonDetail;
