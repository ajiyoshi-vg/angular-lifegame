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
    expect( world.isAliveAt(point(1, 2)) ).toBe( true );
    expect( world.isAliveAt(point(1, 3)) ).toBe( false );
  }));

  it('should あるセルの周りにあるセルのリスト', inject(function() {
      expect( surround( {x:1, y:2} ) ).toEqual( [
          {x:0, y:1}, {x:1, y:1}, {x:2, y:1},
          {x:0, y:2},             {x:2, y:2},
          {x:0, y:3}, {x:1, y:3}, {x:2, y:3}
      ]);
  }));

  it('should セルのリストのうち生きているものを数える', inject(function() {
      var cells =  surround( point(1, 2) ) ;
      var world = new World( [
          point(0, 1), point(1, 1)
      ] );
      expect( world.countAliveCell(cells) ).toBe( 2 );
      expect( world.countAliveCell([ point(0, 1) ]) ).toBe( 1 );
  }));

  it('should 配列の配列をフラットにする', inject(function() {
      expect( flatten( [ [1, 2], [3] ] ) ).toEqual(
          [ 1, 2, 3] );
  }));

  it('should 重複を排除した配列を得る', inject(function() {
      var cmp = function(lhs, rhs) {
          if( lhs === rhs ) {
              return 0;
          } else if( lhs < rhs ) {
              return -1;
          } else {
              return 1;
          }
      };
      expect( uniq([ 1, 1, 2 ], cmp) ).toEqual(
          [ 1, 2 ]);
      }));

      it('should ポイント比較', inject(function() {
          expect( comparePoint(point(1, 1), point(1, 1)) ).toBe(0);
          expect( comparePoint(point(1, 1), point(2, 1)) ).toBeLessThan(0);
          expect( comparePoint(point(1, 1), point(2, 0)) ).toBeLessThan(0);
          expect( comparePoint(point(1, 1), point(1, 0)) ).toBeGreaterThan(0);
          expect( comparePoint(point(1, 1), point(1, 2)) ).toBeLessThan(0);
      }));
      it('should ポイント比較nullが一番小さい', inject(function() {
          expect( comparePoint(null, point(1, 1)) ).toBeLessThan(0);
          expect( comparePoint(null, null) ).toBe(0);
          expect( comparePoint(point(1, 1), null) ).toBeGreaterThan(0);
      }));

});
