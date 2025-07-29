import { createPlayer } from "./player.js";
import { renderBoard } from "./render.js";
import { createShip } from "./ship.js";

//ships
const carrier = createShip("Carrier", 5);
const battleship = createShip("Battleship", 4);
const destroyer = createShip("Destroyer", 3);
const submarine = createShip("Submarine", 3);
const patrolBoat = createShip("Patrol Boat", 2);

const ships = [carrier, battleship, destroyer, submarine, patrolBoat];

const player1 = createPlayer("Peter");
const player2 = createPlayer("Ndzikwa");

//gameBoards
let player1GameBoard = player1.playerGameBoard;
let player2GameBoard = player2.playerGameBoard;

//player1
player1GameBoard.placeShip(carrier, 0, 0, "horizontal");
player1GameBoard.placeShip(battleship, 4, 5, "vertical");
player1GameBoard.placeShip(destroyer, 0, 8, "vertical");
player1GameBoard.placeShip(submarine, 6, 1, "horizontal");
player1GameBoard.placeShip(patrolBoat, 9, 7, "horizontal");

renderBoard(
  player1GameBoard.my2DArray,
  document.getElementById("player-board"),
  false
);

//player2

player2GameBoard.placeShip(carrier, 0, 0, "vertical");
player2GameBoard.placeShip(battleship, 0, 3, "horizontal");
player2GameBoard.placeShip(destroyer, 3, 5, "vertical");
player2GameBoard.placeShip(submarine, 6, 1, "horizontal");
player2GameBoard.placeShip(patrolBoat, 8, 4, "horizontal");

renderBoard(
  player2GameBoard.my2DArray,
  document.getElementById("enemy-board"),
  true
);

const enemyBoard = document.querySelector(".enemy-board");
enemyBoard.addEventListener("click", (e) => {
  if (!e.target.classList.contains("cell")) return;
  const cell = e.target;

  const row = parseInt(cell.getAttribute("data-row"));
  const col = parseInt(cell.getAttribute("data-col"));

  player2GameBoard.receiveAttack(row, col);

  player2GameBoard.isShipSunk(row, col);

  renderBoard(
    player2GameBoard.my2DArray,
    document.getElementById("enemy-board"),
    true
  );
});

// if (
//   carrier.isSunk() ||
//   battleship.isSunk() ||
//   destroyer.isSunk() ||
//   submarine.isSunk() ||
//   patrolBoat.isSunk()
// ) {
//   console.log("Boat sunk");
// }
