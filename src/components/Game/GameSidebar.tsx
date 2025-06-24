import { useRecoilState } from "recoil";
import { LEVEL } from "@/types/game";
import { levelState } from "@atoms/gameAtoms";

interface GameSidebarProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function GameSidebar({
  title,
  children,
  className = "",
}: GameSidebarProps) {
  return (
    <div className={`bg-gray-100 p-4 w-full md:w-52 ${className}`}>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}

export function LevelSelector() {
  const [level, setLevel] = useRecoilState(levelState);

  return (
    <div className="flex flex-col gap-2">
      {Object.values(LEVEL).map((lv) => (
        <button
          key={lv}
          type="button"
          className={`px-3 py-2 rounded text-white transition ${
            level === lv ? "bg-sky-700" : "bg-sky-500 hover:bg-sky-600"
          }`}
          onClick={() => setLevel(lv)}
        >
          {lv}
        </button>
      ))}
    </div>
  );
}

export function GameDescription() {
  return (
    <div>
      <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
        <li>
          <b>왼쪽 클릭</b>: 셀을 엽니다. 숫자는 주변 8칸의 지뢰 개수를
          의미합니다. 지뢰를 클릭하면 게임이 종료됩니다.
        </li>
        <li>
          <b>오른쪽 클릭</b>: 셀에 깃발을 꽂거나 해제합니다. 깃발은 지뢰가 있을
          것 같은 칸에 표시하세요.
        </li>
        <li>
          <b>다시 시작 버튼</b>: 게임을 초기화하고 새로 시작합니다.
        </li>
        <li>
          <b>승리 조건</b>: 모든 지뢰가 아닌 셀을 열거나 깃발을 모두 꽂으면
          승리합니다.
        </li>
      </ul>
    </div>
  );
}
