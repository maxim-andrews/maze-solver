describe('Maze literalDirections', function() {

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

  it('Should sort object in alphabecital order and call method `bind` of function `literalPath` and `literalPath` method it self. Also should return string with at least one symbol.', function() {
    var object = { completed: ['a','b','c'] };

    maze.check();
    maze.setup();

    spyOn(maze, 'literalPath').and.callFake(function (elm) { return elm; });
    spyOn(maze.literalPath, 'bind').and.callThrough();

    var result = maze.literalDirections(object);

    expect(typeof result === 'string').toBeTruthy();
    expect(result.length > 0).toBeTruthy();

    expect(maze.literalPath).toHaveBeenCalledTimes(3);
    expect(maze.literalPath.bind).toHaveBeenCalledTimes(1);
  });

  it('Should sort object in alphabecital order and call method `bind` of function `literalPath` and `literalPath` method it self. Also should return empty string.', function() {
    var object = { completed: [] };

    maze.check();
    maze.setup();

    spyOn(maze, 'literalPath').and.callFake(function (elm) { return elm; });
    spyOn(maze.literalPath, 'bind').and.callThrough();

    var result = maze.literalDirections(object);

    expect(typeof result === 'string').toBeTruthy();
    expect(result.length === 0).toBeTruthy();

    expect(maze.literalPath).not.toHaveBeenCalled();
    expect(maze.literalPath.bind).not.toHaveBeenCalled();
  });
});
