document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells:[
          {row:1, col:1, isMine:true, hidden:true},{row:1, col:2, isMine:false, hidden:true},{row:1, col:3, isMine:false, hidden:true},{row:1, col:4, isMine:false, hidden:true},
          {row:2, col:1, isMine:false, hidden:true},{row:2, col:2, isMine:false, hidden:true},{row:2, col:3, isMine:false, hidden:true},{row:2, col:4, isMine:false, hidden:true},
          {row:3, col:1, isMine:false, hidden:true},{row:3, col:2, isMine:false, hidden:true},{row:3, col:3, isMine:false, hidden:true},{row:3, col:4, isMine:true, hidden:true},
          {row:4, col:1, isMine:false, hidden:true},{row:4, col:2, isMine:false, hidden:true},{row:4, col:3, isMine:true, hidden:true},{row:4, col:4, isMine:false, hidden:true}
        ]
}

function startGame () {
  for(var i=0; i < board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

  document.addEventListener('click', function(){
    checkForWin()
  });

  document.addEventListener('contextmenu', function(){
    checkForWin()
  });

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  var numberOfMines = 0;
  var minesFound = 0;
  var falseMines =0;
  var visableCells = 0;

  // Counts the number of mines on the board
  function mineCounter(){
    for (var i=0; i <  board.cells.length; i++){
      if (board.cells[i].isMine === true){
        numberOfMines +=1;
      }
    }
  }

  // Counts the number of mines that are successfully marked
  function minesMarked(){
    for (var j=0; j < board.cells.length; j++){
        if( (board.cells[j].isMine === true) && (board.cells[j].isMarked === true) ){
          minesFound += 1;
        }
      }
  }


  // Counts the number of false flags on cells that aren't mines
  function falseMineCounter(){
    for (var k=0; k < board.cells.length; k++){
        if( (board.cells[k].isMine === false) && (board.cells[k].isMarked === true) ){
          falseMines += 1;
        }
      }
  }

  // Counts the numer of visable cells
  function visableCellsCounter(){
    for (var l=0; l < board.cells.length; l++){
        if( (board.cells[l].isMine === false) && (board.cells[l].hidden === false) ){
          visableCells += 1;
        }
      }
  }


  mineCounter();
  minesMarked();
  falseMineCounter();
  visableCellsCounter();

  // Evaluates the win condition
  if ( (falseMines == 0) && (minesFound == numberOfMines) && (visableCells == (board.cells.length - numberOfMines)) ){
    lib.displayMessage('You win!');
  }


  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {

    //for each cell we want to count the surrounding mines. It will loop through each cell as per the function StartGame

    //for each cell use the provided function to get an array with the cells the surround it
    var surrounding = lib.getSurroundingCells(cell.row, cell.col)

    var mineCounter = 0

    //for each element in the array count the numer of times.cell.isMine is true
    for (var j = 0; j < surrounding.length; j++){
      if (surrounding[j].isMine){
        mineCounter += 1
      }
    }

    //return that number and it will be added to the surroundingMines property
    return mineCounter
}

















//
