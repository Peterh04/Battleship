import { createShip } from "./ship.js";
import { canFit, pathEmpty } from "./utils/boardUtils.js";

const createGameBoard = function createGameBoard() {
  const carrier = createShip("Carrier", 5);
  const battleship = createShip("Battleship", 4);
  const destroyer = createShip("Destroyer", 3);
  const submarine = createShip("Submarine", 3);
  const patrolBoat = createShip("Patrol Boat", 2);

  const ships = [carrier, battleship, destroyer, submarine, patrolBoat];

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
      if (position === "horizontal") {
        my2DArray[row][col + i] = ship;
      } else {
        my2DArray[row + i][col] = ship;
      }
    }
  };

  const receiveAttack = function receiveAttack(row, col) {
    const cell = my2DArray[row][col];
    if (typeof cell === "object" && cell !== null && cell.hit) {
      cell.hit();
    } else if (cell === "missed") {
      throw new Error("You can't attack here");
    } else my2DArray[row][col] = "missed";
  };

  return {
    my2DArray,
    placeShip,
    receiveAttack,
    allShipSunk(...ships) {
      return ships.every((ship) => ship.isSunk());
    },
  };
};

export { createGameBoard };
