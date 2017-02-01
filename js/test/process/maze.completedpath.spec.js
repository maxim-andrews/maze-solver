describe('Maze completedPath', function() {

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

  it('Should change property `completed` from object to array and push one element.', function() {
    maze.lookupObjects[maze.curLookUpIndex].completed = {};

    maze.completedPath('aaa');

    expect(maze.lookupObjects[maze.curLookUpIndex].completed.length).toBe(1);
  });

  it('Should add to array of two elements one more.', function() {
    maze.lookupObjects[maze.curLookUpIndex].completed = ['ccc', 'bbb'];

    maze.completedPath('aaa');

    expect(maze.lookupObjects[maze.curLookUpIndex].completed.length).toBe(3);
  });
});
