describe('Maze processLookUpObject', function() {

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

  it('Should call method `bind` of function `nextStep` and `nextStep` method it self. Property `curLookUpIndex` should be equal to `5`.', function() {
    var point = { x: 3, y: 6, label: 'Test' };

    maze.check();
    maze.setup();

    spyOn(maze, 'nextStep').and.callFake(function () {});
    spyOn(maze.nextStep, 'bind').and.callThrough();

    maze.processLookUpObject(maze.lookupObjects[1], 5);

    expect(maze.curLookUpIndex).toBe(5);

    expect(maze.nextStep).toHaveBeenCalledTimes(1);
    expect(maze.nextStep.bind).toHaveBeenCalledTimes(1);
  });
});
