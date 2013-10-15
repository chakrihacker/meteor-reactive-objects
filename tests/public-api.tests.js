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
  ReactiveObjects.setProperty(obj, 'singleProp') //Also test if old object can still be used, the return should not be meaningful.
  test.equal(obj.singleProp, 'value', 'should set the getter of the singleProp') //get old value
  obj.singleProp = 'value3' //property setter
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
Tinytest.add('ReactiveObjects - public api - property not white-listed persists and is not reactive', function(test) {

  //non reactive prop
  obj = {notReactiveProp: 'value'}
  ReactiveObjects.setProperty(obj, 'singleProp')
  test.equal(obj.notReactiveProp, 'value', 'should call the non reactive property') //persisted

  //not a deps dependent.
  var counter = 0
  Deps.autorun(function () {
    var foo = obj.notReactiveProp
    counter++
  })
  obj.notReactiveProp = 'otherValue'
  test.equal(obj.notReactiveProp, 'otherValue', 'should call the non reactive property') 
  test.equal(counter, 1, 'Deps should not have run')
});


//invalidate property
Tinytest.add('ReactiveObjects - public api - invalidateProperty transforms property into a non reactive property', function(test) {
  obj = ReactiveObjects.setProperty({}, 'Prop')
  obj.Prop = 'value' //property setter
  ReactiveObjects.invalidateProperty(obj, 'Prop')
  test.equal(obj.Prop, 'value', 'should call the non reactive property') //persisted
  test.isFalse(obj._reactiveDeps.hasOwnProperty('PropDeps'), 'should not have deps') 
  test.isFalse(obj._reactiveProperties.hasOwnProperty('Prop'), 'should not have a hidden property')

  //sanity test
  obj = {notReactiveProp: 'value'}
  ReactiveObjects.invalidateProperty(obj, 'Prop')
  test.equal(obj, obj, 'should not pollute objects') 
});

//invalidate object
Tinytest.add('ReactiveObjects - public api - invalidateObject transforms property into a non reactive property', function(test) {
  //single prop
  obj = ReactiveObjects.setProperty({}, 'Prop')
  obj.Prop = 'value' //property setter
  ReactiveObjects.invalidateObject(obj)
  test.equal(obj.Prop, 'value', 'should call the non reactive property') //persisted
  test.isFalse(obj._reactiveDeps.hasOwnProperty('PropDeps'), 'should not have deps') 
  test.isFalse(obj._reactiveProperties.hasOwnProperty('Prop'), 'should not have a hidden property')


  //multi prop
  obj = ReactiveObjects.setProperties({}, ['Prop1','Prop2'])
  obj.Prop1 = 'value1' //property setter
  obj.Prop2 = 'value2' //property setter
  ReactiveObjects.invalidateObject(obj)

  //prop1
  test.equal(obj.Prop1, 'value1', 'should call the non reactive property') //persisted
  test.isFalse(obj._reactiveDeps.hasOwnProperty('Prop1Deps'), 'should not have deps') 
  test.isFalse(obj._reactiveProperties.hasOwnProperty('Prop1'), 'should not have a hidden property')
  //prop2
  test.equal(obj.Prop2, 'value2', 'should call the non reactive property') //persisted
  test.isFalse(obj._reactiveDeps.hasOwnProperty('Prop2Deps'), 'should not have deps') 
  test.isFalse(obj._reactiveProperties.hasOwnProperty('Prop2'), 'should not have a hidden property')

  //sanity test
  obj = {notReactiveProp: 'value'}
  ReactiveObjects.invalidateObject(obj)
  test.equal(obj, obj, 'should not pollute objects') 
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
Tinytest.add('ReactiveObjects - public api - getObjectProperties returns an object with all the reactive properties.', function(test) {
  
  //normal object
  obj = {Prop: 'value'}
  test.equal(ReactiveObjects.getObjectProperties(obj), {}, 'should return an empty object') 

  obj = ReactiveObjects.setProperty({}, 'Prop')
  //without value
  test.equal(ReactiveObjects.getObjectProperties(obj), {Prop: undefined}, 'should return an object with a property, even if its undefined')

  //with value
  obj.Prop = 'value'
  test.equal(ReactiveObjects.getObjectProperties(obj), {Prop: 'value'}, 'should return an object with a property, even if its undefined')

});

