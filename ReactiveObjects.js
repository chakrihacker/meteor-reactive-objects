ReactiveObjects = {}

ReactiveObjects.setProperty = function (propObj, propName) {

  if (propObj._reactiveDeps) {
  } else {
    propObj._reactiveDeps = {}
  }

  if (propObj._reactiveProperties) {
  } else {
    propObj._reactiveProperties = {}
  }

  var backup = propObj[propName]
  var DepsName = propName + "Deps"
  propObj._reactiveDeps[DepsName] = new Deps.Dependency

  Object.defineProperty(propObj, propName, {

    get: function () {
      propObj._reactiveDeps[DepsName].depend()
      return propObj._reactiveProperties[propName];
    },
   
    set: function (value) {
      propObj._reactiveProperties[propName] = value;
      // (could add logic here to only call changed()
      // if the new value is different from the old)
      propObj._reactiveDeps[DepsName].changed();
    }
   
  });  
  propObj[propName] = backup
}

ReactiveObjects.setProperties = function (propObj, propArray) {
  for (var i = propArray.length - 1; i >= 0; i--) {
    ReactiveObjects.setProperty(propObj, propArray[i])
  };
}

