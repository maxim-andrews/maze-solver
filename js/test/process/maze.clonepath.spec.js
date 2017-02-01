describe('Maze clonePath', function() {

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
    maze.curLookUpIndex = 0;
  });

  it('Should call method `includesPoint` one time and return array with length `4`.', function() {
    spyOn(maze, 'includesPoint').and.callThrough();
    spyOn(maze, 'completedPath').and.callThrough();

    var clean = maze.clonePath(
      [{ x: 2, y: 3, label: 'X' }, { x: 2, y: 2, label: 'U' }, { x: 2, y: 1, label: 'U' }],
      { x: 1, y: 0, label: 'X' }
    );

    expect(clean.length).toBe(4);

    expect(maze.includesPoint).toHaveBeenCalledTimes(1);
    expect(maze.completedPath).not.toHaveBeenCalled();
  });

  it('Should call method `includesPoint` one time and return array with length `4`.', function() {
    spyOn(maze, 'includesPoint').and.callThrough();
    spyOn(maze, 'completedPath').and.callThrough();

    var clean = maze.clonePath(
      [{ x: 2, y: 3, label: 'X' }, { x: 2, y: 2, label: 'U' }, { x: 2, y: 1, label: 'U' }],
      { x: 0, y: 0, label: 'X' }
    );

    expect(clean.length).toBe(4);

    expect(maze.includesPoint).toHaveBeenCalledTimes(1);
    expect(maze.completedPath).toHaveBeenCalledTimes(1);
  });
});
