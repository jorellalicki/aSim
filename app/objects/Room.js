/*
Room Objects

Starting point for simulations

Structure: TODO
Functions: TODO

*/

var Room = function(){

  // General room properties
  var properties = {
    ceilingHeight: 2.5,
    wallWidth: .1
  };

  // stores objects
  var objects = [];


  // Adds objects
  function add(obj){
    objects.push(obj);
  }

  // Serializes room into javascript object
  function serialize(){
    var serializedObjects = [];
    for (var i = 0;i < objects.length;i++){
      serializedObjects.push(objects[i].serialize());
    }
    return {
      properties: properties,
      objects: serializedObjects
    };
  }

  // Converts to Three.js scene
  function toThree(){
    var width = $(".viewer").width();
    var height = $(".viewer").height();
    var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 90, width/height, 0.1, 1000 );
    var roomObjects = new THREE.Object3D();

		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(width, height);
		$(".viewer").append(renderer.domElement);

		var geometry = new THREE.BoxGeometry( 2, 2, 2 );
		var material = new THREE.MeshLambertMaterial( { color: 0x888888 } );
    var cube = new THREE.Mesh( geometry, material );
		roomObjects.add( cube );

    for (var i = 0;i < objects.length;i++){
      var mesh = objects[i].toThree(scene, properties);
      roomObjects.add(mesh);
    }

    scene.add( new THREE.AmbientLight(0x333333) );

    var light = new THREE.PointLight(0xffffff, 6, 40);
    light.position.set(20, 20, 20);
    scene.add(light);



		camera.position.z = 5;

    scene.add(roomObjects);

		var render = function () {
			requestAnimationFrame( render );

			roomObjects.rotation.x += 0.01;
			roomObjects.rotation.y += 0.01;

			renderer.render(scene, camera);
		};
		render();
  }

  return {
    add: add,
    toThree: toThree,
    properties: properties,
    serialize: serialize
  };
};
