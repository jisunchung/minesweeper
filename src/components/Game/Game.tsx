import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  cellLeftClickCountState,
  cellRightClickCountState,
  foundMineCountState,
  gameStatusState,
  isGameOverState,
  isGameWonState,
  levelState,
} from "@atoms/gameAtoms";
import { useEffect } from "react";
import GameLayout from "./GameLayout";
import { useGameReset } from "@/hooks/useGameRest";
import { gameOverState } from "@/atoms/gameOverSummaryAtom";

export default function Game() {
  const [level] = useRecoilState(levelState);
  const { resetGame } = useGameReset();
  const isGameWon = useRecoilValue(isGameWonState);
  const setGameStatus = useSetRecoilState(gameStatusState);
  const setGameOverState = useSetRecoilState(gameOverState);
  const isGameOver = useRecoilValue(isGameOverState);
  const foundMineCount = useRecoilValue(foundMineCountState);
  const [cellLeftClickCount, setCellLeftClickCount] = useRecoilState(
    cellLeftClickCountState
  );
  const [cellRightClickCount, setCellRightClickCount] = useRecoilState(
    cellRightClickCountState
  );
  useEffect(() => {
    resetGame();
  }, [level]);

  //게임의 승리 여부를 판단함
  useEffect(() => {
    if (isGameWon) {
      setGameStatus("WIN");
    }
  }, [isGameWon]);

  //게임 over
  useEffect(() => {
    if (!isGameOver) return;
    console.log("게임 over");
    setGameOverState((prev) => {
      return {
        ...prev,
        foundMine: foundMineCount,
        leftClick: cellLeftClickCount,
        rightClick: cellRightClickCount,
      };
    });
  }, [isGameOver]);

  return <GameLayout />;
}
