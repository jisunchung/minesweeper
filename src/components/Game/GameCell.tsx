import { useRecoilValue } from "recoil";
import type { cell } from "@/types/game";
import { isGameOverState } from "@atoms/gameAtoms";
import flagImg from "@assets/flag.png";
import closedImg from "@assets/closed.png";
import useGameCellClick from "@/hooks/useGameCellClick";

export default function GameCell({
  rowIndex,
  colIndex,
  cell,
}: {
  rowIndex: number;
  colIndex: number;
  cell: cell;
}) {
  const isGmaeOver = useRecoilValue(isGameOverState);
  const { handleCellLeftClick, handleCellRightClick } = useGameCellClick({
    rowIndex,
    colIndex,
    cell,
  });
  const viewCellValue = (cellValue: number) => {
    if (cellValue === -1) return "💣";
    else if (cellValue === 0) return "";
    else return cellValue.toString(); // 1~8 숫자 표시
  };

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
      onClick={() => {
        if (isGmaeOver) return;
        handleCellLeftClick();
      }}
      onContextMenu={(e) => {
        e.preventDefault(); //기본 우클릭 메뉴 방지함
        if (isGmaeOver) return;
        handleCellRightClick();
      }}
    >
      <div>{cell.isOpen ? viewCellValue(cell.value) : null}</div>
    </div>
  );
}
