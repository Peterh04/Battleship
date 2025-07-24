import { createShip } from "./ship";

const createGameBoard = function createGameBoard() {
  const carrier = createShip("Carrier", 5);
  const battleship = createShip("Battleship", 4);
  const destroyer = createShip("Destroyer", 3);
  const submarine = createShip("Submarine", 3);
  const patrolBoat = createShip("Patrol Boat", 2);

  const rows = 10;
  const col = 10;
  const my2DArray = [];

  for (let i = 0; i < rows; i++) {
    my2DArray[i] = [];
    for (let j = 0; j < col; j++) {
      my2DArray[i][j] = "x";
    }
  }

  const placeShip = function placeShip(ship, row, col, position) {
    if (row < 0 || row >= 10 || col < 0 || col >= 10)
      throw new Error("Out of bounds");

    if (!canFit(ship.length, row, col, position, 10)) {
      throw new Error("Can't fit");
    }

    if (!pathEmpty(ship.length, row, col, position, my2DArray)) {
      throw new Error("The space is already occupied!");
    }

    for (let i = 0; i < ship.length; i++) {
      my2DArray[row][col] = ship.name;
      if (position === "horizontal") col++;
      else row++;
    }
  };

  return {
    my2DArray,
    placeShip,
  };
};

export { createGameBoard };

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
