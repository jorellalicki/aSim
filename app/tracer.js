var tracer = (function(){

  var moveSpeed = .1;
  var rayCaster = new THREE.Raycaster();

  function Ray(params){
    var dx = params.dx,
        dy = params.dy,
        dz = params.dz;

    // Normalize dx,dy,dz
    var mag = Math.sqrt(dx*dx+dy*dy+dz*dz);
    dx /= mag;
    dy /= mag;
    dz /= mag;

    return {
      x: params.x,
      y: params.y,
      z: params.z,
      dx: dx,
      dy: dy,
      dz: dz,
      it: params.it || 0, // intersection time
      nextIntersection: null, // next intersection
      lastMesh: null
    };
  }

  function getNextRay(ray, obstructions){
    // Setup ray caster
    var location = new THREE.Vector3(ray.x, ray.y, ray.z);
    var direction = new THREE.Vector3(ray.dx, ray.dy, ray.dz);
    rayCaster.set(
      location, direction
    );

    // Check for intersections
    var intersection;
    var intersects = rayCaster.intersectObjects(obstructions);
    for ( var i = 0; i < intersects.length; i++ ) {
      intersects[ i ].object.material.color.set( 0xff0000 );
      if (intersects[i] != ray.lastMesh){
        ray.lastMesh = intersects[i];
        intersection = intersects[i];
        break;
      }
    }

    if (!intersection) return null;

    // Find normal
    var normal = intersection.face.normal;

    // Find reflection
    var reflection = direction.reflect(normal);

    ray.it = intersection.distance / moveSpeed;

    return {
      point: intersection.point,
      reflection: reflection
    };
  }

  var lastDebugPoint = null;
  function addDebugPoint(scene,x,y,z){
    if (lastDebugPoint){
      scene.remove(lastDebugPoint);
    }
    geometry = new THREE.SphereGeometry( .05, .05, .05 ) ;
    material = new THREE.MeshLambertMaterial( { color:0x00CCFF } ) ;
    mesh = new THREE.Mesh( geometry, material ) ;
    mesh.position.set( x, y, z ) ;
    scene.add(mesh);
    lastDebugPoint = mesh;
  }

  function calculateRays(info3D, initialRays){
    if (!info3D) return console.error("No info3D specified");
    if (!info3D.scene) return console.error("No info3D scene");
    if (!info3D.roomObjects) return console.error("No info3D roomObjects");

    var scene = info3D.scene;

    // Generate initial ray interections
    var rays = initialRays;
    for (var i = rays.length - 1;i>=0;i--){
      rays[i].nextIntersection = getNextRay(rays[i], info3D.roomObjects.children);
      if (!rays[i].nextIntersection){
        console.error("An initial ray didn't collide with anything");
        rays.splice(i,1);
      }
    }

    var t = 0;
    setInterval(function(){
      for (var i = rays.length-1;i >= 0; i--){
        var ray = rays[i];
        addDebugPoint(scene, ray.x, ray.y, ray.z);
        if (ray.it <= 1){
          //TODO move remainder
          // console.log("A",[ray.x,ray.y,ray.z],[ray.dx,ray.dy,ray.dz]);
          // Ray becomes reflected array and find new next ray
          ray.x = ray.nextIntersection.point.x;
          ray.y = ray.nextIntersection.point.y;
          ray.z = ray.nextIntersection.point.z;

          ray.dx = ray.nextIntersection.reflection.x;
          ray.dy = ray.nextIntersection.reflection.y;
          ray.dz = ray.nextIntersection.reflection.z;

          // console.log("B",[ray.x,ray.y,ray.z],[ray.dx,ray.dy,ray.dz]);

          // ray.x += ray.dx * moveSpeed;
          // ray.y += ray.dy * moveSpeed;
          // ray.z += ray.dz * moveSpeed;
          ray.nextIntersection = getNextRay(ray, info3D.roomObjects.children);

          if (!ray.nextIntersection){
            console.log("Spliced");
            rays.splice(i,1);
            continue;
          }
        }else{
          ray.x += ray.dx * moveSpeed;
          ray.y += ray.dy * moveSpeed;
          ray.z += ray.dz * moveSpeed;
          ray.it --;
        }
      }
    }, 1000/60);
    return;
  }

  return {
    calculateRays: calculateRays,
    Ray: Ray
  };
})();
