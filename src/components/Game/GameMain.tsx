import { useRecoilValue } from "recoil";
import { BoardState } from "@atoms/gameAtoms";
import GameBoard from "./GameBoard";
import GameControls from "./GameControls";

export default function GameMain() {
  const board = useRecoilValue(BoardState);

  return (
    <main className="flex-row">
      <GameControls />
      {board && <GameBoard board={board} />}
    </main>
  );
}
