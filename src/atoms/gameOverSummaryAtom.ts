import { atom } from "recoil";

export const gameOverState = atom({
  key: "gameOverState",
  default: {
    time: 0,
    foundMine: 0,
    leftClick: 0,
    rightClick: 0,
  },
});
