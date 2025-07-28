import { createGameBoard } from "../src/gameBoard";
import { createShip } from "../src/ship";

describe("createGameBoard", () => {
  it("should contain 10rows", () => {
    expect(createGameBoard().my2DArray.length).toBe(10);
  });
  it("should contain 10 columns per each row", () => {
    expect(createGameBoard().my2DArray[0].length).toBe(10);
    expect(createGameBoard().my2DArray[1].length).toBe(10);
    expect(createGameBoard().my2DArray[2].length).toBe(10);
  });

  it("should place ships at the right coordinates vertical or horizontal", () => {
    const gameBoard1 = createGameBoard();
    const carrier = createShip("Carrier", 5);
    const patrolBoat = createShip("Patrol Boat", 2);
    const destroyer = createShip("Destroyer", 3);

    gameBoard1.placeShip(carrier, 0, 0, "horizontal");
    expect(gameBoard1.my2DArray[0][0].name).toBe("Carrier");
    expect(gameBoard1.my2DArray[0][1].name).toBe("Carrier");
    expect(gameBoard1.my2DArray[0][2].name).toBe("Carrier");
    expect(gameBoard1.my2DArray[0][3].name).toBe("Carrier");
    expect(gameBoard1.my2DArray[0][4].name).toBe("Carrier");

    gameBoard1.placeShip(patrolBoat, 5, 0, "vertical");
    expect(gameBoard1.my2DArray[5][0].name).toBe("Patrol Boat");
    expect(gameBoard1.my2DArray[6][0].name).toBe("Patrol Boat");

    gameBoard1.placeShip(destroyer, 3, 1, "vertical");
    expect(gameBoard1.my2DArray[3][1].name).toBe("Destroyer");
    expect(gameBoard1.my2DArray[4][1].name).toBe("Destroyer");
    expect(gameBoard1.my2DArray[5][1].name).toBe("Destroyer");
  });

  it("should disallow placing larges ships at small left coordinates ", () => {
    const carrier = createShip("Carrier", 5);
    const gameBoard1 = createGameBoard();

    gameBoard1.placeShip(carrier, 0, 0, "horizontal");

    expect(() => gameBoard1.placeShip(carrier, 0, 6, "horizontal")).toThrow(
      "Can't fit"
    );
    expect(() => gameBoard1.placeShip(carrier, 0, 7, "horizontal")).toThrow(
      "Can't fit"
    );
    expect(() => gameBoard1.placeShip(carrier, 0, 9, "horizontal")).toThrow(
      "Can't fit"
    );
  });

  it("should disallow placing ships out of bounds", () => {
    const submarine = createShip("Submarine", 3);
    const gameBoard1 = createGameBoard();

    expect(() => gameBoard1.placeShip(submarine, -1, 5, "horizontal")).toThrow(
      "Out of bounds"
    );
    expect(() => gameBoard1.placeShip(submarine, 1, 11, "horizontal")).toThrow(
      "Out of bounds"
    );
    expect(() => gameBoard1.placeShip(submarine, 1, -5, "horizontal")).toThrow(
      "Out of bounds"
    );
  });

  it("should disallow placcing ships on occupied coordinates!", () => {
    const gameBoard1 = createGameBoard();
    const patrolBoat = createShip("Patrol Boat", 2);
    const destroyer = createShip("Destroyer", 3);

    gameBoard1.placeShip(patrolBoat, 1, 0, "horizontal");

    expect(() => gameBoard1.placeShip(destroyer, 1, 0, "horizontal")).toThrow(
      "The space is already occupied!"
    );
  });

  it("should allow ships to receiveAttack", () => {
    const gameBoard1 = createGameBoard();
    const patrolBoat = createShip("Patrol Boat", 2);
    const destroyer = createShip("Destroyer", 3);

    gameBoard1.placeShip(patrolBoat, 1, 0, "horizontal");

    gameBoard1.receiveAttack(1, 0);

    expect(patrolBoat.hitNumber).toBe(1);

    gameBoard1.placeShip(destroyer, 0, 2, "vertical");
    gameBoard1.receiveAttack(0, 2);
    gameBoard1.receiveAttack(1, 2);

    expect(destroyer.hitNumber).toBe(2);
  });

  it("should record the missed coordinates", () => {
    const gameBoard1 = createGameBoard();
    const patrolBoat = createShip("Patrol Boat", 2);
    const destroyer = createShip("Destroyer", 3);

    gameBoard1.placeShip(patrolBoat, 1, 0, "horizontal");
    gameBoard1.receiveAttack(1, 0);
    gameBoard1.receiveAttack(2, 0);
    gameBoard1.receiveAttack(2, 2);

    expect(gameBoard1.my2DArray[1][0] === "missed").toBeFalsy();
    expect(gameBoard1.my2DArray[2][0] === "missed").toBeTruthy();
    expect(gameBoard1.my2DArray[2][2] === "missed").toBeTruthy();
  });

  it("should prevent receiving attacks on a missed coordinates", () => {
    const gameBoard1 = createGameBoard();
    const patrolBoat = createShip("Patrol Boat", 2);
    const destroyer = createShip("Destroyer", 3);

    gameBoard1.placeShip(patrolBoat, 1, 0, "horizontal");
    gameBoard1.receiveAttack(1, 0);
    gameBoard1.receiveAttack(2, 0);
    gameBoard1.receiveAttack(2, 2);

    expect(() => gameBoard1.receiveAttack(2, 0)).toThrow(
      "You can't attack here"
    );
    expect(() => gameBoard1.receiveAttack(2, 2)).toThrow(
      "You can't attack here"
    );
  });

  it("should be able to identify if all sinks have sunk", () => {
    const carrier = createShip("Carrier", 5);
    const battleship = createShip("Battleship", 4);
    const destroyer = createShip("Destroyer", 3);
    const submarine = createShip("Submarine", 3);
    const patrolBoat = createShip("Patrol Boat", 2);
    const gameBoard1 = createGameBoard();

    expect(
      gameBoard1.allShipSunk(
        carrier,
        battleship,
        destroyer,
        submarine,
        patrolBoat
      )
    ).toBeFalsy();

    const gameBoard2 = createGameBoard();
    gameBoard2.placeShip(carrier, 0, 0, "horizontal");
    gameBoard2.placeShip(battleship, 1, 0, "horizontal");
    gameBoard2.placeShip(destroyer, 2, 0, "horizontal");
    gameBoard2.placeShip(submarine, 3, 0, "horizontal");
    gameBoard2.placeShip(patrolBoat, 4, 0, "horizontal");

    gameBoard2.receiveAttack(0, 0);
    gameBoard2.receiveAttack(0, 1);
    gameBoard2.receiveAttack(0, 2);
    gameBoard2.receiveAttack(0, 3);
    gameBoard2.receiveAttack(0, 4);

    gameBoard2.receiveAttack(1, 0);
    gameBoard2.receiveAttack(1, 1);
    gameBoard2.receiveAttack(1, 2);
    gameBoard2.receiveAttack(1, 3);

    gameBoard2.receiveAttack(2, 0);
    gameBoard2.receiveAttack(2, 1);
    gameBoard2.receiveAttack(2, 2);

    gameBoard2.receiveAttack(3, 0);
    gameBoard2.receiveAttack(3, 1);
    gameBoard2.receiveAttack(3, 2);

    gameBoard2.receiveAttack(4, 0);
    gameBoard2.receiveAttack(4, 1);

    console.log(submarine.isSunk);

    expect(
      gameBoard2.allShipSunk(
        carrier,
        battleship,
        destroyer,
        submarine,
        patrolBoat
      )
    ).toBeTruthy();
  });
});
