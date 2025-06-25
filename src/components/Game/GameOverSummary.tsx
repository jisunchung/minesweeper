import {
  cellLeftClickCount,
  cellRightClickCount,
  finalTimeState,
  foundMineCountState,
  isGameOverState,
} from "@/atoms/gameAtoms";
import { useRecoilValue } from "recoil";

export default function GameOverSummary() {
  const isGameOver = useRecoilValue(isGameOverState);
  const finalTime = useRecoilValue(finalTimeState);
  const foundMineCount = useRecoilValue(foundMineCountState);
  const leftClickCount = useRecoilValue(cellLeftClickCount);
  const rightClickCount = useRecoilValue(cellRightClickCount);

  return (
    <div className="flex justify-center">
      {isGameOver ? (
        <div
          className="flex flex-col justify-center items-start bg-neutral-100 m-4 p-4 shadow-xl border-4"
          style={{ height: "150px", width: "180px" }}
        >
          <p>시간 : {finalTime && finalTime.toFixed(2)}s</p>
          <p>찾은 지뢰 수 : {foundMineCount}</p>
          <p>클릭 수 : {leftClickCount}</p>
          <p>우클릭 수 : {rightClickCount}</p>
        </div>
      ) : null}
    </div>
  );
}
