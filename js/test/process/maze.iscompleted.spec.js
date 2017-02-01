describe('Maze isCompleted', function() {

  var maze, mazeConfig;

  beforeEach(function() {
    mazeConfig = {
      maze: '7 5\n1110001\n0010001\n1111111\n0000101\n1111101',
      start: [
        { x: 6, y: 0, label: 'A' },
        { x: 0, y: 4, label: 'B' },
        { x: 6, y: 4, label: 'C' }
      ],
      end: [ { x: 0, y: 0, label: 'X' } ]
    };
  });


  it('Should consider object as completed.', function() {
    maze = new Maze(mazeConfig);
    maze.check();
    maze.setup();

    spyOn(maze, 'samePoint').and.callThrough();

    var object = {
      completed:[
        [{},{},{}],
        [{},{}],
        [{},{},{ x: 0, y: 0, label: 'X' }],
      ]
    };

    expect(maze.isCompleted(object)).toBeTruthy();
    expect(maze.samePoint).toHaveBeenCalledTimes(3);
  });

  it('Should consider object as NOT completed..', function() {
    maze = new Maze(mazeConfig);
    maze.check();
    maze.setup();

    spyOn(maze, 'samePoint').and.callThrough();

    var object = {
      completed:[
        [{},{},{}],
        [{},{}],
        [{}],
      ]
    };

    expect(maze.isCompleted(object)).toBeFalsy();
    expect(maze.samePoint).toHaveBeenCalledTimes(3);
  });

  it('Should consider object as completed.', function() {
    mazeConfig.end = [
      { x: 6, y: 0, label: 'A' },
      { x: 0, y: 4, label: 'B' },
      { x: 6, y: 4, label: 'C' },
      { x: 0, y: 0, label: 'X' }
    ];

    maze = new Maze(mazeConfig);
    maze.check();
    maze.setup();

    spyOn(maze, 'samePoint').and.callThrough();

    var object = {
      completed:[
        [{},{},{ x: 6, y: 0, label: 'A' }],
        [{},{},{ x: 0, y: 4, label: 'B' }],
        [{},{ x: 6, y: 4, label: 'C' }],
        [{},{ x: 0, y: 0, label: 'X' }],
      ]
    };

    expect(maze.isCompleted(object)).toBeTruthy();
    expect(maze.samePoint).toHaveBeenCalledTimes(10);
  });

  it('Should consider object as NOT completed.', function() {
    mazeConfig.end = [
      { x: 6, y: 0, label: 'A' },
      { x: 0, y: 4, label: 'B' },
      { x: 6, y: 4, label: 'C' },
      { x: 0, y: 0, label: 'X' }
    ];

    maze = new Maze(mazeConfig);
    maze.check();
    maze.setup();

    spyOn(maze, 'samePoint').and.callThrough();

    var object = {
      completed:[
        [{},{},{ x: 6, y: 0, label: 'A' }],
        [{},{},{ x: 0, y: 4, label: 'B' }],
        [{},{}],
        [{},{ x: 6, y: 4, label: 'C' }],
      ]
    };

    expect(maze.isCompleted(object)).toBeFalsy();
    expect(maze.samePoint).toHaveBeenCalled();
  });
});
