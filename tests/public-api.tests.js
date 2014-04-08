var ReactiveObjects = Behave.create({ReactiveObject: {}})

Tinytest.add('ReactiveObjects - new - creates setter and getter for the properties on the object', function(test) {
  obj = ReactiveObjects.new({'singleProp': ''})
  obj.singleProp = 'value' //property setter
  test.equal(obj.singleProp, 'value', 'sets the getter') //property getter
});

Tinytest.add('ReactiveObjects - addProperty - adds a new property to existing object.', function(test) {
  obj = ReactiveObjects.new({'singleProp': {}})
  obj.singleProp = 'value' //property setter
  test.equal(obj.singleProp, 'value', 'should set the getter of the singleProp') //property getter

  //add additional props
  obj.ReactiveFunctions.addProperty('secondProp', {}) //Also test if old object can still be used, the return should not be meaningful.
  obj.secondProp = 'value2' //property setter
  test.equal(obj.singleProp, 'value', 'should set the getter of the singleProp') //property getter
  test.equal(obj.secondProp, 'value2', 'should set the getter of the secondProp') //property getter

  obj.ReactiveFunctions.addProperty('singleProp', {}) 
  obj.secondProp = 'value3' //property setter
  test.equal(obj.secondProp, 'value3', 'should set the getter of the secondProp') //property getter
});

Tinytest.add('ReactiveObjects - getter/setter - object property is reactive', function(test) {

  obj = ReactiveObjects.new({'reactiveProp':{}})

  Deps.autorun(function (c) {
    var arg = obj.reactiveProp 
    if (!c.firstRun) {
      completed();
      c.stop();
    }
  });
  
  obj.reactiveProp = 'foo'
  test.equal(obj.reactiveProp, 'foo', 'should call the non reactive property') //persisted

});

Tinytest.add('ReactiveObjects - ReactiveSettings - value returns non-reactive value', function(test) {

  obj = ReactiveObjects.new({'someOtherProp':{}})
  obj.notReactiveProp = 'value'
  test.equal(obj.notReactiveProp, 'value', 'should call the non reactive property') //persisted

  Deps.autorun(function (c) {
    var arg = obj.notReactiveProp 
    if (!c.firstRun) {
      test.fail();
      c.stop();
    }
  });
  
  obj.notReactiveProp = 'foo'
  test.equal(obj.notReactiveProp, 'foo', 'should call the non reactive property') //persisted

});


//remove property
Tinytest.add('ReactiveObjects - removeProperty - transforms property into a non reactive property', function(test) {
  var obj = ReactiveObjects.new({'Prop':{}})
  obj.Prop = 'value' //property setter
  ReactiveObjects.removeProperty(obj, 'Prop')
  test.equal(obj.Prop, 'value', 'should call the non reactive property') //persisted
  test.isFalse(obj.ReactiveSettings.hasOwnProperty('Prop'), 'object should not have reactive settings for removed property') 
});

//remove object
Tinytest.add('ReactiveObjects - removeObject - transforms object into a non reactive object', function(test) {

  obj = ReactiveObjects.new({basic:undefined, 'Prop':{}})
  obj.Prop = 'value' //property setter
  ReactiveObjects.removeObject(obj)
  test.equal(obj.Prop, 'value', 'should call the non reactive property') //persisted
  test.isFalse(obj.hasOwnProperty('ReactiveSettings'), 'should not have settings') 
  test.isFalse(obj.hasOwnProperty('ReactiveFunctions'), 'should not have reactive functions') 
});

//is reactive property
Tinytest.add('ReactiveObjects - isReactiveProperty -  identifies reactive properties', function(test) {
  
  //normal object
  obj = {Prop: 'value'}
  test.isFalse(ReactiveObjects.isReactiveProperty(obj, 'Prop'), 'should return false with normal object') 

  obj = ReactiveObjects.new({'Prop':undefined})
  //without value
  test.isTrue(ReactiveObjects.isReactiveProperty(obj, 'Prop'), 'should return true with reactive prop w/o value') 

  //with value
  obj.Prop = 'value'
  test.isTrue(ReactiveObjects.isReactiveProperty(obj, 'Prop'), 'should return true with reactive prop w/ value') 

});

//is reactive property
Tinytest.add('ReactiveObjects - isReactiveObject -  identifies reactive objects', function(test) {
  
  //normal object
  obj = {Prop: 'value'}
  test.isFalse(ReactiveObjects.isReactiveObject(obj), 'should return false with normal object') 

  obj = ReactiveObjects.new({'Prop':undefined})
  test.isTrue(ReactiveObjects.isReactiveObject(obj), 'should return true with reactive property') 

});