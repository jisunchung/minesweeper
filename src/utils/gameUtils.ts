//여러가지 게임 로직 구현

import { useRecoilValue } from "recoil";
import type { cell } from "../types/game";
import { remainMineState } from "@/atoms/gameAtoms";

//initializeGameBoard
export const initializeGameBoard = (
  rows: number,
  cols: number,
  mineCount: number
): cell[][] => {
  const board = Array.from({ length: rows }, () => Array(cols).fill(0));
  //지뢰 랜덤 배치
  let mine = 0;
  const minePositions: [number, number][] = [];
  const MINE = -1;

  while (mine !== mineCount) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);
    if (board[randomRow][randomCol] !== -1) {
      board[randomRow][randomCol] = MINE;
      minePositions.push([randomRow, randomCol]);
      mine++;
    }
  }
  //지뢰 수 count
  //지뢰의 8면을 ++
  minePositions.forEach(([row, col]) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const [newRow, newCol] = [row + i, col + j];
        //범위 체크, 중복 제거
        if (
          newRow < 0 ||
          newRow >= rows ||
          newCol < 0 ||
          newCol >= cols ||
          board[newRow][newCol] === MINE
        )
          continue;
        board[newRow][newCol]++;
      }
    }
  });
  // number[][] → cell[][]
  const cellBoard: cell[][] = board.map((row) =>
    row.map((value) => ({
      value: value,
      isOpen: false,
      flag: false,
    }))
  );
  //   console.table(cellBoard);
  console.table(board);
  return cellBoard;
};

//우클릭시 깃발 토글
export const toggleFlag = (
  gameBoard: cell[][],
  row: number,
  col: number
): { newBoard: cell[][]; flagChangeAmount: number } => {
  const newBoard: cell[][] = gameBoard.map((row) => [...row]);
  let flagChangeAmount = 0;
  if (newBoard[row] && newBoard[row][col]) {
    newBoard[row][col] = {
      ...newBoard[row][col],
      flag: !gameBoard[row][col].flag,
    };
    flagChangeAmount = newBoard[row][col].flag ? 1 : -1;
  }
  return { newBoard, flagChangeAmount };
};
