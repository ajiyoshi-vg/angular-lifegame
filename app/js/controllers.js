'use strict';

function integers(from, to) {
    var ret = [];
    for( var i=0, len=to-from; i<len; i++ ){
        ret[i] = from + i;
    }
    return ret;
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
    this.isAlive = function(x, y) {
        var n = this.alives.filter(function(pt){
            return pt.x == x && pt.y == y;
        }).length;
       return n > 0;
    }

    this.next = function() {
        /*
        var target = this.alives.map(function(cell){
            return surround(cell);
        });
        var me = this;
        target.filter(function(cell){
            if( me.isAlive(cell) ){
                var n = me.countLiveCell(surround(cell)) ;
                return n == 2 || n == 3;
            }
        });
        */
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
          { x:1, y:2 }, { x:3, y:4 }
          ] );
      $scope.isAlive = function(x, y) {
          return world.isAlive(x, y);
      };

      $scope.next = function() {
          console.log('hoge');
      };
  });
