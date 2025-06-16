//TODO : 게임 컨트롤 (남은 지뢰, 깃발, 새 게임 버튼)

import GameTimer from "./GameTimer";

//params : { mineCount, flagCount, onReset}

type GameControlsProps = {
  mineCount: number;
  flagCount: number;
  onReset: () => void;
};

export default function GameControls({
  mineCount,
  flagCount,
  onReset,
}: GameControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-around sm:items-center gap-2 bg-yellow-200 py-2 px-4 rounded-md shadow mb-4">
      <div className="text-sm font-medium text-center sm:text-left">
        💣 남은 지뢰: <span className="font-bold">{mineCount}</span>
      </div>
      <div className="text-sm font-medium text-center sm:text-left">
        🚩 남은 깃발: <span className="font-bold">{flagCount}</span>
      </div>
      <div className="flex justify-center sm:justify-start">
        <GameTimer />
      </div>
      <div className="flex justify-center sm:justify-start">
        <button
          type="button"
          onClick={onReset}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
        >
          다시 시작
        </button>
      </div>
    </div>
  );
}
