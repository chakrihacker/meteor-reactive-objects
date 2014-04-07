//is property reactive?
ReactiveObjects.isReactiveProperty = function (obj, prop) {
  if (!obj._reactiveDeps) {return false}
  depsName = prop + 'Deps'
  if (obj._reactiveDeps[depsName]) {return true} else {return false}
}

//is object reactive?
ReactiveObjects.isReactiveObject = function (obj) {
  if (!obj._reactiveDeps) {return false} else {return true}
}

ReactiveObjects.isArray = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

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

//return an object with the reactive properties
ReactiveObjects.getObjectProperties = function (obj) {
  var newObj = {}
  for (depsKey in obj._reactiveDeps) {
    key = depsKey.substring(0, depsKey.length - 4);
    newObj[key] = obj._reactiveProperties[key]
  }
  return newObj
}
