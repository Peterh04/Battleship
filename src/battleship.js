const rows = 10;
const col = 10;
const my2DArray = [];

for (let i = 0; i < rows; i++) {
  my2DArray[i] = [];
  for (let j = 0; j < col; j++) {
    my2DArray[i][j] = "x";
  }
}
let totalColRow = my2DArray[0].length;
let toFillCol = 5;
let rowIcremator = 5;
let initialCol = rowIcremator;
for (let i = 0; i < toFillCol; i++) {
  if (totalColRow - initialCol >= toFillCol) {
    my2DArray[0][rowIcremator] = "l";
    rowIcremator++;
  }
}

console.log(my2DArray);
