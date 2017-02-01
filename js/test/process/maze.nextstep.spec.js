describe('Maze nextStep', function() {

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

  it('Should call method `bind` of function `nextPoints` and `nextPoints` method it self. Also should call method `removePath`.', function() {
    maze.check();
    maze.setup();
    maze.processLookUpObject(maze.lookupObjects[1], 1);

    spyOn(maze, 'nextPoints').and.callFake(function () { return []; });
    spyOn(maze, 'clonePath').and.callFake(function () { return []; });
    spyOn(maze.clonePath, 'bind').and.callThrough();
    spyOn(maze, 'removePath').and.callFake(function () {});

    maze.nextStep([]);

    expect(maze.nextPoints).toHaveBeenCalledTimes(1);
    expect(maze.clonePath).not.toHaveBeenCalled();
    expect(maze.clonePath.bind).not.toHaveBeenCalled();
    expect(maze.removePath).toHaveBeenCalledTimes(1);
  });

  it('Should call method `bind` of function `nextPoints` and `nextPoints` method it self. Also should call method `removePath`.', function() {
    maze.check();
    maze.setup();
    maze.processLookUpObject(maze.lookupObjects[1], 1);

    spyOn(maze, 'nextPoints').and.callFake(function () { return [{},{},{}]; });
    spyOn(maze, 'clonePath').and.callFake(function () { return []; });
    spyOn(maze.clonePath, 'bind').and.callThrough();
    spyOn(maze, 'removePath').and.callFake(function () {});

    maze.nextStep([]);

    expect(maze.nextPoints).toHaveBeenCalledTimes(1);
    expect(maze.clonePath).toHaveBeenCalledTimes(3);
    expect(maze.clonePath.bind).toHaveBeenCalledTimes(1);
    expect(maze.removePath).toHaveBeenCalledTimes(1);
  });
});
