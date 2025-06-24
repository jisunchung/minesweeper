import { useRecoilState } from "recoil";
import { LEVEL } from "@/types/game";
import { levelState } from "@atoms/gameAtoms";
import Button from "../common/button";

interface GameSidebarProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function GameSidebar({ title, children }: GameSidebarProps) {
  return (
    <div className={`bg-[#e0e0c6] w-full md:w-52 p-4`}>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}

export function LevelSelector() {
  const [level, setLevel] = useRecoilState(levelState);

  return (
    <div className="flex flex-col gap-2 ">
      {Object.values(LEVEL).map((lv) => (
        // <button
        //   key={lv}
        //   type="button"
        //   className={`border-2 border-[#222831] rounded px-3 py-1 font-bold ${
        //     level === lv ? "bg-[#1982c4]" : "hover:bg-[#6a4c93]"
        //   }`}
        //   onClick={() => setLevel(lv)}
        // >
        //   {lv}
        // </button>
        <Button
          key={lv}
          handleOnClick={() => setLevel(lv)}
          label={lv}
          isSelected={level === lv}
        />
      ))}
    </div>
  );
}

export function GameDescription() {
  return (
    <div className="border-2 border-[#222831] rounded-md px-2 py-1 text-sm text-gray-800">
      <ul className="space-y-3 list-none">
        <li>
          <p className="font-medium">▪ 왼쪽 클릭</p>
          <p className="ml-4">지뢰가 있는 칸을 클릭하면 게임은 종료됩니다.</p>
        </li>
        <li>
          <p className="font-medium">▪ 오른쪽 클릭</p>
          <p className="ml-4">
            지뢰가 있을 것으로 예상되는 칸에 깃발을 표시하세요.
          </p>
        </li>
        <li>
          <p className="font-medium">▪ 보드판의 숫자</p>
          <p className="ml-4">
            숫자는 해당 셀을 기준으로 주변 8칸에 있는 지뢰의 개수를 의미합니다.
          </p>
        </li>
        <li>
          <p className="font-medium">▪ 이모지 버튼</p>
          <p className="ml-4">게임을 초기화하여 새로 시작합니다.</p>
        </li>
        <li>
          <p className="font-medium">▪ 승리 조건</p>
          <p className="ml-4">
            지뢰가 아닌 모든 셀을 열거나, 모든 지뢰 위치에 정확히 깃발을 꽂으면
            게임에서 승리합니다.
          </p>
        </li>
      </ul>
    </div>
  );
}
