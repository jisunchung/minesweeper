import { counterState } from "../../atoms/gameAtoms";
import GameBoard from "./GameBoard";
import GameControls from "./GameControls";
import GameTimer from "./GameTimer";

import { useRecoilState } from "recoil";

export default function Game() {
  const [count, setCount] = useRecoilState(counterState);
  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">지뢰찾기 {count}</h1>
      <GameControls />
      <GameTimer />
      <GameBoard />
    </div>
  );
}
