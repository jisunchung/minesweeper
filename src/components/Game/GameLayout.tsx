import GameHeader from "./GameHeader";
import GameSidebar, { LevelSelector, GameDescription } from "./GameSidebar";
import GameMain from "./GameMain";
import GameFooter from "./GameFooter";

interface GameLayoutProps {
  onReset: () => void;
}

export default function GameLayout({ onReset }: GameLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <GameHeader />

      {/* 반응형 섹션: sm에서는 column, md 이상에서는 row */}
      <section className="flex flex-col md:flex-row flex-1">
        {/* Nav */}
        <GameSidebar title="LEVEL">
          <LevelSelector />
        </GameSidebar>

        {/* Main */}
        <GameMain onReset={onReset} />

        {/* Aside */}
        <GameSidebar title="">
          <GameDescription />
        </GameSidebar>
      </section>

      <GameFooter />
    </div>
  );
}
