//core object
ReactiveObjects = {}

//set single property
ReactiveObjects.setProperty = function (propObj, propName, mixinObj) {
  //add frame if it does not exist
  if (!propObj._reactiveDeps) {propObj._reactiveDeps = {}}
  if (!propObj._observers) { propObj._observers = {} }
  if (!propObj.depends) { 
    propObj.depend = function (name) {
      propObj._observers[name].depend()
      return propObj[name]
    }
  }
  
  var DepsName = propName + "Deps"
  if (propObj._reactiveDeps[DepsName]) { 
    return //gracefully exit, would throw exception otherwise.
  } else {
    propObj._reactiveDeps[DepsName] = new Deps.Dependency //create the deps
  }
  
  var observerName = propName + "Observer"
  propObj._observers[observerName] = new PathObserver(propObj, propName);
  propObj._observers[observerName].open(function(newValue, oldValue) {
    propObj._reactiveDeps[DepsName].changed()
  });
  return propObj
}



//set an array of properties, == to set up object
ReactiveObjects.setProperties = function (propObj, propArray, mixinObj) {
  for (var i = propArray.length - 1; i >= 0; i--) {
    ReactiveObjects.setProperty(propObj, propArray[i], mixinObj)
  };
  return propObj
}

