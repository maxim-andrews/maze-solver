describe('Maze checkMazeRow', function() {

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

    it('Should call maze methods checkMazeWidth and checkMazeValue. Also should call bind method of function checkMazeValue.', function() {
      maze.parseMazeString();
      maze.checkMazeHeight();

      spyOn(maze, 'checkMazeWidth').and.callThrough();
      spyOn(maze.checkMazeValue, 'bind').and.callThrough();
      spyOn(maze, 'checkMazeValue').and.callThrough();

      maze.checkMazeRow([1,1,1,1,1,1,1], 2);

      expect(maze.checkMazeWidth).toHaveBeenCalledTimes(1);
      expect(maze.checkMazeValue.bind).toHaveBeenCalledTimes(1);
      expect(maze.checkMazeValue).toHaveBeenCalled();

    });
});
