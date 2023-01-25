import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { crtEffectState, crtTxtEffectState } from "../main";
import OptionsWindow from "./OptionsWindow";

function Layout(props: any) {
  const [crtEffect] = useRecoilState(crtEffectState);
  const [crtTxtEffect] = useRecoilState(crtTxtEffectState);
  const [openedWindow, setopenedWindow] = React.useState();

  const layoutElement = React.useRef(null);

  React.useEffect(() => {
    layoutElement.current?.addEventListener("pokemonClicked", (event) => {
      event.stopImmediatePropagation();
      setopenedWindow(React.createElement(OptionsWindow));
    });
    layoutElement.current?.addEventListener("windowCloseClicked", (event) => {
      console.log("d");

      event.stopImmediatePropagation();
      setopenedWindow(null);
    });
  }, []);

  return (
    <div
      ref={layoutElement}
      className={`font-mono bg flex flex-col ${crtEffect && "crt"} ${
        crtTxtEffect && "crt-txt"
      }`}
    >
      {openedWindow}
      {/* <Sidebar /> */}
      {props.children}
      {/* <button className="absolute bottom-0 right-1/2 border mb-3 translate-x-1/2">Options</button> */}
      {/* <OptionsWindow /> */}
    </div>
  );
}

export default Layout;
