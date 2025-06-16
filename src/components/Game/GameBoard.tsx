// TODO: 전체 게임 보드를 구성하고 셀들을 배치함

import type { cell } from "../../types/game";

// params : {board, onCellClick, onCellRightClick}
type GameBoardProps = {
  board: cell[][];
  onCellClick?: (row: number, col: number) => void;
  onCellRightClick?: (row: number, col: number) => void;
};

export default function GameBoard({
  board,
  onCellClick,
  onCellRightClick,
}: GameBoardProps) {
  const rowCount = board.length;
  const colCount = board[0]?.length || 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${rowCount}, 30px)`, // 각 셀 높이 고정
        gridTemplateColumns: `repeat(${colCount}, 30px)`, // 각 셀 너비 고정
        gap: "2px",
        justifyContent: "center", // 내용이 넘칠 경우 왼쪽 정렬
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#ccc",
              border: "1px solid #999",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onClick={() => onCellClick?.(rowIndex, colIndex)}
            onContextMenu={(e) => {
              e.preventDefault();
              onCellRightClick?.(rowIndex, colIndex);
            }}
          >
            {cell.value}
          </div>
        ))
      )}
    </div>
  );
}
