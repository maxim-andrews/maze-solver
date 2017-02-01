describe('Maze checkMazeWidth', function() {

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

    it('Should throw an Error with message Maze line 1 width of 7 is not equal to stated width of 9`', function() {
      maze.parseMazeString();
      maze.options.mazeWidth = 9;

      expect(maze.checkMazeWidth.bind(maze, [0,0,1,0,0,0,1], 1)).toThrowError('Maze line 1 width of 7 is not equal to stated width of 9');
    });
});
