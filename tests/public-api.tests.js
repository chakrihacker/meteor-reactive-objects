//setProperty
Tinytest.add('ReactiveObjects - public api - setProperty creates setter and getter for a property on the object', function(test) {
  obj = ReactiveObjects.setProperty({}, 'singleProp')
  obj.singleProp = 'value' //property setter
  test.equal(obj.singleProp, 'value', 'sets the getter') //property getter
});

//setProperty rerun
Tinytest.add('ReactiveObjects - public api - setProperty rerun does not conflict with old runs.', function(test) {
  obj = ReactiveObjects.setProperty({}, 'singleProp')
  obj.singleProp = 'value' //property setter
  test.equal(obj.singleProp, 'value', 'should set the getter of the singleProp') //property getter

  //add additional props
  ReactiveObjects.setProperty(obj, 'secondProp') //Also test if old object can still be used, the return should not be meaningful.
  obj.secondProp = 'value2' //property setter
  test.equal(obj.singleProp, 'value', 'should set the getter of the singleProp') //property getter
  test.equal(obj.secondProp, 'value2', 'should set the getter of the secondProp') //property getter

  //allow for graceful redefine of existing property - exact method should be tested in private api tests
  ReactiveObjects.setProperty(obj, 'singleProp') 
  test.equal(obj.singleProp, 'value', 'should set the getter of the singleProp') //get old value
  obj.secondProp = 'value3' //property setter
  test.equal(obj.secondProp, 'value3', 'should set the getter of the secondProp') //property getter
});

//setProperties
Tinytest.add('ReactiveObjects - public api - setProperties creates setters and getters for properties on the object', function(test) {
  obj = ReactiveObjects.setProperties({}, ['Prop1', 'Prop2', 'Prop3'])
  obj.Prop1 = 'value1' //property setter
  obj.Prop2 = 'value2' //property setter
  obj.Prop3 = 'value3' //property setter
  test.equal(obj.Prop1, 'value1','should set the getter') //property getter
  test.equal(obj.Prop2, 'value2','should set the getter') //property getter
  test.equal(obj.Prop3, 'value3','should set the getter') //property getter
});

//non reactive property
Tinytest.add('ReactiveObjects - public api - property not white-listed persists and should not be reactive', function(test) {

  //non reactive prop
  obj = {notReactiveProp: 'value'}
  ReactiveObjects.setProperty(obj, 'someOtherProp')
  test.equal(obj.notReactiveProp, 'value', 'should call the non reactive property') //persisted

    var x = 0;
    var handle = Deps.autorun(function (handle) {
      var arg = obj.notReactiveProp 
      ++x;
    });
    test.equal(x, 1);
    obj.notReactiveProp = 'foo'
    Deps.flush();
    test.equal(x, 1);
    handle.stop();
});


//remove property
Tinytest.add('ReactiveObjects - public api - removeProperty transforms property into a non reactive property', function(test) {
  obj = ReactiveObjects.setProperty({basic:undefined}, 'Prop')
  obj.Prop = 'value' //property setter
  ReactiveObjects.removeProperty(obj, 'Prop')
  test.equal(obj.Prop, 'value', 'should call the non reactive property') //persisted
  test.isFalse(obj._reactiveDeps.hasOwnProperty('PropDeps'), 'should not have deps') 
  test.isFalse(obj._observers.hasOwnProperty('PropObserver'), 'should not have a hidden property')
});

//remove object
Tinytest.add('ReactiveObjects - public api - removeObject transforms property into a non reactive property', function(test) {
  //single prop
  obj = ReactiveObjects.setProperty({basic:undefined}, 'Prop')
  obj.Prop = 'value' //property setter
  ReactiveObjects.removeObject(obj)
  
  test.equal(obj.Prop, 'value', 'should call the property') //persisted  

  test.isFalse(obj._observers, 'should not have an observer')
  test.isFalse(obj._reactiveDeps, 'should not have any deps')


  //multi prop
  obj = ReactiveObjects.setProperties({basic:undefined}, ['Prop1','Prop2'])
  obj.Prop1 = 'value1' //property setter
  obj.Prop2 = 'value2' //property setter
  ReactiveObjects.removeObject(obj)

  test.equal(obj.Prop1, 'value1', 'should call the non reactive property') //persisted
  test.equal(obj.Prop2, 'value2', 'should call the non reactive property') //persisted

  test.isFalse(obj._observers, 'should not have any an observers')
  test.isFalse(obj._reactiveDeps, 'should not have any deps')
});

//is reactive property
Tinytest.add('ReactiveObjects - public api - isReactiveProperty identifies reactive properties', function(test) {
  
  //normal object
  obj = {Prop: 'value'}
  test.isFalse(ReactiveObjects.isReactiveProperty(obj, 'Prop'), 'should return false with normal object') 

  obj = ReactiveObjects.setProperty({}, 'Prop')
  //without value
  test.isTrue(ReactiveObjects.isReactiveProperty(obj, 'Prop'), 'should return true with reactive prop w/o value') 

  //with value
  obj.Prop = 'value'
  test.isTrue(ReactiveObjects.isReactiveProperty(obj, 'Prop'), 'should return true with reactive prop w/ value') 

});

//is reactive object
Tinytest.add('ReactiveObjects - public api - isReactiveObject returns true if object has reactive properties', function(test) {
  
  //normal object
  obj = {Prop: 'value'}
  test.isFalse(ReactiveObjects.isReactiveObject(obj), 'should return false with normal object') 

  obj = ReactiveObjects.setProperty({}, 'Prop')
  //without value
  test.isTrue(ReactiveObjects.isReactiveObject(obj), 'should return true with reactive prop w/o value') 

  //with value
  obj.Prop = 'value'
  test.isTrue(ReactiveObjects.isReactiveObject(obj), 'should return true with reactive prop w/ value') 

});

//get all reactive properties
Tinytest.add('ReactiveObjects - public api - getObjectProperties returns an object with all the observed properties.', function(test) {
  
  //normal object
  obj = {Prop: 'value'}
  test.equal(ReactiveObjects.getObjectProperties(obj), {}, 'should return an empty object') 

  obj = ReactiveObjects.setProperty({}, 'Prop')
  //without value
  test.equal(ReactiveObjects.getObjectProperties(obj), {Prop: undefined}, 'should return an object with a property, even if its undefined')

  //with value
  obj.Prop = 'value'
  test.equal(ReactiveObjects.getObjectProperties(obj), {Prop: 'value'}, 'should return an object with a property')

});

//array test
Tinytest.add('ReactiveObjects - public api - test object with array property', function(test) {
  
  //object with an array property
  obj = {Prop: []}

  ReactiveObjects.setProperty(obj, 'Prop')

  var x = 0;
  var handle = Deps.autorun(function (handle) {
    var arg = obj.Prop 
    ++x;
  });

  test.equal(x, 1);

  obj.Prop.push(1)
  Deps.flush();
  test.equal(x, 2);
  test.equal(obj.Prop, [1])

  handle.stop();


});

//nested objects test
Tinytest.add('ReactiveObjects - public api - test object with nested object property', function(test) {
  
  //object with an array property
  obj = {Prop: {}}

  ReactiveObjects.setProperty(obj, 'Prop')

  var x = 0;
  var handle = Deps.autorun(function (handle) {
    var arg = obj.Prop 
    ++x;
  });

  test.equal(x, 1);

  obj.Prop.foo = 'bar'
  Deps.flush();
  test.equal(x, 2);
  test.equal(obj.Prop.foo, 'bar')

  handle.stop();


});
