import { LEVEL } from "../../types/game";
import GmaeBoard from "./GameBoard";
import GameControls from "./GameControls";

export default function Game() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">지뢰찾기</h1>
      </header>

      {/* 반응형 섹션: sm에서는 column, md 이상에서는 row */}
      <section className="flex flex-col md:flex-row flex-1">
        {/* Nav */}
        <nav className="bg-gray-100 p-4 w-full md:w-52">
          <h2 className="text-lg font-semibold mb-3">LEVEL</h2>
          <ul className="space-y-2">
            <li>
              <button className="w-full text-left text-blue-600 hover:underline">
                {LEVEL.BEGINNER}
              </button>
            </li>
            <li>
              <button className="w-full text-left text-blue-600 hover:underline">
                {LEVEL.EXPERT}
              </button>
            </li>
            <li>
              <button className="w-full text-left text-blue-600 hover:underline">
                {LEVEL.INTERMEDIATE}
              </button>
            </li>
          </ul>
        </nav>

        {/* Main */}
        <main className="flex-1 p-4 bg-white">
          <GameControls
            onReset={() => {
              alert("hi");
            }}
          />
          <GmaeBoard
            board={Array.from({ length: 8 }, () => Array(8).fill(-1))}
            onCellClick={() => {
              alert("click");
            }}
            onCellRightClick={() => {
              alert("우클릭");
            }}
          />
        </main>

        {/* Aside */}
        <aside className="bg-gray-100 p-4 w-full md:w-52">
          <h3 className="text-lg font-medium mb-2">설명</h3>
          <p className="text-sm text-gray-700">게임 조작 방법에 대한 설명</p>
        </aside>
      </section>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className="text-sm">© 2025 지뢰찾기 게임</p>
      </footer>
    </div>
  );
}
