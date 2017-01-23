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

  //variable that holds the number of mines
  var numberOfMines = 0;

  //function that counts the number of mines on the board and returns it to the numberOfMines variable.
  function getNumberOfMines(){
      for (var k=0; k < board.cells.length; k++){
        if(board.cells[k].isMine === true){
          numberOfMines += 1;
        }
      }
  }

  //Function that counts how many mines have been found. If a cell is a mine and is marked, then the minesFound variable increases.

    var minesFound = 0;
    var falseMine = 0;

  function markedMines(){
      for (var k=0; k < board.cells.length; k++){
        if( (board.cells[k].isMine === true) && (board.cells[k].isMarked === true) ){
          minesFound += 1;
        }
        //if the user flags a cell that doesn't contain a mine, then this is counted a falseMine.
        if( (board.cells[k].isMine === false) && (board.cells[k].isMarked === true) ){
          falseMine += 1;
        }
      }

      //if the number of minesFound equals the numer of mines, and the number of falseMine's equal 0 then the user wins.
      if ( (minesFound == numberOfMines) && (falseMine == 0) ){
        lib.displayMessage('You win!')
      }
  }

  //function that will work out the how many cells need to be visable for the user to win. It will count the number of visable squares, if it equals the winning number of squares, then the user will win.
  function checkVisable(){
    var winningNumber = (board.cells.length - numberOfMines);
    var numberOfVisable = 0;
    for (var k=0; k < board.cells.length; k++){
      if( (board.cells[k].isMine == false) && (board.cells[k].hidden === false) ){
        numberOfVisable += 1;
      }
    }

    if ( (numberOfVisable == winningNumber) && (minesFound == numberOfMines) ) {
        lib.displayMessage('You win!')
    }

  }

  getNumberOfMines();
  checkVisable();
  markedMines();

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
