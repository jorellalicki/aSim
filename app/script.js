$(window).ready(function(){

  var room = new Room();

  room.add(new Wall({ sx:0 , sy:0, ex: 4, ey:0 }));
  room.add(new Wall({ sx:4 , sy:0, ex: 4, ey:4 }));
  room.add(new Wall({ sx:4 , sy:4, ex: 0, ey:4 }));
  room.add(new Wall({ sx:0 , sy:4, ex: 0, ey:0 }));

  room.add(new Obstr({sx: 1, sy:1, width:.5, length:1, height:.5}))
  room.add(new Obstr({sx: 3, sy:3, width:.5, length:.5, height:2}))

  var info3D = room.toThree({
    centerOn: {x: 2,y: 2},
    cameraRadius: 6,
    cameraHeight: 6
  });

});
