var assert = chai.assert;

describe('Cell Behavior', function() {
  it('the random cells are within a given range', function() {
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
    nonToroid = new Cell(range, [3,4]);
    assert.isTrue(cellsMatch(nonToroid, nonToroid), 'do not toroidize if not necessary' );
  });
    
  it('will toroidize the cell if necessary', function() {
    var range = 10
    , lastPos = range -1
    , firstPos = 0
    , toroid1 = new Cell(range, [-1, 1])//toroidized [lastPos, 1]
    , toroid2 = new Cell(range, [10, -1])//toroidized [firstPos, 1]
    , toroid3 = new Cell(range, [1, -1])//toroidized [1, lastPos]
    , toroid4 = new Cell(range, [1, 10])//toroidized [1, firstPos]
    , toroid5 = new Cell(range, [-1, -1])//toroidized [lastPos, lastPos]
    , toroid6 = new Cell(range, [10, 10])//toroidized [firstPos, firstPos];
    
    assert.isTrue(cellsMatch([lastPos, 1], toroid1), 'toroidized toroid1');
    assert.isTrue(cellsMatch([firstPos, 1], toroid2), 'toroidized toroid2');
    assert.isTrue(cellsMatch([1, lastPos], toroid3), 'toroidized toroid3');
    assert.isTrue(cellsMatch([1, firstPos], toroid4), 'toroidized toroid4');
    assert.isTrue(cellsMatch([lastPos, lastPos], toroid5), 'toroidized toroid5');
    assert.isTrue(cellsMatch([firstPos, firstPos], toroid6), 'toroidized toroid6');
  })
})

describe('Board Behavior', function() {
  it('seeds a board with as many cells as specified by the user', function() {
    var starterCells = 3;
    var boardSize = 10;
    var newBoard = new Board(boardSize, starterCells);
    assert.equal(newBoard.cellCount(), starterCells);
  });
});

/* Helpers */
function cellsMatch(cellA, cellB) {
  return (cellA[0] === cellB[0] && cellA[1] === cellB[1]);
}

