describe('Maze samePoint', function() {

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

  it('Should return true', function() {
    expect(maze.samePoint({ x: 5, y: 3 }, { x: 5, y: 3 })).toBeTruthy();
  });

  it('Should return false', function() {
    expect(maze.samePoint({ x: 3, y: 3 }, { x: 5, y: 3 })).toBeFalsy();
  });

  it('Should return false', function() {
    expect(maze.samePoint({ x: 5, y: 2 }, { x: 5, y: 3 })).toBeFalsy();
  });
});
