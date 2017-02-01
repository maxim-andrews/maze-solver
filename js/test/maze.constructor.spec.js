describe('Maze Contructor', function() {

    var mazeConfig, maze;

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

    it('`options` property should exists if options not passed', function() {
      maze = new Maze();
      expect(maze.options).not.toBeUndefined();
      expect(maze.options instanceof Object).toBeTruthy();
    });

    it('Should create custom maze', function() {
      maze = new Maze({ maze: 'My maze!' });
      expect(maze.options.maze).toEqual('My maze!');
    });

    it('Should create custom startPoints', function() {
      maze = new Maze({ start: 'My maze start!' });
      expect(maze.startPoints).toEqual('My maze start!');
    });

    it('Should create custom endPoints', function() {
      maze = new Maze({ end: 'My maze end!' });
      expect(maze.endPoints).toEqual('My maze end!');
    });

    it('`paths` should be empty array', function() {
      maze = new Maze();
      expect(maze.paths instanceof Array).toBeTruthy();
      expect(maze.paths.length).toBe(0);
    });

    it('`lookupObjects` should be empty array', function() {
      maze = new Maze();
      expect(maze.lookupObjects instanceof Array).toBeTruthy();
      expect(maze.lookupObjects.length).toEqual(0);
    });

    it('`curLookUpIndex` by default should be false', function() {
      maze = new Maze();
      expect(maze.curLookUpIndex).not.toBeUndefined();
      expect(maze.curLookUpIndex).toBe(false);
    });

    it('`completedObjects` should be empty array', function() {
      maze = new Maze();
      expect(maze.completedObjects instanceof Array).toBeTruthy();
      expect(maze.completedObjects.length).toEqual(0);
    });

    it('`MOVE_POINTS` should be an array of directions', function() {
      maze = new Maze();
      expect(maze.MOVE_POINTS instanceof Array).toBeTruthy();
      expect(maze.MOVE_POINTS[0].x).toBe(0);
      expect(maze.MOVE_POINTS[0].y).toBe(1);
      expect(maze.MOVE_POINTS[0].label).toBe('D');
      expect(maze.MOVE_POINTS[1].x).toBe(0);
      expect(maze.MOVE_POINTS[1].y).toBe(-1);
      expect(maze.MOVE_POINTS[1].label).toBe('U');
      expect(maze.MOVE_POINTS[2].x).toBe(1);
      expect(maze.MOVE_POINTS[2].y).toBe(0);
      expect(maze.MOVE_POINTS[2].label).toBe('R');
      expect(maze.MOVE_POINTS[3].x).toBe(-1);
      expect(maze.MOVE_POINTS[3].y).toBe(0);
      expect(maze.MOVE_POINTS[3].label).toBe('L');
    });
    /*
    me.MOVE_POINTS = [
      { x:  0, y:  1, label: 'D' },
      { x:  0, y: -1, label: 'U' },
      { x:  1, y:  0, label: 'R' },
      { x: -1, y:  0, label: 'L' }
    ];
    */
});
