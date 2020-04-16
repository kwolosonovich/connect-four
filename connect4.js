/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
  // html table
   const htmlBoard = document.getElementById("board");


const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows

// board structure - array of rows, each row is array of cells  (board[y][x])

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(
      Array.from({
        length: WIDTH,
      })
    );
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {

  // top column of table - drop piece section with eventListener
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // append headCells to the top of each column by iterating over the row
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }

  // iterate over table rows and column cells 
  // append cells to the row spaning the width of the row
  // append rows to the htmlBoard spaning the height of the board
  htmlBoard.append(top);

  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
// iterate over column to find empty y

//  TODO: write the real version of this, rather than always returning 0

// const findSpotForCol = ([=x) => {
//   for (y of x) {
//     if (false) {
//       return y
//     }
//   }
//   return null;
// };

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */
// create piece div and append to cell of players selection

function placeInTable(y, x) {
  let piece = document.createElement('div')
  piece.className += 'piece'
  piece.className += 'player-' + currPlayer

  
  let play = document.getElementById(`${y}-${x}`);
  play.append(piece)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
