import { useRecoilValue } from "recoil";
import { BoardState } from "@atoms/gameAtoms";
import GameBoard from "./GameBoard";
import GameControls from "./GameControls";

interface GameMainProps {
  onReset: () => void;
}

export default function GameMain({ onReset }: GameMainProps) {
  const board = useRecoilValue(BoardState);

  return (
    <main className="flex-1 p-4 bg-gray-400">
      <GameControls onReset={onReset} />
      {board && <GameBoard board={board} />}
    </main>
  );
}
