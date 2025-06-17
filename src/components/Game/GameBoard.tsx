// TODO: 전체 게임 보드를 구성하고 셀들을 배치함

import type { cell } from "../../types/game";
import GameCell from "./GameCell";

export default function GameBoard({ board }: { board: cell[][] }) {
  const rowCount = board.length;
  const colCount = board[0]?.length || 0;
  return (
    <div
      className="grid justify-center"
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
  );
}
