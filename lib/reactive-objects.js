ReactiveObjects = function (properties) { //instance
  var self = this;

  self.ReactiveConfig = {};
  self.ReactiveFunctions = {};

  self.ReactiveFunctions.addProperty = function (name, value) {
    self.ReactiveConfig[name] = {
      value: value,
      type: self.constructor.getPropertyType(value),
      deps: new Deps.Dependency,
    };
    Object.defineProperty(self, name, {
      configurable: true, //allow for removal of get/set later
      get: function () {
        return self.constructor.getProxies(
          self.ReactiveConfig[name].value, 
          self.ReactiveConfig[name].type, 
          self.ReactiveConfig[name].deps
        )
      },
     
      set: function (value) {
        self.ReactiveConfig[name].value = value;
        self.ReactiveConfig[name].type = self.constructor.getPropertyType(value);
        self.ReactiveConfig[name].deps.changed();
      }
    });
  };

  if (!properties) {return} //Built and no work left
  _.keys(properties).forEach(function (propertyName) {
    self.ReactiveFunctions.addProperty(propertyName, properties[propertyName])
  });  
};

