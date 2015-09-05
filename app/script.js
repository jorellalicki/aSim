$(window).ready(function(){

  // Create a room
  var room = new Room({
    wallHeight: 2.5,
    wallWidth: .1
  });

  // Populate the room
  room.add(new Wall({ sx:0 , sy:0, ex: 4, ey:0 }));
  room.add(new Wall({ sx:4 , sy:0, ex: 4, ey:4 }));
  room.add(new Wall({ sx:4 , sy:4, ex: 0, ey:4 }));
  room.add(new Wall({ sx:0 , sy:4, ex: 0, ey:0 }));

  room.add(new Obstr({sx: 1, sy:1, width:.5, length:1, height:.5}))
  room.add(new Obstr({sx: 3, sy:3, width:.5, length:.5, height:2}))
  room.add(new Obstr({sx: .5, sy:3.5, width:.5, length:.5, height:.5}))

  // Convert the room to 3D
  var info3D = room.toThree({
    centerOn: {x: 2,y: 2},
    cameraRadius: 3,
    cameraHeight: 10
  });

  // Create a bunch of rays
  var rays = [];
  for (var i = 0;i < 20;i++){
    rays.push(tracer.Ray({
        x: 2, y:2, z:.5,
        dx: Math.random()-.5, dy: Math.random()-.5, dz: Math.random()-.5
    }));
  }

  tracer.calculateRays(info3D, rays);

});
