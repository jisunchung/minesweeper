import GameHeader from "./GameHeader";
import GameSidebar, { LevelSelector, GameDescription } from "./GameSidebar";
import GameMain from "./GameMain";
import GameFooter from "./GameFooter";
import GameOverSummary from "./GameOverSummary";

export default function GameLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <GameHeader />

      {/* 반응형 섹션: sm에서는 column, md 이상에서는 row */}
      <section className="flex flex-col md:flex-row flex-1">
        {/* Nav */}
        <GameSidebar title="LEVEL">
          <LevelSelector />
        </GameSidebar>

        <div className="flex flex-col md:flex-row flex-1 justify-center bg-gray-400 p-4">
          {/* Main */}
          <GameMain />
          {/* Modal */}
          <GameOverSummary />
        </div>

        {/* Aside */}
        <GameSidebar title="게임 조작 설명">
          <GameDescription />
        </GameSidebar>
      </section>

      <GameFooter />
    </div>
  );
}
