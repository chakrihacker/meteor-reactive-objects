ReactiveObjects.getProxies = function (value,type,deps) {
  return this.proxies[type](value, deps);
}

ReactiveObjects.getPropertyType = function (value) {
  if (this.disableDynamicProxies) return 'default'
  if (_.isArray(value)) return 'array'
  return 'default'
}
ReactiveObjects.isReactiveProperty = function (obj, name) {
  if (!obj.ReactiveSettings) {return false}
  if (obj.ReactiveSettings[name]) {return true} else {return false}
}
ReactiveObjects.isReactiveObject = function (obj) {
  if (!obj.ReactiveSettings) {return false} else {return true}
}

ReactiveObjects.removeProperty = function (obj, name) {
  if (!this.isReactiveProperty(obj, name)) {return} //Nothing to do, would create a property by that name otherwise

  var backup = obj.ReactiveSettings[name].value

  //this is the same config as a default object property
  Object.defineProperty(obj, name, {value : backup, writable : true, configurable : true, enumerable : true});

  delete obj.ReactiveSettings[name]
  return obj
}

ReactiveObjects.removeObject = function (obj) {
  if (!this.isReactiveObject(obj)) {return}

  for(key in obj.ReactiveSettings) {
    var backup = obj.ReactiveSettings[key].value
    Object.defineProperty(obj, key, {value : backup, writable : true, configurable : true, enumerable : true});
  }
  delete obj.ReactiveSettings
  delete obj.ReactiveFunctions
  return obj
}


ReactiveObjects.disableDynamicProxies = false
