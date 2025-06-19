import {
  boardGridState,
  BoardState,
  flagCountState,
  foundMineCountState,
  mineCountState,
  minePositionsState,
} from "@/atoms/gameAtoms";
import { initializeGameBoard } from "@/utils/gameUtils";
import { useRecoilValue, useSetRecoilState } from "recoil";

export function useGameReset() {
  const setBoard = useSetRecoilState(BoardState);
  const setFlagCount = useSetRecoilState(flagCountState);
  const setFoundMineCount = useSetRecoilState(foundMineCountState);
  const setMinePositions = useSetRecoilState(minePositionsState);
  const mineCount = useRecoilValue(mineCountState);
  const [row, col] = useRecoilValue(boardGridState);

  // 초기화 함수
  const resetGame = () => {
    const { cellBoard, minePositions } = initializeGameBoard(
      row,
      col,
      mineCount
    );
    setBoard(cellBoard);
    setFlagCount(0);
    setFoundMineCount(0);
    setMinePositions(minePositions);
  };

  return { resetGame };
}
