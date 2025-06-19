import { useRecoilState } from "recoil";
import { levelState } from "@atoms/gameAtoms";
import { useEffect } from "react";
import GameLayout from "./GameLayout";
import { useGameReset } from "@/hooks/useGameRest";

export default function Game() {
  const [level] = useRecoilState(levelState);
  const { resetGame } = useGameReset();

  useEffect(() => {
    resetGame();
  }, [level]);

  return <GameLayout />;
}
