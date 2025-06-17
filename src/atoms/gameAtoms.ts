import { atom, selector } from "recoil";
import { LEVEL_DETAILS, type cell, type LevelType } from "../types/game";

//보드
export const BoardState = atom<cell[][] | null>({
  key: "gameBoardState",
  default: null,
});

//게임 Level
export const levelState = atom<LevelType>({
  key: "levelState",
  default: "BEGINNER",
});
//지뢰 수
export const mineCountState = selector<number>({
  key: "mineCountState",
  get: ({ get }) => {
    const level = get(levelState);
    return LEVEL_DETAILS[level].mineNum;
  },
});

//열려있는 셀
export const openedCellCountState = atom<number>({
  key: "openedCellCountState",
  default: 0,
});

//깃발 수
export const flagCountState = atom<number>({
  key: "flagCountState",
  default: 0,
});

//남은 지뢰 -> 지뢰 수에서 깃발 수 빼면됨
export const remainMineState = selector<number>({
  key: "remainMineState",
  get: ({ get }) => {
    return get(mineCountState) - get(flagCountState);
  },
});
