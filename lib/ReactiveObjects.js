//core object
ReactiveObjects = {}

//set single property
ReactiveObjects.setProperty = function (propObj, propName) {

  //add frame if it does not exist
  if (!propObj._reactiveDeps) {propObj._reactiveDeps = {}}
  if (!propObj._reactiveProperties) { propObj._reactiveProperties = {} }
  
  var DepsName = propName + "Deps"
  if (propObj._reactiveDeps[DepsName]) { return } //gracefully exit, would throw exception otherwise.
  
  //persist the value and do a full cleanup
  if (propObj[propName]) {
    var backup = propObj[propName]
    delete propObj[propName]
  }

  //create the deps
  propObj._reactiveDeps[DepsName] = new Deps.Dependency

  Object.defineProperty(propObj, propName, {
    configurable: true, //allow for removal of get/set later
    get: function () {
      propObj._reactiveDeps[DepsName].depend()
      return propObj._reactiveProperties[propName];
    },
   
    set: function (value) {
      if (!(value == propObj._reactiveProperties[propName])) {
        propObj._reactiveProperties[propName] = value;
        propObj._reactiveDeps[DepsName].changed();
      }
    }
   
  });  
  propObj[propName] = backup
  return propObj
}



//set an array of properties, == to set up object
ReactiveObjects.setProperties = function (propObj, propArray) {
  for (var i = propArray.length - 1; i >= 0; i--) {
    ReactiveObjects.setProperty(propObj, propArray[i])
  };
  return propObj
}

