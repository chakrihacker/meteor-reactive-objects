//remove reactive prop
ReactiveObjects.removeProperty = function (obj, propName) {
  if (!obj[propName]) {return} //Nothing to do, would create a property by that name otherwise

  var DepsName = propName + "Deps"
  var backup = obj._reactiveProperties[propName]

  //this is the same config as a default object property
  Object.defineProperty(obj, propName, {value : backup, writable : true, configurable : true, enumerable : true});

  delete obj._reactiveDeps[DepsName]
  delete obj._reactiveProperties[propName]
  return obj
}

//remove all reactive props object
ReactiveObjects.removeObject = function (obj) {
  for(key in obj._reactiveProperties) {
    var backup = obj._reactiveProperties[key]
    Object.defineProperty(obj, key, {value : backup, writable : true, configurable : true, enumerable : true});
  }
  delete obj._reactiveDeps
  delete obj._reactiveProperties
  return obj
}
