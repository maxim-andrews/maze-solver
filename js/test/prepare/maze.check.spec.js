describe('Maze check', function() {

    var maze, mazeConfig;

    beforeEach(function() {
      mazeConfig = {
        maze: '7 5\n1110001\n0010001\n1111111\n0000101\n1111101',
        start: [
          { x: 6, y: 0, label: 'A' },
          { x: 0, y: 4, label: 'B' },
          { x: 6, y: 4, label: 'C' }
        ],
        end: [ { x: 0, y: 0, label: 'X' } ]
      };
    });

    it('Should throw an Error with the message `Maze not specified`', function() {
      mazeConfig.maze = undefined;

      maze = new Maze(mazeConfig);

      expect(maze.check.bind(maze)).toThrowError('Maze not specified');
    });

    it('Should throw an Error with the message `Maze should be array or string`', function() {
      mazeConfig.maze = {};

      maze = new Maze(mazeConfig);

      expect(maze.check.bind(maze)).toThrowError('Maze should be array or string');
    });

    it('Should call methods `parseMazeString`, `checkMaze`, `checkStartPoints` and `checkEndPoints` exactly one time each', function() {
      maze = new Maze(mazeConfig);

      spyOn(maze, 'parseMazeString').and.callThrough();
      spyOn(maze, 'checkMaze').and.callThrough();
      spyOn(maze, 'checkStartPoints').and.callThrough();
      spyOn(maze, 'checkEndPoints').and.callThrough();

      maze.check();

      expect(maze.parseMazeString).toHaveBeenCalledTimes(1);
      expect(maze.checkMaze).toHaveBeenCalledTimes(1);
      expect(maze.checkStartPoints).toHaveBeenCalledTimes(1);
      expect(maze.checkEndPoints).toHaveBeenCalledTimes(1);
    });
});
