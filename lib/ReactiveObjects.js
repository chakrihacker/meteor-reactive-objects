//core object
ReactiveObjects = {}

//set single property
ReactiveObjects.setProperty = function (propObj, propName, mixinObj) {
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
      getter = { stop: false, value: propObj._reactiveProperties[propName] }
      if (mixinObj && mixinObj.hasOwnProperty('get')) { mixinObj.get( getter ) }
      if (!getter.stop) {
        propObj._reactiveDeps[DepsName].depend()
        return getter.value
      }
    },
   
    set: function (value) {
      setter = { stop: false, value: value, oldValue: propObj._reactiveProperties[propName] }
      if (mixinObj && mixinObj.hasOwnProperty('set')) { mixinObj.set( setter ) }
      if (!setter.stop) {
        propObj._reactiveProperties[propName] = setter.value;
        propObj._reactiveDeps[DepsName].changed();
      }
    }
   
  });  
  propObj[propName] = backup
  return propObj
}



//set an array of properties, == to set up object
ReactiveObjects.setProperties = function (propObj, propArray, mixinObj) {
  for (var i = propArray.length - 1; i >= 0; i--) {
    ReactiveObjects.setProperty(propObj, propArray[i], mixinObj)
  };
  return propObj
}

