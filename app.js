var fs = require('fs');
var Maze = require('./js/maze');

var mazeStr = fs.readFileSync('./test-data.txt').toString('utf8');
var maze = new Maze({
  maze: mazeStr,
  start: [
    { x: 30, y:  0, label: 'A' },
    { x: 30, y: 28, label: 'B' },
    { x:  0, y: 28, label: 'C' }
  ],
  end: [ { x: 0, y: 0, label: 'X' } ]
});

console.log(maze.findPaths(true));
