function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.isVisited = false;
  this.walls = [true, true, true, true]; // Top, Right, Bottom, Left

  this.show = function() {
    var x = this.i * cellWidth;
    var y = this.j * cellWidth;

    stroke(0);
    if(this.walls[0]) {
      line(x, y, x+cellWidth, y); // Top wall
    }
    if(this.walls[1]) {
      line(x+cellWidth, y, x+cellWidth, y+cellWidth); // Right wall
    }
    if(this.walls[2]) {
      line(x, y+cellWidth, x+cellWidth, y+cellWidth); // Bottom wall
    }
    if(this.walls[3]) {
      line(x, y, x, y+cellWidth); // Left wall
    }

    // Highlight start and end cells
    if(i == 19 && j == 29 || i == 0 && j == 0) {
      noStroke();
      fill(128,216,255);
      rect(x + 4, y + 4, cellWidth - 8, cellWidth - 8);
    }
  }

  this.pickNeighbourCell = function() {
    var neighbours = [];

    var top = cells[calculateIndex(i, j - 1)];
    var right = cells[calculateIndex(i + 1, j)];
    var bottom = cells[calculateIndex(i, j + 1)];
    var left = cells[calculateIndex(i - 1, j)];

    if(top && !top.isVisited) {
      neighbours.push(top);
    }
    if(right && !right.isVisited) {
      neighbours.push(right);
    }
    if(bottom && !bottom.isVisited) {
      neighbours.push(bottom);
    }
    if(left && !left.isVisited) {
      neighbours.push(left);
    }

    // Return random neighbour or undefined
    if(neighbours.length > 0) {
      var r = floor(random(0, neighbours.length));
      return neighbours[r];
    }
    else {
      return undefined;
    }
  }

  // Highlighting current cell green
  this.highlight = function() {
    if(i != 0 && j != 0) {
      var x = this.i * cellWidth;
      var y = this.j * cellWidth;
      noStroke();
      fill(36,209,95);
      rect(x + 4, y + 4, cellWidth - 8, cellWidth - 8);
    }
  }
}

// Convert 2D array positions into 1D array index
function calculateIndex(i, j) {
  // Edge cases
  if(i < 0 || j < 0 || i > numberOfCols - 1 || j > numberOfRows - 1) {
    return -1;
  }
  // Magic formula
  return i + j * numberOfCols;
}