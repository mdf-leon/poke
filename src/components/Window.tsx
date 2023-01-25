import React from "react";
import useDragger from "../hooks/useDrag";
import OptionsButton from "./OptionsButton";

export default function Window(props: any) {
  const windowRef = React.useRef<HTMLDivElement>(null);
  const titlebarRef = React.useRef<HTMLDivElement>(null);
  useDragger(windowRef, titlebarRef);

  const handleClick = () => {
    const windowCloseClicked = new Event("windowCloseClicked", {
      bubbles: true,
      cancelable: true,
    });
    return (e: any) => {
      if (!windowRef.current) return;
      windowRef.current.dispatchEvent(windowCloseClicked);
    };
  };

  return (
    <div
      ref={windowRef}
      className="bg absolute border -translate-x-1/2 min-w-[200px] max-w-[80%]"
      style={{ top: "50%", left: "50%" }}
      {...props}
    >
      <div ref={titlebarRef} className="w-full border md:text-xs flex flex-row justify-between px-2">
        <span>titlebar</span>
        <span>
          {" "}
          — ▢ <button onClick={handleClick()}>✕</button>{" "}
        </span>
      </div>
      {props.children}
    </div>
  );
}
