import Button from "../common/button";

export default function GameFooter() {
  const handleOpenNewWindow = () => {
    window.open(
      "https://github.com/jisunchung/minesweeper",
      "_blank",
      "noopener,noreferrer"
    );
  };
  return (
    <footer className="bg-[#393e46] text-[#ffca3a] p-4 text-center border-t-4 border-[#222831]">
      <Button handleOnClick={handleOpenNewWindow} label="Github" />
    </footer>
  );
}
