type CellValue = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface cell {
  //지뢰 -1, 빈칸 0, 주변 지뢰의 수 (1~8)
  value: CellValue;
  isOpen: boolean;
  flag: boolean;
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
export type LevelType = (typeof LEVEL)[keyof typeof LEVEL];

export const LEVEL_DETAILS: Record<
  LevelType,
  { col: number; row: number; mineNum: number }
> = {
  BEGINNER: { col: 8, row: 8, mineNum: 10 },
  INTERMEDIATE: { col: 10, row: 14, mineNum: 40 },
  EXPERT: { col: 14, row: 32, mineNum: 99 },
};
