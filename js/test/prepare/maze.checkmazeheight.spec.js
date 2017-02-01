describe('Maze checkMazeHeight', function() {

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

    it('Should throw an Error with message `Maze height of 5 is not equal to stated height of 8`', function() {
      maze.parseMazeString();
      maze.options.mazeHeight = 8;

      expect(maze.checkMazeHeight.bind(maze)).toThrowError('Maze height of 5 is not equal to stated height of 8');
    });
});
