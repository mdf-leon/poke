import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { crtEffectState, crtTxtEffectState } from "../main";
import Window from "./Window";
import PokemonDetail from "./PokemonDetail";

function Layout(props: any) {
  const [crtEffect] = useRecoilState(crtEffectState);
  const [crtTxtEffect] = useRecoilState(crtTxtEffectState);
  // const [openedPkmWindowList, setopenedPkmWindowList] = React.useState<React.FunctionComponentElement<HTMLDivElement>[]>([]);
  const [openedPkmWindowList, setopenedPkmWindowList] = React.useState<any[]>(
    []
  );

  const layoutElement = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!layoutElement.current) return;
    layoutElement.current.addEventListener("pokemonClicked", (event) => {
      event.stopImmediatePropagation();
      // const newElement = React.createElement(Window, {key: event.detail.pkm.id, k: event.detail.pkm.id})
      // setopenedPkmWindowList(openedWindowList => [...openedWindowList, newElement]);
      setopenedPkmWindowList((openedWindowList) => [
        ...openedWindowList,
        {...event.detail.pkm, winid: `${event.detail.pkm.id}_${openedWindowList.length}`},
      ]);
    });
    layoutElement.current.addEventListener("windowCloseClicked", (event) => {
      event.stopImmediatePropagation();
      // setopenedPkmWindowList(owl => owl.filter(obj =>obj.props.k !== event.target.getAttribute('k')));
      setopenedPkmWindowList((owl) => {
        const newList = [...owl];
        console.log(newList);
        console.log(owl.findIndex((obj) => obj?.winid === event.target.getAttribute("winid")));
        newList[
          owl.findIndex((obj) => obj?.winid === event.target.getAttribute("winid"))
        ] = null;
        console.log(newList);
        return newList;
      });
    });
  }, []);

  const handleOpenedPkmWindows = (pkm, i) => {
    if (!pkm?.id) return;
    const { id, pkmName } = pkm;
    return (
      <Window key={i} winid={`${id}_${i}`} title={`${id}. ${pkmName}`}>
        <PokemonDetail id={id} />
      </Window>
    );
  };

  const customClass = `${crtEffect && "crt"} ${crtTxtEffect && "crt-txt"}`;

  const { id, pkmName } = { id: 1, pkmName: "bulbasaur" };

  return (
    <div
      ref={layoutElement}
      className={`min-h-full font-mono bg flex flex-col md:flex-row ${customClass}`}
    >
      {/* <Sidebar /> */}
      {/* <Window key={999} winid={id}>
        <PokemonDetail id={id} pkmName={pkmName}/>
      </Window> */}
      {openedPkmWindowList.map(handleOpenedPkmWindows)}
      {props.children}
      {/* <button className="absolute bottom-0 right-1/2 border mb-3 translate-x-1/2">Options</button> */}
      {/* <OptionsWindow /> */}
    </div>
  );
}

export default Layout;
