import {
  type GameStatusType,
  LEVEL_DETAILS,
  type cell,
  type LevelType,
} from "@/types/game";
import { atom, selector } from "recoil";

//게임 상태
export const gameStatusState = atom<GameStatusType>({
  key: "gameStatusState",
  default: "READY",
});

export const isGameOverState = selector<boolean>({
  key: "isGameOverState",
  get: ({ get }) => {
    const gameStatus = get(gameStatusState);
    return gameStatus === "LOSE" || gameStatus === "WIN";
  },
});

//타이머
export const gameTimerState = atom<number>({
  key: "gameTimerState",
  default: 0,
});
export const finalTimeState = atom<number>({
  key: "finalTimeState",
  default: 0,
});

//보드
export const BoardState = atom<cell[][]>({
  key: "gameBoardState",
  default: [],
});

//게임 Level
export const levelState = atom<LevelType>({
  key: "levelState",
  default: "BEGINNER",
});

//지뢰 위치
export const minePositionsState = atom<number[][]>({
  key: "minePositionsState",
  default: [],
});

//지뢰 수
export const mineCountState = selector<number>({
  key: "mineCountState",
  get: ({ get }) => {
    const level = get(levelState);
    return LEVEL_DETAILS[level].mineNum;
  },
});

//보드의 row col
export const boardGridState = selector<[number, number]>({
  key: "boardGrid",
  get: ({ get }) => {
    const level = get(levelState);
    return [LEVEL_DETAILS[level].row, LEVEL_DETAILS[level].col];
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

//UI에 표시되는 남은 지뢰 -> 지뢰 수에서 깃발 수 빼면됨
export const remainMineState = selector<number>({
  key: "remainMineState",
  get: ({ get }) => {
    return get(mineCountState) - get(flagCountState);
  },
});

export const foundMineCountState = atom<number>({
  key: "foundMineCountState",
  default: 0,
});

//승리조건을 확인하는 selector
//1. 찾은 지뢰수 === 지뢰수
//2. 전체 셀 칸 - 지뢰수 === 열린셀

export const isGameWonState = selector<boolean>({
  key: "isGameWonState",
  get: ({ get }) => {
    const [row, col] = get(boardGridState);
    const totalCell = row * col;

    const mineCount = get(mineCountState);
    const openedCellCount = get(openedCellCountState);
    const foundMineCount = get(foundMineCountState);

    return (
      foundMineCount === mineCount || totalCell - mineCount === openedCellCount
    );
  },
});

//클릭 수
export const cellLeftClickCount = atom<number>({
  key: "cellLeftClickCount",
  default: 0,
});
export const cellRightClickCount = atom<number>({
  key: "cellRightClickCount",
  default: 0,
});
