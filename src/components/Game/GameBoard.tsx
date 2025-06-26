import GameCell from "./GameCell";
import { useRecoilValue } from "recoil";
import { BoardState } from "@/atoms/gameAtoms";

export default function GameBoard() {
  const board = useRecoilValue(BoardState);
  const rowCount = board.length;
  const colCount = board[0]?.length || 0;

  return (
    <div className="flex justify-center">
      <div
        className="flex justify-center items-center bg-[linear-gradient(to_bottom_right,#808080_50%,#ffffff_50%)]"
        style={{
          width: `${24 * colCount + 10}px`,
          height: `${24 * rowCount + 10}px`,
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateRows: `repeat(${rowCount}, 24px)`, // 각 셀 높이 고정
            gridTemplateColumns: `repeat(${colCount}, 24px)`, // 각 셀 너비 고정
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <GameCell
                key={`${rowIndex}-${colIndex}`}
                rowIndex={rowIndex}
                colIndex={colIndex}
                cell={cell}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
