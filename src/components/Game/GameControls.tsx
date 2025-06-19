import { useRecoilValue } from "recoil";
import GameTimer from "./GameTimer";
import {
  boardGridState,
  gameStatusState,
  remainMineState,
} from "@atoms/gameAtoms";
import { useGameReset } from "@/hooks/useGameRest";

export default function GameControls() {
  const remainMines = useRecoilValue(remainMineState);
  const gameStatus = useRecoilValue(gameStatusState);
  const boardGrid = useRecoilValue(boardGridState);

  const { resetGame } = useGameReset();
  const [_, col] = boardGrid;

  const showStatusEmoji = () => {
    let emoji = "";
    if (gameStatus === "LOSE") emoji = "😭";
    else if (gameStatus === "WIN") emoji = "😎";
    else emoji = "🙂";

    return <div className="text-2xl">{emoji}</div>;
  };

  return (
    <div className="flex justify-center ">
      <div
        className="flex justify-center bg-gray-300"
        style={{
          width: `${col * 24 + 10}px`,
        }}
      >
        <div
          className="flex flex-row items-center border my-1 bg-gray-100"
          style={{
            width: `${col * 24}px`,
          }}
        >
          {/* 남은 지뢰 수 */}
          <div className="flex justify-center basis-1/3 ">
            <span className="font-bold">{remainMines}</span>
          </div>

          {/* 새 게임 */}
          <div className="flex justify-center basis-1/3 m-2">
            <button
              type="button"
              onClick={resetGame}
              className="bg-stone-400 hover:bg-stone-500 px-2 py-1 "
            >
              {showStatusEmoji()}
            </button>
          </div>

          {/* 타이머 */}
          <div className="flex justify-center basis-1/3 ">
            <GameTimer />
          </div>
        </div>
      </div>
    </div>
  );
}
