describe('Maze checkMazeValue', function() {

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

    it('Should throw an Error with message `Maze symbol at line 2 and col 1 should be 0 or 1, but it\'s equal to: a`', function() {
      expect(maze.checkMazeValue.bind(maze, 2, 'a', 1)).toThrowError('Maze symbol at line 2 and col 1 should be 0 or 1, but it\'s equal to: a');
    });

    it('Should throw an Error with message `Maze symbol at line 2 and col 1 should be 0 or 1, but it\'s equal to: 5`', function() {
      expect(maze.checkMazeValue.bind(maze, 2, '5', 1)).toThrowError('Maze symbol at line 2 and col 1 should be 0 or 1, but it\'s equal to: 5');
    });

    it('Should throw an Error with message `Maze symbol at line 2 and col 1 should be 0 or 1, but it\'s equal to: 5` (integer)', function() {
      expect(maze.checkMazeValue.bind(maze, 2, 5, 1)).toThrowError('Maze symbol at line 2 and col 1 should be 0 or 1, but it\'s equal to: 5');
    });

    it('Should return integer zero', function() {
      expect(maze.checkMazeValue(2, '0', 1) === 0).toBeTruthy();
    });

    it('Should return integer 1', function() {
      expect(maze.checkMazeValue(2, '1', 1) === 1).toBeTruthy();
    });

    it('Should return integer zero', function() {
      expect(maze.checkMazeValue(2, 0, 1) === 0).toBeTruthy();
    });

    it('Should return integer 1', function() {
      expect(maze.checkMazeValue(2, 1, 1) === 1).toBeTruthy();
    });
});
