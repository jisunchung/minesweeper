//여러가지 게임 로직 구현
import type { cell } from "../types/game";

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
): { openedBoard: cell[][]; openedBlankCellCount: number } => {
  const openedBoard = board;
  //  방문한 셀을 추적하기 위한 Set
  const visited = new Set<string>();
  const ROWS = openedBoard.length;
  const COLS = openedBoard[0].length;

  // BFS를 위한 큐
  const queue: [number, number][] = [[startRow, startCol]];

  let front = 0;
  while (front < queue.length) {
    const [row, col] = queue[front++];
    const cellKey = `${row},${col}`;

    // 현재 셀 방문 표시
    visited.add(cellKey);
    openedBoard[row][col].isOpen = true;

    // 빈 셀인 경우에만 주변 셀을 큐에 추가
    if (openedBoard[row][col].value === 0) {
      // 주변 8방향의 셀을 큐에 추가
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue; // 현재 셀은 건너뛰기
          const newRow = row + i;
          const newCol = col + j;
          const newCellKey = `${newRow},${newCol}`;

          // 유효한 위치이고 아직 방문하지 않고 빈 셀인 경우에만 셀만 큐에 추가
          if (
            newRow >= 0 &&
            newRow < ROWS &&
            newCol >= 0 &&
            newCol < COLS &&
            openedBoard[newRow][newCol].value === 0 &&
            !visited.has(newCellKey) &&
            !openedBoard[newRow][newCol].isOpen
          ) {
            queue.push([newRow, newCol]);
          }
        }
      }
    }
  }
  const openedBlankCellCount = visited.size;

  return { openedBoard, openedBlankCellCount };
};
