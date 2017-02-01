describe('Maze literalPath', function() {

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

  it('Should call method `literalPoint` tree times and method `compactPath` once.', function() {
    var path = [ { label: 'a' }, { label: 'b' }, { label: 'c' } ];

    spyOn(maze, 'literalPoint').and.callThrough();
    spyOn(maze, 'compactPath').and.callFake(function () { return 'abc'; });

    maze.literalPath(path);

    expect(maze.literalPoint).toHaveBeenCalledTimes(3);
    expect(maze.compactPath).toHaveBeenCalledTimes(1);
  });
});
