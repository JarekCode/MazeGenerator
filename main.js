var numberOfCols, numberOfRows;
var cellWidth = 20;
var cells = [];
var stack = [];
var currentCell;
var player;

function setup() {
  createCanvas(400, 600);
  numberOfCols = floor(width / cellWidth);
  numberOfRows = floor(height / cellWidth);
  // Create all cells and push them to cells[]
  for(var y = 0; y < numberOfRows; y++) {
    for(var x = 0; x < numberOfCols; x++) {
      var cell = new Cell(x, y);
      cells.push(cell);
    }
  }
  // Initialize current cell to the first one in cells[], top-left cell
  currentCell = cells[0];
  // Create and initialize player
  player = new Player();
}

function draw() {
  background(255);
  // Display the walls of each cell
  for(var i = 0; i < cells.length; i++) {
    cells[i].show();
  }
  currentCell.isVisited = true;
  // Highlight currentCell
  currentCell.highlight();
  // Pick a random neighbouring cell
  var nextCell = currentCell.pickNeighbourCell();

  if(nextCell) {
    nextCell.isVisited = true;
    stack.push(currentCell);
    // Remove walls between currentCell and nextCell
    removeWalls(currentCell, nextCell);
    // Assign nextCell to currentCell and repeat
    currentCell = nextCell;
  }
  // If neighbouring not visited cell could not be found, pop from stack
  else if(stack.length > 0) {
    currentCell = stack.pop();
  }
  // Show the player
  player.show();
}

function removeWalls(currentCell, nextCell) {
  x = currentCell.i - nextCell.i;
  y = currentCell.j - nextCell.j;
  if(x == 1) {
    currentCell.walls[3] = false; // Remove left wall
    nextCell.walls[1] = false;    // Remove right wall
  }
  else if(x == -1) {
    currentCell.walls[1] = false; // Remove right wall
    nextCell.walls[3] = false;    // Remove left wall
  }
  if(y == 1) {
    currentCell.walls[0] = false; // Remove top wall
    nextCell.walls[2] = false;    // Remove bottom wall
  }
  else if(y == -1) {
    currentCell.walls[2] = false; // Remove bottom wall
    nextCell.walls[0] = false;    // Remove top wall
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.move("up")
  } else if (keyCode === RIGHT_ARROW) {
    player.move("right")
  } else if (keyCode === DOWN_ARROW) {
    player.move("down")
  } else if (keyCode === LEFT_ARROW) {
    player.move("left")
  }
}