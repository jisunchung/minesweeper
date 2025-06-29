import { isGameOverState } from "@/atoms/gameAtoms";
import { gameOverState } from "@/atoms/gameOverSummaryAtom";
import useTimer from "@/hooks/useTimer";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function GameTimer() {
  const time = useTimer();
  const isGameOver = useRecoilValue(isGameOverState);
  const setFinalTimeState = useSetRecoilState(gameOverState);

  useEffect(() => {
    if (isGameOver)
      setFinalTimeState((prev) => {
        return { ...prev, time };
      });
  }, [isGameOver]);

  return <div className="font-bold">{time.toFixed(0)}</div>;
}
