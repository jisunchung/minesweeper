import { useRecoilState, useRecoilValue } from "recoil";
import { LEVEL } from "@/types/game";
import GameBoard from "./GameBoard";
import GameControls from "./GameControls";
import {
  boardGrid,
  BoardState,
  levelState,
  mineCountState,
} from "@atoms/gameAtoms";
import { initializeGameBoard } from "@utils/gameUtils";
import { useCallback, useEffect } from "react";

export default function Game() {
  const [board, setBoard] = useRecoilState(BoardState);
  const mine = useRecoilValue(mineCountState);
  const [row, col] = useRecoilValue(boardGrid);
  const [level, setLevel] = useRecoilState(levelState);

  //초기화 함수
  const resetGame = useCallback(() => {
    const newBoard = initializeGameBoard(row, col, mine);
    setBoard(newBoard);
  }, [row, col, mine, setBoard]);

  useEffect(() => {
    resetGame();
  }, [level, resetGame]);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">지뢰찾기</h1>
      </header>

      {/* 반응형 섹션: sm에서는 column, md 이상에서는 row */}
      <section className="flex flex-col md:flex-row flex-1">
        {/* Nav */}
        <div className="bg-gray-100 p-4 w-full md:w-52">
          <h2 className="text-lg font-semibold mb-3">LEVEL</h2>
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
        </div>

        {/* Main */}
        <main className="flex-1 p-4 bg-gray-400">
          <GameControls onReset={resetGame} />
          {board && <GameBoard board={board} />}
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
