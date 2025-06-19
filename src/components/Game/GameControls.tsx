//TODO : 게임 컨트롤 (남은 지뢰, 깃발, 새 게임 버튼)

import { useRecoilValue } from "recoil";
import GameTimer from "./GameTimer";
import {
  flagCountState,
  foundMineCountState,
  gameStatusState,
  openedCellCountState,
  remainMineState,
} from "@atoms/gameAtoms";
import { useGameReset } from "@/hooks/useGameRest";

export default function GameControls() {
  const remainMines = useRecoilValue(remainMineState);
  const flagCount = useRecoilValue(flagCountState);
  const { resetGame } = useGameReset();

  // test
  const foundMineCount = useRecoilValue(foundMineCountState);
  const openedCellCount = useRecoilValue(openedCellCountState);
  const gameStatus = useRecoilValue(gameStatusState);
  //
  return (
    <div className="flex flex-col sm:flex-row sm:justify-around sm:items-center gap-2 bg-yellow-200 py-2 px-4 rounded-md shadow mb-4">
      <div className="text-sm font-medium text-center sm:text-left">
        💣 남은 지뢰: <span className="font-bold">{remainMines}</span>
      </div>
      <div className="text-sm font-medium text-center sm:text-left">
        🚩 깃발: <span className="font-bold">{flagCount}</span>
      </div>
      {/* TEST */}
      <div className="text-sm font-medium text-center sm:text-left">
        찾은 지뢰: <span className="font-bold">{foundMineCount}</span>
      </div>
      <div className="text-sm font-medium text-center sm:text-left">
        열린 셀: <span className="font-bold">{openedCellCount}</span>
      </div>
      <div className="text-sm font-medium text-center sm:text-left">
        게임 상태: <span className="font-bold">{gameStatus}</span>
      </div>
      {/*  */}
      <div className="flex justify-center sm:justify-start">
        <GameTimer />
      </div>
      <div className="flex justify-center sm:justify-start">
        <button
          type="button"
          onClick={resetGame}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
        >
          다시 시작
        </button>
      </div>
    </div>
  );
}
