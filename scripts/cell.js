/*
  Cell
  Takes two arguments, the first is the range the cell is
  meant to operate in. The second is the cell's position
*/
function Cell(){
  debugger;
  this.range = arguments[0] || null;
  this.position = arguments[1] || [];
  if (this.position.length === 0) {
    this.setPosition();
  }
}

Cell.prototype.setPosition = function() {
  this.position = [getRandomInt(this.range), getRandomInt(this.range)]
  
  function getRandomInt(range) {
    return Math.floor(Math.random() * (range));
  }
}

Cell.prototype.toroidize = function() {
  
}
