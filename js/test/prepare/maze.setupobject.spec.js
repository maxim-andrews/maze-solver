describe('Maze setupObject', function() {

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

  it('Should call method `bind` of function `setupObject` and `setupObject` method it self.', function() {
    var point = { x: 3, y: 6, label: 'Test' };

    maze.check();

    expect(maze.lookupObjects.length).toBe(0);

    maze.setupObject(point);

    expect(maze.lookupObjects.length).toBe(1);

    expect(maze.lookupObjects[0].start === point).toBeTruthy();
    expect(maze.lookupObjects[0].start.x === 3).toBeTruthy();
    expect(maze.lookupObjects[0].start.y === 6).toBeTruthy();
    expect(maze.lookupObjects[0].start.label === 'Test').toBeTruthy();
    expect(maze.lookupObjects[0].paths[0][0] === point).toBeTruthy();
    expect(maze.lookupObjects[0].completed === false).toBeTruthy();
  });
});
