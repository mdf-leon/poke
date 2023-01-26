import React from "react"; 
import { useParams } from "react-router-dom";
import PokemonDetail from "../components/PokemonDetail";

function App() { 
  const { id } = useParams();
  return (
    <div id="main" className="m-5 md:m-0 flex flex-col justify-center h-full">
      <PokemonDetail id={id}/>
    </div>
  );
}

export default App;
