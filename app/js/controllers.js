'use strict';

function point(x, y) {
    return new function() {
        this.x = x;
        this.y = y;
        this.equals = function(that){
            return point.compare(this, that) === 0;
        }
        this.surround = function() {
            return [
                point(x-1, y-1), point(x, y-1), point(x+1, y-1),
                point(x-1, y),                  point(x+1, y),
                point(x-1, y+1), point(x, y+1), point(x+1, y+1)
            ];
        }
        this.toString = function() {
            return "("+x+ ", "+y+")";
        }
    };
}
point.compare = function(lhs, rhs) {
    if( lhs && rhs ){
        if( lhs.x === rhs.x && lhs.y === rhs.y ){
            return 0;
        }else if( lhs.x < rhs.x ) {
            return -1;
        }else{
            return (lhs.y < rhs.y) ? -1 : 1;
        }
    } else if ( !lhs && !rhs ){
        return 0;
    } else {
        return (!lhs) ? -1 : 1;
    }
}
point.toString = function(array) {
    return _(array).invoke('toString').join(',');
}
point.uniq = function(array) {
    var last = null;
    return array.sort(point.compare).reduce(function(acc, item) {
        if( point.compare(last, item) === 0 ){
            return acc;
        } else {
            last = item;
            return acc.concat(item);
        }
    }, []);
}

function World(alives) {
    this.alives = alives;

    this.isAliveAt = function(there) {
        return _(this.alives).any( there.equals.bind(there) );
    }
    this.countAliveCell = function(cells) {
        var me = this;
        return _(cells).select(function(pt) {
            return me.isAliveAt(pt);
        }).length;
    }
    this.canAlive = function(cell) {
        var willAlive = function(n){ return n===2 || n===3 };
        var willSpawn = function(n){ return n===3 };
        var n = this.countAliveCell( cell.surround() );
        return ( this.isAliveAt(cell) ) ? willAlive(n) : willSpawn(n);
    }
    this.next = function() {
        var target = point.uniq(
            _.chain(this.alives)
            .invoke('surround')
            .flatten()
            .value()
        );
        var canAlive = this.canAlive.bind(this);
        this.replase( _(target).select(canAlive) );
    }
    this.replase = function(newAge) {
        this.alives = point.uniq(newAge);
    }
    this.invert = function(cell) {
        var newAge = ( this.isAliveAt(cell) )
        ? _(this.alives).reject(function(pt){ return pt.equals(cell); })
        : this.alives.concat(cell);

        this.replase(newAge);
    }
}

/* Controllers */

angular.module('myApp.controllers', []).
  controller('Lifegame', function($scope, $interval){
      $scope.width  = 15;
      $scope.height = 20;

      $scope.range = function(n) { return _.range(n); }

      var world = new World( [
          point(10, 14), point(11, 14), point(12, 14),
          point(10, 15), point(11, 16),
          ] );

      $scope.world = world;

      $scope.isAlive = function(x, y) {
          return world.isAliveAt(point(x, y));
      };

      $scope.invert = function(x, y) {
          world.invert(point(x, y));
      };

      var promise = undefined;
      $scope.start = function() {
          if( typeof(promise) === 'undefined' ){
              promise = $interval(world.next.bind(world), 500);
          }
      };
      $scope.pause = function() {
          $interval.cancel(promise);
          promise = undefined;
      }

  });
