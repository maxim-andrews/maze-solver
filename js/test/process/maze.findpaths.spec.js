describe('Maze findPaths', function() {

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

    it('Should return String', function() {
      var result = maze.findPaths();

      expect(typeof result === 'string').toBeTruthy();
    });

    it('Should return Array', function() {
      var result = maze.findPaths(true);

      expect(Array.isArray(result)).toBeTruthy();
    });

    it('Methods `check` , `setup` and `printDirections` should be called exactly one time each and `processLookUpObject` and `moveCompleted` should be called at least once', function() {
      spyOn(maze, 'check').and.callThrough();
      spyOn(maze, 'setup').and.callThrough();
      spyOn(maze, 'processLookUpObject').and.callThrough();
      spyOn(maze, 'moveCompleted').and.callThrough();
      spyOn(maze, 'printDirections').and.callThrough();

      maze.findPaths();

      expect(maze.check).toHaveBeenCalledTimes(1);
      expect(maze.setup).toHaveBeenCalledTimes(1);
      expect(maze.processLookUpObject).toHaveBeenCalled();
      expect(maze.moveCompleted).toHaveBeenCalled();
      expect(maze.printDirections).toHaveBeenCalledTimes(1);
    });
});
