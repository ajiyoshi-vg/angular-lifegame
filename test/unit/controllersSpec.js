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

  it('should ....', inject(function() {
    //spec body
  }));
});
