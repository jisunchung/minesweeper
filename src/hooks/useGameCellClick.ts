import {
  BoardState,
  flagCountState,
  foundMineCountState,
  gameStatusState,
  mineCountState,
  minePositionsState,
  openedCellCountState,
} from "@/atoms/gameAtoms";
import type { cell } from "@/types/game";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { openAdjacentBlank, toggleFlag } from "@/utils/gameUtils";

export default function useGameCellClick({
  rowIndex,
  colIndex,
  cell,
}: {
  rowIndex: number;
  colIndex: number;
  cell: cell;
}) {
  const [gameBoard, setGameBoard] = useRecoilState(BoardState);
  const [flagCount, setFlagCount] = useRecoilState(flagCountState);
  const mineNum = useRecoilValue(mineCountState);
  const setFoundMineCount = useSetRecoilState(foundMineCountState);
  const setOpenedCellCount = useSetRecoilState(openedCellCountState);
  const setGameStatus = useSetRecoilState(gameStatusState);
  const minePostions = useRecoilValue(minePositionsState);

  const handleCellRightClick = () => {
    if (!cell.isOpen) {
      console.log(`우클릭 ${rowIndex}, ${colIndex} , value : ${cell.value}`);

      setGameStatus("START");
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
    }
  };

  const handleCellLeftClick = () => {
    if (!cell.flag && !cell.isOpen) {
      console.log(
        `셀 클릭 : ${rowIndex}, ${colIndex} cell value: ${cell.value}`
      );
      setGameStatus("START");
      let newBoard: cell[][] = gameBoard.map((row) =>
        row.map((cell) => ({ ...cell }))
      );

      //1~8 -> 셀 열기
      if (
        newBoard[rowIndex] &&
        newBoard[rowIndex][colIndex] &&
        cell.value >= 1 &&
        cell.value <= 8
      ) {
        newBoard[rowIndex][colIndex] = {
          ...newBoard[rowIndex][colIndex],
          isOpen: true,
        };
        setOpenedCellCount((prev) => prev + 1);
      }

      //지뢰 -> 지뢰 다 열기 -> 게임 over
      if (cell.value === -1) {
        minePostions.map((position) => {
          const [mineRow, mineCol] = position;
          newBoard[mineRow][mineCol].isOpen = true;
        });

        setGameStatus("LOSE");
      }

      //빈칸 -> 인접한 빈칸 다 열기
      if (cell.value === 0) {
        const { openedBoard, updateCellCount } = openAdjacentBlank(
          newBoard,
          rowIndex,
          colIndex
        );
        newBoard = openedBoard;
        setOpenedCellCount((prev) => prev + updateCellCount);
      }

      setGameBoard(newBoard);
    }
  };
  return { handleCellLeftClick, handleCellRightClick };
}
