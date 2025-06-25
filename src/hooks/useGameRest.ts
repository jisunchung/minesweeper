import {
  boardGridState,
  BoardState,
  cellLeftClickCountState,
  cellRightClickCountState,
  flagCountState,
  foundMineCountState,
  gameStatusState,
  gameTimerState,
  mineCountState,
  minePositionsState,
  openedCellCountState,
} from "@/atoms/gameAtoms";
import { initializeGameBoard } from "@/utils/gameUtils";
import { useRecoilValue, useSetRecoilState } from "recoil";

export function useGameReset() {
  const setBoard = useSetRecoilState(BoardState);
  const setFlagCount = useSetRecoilState(flagCountState);
  const setFoundMineCount = useSetRecoilState(foundMineCountState);
  const setMinePositions = useSetRecoilState(minePositionsState);
  const setOpenedCellCountState = useSetRecoilState(openedCellCountState);
  const setGameStatus = useSetRecoilState(gameStatusState);
  const setGameTimer = useSetRecoilState(gameTimerState);
  const setCellLeftClickCount = useSetRecoilState(cellLeftClickCountState);
  const setCellRightClickCount = useSetRecoilState(cellRightClickCountState);
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
    setOpenedCellCountState(0);
    setMinePositions(minePositions);
    setGameStatus("READY");
    setGameTimer(0);
    setCellLeftClickCount(0);
    setCellRightClickCount(0);
  };

  return { resetGame };
}
