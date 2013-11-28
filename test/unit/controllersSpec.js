'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp.controllers'));

  it('should ライフゲームのある座標が生きてるか', inject(function() {
    var world = new World( [ point(1, 2) ]);
    expect( world.isAliveAt(point(1, 2)) ).toBe( true );
    expect( world.isAliveAt(point(1, 3)) ).toBe( false );
  }));

  it('should あるセルの周りにあるセルのリスト', inject(function() {
      expect( point.toString( point(1, 2).surround() ) ).toEqual(
          "(0, 1),(1, 1),(2, 1),(0, 2),(2, 2),(0, 3),(1, 3),(2, 3)"
      );
  }));

  it('should セルのリストのうち生きているものを数える', inject(function() {
      var cells =  point(1, 2).surround();
      var world = new World( [ point(0, 1), point(1, 1) ] );
      expect( world.countAliveCell(cells) ).toBe( 2 );
      expect( world.countAliveCell([ point(0, 1) ]) ).toBe( 1 );
  }));

  it('should ポイント比較', inject(function() {
      expect( point.compare(point(1, 1), point(1, 1)) ).toBe(0);
      expect( point.compare(point(1, 1), point(2, 1)) ).toBeLessThan(0);
      expect( point.compare(point(1, 1), point(2, 0)) ).toBeLessThan(0);
      expect( point.compare(point(1, 1), point(1, 2)) ).toBeLessThan(0);
      expect( point.compare(point(1, 1), point(1, 0)) ).toBeGreaterThan(0);
  }));

  it('should ポイント比較nullが一番小さい', inject(function() {
      expect( point.compare( null, point(1, 1)) ).toBeLessThan(0);
      expect( point.compare( null, null) ).toBe(0);
      expect( point.compare( point(1, 1), null) ).toBeGreaterThan(0);

      expect( point.compare( undefined, point(1, 1) ) ).toBeLessThan(0);
      expect( point.compare( point(1, 1), undefined ) ).toBeGreaterThan(0);
      expect( point.compare( undefined, undefined ) ).toBe(0);
      expect( point.compare( null, undefined ) ).toBe(0);
      expect( point.compare( undefined, null ) ).toBe(0);
  }));

});
