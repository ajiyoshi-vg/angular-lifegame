'use strict';


function comparePoint(lhs, rhs) {
    if( !lhs && !rhs){
        return 0;
    }else if( !lhs ){
        return -1;
    }else if( !rhs ){
        return 1;
    }else if( lhs.x === rhs.x && lhs.y === rhs.y ){
        return 0;
    }else if( lhs.x < rhs.x ) {
        return -1;
    }else{
        return (lhs.y < rhs.y) ? -1 : 1;
    }
}

function uniq(list, comparator) {
    var last = null;
    return list.sort(comparator).reduce(function(acc, item) {
        console.log(acc);
        if( comparator(last, item) === 0 ){
            return acc;
        } else {
            last = item;
            return acc.concat(item);
        }
    }, []);
}
function point(X, Y) {
    return { x:X, y:Y };
}
function integers(from, to) {
    var ret = [];
    for( var i=0, len=to-from; i<len; i++ ){
        ret[i] = from + i;
    }
    return ret;
}

function flatten(listOfList) {
    return listOfList.reduce(function(acc, ls) {
        return acc.concat(ls);
    }, [] );
}

function surround( pt ) {
    return [
        {x:pt.x-1, y:pt.y-1}, {x:pt.x, y:pt.y-1}, {x:pt.x+1, y:pt.y-1},
        {x:pt.x-1, y:pt.y},                        {x:pt.x+1, y:pt.y},
        {x:pt.x-1, y:pt.y+1}, {x:pt.x, y:pt.y+1}, {x:pt.x+1, y:pt.y+1}
    ];
}

function World(alives) {
    this.alives = alives;
    this.isAliveAt = function(there) {
        var n = this.alives.filter(function(pt){
            return pt.x == there.x && pt.y == there.y;
        }).length;
       return n > 0;
    }

    this.countAliveCell = function(cells) {
        var me = this;
        var n = cells.reduce( function(acc, pt) {
            return ( me.isAliveAt(pt) ) ? acc + 1 : acc;
        }, 0 );
        return n;
    }

    this.willAlive = function(cell) {
        var n = this.countAliveCell( surround(cell) );
        return n === 2 || n === 3;
    }
    this.willSpawn = function(cell) {
        var n = this.countAliveCell( surround(cell) );
        return n === 3;
    }
    this.next = function() {
        var cmp = comparePoint;
        var temp = flatten( this.alives.map(function(cell){
            return surround(cell);
        }));
        var target = uniq(temp, comparePoint);
        var me = this;
        var nextAges = target.filter(function(cell){
            if( me.isAliveAt(cell) ){
                return me.willAlive(cell);
            } else {
                return me.willSpawn(cell);
            }
        });
        this.alives = nextAges;
    }
}

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('Lifegame', function($scope){
      $scope.width = 10;
      $scope.height = 8;

      $scope.integers = integers;

      var world = new World( [
          point(1, 2), point(1, 3), point(1, 4)
          ] );
      $scope.isAlive = function(x, y) {
          return world.isAliveAt(point(x, y));
      };

      $scope.next = function() {
          world.next();
      };

      $scope.num = function() {
          return world.alives.length;
      }
  });
