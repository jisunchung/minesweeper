import {
  BoardState,
  cellLeftClickCountState,
  cellRightClickCountState,
  flagCountState,
  foundMineCountState,
  gameStatusState,
  isGameOverState,
  mineCountState,
  minePositionsState,
  openedCellCountState,
} from "@/atoms/gameAtoms";
import { type cell } from "@/types/game";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { openAdjacentBlank, toggleFlag } from "@/utils/gameUtils";
import { useCallback, useEffect } from "react";
import { gameOverState } from "@/atoms/gameOverSummaryAtom";

export default function useGameCellClick({
  rowIndex,
  colIndex,
}: {
  rowIndex: number;
  colIndex: number;
}) {
  const [gameBoard, setGameBoard] = useRecoilState(BoardState);
  const [flagCount, setFlagCount] = useRecoilState(flagCountState);
  const mineNum = useRecoilValue(mineCountState);
  const [foundMineCount, setFoundMineCount] =
    useRecoilState(foundMineCountState);
  const setOpenedCellCount = useSetRecoilState(openedCellCountState);
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusState);
  const minePostions = useRecoilValue(minePositionsState);
  const isGameOver = useRecoilValue(isGameOverState);
  const [cellLeftClickCount, setCellLeftClickCount] = useRecoilState(
    cellLeftClickCountState
  );
  const [cellRightClickCount, setCellRightClickCount] = useRecoilState(
    cellRightClickCountState
  );
  const setGameOverState = useSetRecoilState(gameOverState);

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

  const handleCellRightClick = useCallback(() => {
    const cell = gameBoard[rowIndex][colIndex];

    if (isGameOver || cell.isOpen) return;

    console.log(`우클릭 ${rowIndex}, ${colIndex} , value : ${cell.value}`);
    setCellRightClickCount((prev) => prev + 1);
    if (gameStatus === "READY") setGameStatus("START");

    //깃발의 개수는 지뢰의 개수를 넘길 수 없음
    if (!cell.flag && flagCount >= mineNum) {
      alert("더 이상 깃발을 놓을 수 없음");
      return;
    }

    const updateBoard = toggleFlag(gameBoard, rowIndex, colIndex);
    setGameBoard(updateBoard.newBoard);
    setFlagCount((prev) => prev + updateBoard.flagChangeAmount);
    //찾은 지뢰 갱신
    if (cell.value === -1) {
      setFoundMineCount((prev) => prev + updateBoard.flagChangeAmount);
    }
  }, [
    rowIndex,
    colIndex,
    gameBoard,
    isGameOver,
    gameStatus,
    setCellRightClickCount,
    setFlagCount,
    setGameBoard,
    setFoundMineCount,
    mineNum,
    flagCount,
    setGameStatus,
  ]);

  const handleCellLeftClick = useCallback(() => {
    const cell = gameBoard[rowIndex][colIndex];
    if (isGameOver || cell.flag || cell.isOpen) return;

    console.log(`셀 클릭 : ${rowIndex}, ${colIndex} cell value: ${cell.value}`);
    setCellLeftClickCount((prev) => prev + 1);
    //게임 시작
    if (gameStatus === "READY") setGameStatus("START");

    //새로운 보드판 생성
    const newBoard: cell[][] = gameBoard.map((row) =>
      row.map((cell) => ({ ...cell }))
    );

    const value = cell.value;

    //1~8 -> 셀 열기
    if (1 <= value && value <= 8) handleNumberCellClick(newBoard);
    //지뢰 -> 지뢰 다 열기 -> 게임 over
    else if (value === -1) handleMineClick(newBoard);
    //빈칸 -> 인접한 빈칸 다 열기
    else if (value === 0) handleEmptyCellClick(newBoard);

    setGameBoard(newBoard);
  }, [
    rowIndex,
    colIndex,
    gameBoard,
    isGameOver,
    gameStatus,
    setCellLeftClickCount,
    setGameStatus,
    setGameBoard,
  ]);
  const handleNumberCellClick = useCallback(
    (board: cell[][]): void => {
      board[rowIndex][colIndex] = {
        ...board[rowIndex][colIndex],
        isOpen: true,
      };
      setOpenedCellCount((prev) => prev + 1);
    },
    [rowIndex, colIndex, setOpenedCellCount]
  );
  const handleMineClick = useCallback(
    (board: cell[][]): void => {
      minePostions.forEach(([mineRow, mineCol]) => {
        board[mineRow][mineCol].isOpen = true;
      });

      setGameStatus("LOSE");
    },
    [minePostions, setGameStatus]
  );
  const handleEmptyCellClick = useCallback(
    (board: cell[][]): void => {
      const { openedBoard, updateCellCount } = openAdjacentBlank(
        board,
        rowIndex,
        colIndex
      );
      setOpenedCellCount((prev) => prev + updateCellCount);
      board.splice(0, board.length, ...openedBoard);
    },
    [rowIndex, colIndex, setOpenedCellCount]
  );
  return { handleCellLeftClick, handleCellRightClick };
}
