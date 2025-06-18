import { useRecoilState } from "recoil";
import type { cell } from "../../types/game";
import { BoardState } from "../../atoms/gameAtoms";
import flagImg from "../../assets/flag.png";

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
  return (
    <div
      className={`flex cursor-pointer text-[14px] items-center justify-center ${
        cell.isOpen ? "border-t border-l border-gray-500" : ""
      }`}
      style={{
        // borderTop: cell.isOpen ? "1px solid" : "none",
        // borderLeft: cell.isOpen ? "1px solid" : "none",
        backgroundImage: !cell.isOpen
          ? cell.flag
            ? `url(${flagImg})`
            : `url("https://minesweeper.online/img/skins/hd/closed.svg?v=16")`
          : "none",
        backgroundSize: "24px 24px",
        backgroundColor: "#ccc",
      }}
      onClick={() => {
        alert(`${rowIndex}${colIndex} cell: ${cell.value}`);
        //셀을 열어줌
        // Create a deep copy of the board to ensure immutability
        if (gameBoard !== null) {
          const newBoard: cell[][] = gameBoard.map((row) => [...row]);

          // Update the isOpen property of the specific cell
          if (newBoard[rowIndex] && newBoard[rowIndex][colIndex]) {
            newBoard[rowIndex][colIndex] = {
              ...newBoard[rowIndex][colIndex],
              isOpen: true, // Set isOpen to true for the clicked cell
            };
          }
          setGameBoard(newBoard);
        }
        // Update the atom with the new board
      }}
      onContextMenu={(e) => {
        console.log("우클릭");
        e.preventDefault(); //기본 우클릭 메뉴 방지함
        if (gameBoard !== null) {
          const newBoard: cell[][] = gameBoard.map((row) => [...row]);

          if (newBoard[rowIndex] && newBoard[rowIndex][colIndex]) {
            newBoard[rowIndex][colIndex] = {
              ...newBoard[rowIndex][colIndex],
              flag: true,
            };
          }
          setGameBoard(newBoard);
        }
      }}
    >
      <div>{cell.isOpen ? cell.value : null}</div>
    </div>
  );
}
