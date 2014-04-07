var ReactiveObjects = Behave.create({ReactiveObject: {}})

//setProperty
Tinytest.add('ReactiveObjects - new - creates setter and getter for the properties on the object', function(test) {
  obj = ReactiveObjects.new({'singleProp': ''})
  obj.singleProp = 'value' //property setter
  test.equal(obj.singleProp, 'value', 'sets the getter') //property getter
});

//setProperty rerun
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

//reactive property
Tinytest.add('ReactiveObjects - getter - calls deps', function(test) {

  //non reactive prop
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


//non reactive property
Tinytest.add('ReactiveObjects - ReactiveSettings - value returns non-reactive value', function(test) {

  //non reactive prop
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
  obj = ReactiveObjects.new({'Prop':''})
  obj.Prop = 'value' //property setter
  ReactiveObjects.removeProperty(obj, 'Prop')
  test.equal(obj.Prop, 'value', 'should call the non reactive property') //persisted
  test.isFalse(obj.ReactiveSettings.hasOwnProperty('Prop'), 'object should not have any reactive settings') 
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

/*
//array test
Tinytest.addAsync('ReactiveObjects - dynamic type change - change property type from array to default', function(test, completed) {
  //object with an array property
  var obj = ReactiveObjects.new({Prop: { value: ['ff']}})

  Deps.autorun(function (c) {
    var arg = obj.Prop 
    if (!c.firstRun) {
      c.stop();
      completed();
    }
  });

  obj.Prop = 'foo';
});

Tinytest.addAsync('ReactiveObjects - array interface - push to reactive array', function(test, completed) {
  //object with an array property
  var obj = ReactiveObjects.new({Prop: ['ff']})
  obj.ReactiveSettings.Prop.type = 'array'

  Deps.autorun(function (c) {
    var arg = obj.Prop 
    if (!c.firstRun) {
      test.equal(obj.Prop[0], 1, 'should be equal');
      completed();
      c.stop();
    }
  });
  
  obj.Prop.push(1);
});

//nested objects test
Tinytest.add('ReactiveObjects - nested object interface - test object with nested object property', function(test) {
  
  //object with an array property
  var obj = ReactiveObjects.new({Prop: { sub: undefined}})

  Deps.autorun(function (c) {
    var arg = obj.Prop.sub 
    if (!c.firstRun) {
      completed();
      c.stop();
    }
  });
  
  obj.Prop.sub = 'foo'


});
*/