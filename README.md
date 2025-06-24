# 🧨 Minesweeper - React + TypeScript (지뢰찾기 게임)

지뢰찾기(Minesweeper) 게임을 **React**, **TypeScript**, **Vite**, **Recoil**, **Tailwind CSS**를 사용해 구현한 프로젝트입니다.

---

## 🚀 데모

- [배포 사이트 바로가기](https://minesweeper-jisun.netlify.app/)

---

## 📦 기술 스택

- **React** – UI 구성
- **TypeScript** – 정적 타입 시스템
- **Vite** – 빠른 개발 환경 구성 도구
- **Recoil** – 전역 상태 관리
- **Tailwind CSS** – 유틸리티 기반 CSS 프레임워크

---

## 📁 프로젝트 구조

```
src/
├── components/     # UI 컴포넌트 (예: Game, GameBoard, GameCell 등)
├── hooks/          # 커스텀 훅 (예: 게임 초기화, 셀 클릭 등)
├── atoms/          # Recoil을 이용한 전역 상태 관리
├── utils/          # 게임 로직 관련 유틸 함수 모음
├── types/          # 공통 타입 정의 (예: Cell, GameStatus 등)
├── assets/         # 이미지, 아이콘 등 정적 리소스 파일
```

---

## 🕹️ 게임 조작 방법

- **왼쪽 클릭** : 셀을 엽니다.
  숫자는 주변 8칸의 지뢰 개수를 의미합니다. 지뢰를 클릭하면 게임이 종료됩니다.
- **오른쪽 클릭** : 셀에 깃발을 꽂거나 해제합니다.
- **이모지 버튼** : 게임을 초기화하고 새로 시작합니다.
- **승리 조건** :
  모든 지뢰가 아닌 셀을 열거나, 모든 지뢰 위치에 정확히 깃발을 꽂으면 승리합니다.

---

## ✨ 주요 기능

- 난이도 선택 (초급 / 중급 / 고급)
- 셀 열기 / 깃발 표시 (왼쪽/오른쪽 클릭)
- 빈 칸 자동 오픈
- 게임 상태(진행, 승리, 패배) 실시간 표시
- 타이머 기능
- 반응형 UI
- 새 게임 시작 기능

---

## 🔍 셀 클릭시 인접한 셀을 여는 로직

```ts
export const openAdjacentBlank = (
  board: cell[][],
  startRow: number,
  startCol: number
): { openedBoard: cell[][]; updateCellCount: number } => {
  const openedBoard = deepCopyBoard(board);
  const ROWS = openedBoard.length;
  const COLS = openedBoard[0].length;
  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  const queue: [number, number][] = [[startRow, startCol]];
  let updateCellCount = 1;
  let front = 0;
  while (front < queue.length) {
    const [row, col] = queue[front++];
    visited[row][col] = true;
    openedBoard[row][col].isOpen = true;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const [newRow, newCol] = [row + i, col + j];
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
```

openAdjacentBlank 함수는 빈 셀(값이 0인 셀)을 클릭했을 때,
BFS(너비 우선 탐색) 알고리즘을 이용해 인접한 빈 칸들을 한 번에 열어주는 로직입니다.

- queue를 이용해 인접 셀들을 순차적으로 탐색합니다.
- 중복 탐색을 방지하기 위해 visited 배열을 사용합니다.
- 주변 8방향 셀 중 값이 0인 셀을 계속해서 큐에 추가하여 확장합니다.
- 클릭한 셀과 연결된 모든 빈 칸을 열고, 열린 셀의 개수를 함께 반환합니다.

---

## 🖼️ 미리보기

![프로젝트 미리보기](/src/assets/preview1.png)
![프로젝트 미리보기](/src/assets/preview2.png)

---

## 📚 참고 자료

- https://minesweeper.online/
