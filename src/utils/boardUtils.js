//canFit Helper

const canFit = function canFit(shipLength, row, col, position, boardSize = 10) {
  if (position === "horizontal") {
    return shipLength + col <= boardSize;
  } else if (position === "vertical") {
    return shipLength + row <= boardSize;
  }
  return false;
};

//pathEmpty Helper
const pathEmpty = function pathEmpty(shipLength, row, col, postion, board) {
  if (postion === "horizontal") {
    for (let i = 0; i < shipLength; i++) {
      if (board[row][col + i] !== "x") {
        return false;
      }
    }
    return true;
  } else if (postion === "vertical") {
    for (let i = 0; i < shipLength; i++) {
      if (board[row + i][col] !== "x") {
        return false;
      }
    }
    return true;
  }
};

export { canFit, pathEmpty };
