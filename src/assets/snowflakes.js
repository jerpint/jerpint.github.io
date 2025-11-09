let w;
let columns;
let rows;
let board;
let next;

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  w = 8;
  // Calculate columns and rows
  columns = floor(width / w);
  rows = floor(height / w);
  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // Going to use multiple 2D arrays and swap them
  init();
}

function draw() {
  background(255);
  background(210, 225, 230)
  // generate();
  //
  var radius = w * 1 // 0.5
  var offset_hex = 0.5 * w
  // fill(0, 230, 255)
  // stroke(0, 230, 255)
  fill(90, 150, 165)
  stroke(90, 150, 165)

  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if (board[i][j] == 1) {
        if (j % 2 == 0) {
          circle(i * w, j * w, radius);
        }
        else {
          circle(i * w + offset_hex, j * w, radius);
        }
     }
    }
  }
  board = step(board)
  if (board[board.length - 2].reduce((a, b) => a + b) > 1) {
      init()
      noLoop()
  }
}

// reset board when mouse is pressed
function mousePressed() {
  noLoop()
}

function mouseReleased() {
  // init();
  loop();
}

function getNeighbors(i, j, board){
  let neighbors = []
  if (j % 2 == 0) {
    neighbors.push(board[i-1][j-1])
    neighbors.push(board[i][j-1])
    neighbors.push(board[i-1][j]) 
    neighbors.push(board[i+1][j])
    neighbors.push(board[i-1][j+1])
    neighbors.push(board[i][j+1])
  }
  else {
    neighbors.push(board[i][j-1])
    neighbors.push(board[i+1][j-1])
    neighbors.push(board[i-1][j])
    neighbors.push(board[i+1][j])
    neighbors.push(board[i][j+1])
    neighbors.push(board[i+1][j+1])
  }
  // console.log(neighbors)
  return neighbors 
}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
        board[i][j] = 0
    } 
  }
  board[floor(columns/2)][floor(rows/2)] = 1
}


// Fill board randomly
function step(board) {
  nextBoard = new Array(columns);
  for (i = 0; i < columns; i++) {
    nextBoard[i] = new Array(rows);
  }
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
        nextBoard[i][j] = board[i][j]
    } 
  }
  
  for (let i = 1; i < columns - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      neighbors = getNeighbors(i, j, board)
      sum = neighbors.reduce((a, b) => a + b)
      if (sum == 1) {
          nextBoard[i][j] = 1
      }
      else if (sum == 2) {
          nextBoard[i][j] = 0
      }
      else if (sum == 3) {
          nextBoard[i][j] = 0
      }
      else if (sum == 4) {
          nextBoard[i][j] = 1
      }
      else if (sum == 5) {
          nextBoard[i][j] = 1
      }
      else if (sum == 6) {
          nextBoard[i][j] = 0
      }

    }
  }
  return nextBoard
}
