//Ship factory

const createShip = function createShip(name, length) {
  return {
    name: name,
    length: length,
    hitNumber: 0,
    hit() {
      this.hitNumber++;
    },
    isSunk() {
      return this.hitNumber === length;
    },
  };
};

// const carrier = createShip("Carrier", 5);
// const battleship = createShip("Battleship", 4);
// const destroyer = createShip("Destroyer", 3);
// const submarine = createShip("Submarine", 3);
// const patrolBoat = createShip("Patrol Boat", 2);

export { createShip };
