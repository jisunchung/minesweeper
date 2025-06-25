import { finalTimeState, isGameOverState } from "@/atoms/gameAtoms";
import useTimer from "@/hooks/useTimer";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function GameTimer() {
  const time = useTimer();
  const isGameOver = useRecoilValue(isGameOverState);
  const setFinalTimeState = useSetRecoilState(finalTimeState);

  useEffect(() => {
    if (isGameOver) setFinalTimeState(time);
  }, [isGameOver]);

  return <div className="font-bold">{time.toFixed(0)}</div>;
}
