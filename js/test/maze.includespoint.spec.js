describe('Maze includesPoint', function() {

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

  it('Should call method `samePoint` at least once and return `1`.', function() {
    spyOn(maze, 'samePoint').and.callThrough();

    var clean = maze.includesPoint(
      [{ x: 2, y: 3, label: 'X' }, { x: 2, y: 2, label: 'U' }, { x: 2, y: 1, label: 'U' }],
      { x: 2, y: 2, label: 'U' }
    );

    expect(clean).toBe(1);
    expect(maze.samePoint).toHaveBeenCalled();
  });

  it('Should call method `samePoint` at least once and return `1`.', function() {
    spyOn(maze, 'samePoint').and.callThrough();

    var clean = maze.includesPoint(
      [{ x: 2, y: 3, label: 'X' }, { x: 2, y: 2, label: 'U' }, { x: 2, y: 1, label: 'U' }],
      { x: 3, y: 5, label: 'U' }
    );

    expect(clean).toBe(-1);
    expect(maze.samePoint).toHaveBeenCalled();
  });
});
