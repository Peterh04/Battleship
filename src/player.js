import { createGameBoard } from "./gameBoard.js";

const createPlayer = function createPlayer(playerName) {
  const playerGameBoard = createGameBoard();
  return {
    playerName,
    playerGameBoard,
  };
};

export { createPlayer };
