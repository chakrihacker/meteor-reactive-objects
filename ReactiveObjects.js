ReactiveObjects = {}

ReactiveObjects.setProperty = function (propObj, propName) {

  if (propObj._reactivePropertiesDeps) {
  } else {
    propObj._reactivePropertiesDeps = {}
  }

  if (propObj._reactiveProperties) {
  } else {
    propObj._reactiveProperties = {}
  }

  var backup = propObj[propName]
  var DepsName = propName + "Deps"
  propObj._reactivePropertiesDeps[DepsName] = new Deps.Dependency

  Object.defineProperty(propObj, propName, {

    get: function getWeather () {
      propObj._reactivePropertiesDeps[DepsName].depend()
      return propObj._reactiveProperties[propName];
    },
   
    set: function setWeather (value) {
      propObj._reactiveProperties[propName] = value;
      // (could add logic here to only call changed()
      // if the new value is different from the old)
      propObj._reactivePropertiesDeps[DepsName].changed();
    }
   
  });  
  propObj[propName] = backup
}

ReactiveObjects.setObject = function (propObj, propArray) {
  for (var i = propArray.length - 1; i >= 0; i--) {
    ReactiveObjects.setProperty(propObj, propArray[i])
  };
}

