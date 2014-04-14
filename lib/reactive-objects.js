ReactiveObjects = function (properties) { //instance
  var self = this;

  self.ReactiveSettings = {};
  self.ReactiveFunctions = {};

  self.ReactiveFunctions.addProperty = function (name, value) {
    self.ReactiveSettings[name] = {
      value: value,
      type: self.constructor.getPropertyType(value),
      deps: new Deps.Dependency,
    };
    Object.defineProperty(self, name, {
      configurable: true, //allow for removal of get/set later
      get: function () {
        return self.constructor.getProxies(
          self.ReactiveSettings[name].value, 
          self.ReactiveSettings[name].type, 
          self.ReactiveSettings[name].deps
        )
      },
     
      set: function (value) {
        self.ReactiveSettings[name].value = value;
        self.ReactiveSettings[name].type = self.constructor.getPropertyType(value);
        self.ReactiveSettings[name].deps.changed();
      }
    });
  };

  if (!properties) {return} //Built and no work left
  _.keys(properties).forEach(function (propertyName) {
    self.ReactiveFunctions.addProperty(propertyName, properties[propertyName])
  });  
};