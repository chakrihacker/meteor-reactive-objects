//remove reactive prop
ReactiveObjects.removeProperty = function (obj, propName) {
  if (!obj[propName]) {return} //Nothing to do, would create a property by that name otherwise

  var depsName = propName + "Deps"
  var observerName = propName + "Observer"

  delete obj._reactiveDeps[depsName]
  obj._observers[observerName].close() // Ends observation. Frees resources and drops references to observed objects.
  delete obj._observers[observerName]  // Remove for clarity
  return obj
}

//remove all reactive props object
ReactiveObjects.removeObject = function (obj) {
  for(key in obj._observers) {
    obj._observers[key].close() // Ends observation. Frees resources and drops references to observed objects.
  }
  delete obj._reactiveDeps
  delete obj._observers 
  return obj
}
