describe('Maze removePath', function() {

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

  it('Should remove path from paths array.', function() {
    var myPath = [{ x: 2, y: 1, label: 'aaa' },{ x: 1, y: 1, label: 'aaa' },{ x: 0, y: 1, label: 'aaa' }];
    maze.lookupObjects[maze.curLookUpIndex].paths = [[{},{},{}],myPath,[{},{}]];

    maze.removePath(myPath);

    expect(maze.lookupObjects[maze.curLookUpIndex].paths.length).toBe(2);
  });

  it('Should not remove path from paths array.', function() {
    var myPath = [{ x: 2, y: 1, label: 'aaa' },{ x: 1, y: 1, label: 'aaa' },{ x: 0, y: 1, label: 'aaa' }];
    maze.lookupObjects[maze.curLookUpIndex].paths = [
      [{},{},{}],
      [{ x: 2, y: 1, label: 'aaa' },{ x: 1, y: 1, label: 'aaa' },{ x: 0, y: 1, label: 'aaa' }],
      [{},{}]
    ];

    maze.removePath(myPath);

    expect(maze.lookupObjects[maze.curLookUpIndex].paths.length).toBe(3);
  });
});
