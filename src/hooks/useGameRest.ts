import {
  boardGridState,
  BoardState,
  flagCountState,
  foundMineCountState,
  mineCountState,
} from "@/atoms/gameAtoms";
import { initializeGameBoard } from "@/utils/gameUtils";
import { useRecoilValue, useSetRecoilState } from "recoil";

export function useGameReset() {
  const setBoard = useSetRecoilState(BoardState);
  const setFlagCount = useSetRecoilState(flagCountState);
  const setFoundMineCount = useSetRecoilState(foundMineCountState);
  const mineCount = useRecoilValue(mineCountState);
  const [row, col] = useRecoilValue(boardGridState);

  // 초기화 함수
  const resetGame = () => {
    const newBoard = initializeGameBoard(row, col, mineCount);
    setBoard(newBoard);
    setFlagCount(0);
    setFoundMineCount(0);
  };

  return { resetGame };
}
