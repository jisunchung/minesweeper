type CellValue = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface cell {
  //지뢰 -1, 빈칸 0, 주변 지뢰의 수 (1~8)
  value: CellValue;
  isOpen: boolean;
  flag: boolean;
}

export interface GameState {
  board: cell[][];
  level: string;
  isGameOver: boolean;
  isWin: boolean;
  isFirstClick: boolean;
  openedCellCount: number;
  flagCount: number;
  mineCount: number;
  startTime: number | null;
  endTime: number | null;
}

export const GameStatus = {
  READY: "READY",
  START: "START",
  WIN: "WIN",
  LOSE: "LOSE",
} as const;
export type GameStatusType = (typeof GameStatus)[keyof typeof GameStatus];

export const LEVEL = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  EXPERT: "EXPERT",
} as const;

export const LEVEL_DETAILS = {
  BEGINNER: { col: 8, row: 8, mineNum: 10 },
  INTERMEDIATE: { col: 10, row: 14, mineNum: 40 },
  EXPERT: { col: 14, row: 32, mineNum: 99 },
} as const;
