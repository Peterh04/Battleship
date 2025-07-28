const renderBoard = function renderBoard(gameBoard, container, isEnemyBoard) {
  container.innerHTML = "";
  container.classList.add("board");

  for (let row = 0; row < gameBoard.length; row++) {
    for (let col = 0; col < gameBoard[row].length; col++) {
      const cellValue = gameBoard[row][col];
      const cellDIv = document.createElement("div");
      cellDIv.classList.add("cell");
      cellDIv.setAttribute("data-row", row);
      cellDIv.setAttribute("data-col", col);
      typeof cellValue === "object"
        ? (cellDIv.textContent = cellValue.name)
        : (cellDIv.textContent = cellValue);
      container.appendChild(cellDIv);
    }
  }
};

export { renderBoard };
