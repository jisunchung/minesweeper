import { counterState } from "../../atoms/gameAtoms";
import GameBoard from "./GameBoard";
import GameControls from "./GameControls";
import GameTimer from "./GameTimer";

import { useRecoilState } from "recoil";

//TODO : 메인 컴포넌트로, 전체 게임 로직과 상태를 관리함
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
