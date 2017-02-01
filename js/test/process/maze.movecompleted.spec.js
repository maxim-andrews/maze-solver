describe('Maze moveCompleted', function() {

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

  it('Should move object from `lookupObjects` array.', function() {
    spyOn(maze, 'isCompleted').and.callFake(function () { return false; });

    maze.lookupObjects = [
      { paths: [['aaa']] },
      { paths: [] },
      { paths: [['bbb']] },
    ];

    expect(maze.lookupObjects.length).toBe(3);

    maze.moveCompleted();

    expect(maze.isCompleted).toHaveBeenCalledTimes(2);
    expect(maze.lookupObjects.length).toBe(2);
  });

  it('Should remove path from paths array.', function() {
    var completed = ['aa','aaa'];
    spyOn(maze, 'isCompleted').and.callFake(function (obj) { return obj.paths === completed ? true:false; });

    maze.lookupObjects = [
      { paths: [['aaa']] },
      { paths: completed },
      { paths: [['bbb']] },
    ];

    expect(maze.lookupObjects.length).toBe(3);

    maze.moveCompleted();

    expect(maze.isCompleted).toHaveBeenCalledTimes(3);
    expect(maze.lookupObjects.length).toBe(2);
  });

  it('Should remove path from paths array.', function() {
    spyOn(maze, 'isCompleted').and.callFake(function () { return false; });

    maze.lookupObjects = [
      { paths: [['aaa']] },
      { paths: [['aa','aaa']] },
      { paths: [['bbb']] },
    ];

    expect(maze.lookupObjects.length).toBe(3);

    maze.moveCompleted();

    expect(maze.isCompleted).toHaveBeenCalledTimes(3);
    expect(maze.lookupObjects.length).toBe(3);
  });
});
