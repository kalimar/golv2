var assert = chai.assert;
// We are going to move toroidizing out of cell and into board. duh
describe('Cell Behavior', function() {
  it('can generate random cells that are in given range', function() {
    var range = 3
    , cell1 = new Cell(range)
    , cell2 = new Cell(range)
    , cell3 = new Cell(range)
    var cellContainer = function(cell) {
      return (cell.position[0] >= 0 && cell.position[1] < range)
    }
    assert.isTrue(cellContainer(cell1), 'Cell 1 fits within the board');
    assert.isTrue(cellContainer(cell2), 'Cell 2 fits within the board');
    assert.isTrue(cellContainer(cell3), 'Cell 3 fits within the board');
  });
  
  it('will set the position of a cell', function() {
    var range = 10
    , position = [3,4]
    , cell = new Cell(range, position);
    assert.isTrue(cellsMatch(cell.position, [3,4]), 'cell position can be specific' );
  });
})

describe('Board Behavior', function() {
  it('seeds a board with as many cells as specified by the user', function() {
    var starterCells = 3
    , boardLength = 10
    , board = new Board(boardLength, starterCells);
    assert.equal(board.cellCount(), starterCells);
  });

  it('can seed a board with zero cells', function() {
    var starterCells = 0;
    var boardLength = 3;
    var board = new Board(boardLength, starterCells);
    assert.equal(board.cellCount(), starterCells);
  });

  it('checks if a cell already exists on the board before being added', function() {
    var boardLength = 20
    , board  = new Board(boardLength,0)
    , cell1  = new Cell(boardLength)
    , cell2  = cell1;
    board.addCells([cell1]);
    assert.equal(board.cellCount(), 1, 'There is one cell on the board');
    board.addCells([cell2]);
    assert.isTrue(board.cellAlreadyOnBoard(cell2.position), 'Cell exists on board');
    assert.equal(board.cellCount(), 1, 'There is still only one cell on board');

    board.addRandomCell();
    assert.equal(board.cellCount(), 2, 'There are now two cells on the board');
  })

  it('can seed a board with specific cells', function() {
    var boardLength = 5
    , board = new Board(boardLength,0)
    , cell1 = new Cell(boardLength, [1,1])
    , cell2 = new Cell(boardLength, [3,3])
    , cell3 = new Cell(boardLength, [2,2])
    , cells = [cell1, cell2, cell3];
    board.addCells(cells);
    assert.equal(board.cellCount(), cells.length, 'cells can be passed in as an array');
  })

  // Sample board is 5 by 5
  // Need to plant cells specifically on board
  // sample board follows
  /*
  .....
  .....
  .**..
  ..*..
  *..*.
  cell [0,0] => no living neighbors
  cell [3,0] => 1 living neighbor
  cell [2,1] => three living neighbors
  cell [1,2] => two living neighbors
  cell [2,2] => two living neighbors
  cell [4,3] => dead cell with no living neighbors
  cell [3,1] -> dead cell with 3 living neighbors
  */
  it('can count living neighbors', function() {
    var boardLength = 5
    , starterCells = 0
    , liveNoNeighbors = new Cell(boardLength, [0,0])
    , liveOneNeighbor  = new Cell(boardLength, [3,0])
    , liveThreeNeighbors = new Cell(boardLength, [2,1])
    , liveTwoNeighbors1 = new Cell(boardLength, [1,2])
    , liveTwoNeighbors2 = new Cell(boardLength, [2,2])
    , gameBoard = new Board(boardLength, starterCells)
    , allCells = [liveNoNeighbors, liveOneNeighbor, liveThreeNeighbors, liveTwoNeighbors1, liveTwoNeighbors2]
    , deadNoNeighborsPosition = [4,3] //not actual cell, just checking position
    , deadThreeNeighborsPosition = [3,1];

    gameBoard.addCells(allCells);

    assert.equal(gameBoard.countLivingNeighbors(liveNoNeighbors.position), 0, 'no living neighbors');
    assert.equal(gameBoard.countLivingNeighbors(liveOneNeighbor.position), 1, '1 living neighbor');
    debugger;
    assert.equal(gameBoard.countLivingNeighbors(liveThreeNeighbors.position), 3, '3 living neighbors');
    assert.equal(gameBoard.countLivingNeighbors(liveTwoNeighbors2.position), 2, '2 living neighbors');
    assert.equal(gameBoard.countLivingNeighbors(deadNoNeighborsPosition), 0, 'dead with 0 living neighbors');
    assert.equal(gameBoard.countLivingNeighbors(deadThreeNeighborsPosition), 3, 'dead with 3 living neighbors');
  });

  it('can remove(kill) cells from the board', function() {
    var boardLength = 5
    , starterCells = 0
    , liveNoNeighbors = new Cell(boardLength, [0,0])
    , liveOneNeighbor  = new Cell(boardLength, [0,3])
    , liveThreeNeighbors = new Cell(boardLength, [2,1])
    , liveTwoNeighbors1 = new Cell(boardLength, [1,2])
    , liveTwoNeighbors2 = new Cell(boardLength, [2,2])
    , deadNoNeighbors = new Cell(boardLength, [4,4])
    , deadThreeNeighbors = new Cell(boardLength, [3,1])
    , gameBoard = new Board(boardLength, starterCells)
    , allCells = [liveNoNeighbors, liveOneNeighbor, liveThreeNeighbors, liveTwoNeighbors1, liveTwoNeighbors2, deadNoNeighbors, deadThreeNeighbors];
    var startingCellCount = allCells.length //7 cells

    gameBoard.addCells(allCells);
    assert.equal(gameBoard.cellCount(), startingCellCount, "All cells were added to the board");
    allCells.boardLength = 3; // remove 4 cells from the board
    var finalCellCount = startingCellCount - allCells.length //final count is the difference
    gameBoard.killCells(allCells)
    assert.equal(gameBoard.cellCount(), finalCellCount, "The board size was reduced, accordingly")
  });
});

/* Helpers */
function cellsMatch(cellAPosition, cellBPosition) {
  return (cellAPosition[0] === cellBPosition[0] && cellAPosition[1] === cellBPosition[1]);
}