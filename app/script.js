$(window).ready(function(){

  var room = new Room();

  room.add(new Wall({ sx:0 , sy:0, ex: 10, ey:0 }));

  room.toThree();

});
