import { createShip } from "../src/ship";

describe("ship", () => {
  it("should return the correct name of various ships", () => {
    expect(createShip("Carrier", 5).name).toBe("Carrier");
    expect(createShip("Battleship", 4).name).toBe("Battleship");
    expect(createShip("Patrol Boat", 2).name).toBe("Patrol Boat");
  });

  it("should return the correct lenth of various ships", () => {
    expect(createShip("Carrier", 5).length).toBe(5);
    expect(createShip("Battleship", 4).length).toBe(4);
    expect(createShip("Patrol Boat", 2).length).toBe(2);
  });

  it("should return 0 for the hits for a new ship", () => {
    expect(createShip("Carrier", 5).hitNumber).toBe(0);
  });

  it("should increase the hitNumber to the number the ship has been hit", () => {
    const carrier = createShip("Carrier", 5);
    carrier.hit();
    carrier.hit();
    carrier.hit();
    expect(carrier.hitNumber).toBe(3);

    const battleShip = createShip("Battleship", 4);
    battleShip.hit();
    battleShip.hit();
    expect(battleShip.hitNumber).toBe(2);
  });

  it("should state if the ship has sunk or not", () => {
    expect(createShip("Carrier", 5).isSunk()).toBeFalsy();

    const battleShip = createShip("Battleship", 4);
    battleShip.hit();
    battleShip.hit();
    expect(battleShip.isSunk()).toBeFalsy();

    const submarine = createShip("Submarine", 3);
    submarine.hit();
    submarine.hit();
    submarine.hit();
    expect(submarine.isSunk()).toBeTruthy();
  });
});
