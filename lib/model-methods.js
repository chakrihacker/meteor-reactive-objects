ReactiveObject.getPropertyType = function (value) {
	if (!ReactiveObject.dynamicproxies) return 'default'
	if (Object.prototype.toString.call(value) === '[object Array]') return 'array'
	return 'default'
}

//is property reactive?
ReactiveObject.isReactiveProperty = function (obj, name) {
  if (!obj.ReactiveSettings) {return false}
  if (obj.ReactiveSettings[name]) {return true} else {return false}
}

//is object reactive?
ReactiveObject.isReactiveObject = function (obj) {
  if (!obj.ReactiveSettings) {return false} else {return true}
}

//remove reactive prop
ReactiveObject.removeProperty = function (obj, name) {
  if (!ReactiveObject.isReactiveProperty(obj, name)) {return} //Nothing to do, would create a property by that name otherwise

  var backup = obj.ReactiveSettings[name].value

  //this is the same config as a default object property
  Object.defineProperty(obj, name, {value : backup, writable : true, configurable : true, enumerable : true});

  delete obj.ReactiveSettings[name]
  return obj
}

//remove all reactive props object
ReactiveObject.removeObject = function (obj) {
	if (!ReactiveObject.isReactiveObject(obj)) {return}

  for(key in obj.ReactiveSettings) {
    var backup = obj.ReactiveSettings[key].value
    Object.defineProperty(obj, key, {value : backup, writable : true, configurable : true, enumerable : true});
  }
  delete obj.ReactiveSettings
  delete obj.ReactiveFunctions
  return obj
}