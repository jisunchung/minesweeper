import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import type { cell } from "@/types/game";
import {
  BoardState,
  flagCountState,
  foundMineCountState,
  mineCountState,
} from "@atoms/gameAtoms";
import flagImg from "@assets/flag.png";
import closedImg from "@assets/closed.png";
import { toggleFlag } from "@/utils/gameUtils";

//TODO : 개별 셀을 표시하고 클릭 이벤트 처리
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

  const handleOnContextMenu = () => {
    if (gameBoard !== null && !cell.isOpen) {
      console.log(`우클릭 ${rowIndex}, ${colIndex} , value : ${cell.value}`);
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
  return (
    <div
      className={`flex cursor-pointer text-[14px] items-center justify-center ${
        cell.isOpen ? "border-t border-l border-gray-500" : ""
      }`}
      style={{
        backgroundImage: !cell.isOpen
          ? cell.flag
            ? `url(${flagImg})`
            : `url(${closedImg})`
          : "none",
        backgroundSize: "24px 24px",
        backgroundColor: "#ccc",
      }}
      onClick={() => {
        //셀을 열어줌
        if (gameBoard !== null && !cell.flag && !cell.isOpen) {
          console.log(
            `셀 클릭 : ${rowIndex}, ${colIndex} cell value: ${cell.value}`
          );
          const newBoard: cell[][] = gameBoard.map((row) => [...row]);

          if (newBoard[rowIndex] && newBoard[rowIndex][colIndex]) {
            newBoard[rowIndex][colIndex] = {
              ...newBoard[rowIndex][colIndex],
              isOpen: true,
            };
          }
          setGameBoard(newBoard);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault(); //기본 우클릭 메뉴 방지함
        handleOnContextMenu();
      }}
    >
      <div>{cell.isOpen ? cell.value : null}</div>
    </div>
  );
}
