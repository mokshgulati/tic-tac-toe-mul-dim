export const checkWinner = (
  board: string[][],
  row: number,
  col: number,
  player: string,
  size: number,
  winCondition: number
): boolean => {
  return (
    checkHorizontal(board, row, col, player, size, winCondition) ||
    checkVertical(board, row, col, player, size, winCondition) ||
    checkDiagonal(board, row, col, player, size, winCondition) ||
    checkAntiDiagonal(board, row, col, player, size, winCondition)
  );
};

export const checkHorizontal = (
  board: string[][],
  row: number,
  col: number,
  player: string,
  size: number,
  winCondition: number
): boolean => {
  let count = 0;
  for (let c = 0; c < size; c++) {
    if (board[row][c] === player) {
      count++;
      if (count >= winCondition) return true;
    } else {
      count = 0;
    }
  }
  return false;
};

export const checkVertical = (
  board: string[][],
  row: number,
  col: number,
  player: string,
  size: number,
  winCondition: number
): boolean => {
  let count = 0;
  for (let r = 0; r < size; r++) {
    if (board[r][col] === player) {
      count++;
      if (count >= winCondition) return true;
    } else {
      count = 0;
    }
  }
  return false;
};


export const checkDiagonal = (
  board: string[][],
  row: number,
  col: number,
  player: string,
  size: number,
  winCondition: number
): boolean => {
  let startRow = row;
  let startCol = col;
  while (startRow > 0 && startCol > 0) {
    startRow--;
    startCol--;
  }

  let count = 0;
  while (startRow < size && startCol < size) {
    if (board[startRow][startCol] === player) {
      count++;
      if (count >= winCondition) return true;
    } else {
      count = 0;
    }
    startRow++;
    startCol++;
  }
  return false;
};

export const checkAntiDiagonal = (
  board: string[][],
  row: number,
  col: number,
  player: string,
  size: number,
  winCondition: number
): boolean => {
  let startRow = row;
  let startCol = col;
  while (startRow > 0 && startCol < size - 1) {
    startRow--;
    startCol++;
  }

  let count = 0;
  while (startRow < size && startCol >= 0) {
    if (board[startRow][startCol] === player) {
      count++;
      if (count >= winCondition) return true;
    } else {
      count = 0;
    }
    startRow++;
    startCol--;
  }
  return false;
};

export const createEmptyBoard = (size: number): string[][] => {
  return Array(size).fill(null).map(() => Array(size).fill(''));
};

export const copyBoard = (board: string[][]): string[][] => {
  return board.map(row => [...row]);
}; 