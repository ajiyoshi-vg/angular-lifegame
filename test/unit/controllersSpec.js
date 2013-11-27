'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp.controllers'));


  it('should [0, 1, 2, 3... x] みたいな配列を作る', inject(function() {
    //spec body
    expect( integers(0, 3) ).toEqual( [ 0, 1, 2 ] );
    expect( integers(0, 4) ).toEqual( [ 0, 1, 2, 3 ] );
    expect( integers(4, 2) ).toEqual( [ ] );
    expect( integers(4, 4) ).toEqual( [ ] );
  }));

  it('should ライフゲームのある座標が生きてるか', inject(function() {
    //spec body
    var world = new World(
        [ {x:1, y:2} ]
    );
    expect( world.isAlive(1, 2) ).toBe( true );
    expect( world.isAlive(1, 3) ).toBe( false );
  }));

  it('should あるセルの周りにあるセルのリスト', inject(function() {
      expect( surround( {x:1, y:2} ) ).toEqual( [
          {x:0, y:1}, {x:1, y:1}, {x:2, y:1},
          {x:0, y:2},             {x:2, y:2},
          {x:0, y:3}, {x:1, y:3}, {x:2, y:3}
      ]);
  }));


});
