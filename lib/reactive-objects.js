//core object
ReactiveObject = {};
ReactiveObjectInstance = function (instance, properties) {
  var self = _.extend(this, instance); 
  self.ReactiveSettings = {};
  self.ReactiveFunctions = {};
  
  self.ReactiveFunctions.addProperty = function (name, value) {
    self.ReactiveSettings[name] = {
      value: value,
      type: self.constructor.getPropertyType(value),
      deps: new Deps.Dependency,
      changed: false
    };
    Object.defineProperty(self, name, {
      configurable: true, //allow for removal of get/set later
      get: function () {
        return self.ReactiveFunctions.interface(name)          
      },
     
      set: function (value) {
        self.ReactiveSettings[name].value = value;
        self.ReactiveSettings[name].deps.changed();
      }
    });
  };

  self.ReactiveFunctions.interface = function (name) {
    var type = self.ReactiveSettings[name].type;
    var value = self.ReactiveSettings[name].value;
    if (type == 'default') {
      self.ReactiveSettings[name].deps.depend();
      return value; 
    }
  };

  _.keys(properties).forEach(function (propertyName) {
    self.ReactiveFunctions.addProperty(propertyName, properties[propertyName])
  });  
}

Behave.addBehavior('ReactiveObject', function (setup) {
  _.extend(this, ReactiveObject);
  return ReactiveObjectInstance; 
})