import { useRecoilValue } from "recoil";
import { BoardState } from "@atoms/gameAtoms";
import GameBoard from "./GameBoard";
import GameControls from "./GameControls";

export default function GameMain() {
  const board = useRecoilValue(BoardState);

  return (
    <main className="flex-1 p-4 bg-gray-400">
      <GameControls />
      {board && <GameBoard board={board} />}
    </main>
  );
}
