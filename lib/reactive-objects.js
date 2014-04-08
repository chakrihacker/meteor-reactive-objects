ReactiveObject = {}; //model

ReactiveObjectInstance = function (instance, properties) { //instance
  var self = _.extend(this, instance); 
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
        return self.ReactiveFunctions.proxy(
          self.ReactiveSettings[name].value, 
          self.ReactiveSettings[name].type, 
          self.ReactiveSettings[name].deps
        )
      },
     
      set: function (value) {
        self.ReactiveSettings[name].value = value;
        self.ReactiveSettings[name].deps.changed();
      }
    });
  };

  self.ReactiveFunctions.proxy = function (value, type, deps) {
    return self.constructor.proxies[type](value, deps)
  };

  _.keys(properties).forEach(function (propertyName) {
    self.ReactiveFunctions.addProperty(propertyName, properties[propertyName])
  });  
}

Behave.addBehavior('ReactiveObject', function (setup) {
  this.dynamicProxies = true;
  if (setup) {
    this.dynamicProxies = setup.dynamicProxies;
    if (setup.proxies) {
      this.proxies = _.defaults(setup.proxies, ReactiveObject.proxies) //setup proxies overload    
    }
  }
  _.extend(this, ReactiveObject);
  return ReactiveObjectInstance; 
})