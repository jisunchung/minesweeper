import { gameStatusState, gameTimerState } from "@/atoms/gameAtoms";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function GameTimer() {
  const gameStatus = useRecoilValue(gameStatusState);
  const [time, setTime] = useRecoilState(gameTimerState);
  useEffect(() => {
    let timer = null;

    if (gameStatus === "START") {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStatus]);

  return <div className="font-bold">{time}</div>;
}
