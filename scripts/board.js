//Board functionality
var GAME_CONDITIONS = {
  UNDER_POPULATION: 2,
  OVER_POPULATION: 3,
  GROWTH_CONDITION: 3
}

function Board(range, starterCells){

  this.range = range;
  this.starterCells = starterCells;
  this.cells = [];
  this.GAME_CONDITIONS = GAME_CONDITIONS;

  // seed the board
  while (this.starterCells > 0) {
    this.addRandomCell();
    --this.starterCells;
  }
};

Board.prototype.cellCount = function(){
  return this.cells.length;
}

Board.prototype.addCells = function(newCellsArray){
  newCellsArray.forEach(function addCells(cell){
    if (this.cells.length === 0 || !this.cellAlreadyOnBoard(cell.position)) {
      this.cells.push(cell)
    }
  }, this);
}

Board.prototype.cellAlreadyOnBoard = function(boardCellPosition){
  return this.cells.some(
    function checkCellsMatch(cell){
      return cellsMatch(cell.position, boardCellPosition)
  });

  //helper function
  function cellsMatch(cellAPosition, cellBPosition){
    return (cellAPosition[0] === cellBPosition[0] && cellAPosition[1] === cellBPosition[1]);
  }
}

Board.prototype.addRandomCell = function(){
  var cell = new Cell(this.range);
  this.cells.push(cell);
}

Board.prototype.countLivingNeighbors = function(cellPosition){
  var neighbors = [ [ cellPosition[0]-1 , cellPosition[1]    ]
                  , [ cellPosition[0]+1 , cellPosition[1]    ]
                  , [ cellPosition[0]   , cellPosition[1]-1  ]
                  , [ cellPosition[0]   , cellPosition[1]+1  ]
                  , [ cellPosition[0]-1 , cellPosition[1]-1  ]
                  , [ cellPosition[0]+1 , cellPosition[1]+1  ]
                  , [ cellPosition[0]-1 , cellPosition[1]+1  ]
                  , [ cellPosition[0]+1 , cellPosition[1]-1  ] ];
  var livingNeighbors = 0;
  neighbors.map(function(neighborPosition){
    var neighborPosition = toroidizedNeighbor.call(this, neighborPosition);
    if (this.cellAlreadyOnBoard(neighborPosition)) { livingNeighbors += 1 }
  }, this);
  return livingNeighbors;

  function toroidizedNeighbor(position){
    position[0] = position[0] % this.range < 0 ? this.range - 1 : position[0] % this.range;
    position[1] = position[1] % this.range < 0 ? this.range - 1 : position[1] % this.range;
    return position;
  }
}

Board.prototype.killCells = function(cellsToKill){
  this.cells = this.cells.filter(
    function(targetCell) {
      return cellShouldDie(targetCell, cellsToKill)
    }
  );
  function cellShouldDie(cell, cellsToKill) {
    return !cellsToKill.some(
      function checkCellsMatch(arrayCell){
        return cellsMatch(cell.position, arrayCell.position)
      }
    );
  }
  function cellsMatch(cellAPosition, cellBPosition){
    return (cellAPosition[0] === cellBPosition[0] && cellAPosition[1] === cellBPosition[1]);
  }
}

Board.prototype.tick = function (){
  this.cellsToGenerate = [];
  this.cellsToKill = [];
  for (var i = 0; i < this.range; i++) {
    for (var j = 0; j < this.range; j++) {
      var cellPosition = [i,j];
      var cell = new Cell(this.range, cellPosition);
      var neighborCount = this.countLivingNeighbors(cell.position);
      if (this.cellAlreadyOnBoard(cell.position)) {
        // underpopulation
        if (neighborCount < this.GAME_CONDITIONS.UNDER_POPULATION) {
          this.cellsToKill.push(cell);
          break;
        // overpopulation
        } else if (neighborCount > this.GAME_CONDITIONS.OVER_POPULATION) {
          this.cellsToKill.push(cell);
          break;
        }
      } else {
        //  reproduction
        if (neighborCount === this.GAME_CONDITIONS.GROWTH_CONDITION) { this.cellsToGenerate.push(cell) }
      }
    }
  }
  if (this.cellsToKill.length > 0) { this.killCells(this.cellsToKill) }
  if (this.cellsToGenerate.length > 0) { this.addCells(this.cellsToGenerate) }
}
Board.prototype.draw = function(){
  var ctx=document.getElementById('canvas').getContext('2d');
  ctx.clearRect(0,0, 610, 610);
  this.cells.map( function(cell){
    ctx.fillStyle = 'red';
    ctx.fillRect(cell.position[0]*10+5, cell.position[1]*10+5, 10, 10);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'white';
    ctx.strokeRect(cell.position[0]*10+5, cell.position[1]*10+5, 10, 10);
  }, this)
};