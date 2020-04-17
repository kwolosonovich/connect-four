document.addEventListener("DOMContentLoaded", function () {
/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
// html table
const WIDTH = 7; // y
const HEIGHT = 6; // x

let playerMove = 1; // active player: 1 or 2
let board = []; // array of rows

// board structure - array of rows, each row is array of cells  (board[y][x])
function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  const board = document.getElementById("board");
  // top column of table - drop piece section with eventListener
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // append headCells to the top of each column by iterating over the row
  // append the top to the html board
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  // iterate over table rows and column cells
  // append cells to the row spaning the width of the row
  // append rows to the html board spaning the height
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

// findSpotForCol: given column x, return top empty y (null if filled)
// iterate over column to find empty y
function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

// placeInTable: update DOM to place piece into HTML table of board
// create piece div and append to cell of players selection
function placeInTable(y, x) {
  let piece = document.createElement("div");
  piece.className += `piece player-${playerMove}`
  piece.style.top = -50 * (y + 2);
  let play = document.getElementById(`${y}-${x}`);
  play.append(piece);
}

//endGame: announce game end 
function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  const x = evt.target.id;
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  board[y][x] = playerMove;
  placeInTable(y, x);
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${playerMove} is the winner!`);
  }
  // check for tie by counting the numbers of peices on the board
  let cellFillCheck = document.querySelectorAll(".piece").length
    console.log(cellFillCheck)
    if (cellFillCheck === 42) {
      console.log(cellFillCheck)
      return endGame('Tie! Play again!')
    }
  // switch players
  playerMove = playerMove === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match playerMove
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === playerMove
    );
  }

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      //check each row for horizontal win
      var horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      //check each row for vertial win
      var vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      //check row, column, row, column for diag right win 
      var diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      //check row, column, row, column for diag left win 
      var diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];
      //if any combo is true, return true - win
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
makeBoard();
makeHtmlBoard();
})
