import GameBoard from "./GameBoard";
import GameControls from "./GameControls";
import GameOverSummary from "./GameOverSummary";

export default function GameMain() {
  return (
    <main className="flex-1 bg-[#544d3c]">
      <div className="flex flex-col md:flex-row justify-center p-4">
        <div className="flex-row">
          <GameControls />
          <GameBoard />
        </div>
        <GameOverSummary />
      </div>
    </main>
  );
}
