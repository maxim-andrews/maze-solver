describe('Maze pointExists', function() {

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

    maze.check();
    maze.setup();
  });

  it('Should return false', function() {
    expect(maze.pointExists({ x: 9, y: 3 })).toBeFalsy();
  });

  it('Should return false', function() {
    expect(maze.pointExists({ x: 2, y: 8 })).toBeFalsy();
  });

  it('Should return false', function() {
    expect(maze.pointExists({ x: 1, y: 5 })).toBeFalsy();
  });

  it('Should return true', function() {
    expect(maze.pointExists({ x: 1, y: 2 })).toBeTruthy();
  });
});
