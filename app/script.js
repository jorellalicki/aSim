$(window).ready(function(){

  var room = new Room();

  room.add(new Wall({ sx:0 , sy:0, ex: 4, ey:0 }));
  room.add(new Wall({ sx:4 , sy:0, ex: 4, ey:4 }));
  room.add(new Wall({ sx:4 , sy:4, ex: 0, ey:4 }));
  room.add(new Wall({ sx:0 , sy:4, ex: 0, ey:0 }));

  room.toThree();

});
