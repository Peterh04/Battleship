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
      throw new Error("Out of bonds");

    if (position === "horizontal") {
      if (my2DArray[row][col] === "x") {
        let toFillCol = ship.length;
        let totalColRow = my2DArray[0].length;
        if (totalColRow - col >= toFillCol) {
          for (let i = 0; i < toFillCol; i++) {
            my2DArray[row][col] = ship.name;
            col++;
          }
        } else {
          throw new Error("Can't fit");
        }
      } else {
        throw new Error("The space is already occupied!");
      }
    } else {
      if (my2DArray[row][col] === "x") {
        let toFillCol = ship.length;
        let totalColRow = my2DArray[0].length;
        if (totalColRow - row >= toFillCol) {
          for (let i = 0; i < toFillCol; i++) {
            my2DArray[row][col] = ship.name;
            row++;
          }
        } else {
          throw new Error("Can't fit");
        }
      } else {
        throw new Error("The space is already occupied!");
      }
    }
  };

  return {
    my2DArray,
    placeShip,
  };
};

export { createGameBoard };

//  const placeShip = function placeShip(ship, row, col) {
//     if (my2DArray[row][col] === "x") {
//       let toFillCol = ship.length;
//       for (let i = 0; i <= toFillCol; i++) {
//         my2DArray[row][col] = ship.name;
//         col++;
//       }
//     }
//   };

//  const placeShip = function placeShip(ship, row, col) {
//     if (my2DArray[row][col] === "x") {
//       let toFillCol = ship.length;
//       let totalColRow = my2DArray[0].length;
//       for (let i = 0; i <= toFillCol; i++) {
//         if (totalColRow - col >= toFillCol) {
//           my2DArray[row][col] = ship.name;
//           col++;
//         } else {
//           throw new Error("Can't fit");
//         }
//       }
//     }
//   };
