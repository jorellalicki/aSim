/*
Room Objects

Starting point for simulations

Structure: TODO
Functions: TODO

*/

var Room = function(params){

  // General room properties
  var properties = {
    wallHeight: params.wallHeight || 2.5,
    wallWidth: params.wallWidth || .1
  };

  // stores objects
  var objects = [];

  // Called on construction to initialize the room
  function init(){
    // Add the floor and ceiling
    // add(new Floor({ceiling:false}));
    // add(new Floor({ceiling:true}));
  }


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
  function toThree(params){
    params = params || {};
    params.centerOn = params.centerOn || {x: 0,y: 0};
    params.cameraRadius = params.cameraRadius || 10;
    params.cameraHeight = params.cameraHeight || properties.wallHeight * 4;

    var width = $(".viewer").width();
    var height = $(".viewer").height();
    var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 45, width/height, 0.1, 1000 );
    var roomObjects = new THREE.Object3D();

		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(width, height);
		$(".viewer").append(renderer.domElement);

    for (var i = 0;i < objects.length;i++){
      var mesh = objects[i].toThree(scene, properties);
      roomObjects.add(mesh);
    }

    // scene.add( new THREE.AmbientLight(0x333333) );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set( -.5, -1, .5 );
    scene.add( directionalLight );

		camera.position.z = params.cameraHeight;

    scene.add(roomObjects);

    renderer.setClearColor( 0xeeeeee, 1);
    var cameraCenter = new THREE.Vector3(params.centerOn.x,params.centerOn.y,0);
    camera.up = new THREE.Vector3(0,0,1);
    var t = 0;
		var render = function () {
      t++;
			requestAnimationFrame( render );

      camera.position.set(cameraCenter.x + Math.cos(t/100) * params.cameraRadius,
                          cameraCenter.y + Math.sin(t/100) * params.cameraRadius,
                          cameraCenter.z + params.cameraHeight);


      camera.lookAt(cameraCenter);

			renderer.render(scene, camera);
		};
		render();

    return {
      scene: scene,
      roomObjects: roomObjects
    };
  }

  init();
  return {
    add: add,
    toThree: toThree,
    properties: properties,
    serialize: serialize
  };
};
