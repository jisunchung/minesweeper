import type { cell } from "../../types/game";

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
  return (
    <div
      className="flex cursor-pointer text-[14px] items-center justify-center"
      style={{
        backgroundImage: cell.isOpen
          ? "none"
          : `url("https://minesweeper.online/img/skins/hd/closed.svg?v=16")`,
        backgroundSize: "24px 24px",
        backgroundColor: "#ccc",
      }}
      onClick={() => {
        alert(`${rowIndex}${colIndex} cell: ${cell.value}`);
      }}
      onContextMenu={() => {}}
    >
      <div>{cell.value}</div>
    </div>
  );
}
