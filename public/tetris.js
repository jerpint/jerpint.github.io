/*
Implementation of tetris using p5.js
The game is played with vim keybindings
Written by: Jeremy Pinto, jerpint@gmail.com
*/
let fps = 60; // frames per second
let w = 25; // block size
var leftBuffer; // draw game here
var rightBuffer; // draw stats here
let highScore = 0;

function setup() {
  frameRate(fps);
  tetris = new Tetris() // instantiate game

  let displayCols = 10
  let totalCols = tetris.columns + displayCols

  // 2 splits - one to show the game, one to display stats
  let canvas = createCanvas(w*totalCols, w*tetris.rows);
  // Attach canvas to the tetris-container div
  canvas.parent('tetris-container');
  leftBuffer = createGraphics(w*tetris.columns, w*tetris.rows);
  rightBuffer = createGraphics(w*displayCols, w*tetris.rows);
}

function draw() {
    // Draw on your buffers however you like
    drawLeftBuffer();
    drawRightBuffer();
    // Paint the off-screen buffers onto the main canvas
    image(leftBuffer, 0, 0);
    image(rightBuffer, w*tetris.columns, 0);
}

function drawRightBuffer() {
    let background = [214, 214, 214]; // white
    rightBuffer.background(background);
    rightBuffer.fill(0, 0, 0);

    rightBuffer.textSize(20);
    rightBuffer.textAlign(LEFT, CENTER)
    rightBuffer.text('Left: H',   3.2*w, w*(tetris.rows-12));
    rightBuffer.text('Right: L',  3.2*w, w*(tetris.rows-11));
    rightBuffer.text('Rotate: K', 3.2*w, w*(tetris.rows-10));
    rightBuffer.text('Down: J',   3.2*w, w*(tetris.rows-9));
    rightBuffer.text('Drop: D',   3.2*w, w*(tetris.rows-8));
    rightBuffer.text('Pause: P',  3.2*w, w*(tetris.rows-7));
    rightBuffer.text('Reset: R',  3.2*w, w*(tetris.rows-6));

    rightBuffer.textSize(28);
    rightBuffer.textAlign(LEFT, CENTER)
    rightBuffer.text('Level: ' + tetris.level, w-5, w*(tetris.rows-3.4));
    rightBuffer.text('Lines: ' + tetris.tetrisCount, w-5, w*(tetris.rows-2.2));
    rightBuffer.text('High Score: ' + highScore, w-5, w*(tetris.rows-1));

    // draw next piece ?
    for ( let i = 0; i < tetris.nextPiece.columns; i++) {
      for ( let j = 0; j < tetris.nextPiece.rows; j++) {
        if ((tetris.nextPiece.currentGrid[i][j] != -1)) {
            let color = tetris.colors[tetris.nextPiece.currentGrid[i][j]]
            rightBuffer.fill(color);
        }
        else rightBuffer.fill(255);
        rightBuffer.stroke(0);
        rightBuffer.rect( (i+3) * w, (j+2) * w , w-1, w-1);
      }
    }
}

function drawLeftBuffer() {
  background(255);

  // game counter (used for level of difficulty/game speed)
  tetris.counter += 1
  if (tetris.counter % (fps- min(tetris.difficulty, fps-1) ) == 0) {
      tetris.step();
  }

  // draw piece on dynamic board on every step (moving pieces)
  tetris.addPieceToDynamicBoard()
  drawStaticBoard()
  drawDynamicBoard()

  // display pause
  if (tetris.pause){
    leftBuffer.textSize(50);
    leftBuffer.textAlign(LEFT, CENTER)
    leftBuffer.text('PAUSE', w*2-3.2, w*(tetris.rows-10));
  }

  // display game over
  if (tetris.gameOver){
    leftBuffer.fill(0);
    leftBuffer.textSize(35);
    leftBuffer.textAlign(LEFT, CENTER)
    leftBuffer.text('GAME OVER', w*1, w*(tetris.rows-10));
    leftBuffer.text('"R" to Reset', w, w*(tetris.rows-8));
    tetris = new Tetris()
  }
}

function drawStaticBoard() {
  // draw static board (accumulated pieces)
  for ( let i = 0; i < tetris.columns;i++) {
    for ( let j = 0; j < tetris.rows;j++) {
      if ((tetris.staticBoard[i][j] != -1)) {
          let color = tetris.colors[tetris.staticBoard[i][j]] 
          leftBuffer.fill(color);
      }
      else leftBuffer.fill(255);
      leftBuffer.stroke(0);
      leftBuffer.rect(i * w, j * w, w-1, w-1);
    }
  }
}

function drawDynamicBoard() {
  for ( let i = 0; i < tetris.columns;i++) {
    for ( let j = 0; j < tetris.rows;j++) {
      leftBuffer.stroke(0);
      if ((tetris.dynamicBoard[i][j] != -1)) {
          let color = tetris.colors[tetris.dynamicBoard[i][j]] 
          leftBuffer.fill(color);
          leftBuffer.rect(i * w, j * w, w-1, w-1);
      }
    }
  }
}

function keyTyped() {
  if (!tetris.pause && !tetris.gameOver) {
      // during gameplay
      if (key === 'l') {
          tetris.moveRight();
      } 
      else if (key === 'h') {
          tetris.moveLeft();
      } 
      else if (key === 'j') {
          tetris.step();
      }
      else if (key === 'k') {
          tetris.piece.rotatePieceCW()
      }
      else if (key === 'd') {
          // drop piece
          tetris.dropPiece();
          tetris.counter = -1  // forces a pass to the next piece, set to 0 for time to move
      }
  }
  if (key === 'r') {
      // reset game
      loop();
      setup()
  }
  if (key === 'p') {
      // toggle pause
      if (tetris.pause){
          loop();
          tetris.pause=false
      }
      else {
          noLoop();
          tetris.pause=true
      }
  }
}

function initBoard(columns, rows) {
    board = new Array(columns);
    for (let i = 0; i < columns; i++) {
        board[i] = new Array(rows);
    }
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          board[i][j] = -1 
        }
    }
    return board
}

class Piece {
    constructor() {
        this.x = 2
        this.y = -2
        this.rot = 0
        let nPieces = 7
        this.columns = gridCols;
        this.rows = gridRows;
        this.fillcolor = 128;
        this.allGrids = []
        
        // which piece will we generate (pieces are labelled from 0-7)
        this.pieceType = Math.floor(Math.random() * nPieces);

        // get the grids associated to the piece
        this.allGrids = gamePieces[this.pieceType]
        // set first grid to rotation 0
        this.currentGrid = this.allGrids[0]
    }
    isvalidrotateCW(){
        let nextRot = (this.rot + 1) % this.allGrids["length"]
        let nextGrid = this.allGrids[nextRot]

        for (let row = 3; row >= 0; row--) {
            for (let col = 3; col >= 0; col--) {
                let posx = this.x + col
                let posy = this.y + row
                if ( (nextGrid[col][row] != -1) & (posx < 0)) {
                    // will it hit left wall?
                    return false
                }
                if ( (nextGrid[col][row] != -1) & (posx == tetris.columns)) {
                    // will it hit right wall?
                    return false
                }
                posy = max(posy, 0) // clamp to 0
                posx = max(posx, 0) // clamp to 0
                posx = min(posx, tetris.columns - 1) // clamp to columns
                if ((nextGrid[col][row] != -1) & tetris.staticBoard[posx][posy] != -1) {
                    // will it hit another piece?
                    return false
                }
            }
        }
        return true
    }
    rotatePieceCW() {
        if (this.isvalidrotateCW()) {
            this.rot = (this.rot + 1) % this.allGrids["length"]
            this.currentGrid = this.allGrids[this.rot];
        }
    }
}


class Tetris {
    constructor() {
        // NES tetris dimensions
        this.columns = 10
        this.rows = 20 

        // the statisBoard keeps track of past piecs
        // the dymamicBoard keeps track of the current piece 
        this.staticBoard = initBoard(this.columns, this.rows)
        this.dynamicBoard = initBoard(this.columns, this.rows)
        this.nextPiece = new Piece() // get a generated piece
        this.piece = new Piece() // get a generated piece
        this.counter = 0 // game clock
        this.tetrisCount = 0 // will be used for the scoring
        this.pause = false // toggle game being played or paused
        this.gameOver = false

        // levels and game speed
        this.levelToDifficulty = [10, 20, 30, 40, 50, 54, 55, 57, 58, 59]
        this.level = 0
        this.difficulty = this.levelToDifficulty[this.level]
        this.colors = colorschemes[this.level]
    }
    addPieceToDynamicBoard() {
        // reset dynamic board
        this.dynamicBoard = initBoard(tetris.columns, tetris.rows)

        // Adds the current piece on the dynamic board
        for (let i = 0; i < this.piece.columns; i++) {
            for (let j = 0; j < this.piece.rows; j++) {
                if (this.piece.currentGrid[i][j] != -1) {
                    let posx = i + this.piece.x;
                    let posy = j + this.piece.y;
                    if (posx >= 0 && posx < this.columns && posy >= 0 && posy < this.rows + 2){
                        this.dynamicBoard[posx][posy] = this.piece.pieceType
                    }
                }
            }
        }
    }
    dropPiece() {
        while (!this.ispieceFinished()) {
            this.step()
        }
    }
    ispieceFinished() {
        // check if any pieces are under the piece or touches floor
        for (let col = 3; col >= 0; col--) {
            for (let row = 3; row >= 0; row--) {
                if  (this.piece.currentGrid[col][row] != -1) {

                    let posx = this.piece.x + col
                    let posy = this.piece.y + row + 1

                    if (posy == this.rows) {
                        // touches floor
                        return true;
                    }

                    // clamp values
                    posx = min(posx, tetris.columns)
                    posy = min(posy, tetris.rows)
                    posx = max(posx, 0)
                    posy = max(posy, 0)
                    if (this.staticBoard[posx][posy] != -1) {
                        // touches another piece
                        return true;
                    }


                }
            }
        }
        return false
    }
    validmoveRight(){
        // check if we would move out of bounds
        for (let row = 3; row >= 0; row--) {
            for (let col = 3; col >= 0; col--) {
                if ( (this.piece.currentGrid[col][row] != -1) & (this.piece.x + col == tetris.columns - 1)) {
                    // out of bounds
                    return false
                }
            }
        }
        // check if we hit a piece when moving
        for (let col = 3; col >= 0; col--) {
            for (let row = 3; row >= 0; row--) {
                if  (this.piece.currentGrid[col][row] != -1) {
                    let posx = this.piece.x + col
                    let posy = this.piece.y + row
                    posy = max(posy, 0)
                    if (this.staticBoard[posx + 1][posy] != -1) {
                        // hits another piece
                        return false
                    }
                }
            }
        }
        return true
    }
    moveRight() {
        if (this.validmoveRight()) this.piece.x += 1
    }
    moveLeft() {
        if (this.validmoveLeft()) this.piece.x -= 1
    }
    validmoveLeft() {
        // check if piece will go out of bounds
        for (let row = 3; row >= 0; row--) {
            for (let col = 3; col >= 0; col--) {
                if ( (this.piece.currentGrid[col][row] != -1) & (this.piece.x + col == 0)) {
                    // out of bounds
                    return false
                }
            }
        }

        // check if we hit a piece when moving
        for (let col = 3; col >= 0; col--) {
            for (let row = 3; row >= 0; row--) {
                if  (this.piece.currentGrid[col][row] != -1) {
                    let posx = this.piece.x + col
                    let posy = this.piece.y + row
                    posy = max(posy, 0)
                    if (this.staticBoard[posx - 1][posy] != -1) {
                        // hits another piece
                        return false
                    }
                }
            }
        }
        return true
    }

    addboards(board1, board2) {
        // add board2 to board1
        for (let i = 0; i < board2["length"]; i++) {
            for (let j = 0; j < board2[0]["length"]; j++) {
                if (board1[i][j] == -1){
                    board1[i][j] = board2[i][j]
                }
            }
        }
        return board1
    }

    gettetrisLines() {
        var tetrisLines = []
        for (let row = 0; row < this.staticBoard[0]["length"]; row++) {
            let isTetris = true
            for (let col = 0; col < this.staticBoard["length"]; col++) {
                if (this.staticBoard[col][row] == -1) {
                    isTetris = false
                }
            }
            if (isTetris){
                tetrisLines = tetrisLines.concat(row)
            }
        }
        this.tetrisCount += tetrisLines["length"]
        return tetrisLines.sort((a, b) => a - b).reverse() // numerical reverse sort
                

    }
    updateScore(){
    }
    clearLines(lines){
        // remove blocks that were tetris
        for (let i = 0; i < lines["length"]; i++) {
            let line = lines[i]
            for (let col = 0; col < this.staticBoard["length"]; col++) {
                this.staticBoard[col].splice(line, 1) // pop block from row
            }
        }
        // add blank blocks at the top
        for (let i = 0; i < lines["length"]; i++) {
            for (let col = 0; col < this.staticBoard["length"]; col++) {
                this.staticBoard[col].unshift(-1) // add new block at top
            }
        }
    }
    isgameOver (){
        for (let col = 0; col < this.staticBoard["length"]; col++) {
            if (this.staticBoard[col][0] != -1){
                print("GAME OVER")
                return true
            }
        }
        return false
    }
    updateLevel() {
        this.level = Math.floor(this.tetrisCount / 16)
        this.difficulty = this.levelToDifficulty[this.level % this.levelToDifficulty['length']]
        this.colors = colorschemes[this.level % (colorschemes['length'])]
    }
    step() {

        // did the piece finish?
        if (this.ispieceFinished()) {
            // add the piece to the static board
            this.staticBoard = this.addboards(this.staticBoard, this.dynamicBoard)

            // check if tetris and clear the lines
            let tetrisLines = this.gettetrisLines()
            if (tetrisLines["length"] > 0) {
                tetris.clearLines(tetrisLines)
            }

            if (this.isgameOver()) {
                  this.gameOver=true
                  noLoop();
            }
            else{
                // generate a new piece in the queue
                this.piece = this.nextPiece
                this.nextPiece = new Piece()
            }
        }

        // move piece down if not finished
        else this.piece.y += 1;

        // reset counter
        this.counter = 0;

        // add the piece to the dynamic board
        this.addPieceToDynamicBoard()

        this.updateLevel()

        // update high score
        highScore = max(highScore, tetris.tetrisCount)
    }
}

let gamePieces = []
let grids = []
gridCols = 4
gridRows = 4

// I piece
grids = []
grid = initBoard(gridCols, gridRows)
grid[1][0] = 0;
grid[1][1] = 0;
grid[1][2] = 0;
grid[1][3] = 0;
grids[0] = grid

grid = initBoard(gridCols, gridRows)
grid[0][2] = 0;
grid[1][2] = 0;
grid[2][2] = 0;
grid[3][2] = 0;
grids[1] = grid
gamePieces[0] = grids

// T piece
grids = []
grid = initBoard(gridCols, gridRows)
grid[1][2] = 1;
grid[2][2] = 1;
grid[3][2] = 1;
grid[2][3] = 1;
grids[0] = grid

grid = initBoard(gridCols, gridRows)
grid[2][1] = 1;
grid[2][2] = 1;
grid[2][3] = 1;
grid[1][2] = 1;
grids[1] = grid

grid = initBoard(gridCols, gridRows)
grid[1][2] = 1;
grid[2][2] = 1;
grid[3][2] = 1;
grid[2][1] = 1;
grids[2] = grid

grid = initBoard(gridCols, gridRows)
grid[2][1] = 1;
grid[2][2] = 1;
grid[2][3] = 1;
grid[3][2] = 1;
grids[3] = grid
gamePieces[1] = grids

// s piece
grids = []
grid = initBoard(gridCols, gridRows)
grid[1][3] = 2;
grid[2][2] = 2;
grid[3][2] = 2;
grid[2][3] = 2;
grids[0] = grid

grid = initBoard(gridCols, gridRows)
grid[2][1] = 2;
grid[2][2] = 2;
grid[3][2] = 2;
grid[3][3] = 2;
grids[1] = grid
gamePieces[2] = grids

// z piece
grids = []
grid = initBoard(gridCols, gridRows)
grid[0][2] = 3;
grid[1][2] = 3;
grid[2][3] = 3;
grid[1][3] = 3;
grids[0] = grid

grid = initBoard(gridCols, gridRows)
grid[2][1] = 3;
grid[2][2] = 3;
grid[1][2] = 3;
grid[1][3] = 3;
grids[1] = grid
gamePieces[3] = grids

// J piece
grids = []
grid = initBoard(gridCols, gridRows)
grid[1][2] = 4;
grid[2][2] = 4;
grid[3][2] = 4;
grid[3][3] = 4;
grids[0] = grid

grid = initBoard(gridCols, gridRows)
grid[2][3] = 4;
grid[3][1] = 4;
grid[3][2] = 4;
grid[3][3] = 4;
grids[1] = grid

grid = initBoard(gridCols, gridRows)
grid[1][2] = 4;
grid[1][3] = 4;
grid[2][3] = 4;
grid[3][3] = 4;
grids[2] = grid

grid = initBoard(gridCols, gridRows)
grid[2][1] = 4;
grid[2][2] = 4;
grid[2][3] = 4;
grid[3][1] = 4;
grids[3] = grid
gamePieces[4] = grids

// L piece
grids = []
grid = initBoard(gridCols, gridRows)
grid[1][2] = 5;
grid[2][2] = 5;
grid[3][2] = 5;
grid[1][3] = 5;
grids[0] = grid

grid = initBoard(gridCols, gridRows)
grid[2][1] = 5;
grid[2][2] = 5;
grid[2][3] = 5;
grid[1][1] = 5;
grids[1] = grid

grid = initBoard(gridCols, gridRows)
grid[1][3] = 5;
grid[2][3] = 5;
grid[3][3] = 5;
grid[3][2] = 5;
grids[2] = grid

grid = initBoard(gridCols, gridRows)
grid[1][1] = 5;
grid[1][2] = 5;
grid[1][3] = 5;
grid[2][3] = 5;
grids[3] = grid
gamePieces[5] = grids

// cube piece
grids = []
grid = initBoard(gridCols, gridRows)
grid[1][2] = 6;
grid[1][3] = 6;
grid[2][2] = 6;
grid[2][3] = 6;
grids[0] = grid
gamePieces[6] = grids


// define colorschemes
let colorschemes = []

// molokai
colorschemes[0] = [
    [121, 121, 121], // comment grey
    [229, 181, 103], // yellow
    [180, 210, 115], // green
    [232, 125, 62], // orange
    [158, 134, 200], // purple
    [176, 82, 121], // pink
    [108, 153, 187], // blue
    [214, 214, 214], // white
]

// nord
colorschemes[1] = [
    [143, 188, 187],
    [76, 86, 106],
    [129, 161, 193],
    [59, 66, 82],
    [94, 129, 172],
    [136, 192, 208],
    [46, 52, 64],
]

// dracula
colorschemes[2] = [
    [139, 233, 253,],
    [80, 250, 123,],
    [255, 184, 108,],
    [255, 121, 198,],
    [189, 147, 249,],
    [255, 85, 85],
    [98, 114, 164],
]

// papercolor
colorschemes[3] = [
    [175, 0, 0],
    [0, 135, 175],
    [95, 135, 0],
    [135, 135, 135],
    [0, 95, 135],
    [135, 0, 175],
    [0, 135, 175],
]

//solarized
colorschemes[4] = [
    [203,  75,  22],
    [220,  50,  47],
    [211,  54, 130],
    [108, 113, 196],
    [ 38, 139, 210],
    [ 42, 161, 152],
    [133, 153,   0],
]
