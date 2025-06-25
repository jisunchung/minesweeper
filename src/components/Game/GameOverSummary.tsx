import { isGameOverState } from "@/atoms/gameAtoms";
import { gameOverState } from "@/atoms/gameOverSummaryAtom";
import { useRecoilValue } from "recoil";

export default function GameOverSummary() {
  const isGameOver = useRecoilValue(isGameOverState);
  const gameOver = useRecoilValue(gameOverState);

  return (
    <div className="flex justify-center">
      {isGameOver ? (
        <div
          className="flex flex-col justify-center items-start bg-neutral-100 m-4 p-4 shadow-xl border-4"
          style={{ height: "150px", width: "180px" }}
        >
          <p>시간 : {gameOver.time && gameOver.time.toFixed(2)}s</p>
          <p>찾은 지뢰 수 : {gameOver.foundMine}</p>
          <p>클릭 수 : {gameOver.leftClick}</p>
          <p>우클릭 수 : {gameOver.rightClick}</p>
        </div>
      ) : null}
    </div>
  );
}
