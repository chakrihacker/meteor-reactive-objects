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
