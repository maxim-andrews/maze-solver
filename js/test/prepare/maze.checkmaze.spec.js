describe('Maze checkMaze', function() {

    var maze;

    beforeEach(function() {
      maze = new Maze({
        maze: '7 5\n1110001\n0010001\n1111111\n0000101\n1111101',
        start: [
          { x: 6, y: 0, label: 'A' },
          { x: 0, y: 4, label: 'B' },
          { x: 6, y: 4, label: 'C' }
        ],
        end: [ { x: 0, y: 0, label: 'X' } ]
      });
    });

    it('Should call maze methods checkMazeHeight and checkMazeRow. Also should call bind method of function checkMazeRow.', function() {
      maze.parseMazeString();

      spyOn(maze, 'checkMazeHeight').and.callThrough();
      spyOn(maze.checkMazeRow, 'bind').and.callThrough();
      spyOn(maze, 'checkMazeRow').and.callThrough();

      maze.checkMaze();

      expect(maze.checkMazeHeight).toHaveBeenCalledTimes(1);
      expect(maze.checkMazeRow.bind).toHaveBeenCalledTimes(1);
      expect(maze.checkMazeRow).toHaveBeenCalled();

    });
});
