'use strict';

function Maze() {
  var me = this;

  me.options = arguments[0] || {};

  me.startPoints = me.options.start || [];
  me.endPoints = me.options.end || [];
  me.paths = [];

  me.lookupObjects = [];
  me.curLookUpIndex = false;
  me.completedObjects = [];

  me.MOVE_POINTS = [
    { x:  0, y:  1, label: 'D' },
    { x:  0, y: -1, label: 'U' },
    { x:  1, y:  0, label: 'R' },
    { x: -1, y:  0, label: 'L' }
  ];
}

Maze.prototype.check = function () {
  var me = this;

  if (!me.options.maze) {
    throw Error('Maze not specified');
  }

  if (!Array.isArray(me.options.maze) && typeof me.options.maze !== 'string') {
    throw new Error('Maze should be array or string');
  }

  me.parseMazeString();

  me.checkMaze();
  me.checkStartPoints();
  me.checkEndPoints();
};

Maze.prototype.parseMazeString = function () {
  var me = this;
  var arr, sizes;

  if (typeof me.options.maze === 'string') {
    arr = me.options.maze.split('\n');
  } else if (Array.isArray(me.options.maze)) {
    arr = me.options.maze;
  } else {
    return false;
  }

  sizes = arr.shift();

  if (typeof sizes === 'string') {
    sizes = sizes.split(' ');
  } else if (!Array.isArray(sizes)) {
    return false;
  }

  me.options.mazeWidth = parseInt(sizes[0], 10);
  me.options.mazeHeight = parseInt(sizes[1], 10);
  me.options.maze = [];

  for (var a = 0; a < arr.length; a++) {
    if (arr[a].length === 0) {
      continue;
    }

    if (typeof arr[a] === 'string') {
      me.options.maze.push(arr[a].split(''));
    } else if (Array.isArray(arr[a])) {
      me.options.maze.push(arr[a]);
    } else {
      return false;
    }
  }

  return true;
};

Maze.prototype.checkMaze = function () {
  var me = this;

  me.checkMazeHeight();
  me.options.maze = me.options.maze.map(me.checkMazeRow.bind(me));
};

Maze.prototype.checkMazeRow = function (row, y) {
  var me = this;
  me.checkMazeWidth(row, y);

  return row.map(me.checkMazeValue.bind(me, y));
};

Maze.prototype.checkMazeWidth = function (row, y) {
  var me = this;

  if (row.length !== me.options.mazeWidth) {
    throw new Error('Maze line ' + y + ' width of ' + row.length + ' is not equal to stated width of ' + me.options.mazeWidth);
  }
};

Maze.prototype.checkMazeHeight = function () {
  var me = this;

  if (me.options.maze.length !== me.options.mazeHeight) {
    throw new Error('Maze height of ' + me.options.maze.length + ' is not equal to stated height of ' + me.options.mazeHeight);
  }
};

Maze.prototype.checkMazeValue = function (y, val, x) {
  var me = this;

  if ([0, '0', 1, '1'].indexOf(val) === -1) {
    throw new Error('Maze symbol at line ' + y + ' and col ' + x + ' should be 0 or 1, but it\'s equal to: ' + val);
  }

  return parseInt(val, 10);
};

Maze.prototype.checkStartPoints = function () {
  var me = this;

  if (me.startPoints.length === 0) {
    throw new Error('At least one start point should be specified');
  }

  me.startPoints.map(me.checkPoint.bind(me));
}

Maze.prototype.checkEndPoints = function () {
  var me = this;

  if (me.endPoints.length === 0) {
    throw new Error('At least one end point should be specified');
  }

  me.endPoints.map(me.checkPoint.bind(me));
}

Maze.prototype.checkPoint = function (point) {
  var me = this;

  if (typeof me.options.maze[point.y] === 'undefined') {
    throw new Error('Row `' + point.y + '` doesn\'t exists');
  }

  if (typeof me.options.maze[point.y][point.x] === 'undefined') {
    throw new Error('There is no column `' + point.x + '` at row `' + point.y + '`');
  }

  if ([1, '1'].indexOf(me.options.maze[point.y][point.x]) === -1) {
    throw new Error('Point at row `' + point.y + '` and column `' + point.x + '` should be equal to `1`');
  }
};

Maze.prototype.pointExists = function (point) {
  var me = this;

  if (typeof me.options.maze[point.y] === 'undefined' || typeof me.options.maze[point.y][point.x] === 'undefined' || [1, '1'].indexOf(me.options.maze[point.y][point.x]) === -1) {
    return false;
  }

  return true;
};

Maze.prototype.findPaths = function (returnArray) {
  var me = this;

  me.check();
  me.setup();

  while (me.lookupObjects.length > 0) {
    me.lookupObjects.map(me.processLookUpObject.bind(me));
    me.moveCompleted();
  }

  return me.printDirections(returnArray);
};

Maze.prototype.setup = function () {
  var me = this;

  me.startPoints.map(me.setupObject.bind(me));
};

Maze.prototype.setupObject = function (start) {
  this.lookupObjects.push({
    start: start,
    paths: [[start]],
    completed: false
  });
};

Maze.prototype.processLookUpObject = function (object, index) {
  var me = this;

  me.curLookUpIndex = index;
  object.paths.map(me.nextStep.bind(me));
};

Maze.prototype.nextStep = function(path) {
  var me = this;
  var newPoints = me.nextPoints(path);
  var paths = me.lookupObjects[me.curLookUpIndex].paths;

  if (newPoints.length > 0) {
    me.lookupObjects[me.curLookUpIndex].paths = paths.concat(newPoints.map(me.clonePath.bind(me, path)));
  }

  me.removePath(path);
};

Maze.prototype.nextPoints = function(path) {
  var me = this;

  var cp = path[path.length - 1]; // current point
  var pp = path[path.length - 2]; // previous point
  var nps = []; // new points

  me.MOVE_POINTS.forEach(function (n) {
    var point = { x: cp.x + n.x, y: cp.y + n.y, label: n.label };

    if ((!pp || !me.samePoint(point, pp)) && me.pointExists(point)) {
      nps.push(point);
    }
  });

  return me.removeClashedPoints(nps);
};

Maze.prototype.removeClashedPoints = function (points) {
  var me = this;
  var clashed = [];
  var paths = me.lookupObjects[me.curLookUpIndex].paths;

  paths.forEach(function (path) {
    points.forEach(function (point, idx) {
      if (me.includesPoint(path, point) > -1) {
        clashed.push(idx);
      }
    });
  });

  clashed.forEach(function (idx) {
    points.splice(idx, 1);
  });

  return points;
};

Maze.prototype.clonePath = function(path, newPoint) {
  var me = this;
  var newPath = [];

  path.forEach(function (point) {
    newPath.push({ x: point.x, y: point.y, label: point.label });
  });

  newPath.push({ x: newPoint.x, y: newPoint.y, label: newPoint.label });

  if (me.includesPoint(me.endPoints, newPoint) > -1) {
    me.completedPath(newPath);
  }

  return newPath;
};

Maze.prototype.removePath = function(path) {
  var me = this;
  var idx = me.lookupObjects[me.curLookUpIndex].paths.indexOf(path);

  if (idx > -1) {
    me.lookupObjects[me.curLookUpIndex].paths.splice(idx, 1);
  }
};

Maze.prototype.completedPath = function(path) {
  var me = this;

  if (!Array.isArray(me.lookupObjects[me.curLookUpIndex].completed)) {
    me.lookupObjects[me.curLookUpIndex].completed = [];
  }

  me.lookupObjects[me.curLookUpIndex].completed.push(path);
};

Maze.prototype.moveCompleted = function () {
  var me = this;
  var lookUpObjs = [];

  me.lookupObjects.forEach(function (object) {
    if (object.paths.length === 0 || me.isCompleted(object)) {
      me.completedObjects.push(object);
    } else {
      lookUpObjs.push(object);
    }
  });

  me.lookupObjects = lookUpObjs;
};

Maze.prototype.isCompleted = function (object) {
  var me = this;
  var completed = object.completed;
  var endPoints = me.endPoints;

  var match;

  // all end points should be last point at least on one comleted path
  for (var i = 0; i < endPoints.length; i++) {
    match = false;

    for (var c = 0; c < completed.length; c++) {
      if (me.samePoint(completed[c][completed[c].length-1], endPoints[i])) {
        match = true;
        break;
      }
    }

    if (!match) {
      return false;
    }
  }

  return true;
};

Maze.prototype.includesPoint = function (points, point) {
  var pointIndex = -1;

  for (var p = 0; p < points.length; p++) {
    if (this.samePoint(points[p], point)) {
      pointIndex = p;
      break;
    }
  }

  return pointIndex;
};

Maze.prototype.samePoint = function (a, b) {
  return a.x === b.x && a.y === b.y;
}

Maze.prototype.printDirections = function (asArray) {
  var me = this;
  var output;

  me.completedObjects.sort(function (a, b) {
    if (a.start.label > b.start.label) {
      return 1;
    } else if (a.start.label < b.start.label) {
      return -1;
    } else {
      return 0;
    }
  });

  output = me.completedObjects.map(me.literalDirections.bind(me));

  return asArray ? output : output.join(' ');
}

Maze.prototype.literalDirections = function(obj) {
  var me = this;

  if (obj.completed.length > 0) {
    return obj.completed.map(me.literalPath.bind(me)).join(' ');
  }

  return '';
}

Maze.prototype.literalPath = function (path) {
  return this.compactPath(path.map(this.literalPoint));
}

Maze.prototype.literalPoint = function (point) {
  return point.label;
}

Maze.prototype.compactPath = function (path) {
  var pathStr = '';
  var obj = { c: 0 };

  path.forEach(function (d, idx) {
    pathStr += this.compactPortion(obj, d);
    obj.dir = d;
    obj.c++;
  }, this);

  pathStr += this.compactPortion(obj);

  return pathStr.substr(1);
}

Maze.prototype.compactPortion = function(obj, d) {
  var portion = '';

  if (obj.dir && obj.dir != d) {
    portion += (obj.c > 1 ? obj.c : '') + obj.dir;
    obj.dir = undefined;
    obj.c = 0;
  }

  return portion;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = exports = Maze;
}
