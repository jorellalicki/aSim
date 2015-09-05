/*
Obstructions

Used by Room, converted to 3D rect for simulation

Structure: {
  sx: Num, // start x
  sy: Num, // start y
  width: Num, // width
  height: Num, // height
  properties: {
    scattering: [NormNum],
    transmission: [NormNum],
    absorbtion: [NormNum]
  }
};

Functions:

obstr.serialize: Converts wall into javascript object for serialization
obstr.toThree(scene): Converts wall to 3D Rect for three.js and returns mesh.

*/

var Obstruction = Obstr = function(params){
  var obstr = {
    sx: params.sx || 0,
    sy: params.sy || 0,
    width: params.width || 0,
    height: params.height || 0,
    length: params.length || 0
  };

  obstr.serialize = function(){
    return {
      sx: obstr.sx,
      sy: obstr.sy,
      width: obstr.width,
      height: obstr.height,
      properties: obstr.properties
    };
  };

  obstr.toThree = function(scene, roomProps){
    // create three.js object
    var geometry = new THREE.BoxGeometry(obstr.width, obstr.length, obstr.height );
		var material = new THREE.MeshLambertMaterial( { color: 0xff00ff } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(obstr.sx + obstr.width/2,obstr.sy + obstr.length/2, obstr.height/2);
		return cube;
  };

  return obstr;
};
