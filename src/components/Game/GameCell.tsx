import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import type { cell } from "@/types/game";
import {
  BoardState,
  flagCountState,
  foundMineCountState,
  gameStatusState,
  isGameWonState,
  mineCountState,
  minePositionsState,
  openedCellCountState,
} from "@atoms/gameAtoms";
import flagImg from "@assets/flag.png";
import closedImg from "@assets/closed.png";
import { openAdjacentBlank, toggleFlag } from "@/utils/gameUtils";
import { useEffect } from "react";

export default function GameCell({
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
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusState);
  const minePostions = useRecoilValue(minePositionsState);
  const isGameWon = useRecoilValue(isGameWonState);

  const handleOnContextMenu = () => {
    if (gameBoard !== null && !cell.isOpen) {
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

  const handleOnClick = () => {
    if (gameBoard !== null && !cell.flag && !cell.isOpen) {
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
        const { openedBoard, openedBlankCellCount } = openAdjacentBlank(
          newBoard,
          rowIndex,
          colIndex
        );
        newBoard = openedBoard;
        setOpenedCellCount((prev) => prev + openedBlankCellCount);
      }

      setGameBoard(newBoard);
    }
  };
  const viewCellValue = (cellValue: number) => {
    if (cellValue === -1) return "💣";
    else if (cellValue === 0) return "";
    else return cellValue.toString(); // 1~8 숫자 표시
  };

  useEffect(() => {
    if (isGameWon) {
      setGameStatus("WIN");
    }
  }, [isGameWon]);
  return (
    <div
      className={`flex text-[14px] font-medium items-center justify-center ${
        cell.isOpen
          ? `border-t border-l border-gray-500 ${
              cell.value !== -1 ? "bg-stone-300" : "bg-red-500"
            }`
          : ""
      } `}
      style={{
        backgroundImage: !cell.isOpen
          ? cell.flag
            ? `url(${flagImg})`
            : `url(${closedImg})`
          : "none",
        backgroundSize: "24px 24px",
      }}
      onClick={(e) => {
        if (gameStatus === "LOSE" || gameStatus === "WIN") {
          e.stopPropagation();
        } else {
          handleOnClick();
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault(); //기본 우클릭 메뉴 방지함
        if (gameStatus === "LOSE" || gameStatus === "WIN") {
          e.stopPropagation();
        } else {
          handleOnContextMenu();
        }
      }}
    >
      <div>{!cell.isOpen ? viewCellValue(cell.value) : null}</div>
    </div>
  );
}
