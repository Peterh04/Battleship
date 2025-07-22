import { createGameBoard } from "../src/gameBoard";
import { createShip } from "../src/ship";

describe("createGameBoard", () => {
  it("should contain 10rows", () => {
    expect(createGameBoard().my2DArray.length).toBe(10);
  });
  it("should contain 10collumns per each row", () => {
    expect(createGameBoard().my2DArray[0].length).toBe(10);
    expect(createGameBoard().my2DArray[1].length).toBe(10);
    expect(createGameBoard().my2DArray[2].length).toBe(10);
  });

  it("should place ships at the right coordinates verttical or horizontal", () => {
    const gameBoard1 = createGameBoard();
    const carrier = createShip("Carrier", 5);
    const patrolBoat = createShip("Patrol Boat", 2);
    const destroyer = createShip("Destroyer", 3);

    gameBoard1.placeShip(carrier, 0, 0, "horizontal");
    expect(gameBoard1.my2DArray[0][0]).toBe("Carrier");
    expect(gameBoard1.my2DArray[0][1]).toBe("Carrier");
    expect(gameBoard1.my2DArray[0][2]).toBe("Carrier");
    expect(gameBoard1.my2DArray[0][3]).toBe("Carrier");
    expect(gameBoard1.my2DArray[0][4]).toBe("Carrier");

    gameBoard1.placeShip(patrolBoat, 5, 0, "verttical");
    expect(gameBoard1.my2DArray[5][0]).toBe("Patrol Boat");
    expect(gameBoard1.my2DArray[6][0]).toBe("Patrol Boat");

    gameBoard1.placeShip(destroyer, 3, 1, "verttical");
    expect(gameBoard1.my2DArray[3][1]).toBe("Destroyer");
    expect(gameBoard1.my2DArray[4][1]).toBe("Destroyer");
    expect(gameBoard1.my2DArray[5][1]).toBe("Destroyer");
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

  it("should disallow placing ships out of bonds", () => {
    const submarine = createShip("Submarine", 3);
    const gameBoard1 = createGameBoard();

    expect(() => gameBoard1.placeShip(submarine, -1, 5, "horizontal")).toThrow(
      "Out of bonds"
    );
    expect(() => gameBoard1.placeShip(submarine, 1, 11, "horizontal")).toThrow(
      "Out of bonds"
    );
    expect(() => gameBoard1.placeShip(submarine, 1, -5, "horizontal")).toThrow(
      "Out of bonds"
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
});
