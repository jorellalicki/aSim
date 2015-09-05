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
    
  }

  return {
    add: add,
    toThree: toThree,
    properties: properties
    serialize: serialize
  };
};
