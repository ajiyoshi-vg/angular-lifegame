'use strict';

function integers(from, to) {
    var ret = [];
    for( var i=0, len=to-from; i<len; i++ ){
        ret[i] = from + i;
    }
    return ret;
}

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('Lifegame', function($scope){
      $scope.width = 40;
      $scope.height = 20;

      $scope.integers = integers;
  });
