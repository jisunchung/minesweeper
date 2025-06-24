import { gameStatusState, gameTimerState } from "@/atoms/gameAtoms";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function useTimer() {
  const gameStatus = useRecoilValue(gameStatusState);
  const [time, setTime] = useRecoilState(gameTimerState);
  useEffect(() => {
    let timer = null;

    if (gameStatus === "START") {
      timer = setInterval(() => {
        setTime((prev) => prev + 0.01);
      }, 10);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStatus]);
  return time.toFixed(0);
}
