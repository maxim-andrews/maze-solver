describe('Maze removeClashedPoints', function() {

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

  it('Should call method `includesPoint` at least once.', function() {
    spyOn(maze, 'includesPoint').and.callThrough();

    maze.curLookUpIndex = 0;
    maze.lookupObjects[maze.curLookUpIndex].paths = [[{ x: 2, y: 3, label: 'X' }, { x: 2, y: 2, label: 'U' }]];

    var clean = maze.removeClashedPoints([{ x: 2, y: 3, label: 'X' }, { x: 2, y: 2, label: 'U' }, { x: 2, y: 1, label: 'U' }]);

    expect(clean.length).toBe(1);
    expect(maze.includesPoint).toHaveBeenCalled();
  });

  it('Should call method `includesPoint` at least once and return one cleaned point out of 3.', function() {
    spyOn(maze, 'includesPoint').and.callThrough();

    maze.curLookUpIndex = 0;
    maze.lookupObjects[maze.curLookUpIndex].paths = [
      [{ x: 2, y: 3, label: 'X' }, { x: 3, y: 3, label: 'U' }],
      [{ x: 3, y: 2, label: 'X' }, { x: 2, y: 2, label: 'U' }]
    ];

    var clean = maze.removeClashedPoints([
      { x: 2, y: 3, label: 'X' },
      { x: 2, y: 2, label: 'U' },
      { x: 2, y: 1, label: 'U' }
    ]);

    expect(clean.length).toBe(1);
    expect(maze.includesPoint).toHaveBeenCalled();
  });
});
