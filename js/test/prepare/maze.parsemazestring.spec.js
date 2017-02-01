describe('Maze parseMazeString', function() {

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

    it('Should return false if maze is not string or an array', function() {
      mazeConfig.maze = {};

      maze = new Maze(mazeConfig);

      expect(maze.parseMazeString()).toBeFalsy();
    });

    it('Should return false if maze first row is not string or an array', function() {
      mazeConfig.maze = [{}];

      maze = new Maze(mazeConfig);

      expect(maze.parseMazeString()).toBeFalsy();
    });

    it('Should return false if one of maze rest rows is not string or an array', function() {
      mazeConfig.maze = ['7 5', '', {}];

      maze = new Maze(mazeConfig);

      expect(maze.parseMazeString()).toBeFalsy();
    });

    it('Should skip empty rows while parsing maze strings', function() {
      mazeConfig.maze = ['7 5', '1110001', '', '0010001', [], '1111111', [], '', '', '0000101', '1111101'];

      maze = new Maze(mazeConfig);

      expect(maze.parseMazeString()).toBeTruthy();

      expect(maze.options.mazeWidth).toBe(7);
      expect(maze.options.maze.length).toBe(5);
    });

    it('Should assign width and height of maze to 7 and 5 accordingly', function() {
      mazeConfig.maze = ['7 5', '', ''];

      maze = new Maze(mazeConfig);

      expect(maze.parseMazeString()).toBeTruthy();

      expect(maze.options.mazeWidth === 7).toBeTruthy();
      expect(maze.options.mazeHeight === 5).toBeTruthy();
    });

    it('Should accept rows of type array or string', function() {
      mazeConfig.maze = ['7 5', '1110001', [0,0,1,0,0,0,1], [], '1111111', '', '', '', '0000101', '1111101'];

      maze = new Maze(mazeConfig);

      expect(maze.parseMazeString()).toBeTruthy();

      expect(maze.options.mazeWidth).toBe(7);
      expect(maze.options.maze.length).toBe(5);
    });
});
