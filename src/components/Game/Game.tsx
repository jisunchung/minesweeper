import { useState } from "react";
import GameBoard from "./GameBoard";
import GameControls from "./\bGameControls";
import GameTimer from "./GameTimer";
import { GameStatus, type GameStatusType } from "../../types/game";

export default function Game() {
  const [gameStatus, setGameStatus] = useState<GameStatusType>(
    GameStatus.READY
  );

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">지뢰찾기</h1>
      <GameControls />
      <GameTimer />
      <GameBoard />
      {gameStatus === GameStatus.LOSE && (
        <div className="text-red-500 mt-5">게임 오버!</div>
      )}
      {gameStatus === GameStatus.WIN && (
        <div className="text-green-500 mt-5">승리!</div>
      )}
    </div>
  );
}
