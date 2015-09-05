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
wall.toThree(scene): Converts wall to 3D Rect for three.js and returns mesh.

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

  wall.toThree = function(scene, roomProps){
    // Organize start xs and ys to be less than end xs and ys
    var sx,sy,ex,ey;
    if (wall.sx < wall.ex){
      sx = wall.sx;
      ex = wall.ex;
    }else{
      sx = wall.ex;
      ex = wall.sx;
    }
    if (wall.sy < wall.ey){
      sy = wall.sy;
      ey = wall.ey;
    }else{
      sy = wall.ey;
      ey = wall.sy;
    }

    // Calculate midpoint and angle
    var mx = (sx + ex)/2;
    var my = (sy + ey)/2;
    var length = Math.sqrt(Math.pow(ex - sx,2) + Math.pow(ey - sy,2));
    var angle = Math.atan2(ey- sy, ex - sx);

    // create three.js object
    var geometry = new THREE.BoxGeometry( roomProps.wallWidth, length + roomProps.wallWidth , roomProps.wallHeight);
		var material = new THREE.MeshLambertMaterial( { color: 0xff00ff } );
    var cube = new THREE.Mesh( geometry, material );
    cube.rotation.z = angle - Math.PI/2;
    cube.position.set(mx,my,roomProps.wallHeight/2);
    cube.geometry.computeFaceNormals();
		return cube;
  };

  return wall;
};
