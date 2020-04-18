document.addEventListener("DOMContentLoaded", function () {
  /** Connect Four
   *
   * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
   * column until a player gets four-in-a-row (horiz, vert, or diag) or until
   * board fills (tie)
   */

  // global variables
  const WIDTH = 7; // y - html table
  const HEIGHT = 6; // x - html table
  let playerMove = 1; // active player: 1 or 2
  let board = []; // array of rows

  // board structure - array of rows, each row is array of cells  (board[y][x])
  const makeBoard = () => {
    for (let y = 0; y < HEIGHT; y++) {
      board.push(Array.from({ length: WIDTH }));
    }
  };

  /** makeHtmlBoard: make HTML table and row of column tops. */
  const makeHtmlBoard = () => {
    const board = document.getElementById("board"); // get board element
    const top = document.createElement("tr"); // create top of table - drop piece section 
    top.setAttribute("id", "column-top"); // add ID to top
    top.addEventListener("click", handleClick); // add event listener to handle clicks on top 
    createHeadCells(top);  // create top cells
    board.append(top);  // append the top to the html board

    for (let y = 0; y < HEIGHT; y++) {     //  iterate over table rows and column cells to create cells and rows
      const row = document.createElement("tr");
      for (let x = 0; x < WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);    // append cells to the row spaning the width of the row
      }
      board.append(row);   // append rows to the html board spaning the height
    }
  };
  // append headCells to the top of each column by iterating over the row
  const createHeadCells = (top) => {
    for (let x = 0; x < WIDTH; x++) {
      let headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }
    return top;
  };

  /** handleClick: handle click of column top to play piece */
  const handleClick = (evt) => {
    const x = evt.target.id;  // get x from ID of clicked cell
    const y = findSpotForCol(x);  // get next spot in column (if none, ignore click)
    if (y === null) {
      return;
    }
    board[y][x] = playerMove;  // place piece in board and add to HTML table
    placeInTable(y, x);
    checkForWin();   // call check for win function
    checkForTie();   //call check for tie function
    playerMove = playerMove === 1 ? 2 : 1;   // switch players - if player - then rotate
  };

  // findSpotForCol: given column x, return top empty y (null if filled)
  const findSpotForCol = (x) => {     // iterate over column to find empty y

    for (let y = HEIGHT - 1; y >= 0; y--) {
      if (!board[y][x]) {
        return y;
      }
    }
    return null;
  };

  // placeInTable: update DOM to place piece into HTML table of board
  function placeInTable(y, x) {
    let piece = document.createElement("div");  // create piece div
    piece.className += `piece player-${playerMove}`; // add classes to div
    piece.style.top = -50 * (y + 2);  // style dive
    let play = document.getElementById(`${y}-${x}`); //get location (y,x) of the play 
    play.append(piece);  // add div to the selected place in board
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */
  const checkForWin = () => {
    const _win = (cells) => {
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
    };

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
          return endGame(`Player ${playerMove} is the winner!`);
        }
      }
    }
  };
  //check for tie function
  const checkForTie = () => {
    let cellFillCheck = document.querySelectorAll(".piece").length;  // get the piece count from board
    if (cellFillCheck === 42) {  // check if the number of pieces played is equal to the number of cells 
      return endGame("Tie! Play again!");
    }
  };

  //endGame: announce game end
  const endGame = (msg) => {  //accepts message from check for tie & check for win functions
    alert(msg); // create html alert
  };
  makeBoard();  // calls the make board function to create the board
  makeHtmlBoard();  // calls the make board function to create the board
});
