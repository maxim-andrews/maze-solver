describe('Maze printDirections', function() {

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

  it('Should sort object in alphabecital order and call method `bind` of function `literalDirections` and `literalDirections` method it self. Also should return string.', function() {
    var objA = { start: { label: 'A' } };
    var objB = { start: { label: 'B' } };
    var objC = { start: { label: 'C' } };

    maze.check();
    maze.setup();

    maze.completedObjects = [
      objB,
      objC,
      objA
    ];

    spyOn(maze, 'literalDirections').and.callFake(function () {});
    spyOn(maze.literalDirections, 'bind').and.callThrough();

    var result = maze.printDirections();

    expect(typeof result === 'string').toBeTruthy();

    expect(maze.completedObjects.indexOf(objA) === 0).toBeTruthy();
    expect(maze.completedObjects.indexOf(objB) === 1).toBeTruthy();
    expect(maze.completedObjects.indexOf(objC) === 2).toBeTruthy();

    expect(maze.literalDirections).toHaveBeenCalledTimes(3);
    expect(maze.literalDirections.bind).toHaveBeenCalledTimes(1);
  });

  it('Should sort object in alphabecital order and call method `bind` of function `literalDirections` and `literalDirections` method it self. Also should return array.', function() {
    var objA = { start: { label: 'A' } };
    var objB = { start: { label: 'B' } };
    var objC = { start: { label: 'C' } };

    maze.check();
    maze.setup();

    maze.completedObjects = [
      objB,
      objC,
      objA
    ];

    spyOn(maze, 'literalDirections').and.callFake(function () {});
    spyOn(maze.literalDirections, 'bind').and.callThrough();

    var result = maze.printDirections(true);

    expect(Array.isArray(result)).toBeTruthy();

    expect(maze.completedObjects.indexOf(objA) === 0).toBeTruthy();
    expect(maze.completedObjects.indexOf(objB) === 1).toBeTruthy();
    expect(maze.completedObjects.indexOf(objC) === 2).toBeTruthy();

    expect(maze.literalDirections).toHaveBeenCalledTimes(3);
    expect(maze.literalDirections.bind).toHaveBeenCalledTimes(1);
  });
});
