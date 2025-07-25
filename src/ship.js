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

export { createShip };
