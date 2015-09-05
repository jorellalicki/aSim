/*
Floor (and ceiling)

Used by Room, converted to 3D rect for simulation

Structure: {
  properties: {
    scattering: [NormNum],
    transmission: [NormNum],
    absorbtion: [NormNum]
  }
};

Functions:

floor.serialize: Converts wall into javascript object for serialization
floor.toThree(scene): Converts wall to 3D Rect for three.js and returns mesh.

*/

var Floor = function(params){
  var floor = {
    bottom: (params.top || params.ceiling) ? false : (params.bottom || true)
  };

  floor.serialize = function(){
    return {
      bottom: floor.bottom,
      properties: floor.properties
    };
  };

  floor.toThree = function(scene, roomProps){
    // create three.js object
    var geometry = new THREE.BoxGeometry(1000, 10000, roomProps.wallWidth);
		var material = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.visible = false;
    mesh.position.set(0,0, floor.bottom ? 0 : roomProps.wallHeight);
		return mesh;
  };

  return floor;
};
