describe('Maze checkPoint', function() {

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

  it('Should throw an Error with message `Row `a` doesn\'t exists`', function() {
    maze = new Maze(mazeConfig);

    maze.parseMazeString();
    maze.checkMaze();

    expect(maze.checkPoint.bind(maze, { y: 'a' })).toThrowError('Row `a` doesn\'t exists');
  });

  it('Should throw an Error with message `There is no column `z` at row `2``', function() {
    maze = new Maze(mazeConfig);

    maze.parseMazeString();
    maze.checkMaze();

    expect(maze.checkPoint.bind(maze, { x: 'z', y: 2 })).toThrowError('There is no column `z` at row `2`');
  });

  it('Shouldn\'t throw an Error about not existent column', function() {
    maze = new Maze(mazeConfig);

    maze.parseMazeString();
    maze.checkMaze();

    expect(maze.checkPoint.bind(maze, { x: 2, y: 3 })).not.toThrowError('There is no column `2` at row `3`');
  });

  it('Should throw an Error with message `Point at row `1` and column `5` should be equal to `1``', function() {
    maze = new Maze(mazeConfig);

    maze.parseMazeString();
    maze.checkMaze();

    expect(maze.checkPoint.bind(maze, { x: 5, y: 1 })).toThrowError('Point at row `1` and column `5` should be equal to `1`');
  });
});
