import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { gameStatusState, isGameWonState, levelState } from "@atoms/gameAtoms";
import { useEffect } from "react";
import GameLayout from "./GameLayout";
import { useGameReset } from "@/hooks/useGameRest";

export default function Game() {
  const [level] = useRecoilState(levelState);
  const { resetGame } = useGameReset();
  const isGameWon = useRecoilValue(isGameWonState);
  const setGameStatus = useSetRecoilState(gameStatusState);

  useEffect(() => {
    resetGame();
  }, [level]);

  //게임의 승리 여부를 판단함
  useEffect(() => {
    if (isGameWon) {
      setGameStatus("WIN");
    }
  }, [isGameWon]);

  return <GameLayout />;
}
