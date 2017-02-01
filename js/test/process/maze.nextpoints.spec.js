describe('Maze nextPoints', function() {

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

  it('Should call methods `samePoint` and `pointExists` four times each. Also should call method `removeClashedPoints` once.', function() {
    spyOn(maze, 'samePoint').and.callFake(function () { return false; });
    spyOn(maze, 'pointExists').and.callFake(function () { return true; });
    spyOn(maze, 'removeClashedPoints').and.callFake(function (arg) { return arg; });

    expect(maze.nextPoints([{ x: 2, y: 3, label: 'X' }, { x: 2, y: 2, label: 'U' }]).length).toBe(4);

    expect(maze.samePoint).toHaveBeenCalledTimes(4);
    expect(maze.pointExists).toHaveBeenCalledTimes(4);
    expect(maze.removeClashedPoints).toHaveBeenCalledTimes(1);
  });

  it('Should call method `pointExists` four times. Also should call method `removeClashedPoints` once and return four elements.', function() {
    spyOn(maze, 'samePoint').and.callFake(function () { return true; });
    spyOn(maze, 'pointExists').and.callFake(function () { return true; });
    spyOn(maze, 'removeClashedPoints').and.callFake(function (arg) { return arg; });

    expect(maze.nextPoints([{ x: 2, y: 2, label: 'U' }]).length).toBe(4);

    expect(maze.samePoint).not.toHaveBeenCalled();
    expect(maze.pointExists).toHaveBeenCalledTimes(4);
    expect(maze.removeClashedPoints).toHaveBeenCalledTimes(1);
  });

  it('Should call method `samePoint` four times and `pointExists` three times. Also should call method `removeClashedPoints` once and return three elements.', function() {
    spyOn(maze, 'samePoint').and.callThrough();
    spyOn(maze, 'pointExists').and.callFake(function () { return true; });
    spyOn(maze, 'removeClashedPoints').and.callFake(function (arg) { return arg; });

    expect(maze.nextPoints([{ x: 2, y: 3, label: 'X' }, { x: 2, y: 2, label: 'U' }]).length).toBe(3);

    expect(maze.samePoint).toHaveBeenCalledTimes(4);
    expect(maze.pointExists).toHaveBeenCalledTimes(3);
    expect(maze.removeClashedPoints).toHaveBeenCalledTimes(1);
  });

  it('Should call method `samePoint` four times and `pointExists` three times. Also should call method `removeClashedPoints` once and return two elements.', function() {
    spyOn(maze, 'samePoint').and.callThrough();
    spyOn(maze, 'pointExists').and.callFake(function (point) { return point.x === 1 && point.y === 2 ? false : true; });
    spyOn(maze, 'removeClashedPoints').and.callFake(function (arg) { return arg; });

    expect(maze.nextPoints([{ x: 2, y: 3, label: 'X' }, { x: 2, y: 2, label: 'U' }]).length).toBe(2);

    expect(maze.samePoint).toHaveBeenCalledTimes(4);
    expect(maze.pointExists).toHaveBeenCalledTimes(3);
    expect(maze.removeClashedPoints).toHaveBeenCalledTimes(1);
  });
});
