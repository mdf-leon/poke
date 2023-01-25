import OptionsButton from "./OptionsButton";

export default function OptionsWindow(props) {

  const handleClick = () => {
    const windowCloseClicked = new CustomEvent("windowCloseClicked", {
      bubbles: true,
      cancelable: true,
    });
    return (e: any) => {
      e.target.dispatchEvent(windowCloseClicked);
    };
  };

  return (
    <div className="bg absolute border mb-3 translate-x-1/2 w-3/4">
      <div className="w-full border md:text-xs flex flex-row justify-between px-2">
        <span>titlebar</span>
        <span>
          {" "}
          — ▢ <button onClick={handleClick()}>✕</button>{" "}
        </span>
      </div>
      <OptionsButton value="opt1" className="m-2 border  " />
      opt2
    </div>
  );
}
