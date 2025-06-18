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
      <h3 className="text-lg font-medium mb-2">설명</h3>
      <p className="text-sm text-gray-700">게임 조작 방법에 대한 설명</p>
    </div>
  );
}
