import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  boardGrid,
  BoardState,
  flagCountState,
  foundMineCountState,
  levelState,
  mineCountState,
} from "@atoms/gameAtoms";
import { initializeGameBoard } from "@utils/gameUtils";
import { useCallback, useEffect } from "react";
import GameLayout from "./GameLayout";

export default function Game() {
  const [, setBoard] = useRecoilState(BoardState);
  const mine = useRecoilValue(mineCountState);
  const [row, col] = useRecoilValue(boardGrid);
  const [level] = useRecoilState(levelState);
  const setFlagCount = useSetRecoilState(flagCountState);
  const setFoundMineCountState = useSetRecoilState(foundMineCountState);

  // 초기화 함수
  const resetGame = useCallback(() => {
    const newBoard = initializeGameBoard(row, col, mine);
    setBoard(newBoard);
    setFlagCount(0);
    setFoundMineCountState(0);
  }, [row, col, mine, setBoard, setFlagCount, setFoundMineCountState]);

  useEffect(() => {
    resetGame();
  }, [level, resetGame]);

  return <GameLayout onReset={resetGame} />;
}
