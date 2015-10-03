//start the game here
$(function init(){

  var size = 60
  , starterCells = 400
  , board = new Board(size, starterCells);
  board.draw();
  window.setInterval(function(){
    board.tick();
    board.draw();
  }, 100);
});
