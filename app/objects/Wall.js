/*
Wall objects

Used by Room, converted to 3D rect for simulation

Structure: {
  sx: Num, // start x
  sy: Num, // start y
  ex: Num, // end x
  ey: Num, // end y
  properties: {
    scattering: [NormNum],
    transmission: [NormNum],
    absorbtion: [NormNum]
  }
};

Functions:

wall.serialize: Converts wall into javascript object for serialization
wall.toThree(scene): Converts wall to 3D Rect for three.js and adds to scene

*/

var Wall = function(params){
  var wall = {
    sx: params.sx || 0,
    sy: params.sy || 0,
    ex: params.ex || 0,
    ey: params.ey || 0
  };

  wall.serialize = function(){
    return {
      sx: wall.sx,
      sy: wall.sy,
      ex: wall.ex,
      ey: wall.ey,
      properties: wall.properties
    };
  };

  wall.toThree = function(scene){
    console.error("Not Implemented");
  };

  return wall;
};
