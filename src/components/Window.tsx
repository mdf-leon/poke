import React from "react";
import useDragger from "../hooks/useDrag";
import OptionsButton from "./OptionsButton";

export default function Window(
  props: { title: string; winid: string } & React.HTMLAttributes<HTMLDivElement>
) {
  const { title } = props;
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

  const handleDivClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.currentTarget.style.zIndex = "20";
  };

  const handleDivBlur = (event: React.FocusEvent<HTMLDivElement, Element>) => {
    event.currentTarget.style.zIndex = "1";
  };

  React.useEffect(() => {
    windowRef.current?.focus();
  });

  return (
    <div
      tabIndex={0}
      onClick={handleDivClick}
      onBlur={handleDivBlur}
      ref={windowRef}
      className="bg absolute border -translate-x-1/2 min-w-[200px] max-w-[80%]"
      style={{ top: "50%", left: "50%", zIndex: 21 }}
      {...props}
    >
      <div
        ref={titlebarRef}
        className="w-full border md:text-xs flex flex-row justify-between px-2"
      >
        <span>{title}</span>
        <span>
          {" "}
          — ▢ <button onClick={handleClick()}>✕</button>{" "}
        </span>
      </div>
      {props.children}
    </div>
  );
}
