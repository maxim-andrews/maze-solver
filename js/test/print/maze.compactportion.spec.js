describe('Maze compactPortion', function() {

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

  it('Should return empty string.', function() {
    var obj = { c: 0 };
    var d = 'a';

    expect(maze.compactPortion(obj, d) === '').toBeTruthy();
    expect(obj.c === 0).toBeTruthy();
  });

  it('Should return string equal to `5z` and `obj.c` should be equal to `0`.', function() {
    var obj = { dir: 'z', c: 5 };
    var d = 'a';

    expect(maze.compactPortion(obj, d) === '5z').toBeTruthy();
    expect(typeof obj.dir === 'undefined').toBeTruthy();
    expect(obj.c === 0).toBeTruthy();
  });

  it('Should return string equal to `x` and `obj.c` should be equal to `0`.', function() {
    var obj = { dir: 'x', c: 1 };
    var d = 'm';

    expect(maze.compactPortion(obj, d) === 'x').toBeTruthy();
    expect(typeof obj.dir === 'undefined').toBeTruthy();
    expect(obj.c === 0).toBeTruthy();
  });
});
