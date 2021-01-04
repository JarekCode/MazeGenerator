function Player() {
  this.i = 0;
  this.j = 0;

  // Show player
  this.show = function() {
    noStroke();
    fill(255, 0, 0);
    circle((this.i * cellWidth) + 10, (this.j * cellWidth) + 10, cellWidth - 8);
  }

  // Move player
  this.move = function(direction) {

    if(direction == "up") {
      var top = cells[calculateIndex(this.i, this.j - 1)];
      // Check if valid cell exists & no wall is present
      if(top && !top.walls[2]) {
        // Move player
        this.j = this.j - 1;
      }
    }
    else if(direction == "right") {
      var right = cells[calculateIndex(this.i + 1, this.j)];
      // Check if valid cell exists & no wall is present
      if(right && !right.walls[3]) {
        // Move player
        this.i = this.i + 1;
      }
    }
    else if(direction == "down") {
      var down = cells[calculateIndex(this.i, this.j + 1)];
      // Check if valid cell exists & no wall is present
      if(down && !down.walls[0]) {
        // Move player
        this.j = this.j + 1;
      }
    }
    else if(direction == "left") {
      var left = cells[calculateIndex(this.i - 1, this.j)];
      // Check if valid cell exists & no wall is present
      if(left && !left.walls[1]) {
        // Move player
        this.i = this.i - 1;
      }
    }
  }
}