//여러가지 게임 로직 구현
import type { cell } from "../types/game";

//initializeGameBoard
export const initializeGameBoard = (
  rows: number,
  cols: number,
  mineCount: number
): { cellBoard: cell[][]; minePositions: number[][] } => {
  const board = Array.from({ length: rows }, () => Array(cols).fill(0));
  //지뢰 랜덤 배치
  let placedMines = 0;
  const minePositions: [number, number][] = [];
  const MINE = -1;

  while (placedMines !== mineCount) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);
    if (board[randomRow][randomCol] !== -1) {
      board[randomRow][randomCol] = MINE;
      minePositions.push([randomRow, randomCol]);
      placedMines++;
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
  return { cellBoard, minePositions };
};

//우클릭시 깃발 토글
export const toggleFlag = (
  gameBoard: cell[][],
  row: number,
  col: number
): { newBoard: cell[][]; flagChangeAmount: number } => {
  const newBoard = deepCopyBoard(gameBoard);
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

export const deepCopyBoard = (board: cell[][]): cell[][] => {
  return board.map((row) => row.map((cell) => ({ ...cell })));
};

//인접한 빈칸 모두 열기
export const openAdjacentBlank = (
  board: cell[][],
  startRow: number,
  startCol: number
): { openedBoard: cell[][]; updateCellCount: number } => {
  const openedBoard = deepCopyBoard(board);

  const ROWS = openedBoard.length;
  const COLS = openedBoard[0].length;
  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

  // BFS를 위한 큐
  const queue: [number, number][] = [[startRow, startCol]];
  let updateCellCount = 1;

  let front = 0;
  while (front < queue.length) {
    const [row, col] = queue[front++];

    // 현재 셀 방문 표시
    visited[row][col] = true;
    openedBoard[row][col].isOpen = true;

    // 주변 8방향의 셀을 큐에 추가
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue; // 현재 셀은 건너뛰기
        const [newRow, newCol] = [row + i, col + j];

        // 유효한 위치이고 아직 방문하지 않고 빈 셀인 경우에만 셀만 큐에 추가
        if (
          newRow >= 0 &&
          newRow < ROWS &&
          newCol >= 0 &&
          newCol < COLS &&
          openedBoard[newRow][newCol].value === 0 &&
          !visited[newRow][newCol]
        ) {
          queue.push([newRow, newCol]);
          visited[newRow][newCol] = true;
          updateCellCount++;
        }
      }
    }
  }

  return { openedBoard, updateCellCount };
};
