//return an object with the reactive properties
ReactiveObjects.getObjectProperties = function (obj) {
  var newObj = {}
  for (depsKey in obj._reactiveDeps) {
    key = depsKey.substring(0, depsKey.length - 4);
    newObj[key] = obj[key]
  }
  return newObj
}
