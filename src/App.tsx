import { RecoilRoot } from "recoil";
import "./App.css";
import Game from "@components/Game/Game";

function App() {
  return (
    <RecoilRoot>
      <Game />
    </RecoilRoot>
  );
}

export default App;
