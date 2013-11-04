Tinytest.add('ReactiveObjects - public api - setProperty mixin.set', function(test) {

  //call but do nothing
  var mixin = {}
  mixin.set = function (setter) { }
  obj = ReactiveObjects.setProperty({}, 'singleProp', mixin)
  obj.singleProp = 'value' //property setter
  test.equal(obj.singleProp, 'value', 'setter still works') 

  //block the call
  var mixin = {}
  mixin.set = function (setter) { setter.stop = true }
  obj = ReactiveObjects.setProperty({}, 'singleProp', mixin)
  obj.singleProp = 'value' //property setter
  test.isFalse(obj.singleProp, 'setter should not work') 

  //function mixin
  var mixin = {}
  var testVar = false
  mixin.set = function () { 
    testVar = true
  }
  test.isFalse(testVar, 'should not be set') 
  obj = ReactiveObjects.setProperty({}, 'singleProp', mixin)
  test.isTrue(testVar, 'function should have run') 

  testVar = false
  obj.singleProp = 'value' //property setter
  test.isTrue(testVar, 'function should be rerun') 


  //function changes input value
  var mixin = {}
  mixin.set = function (setter) { 
    setter.value = 'new value'
  }
  obj = ReactiveObjects.setProperty({}, 'singleProp', mixin)
  test.equal(obj.singleProp, 'new value', 'setter should have changed the value') 
  obj.singleProp = 'value' //property setter
  test.equal(obj.singleProp, 'new value', 'setter should have changed the value') 


  //setter.oldValue
  var mixin = {}
  var oldVal
  mixin.set = function (setter) { 
    oldVal = setter.oldValue
  }
  obj = ReactiveObjects.setProperty({singleProp: 'first'}, 'singleProp', mixin)
  obj.singleProp = 'second' //property setter
  test.equal(oldVal, 'first', 'setter offer the old value') 
  obj.singleProp = 'third' //property setter
  test.equal(oldVal, 'second', 'setter offer the old value') 
});

Tinytest.add('ReactiveObjects - public api - setProperty mixin.get', function(test) {

  //call but do nothing
  var mixin = {}
  mixin.get = function (getter) { }
  obj = ReactiveObjects.setProperty({}, 'singleProp', mixin)
  obj.singleProp = 'value' //property setter
  var fake = obj.singleProp
  test.equal(obj.singleProp, 'value', 'getter still works')

  //block the call
  var mixin = {}
  mixin.get = function (getter) { getter.stop = true }
  obj = ReactiveObjects.setProperty({}, 'singleProp', mixin)
  obj.singleProp = 'value' //property setter
  test.isFalse(obj.singleProp, 'getter should not work')

  //function mixin
  var mixin = {}
  var testVar = false
  mixin.get = function (getter) { 
    testVar = true
  }
  test.isFalse(testVar, 'should not be set') 
  obj = ReactiveObjects.setProperty({}, 'singleProp', mixin)
  obj.singleProp = 'value' //property setter
  var fake = obj.singleProp
  test.isTrue(testVar, 'function should be run') 

  //function changes output
  var mixin = {}
  mixin.get = function (getter) { 
    getter.value = 'new value'
  }
  obj = ReactiveObjects.setProperty({singleProp: undefined}, 'singleProp', mixin)
  test.equal(obj.singleProp, 'new value', 'should return the override value') 
  obj.singleProp = 'value' 
  test.equal(obj.singleProp, 'new value', 'should return the override value') 
});


Tinytest.add('ReactiveObjects - public api - setProperty mixin both', function(test) {

  //call but do nothing
  var mixin = {}
  mixin.set = function (getter) { }
  mixin.get = function (getter) { }
  obj = ReactiveObjects.setProperty({}, 'singleProp', mixin)
  obj.singleProp = 'value' //property setter
  test.equal(obj.singleProp, 'value', 'property still works') 

  //block the call (redundant test)
  var mixin = {}
  mixin.set = function (getter) { getter.stop = true }
  mixin.get = function (getter) { getter.stop = true }
  obj = ReactiveObjects.setProperty({singleProp: 'value'}, 'singleProp', mixin)
  obj.singleProp = 'value'
  test.isFalse(obj.singleProp, 'property should not function') 

  //function mixin
  var mixin = {}
  var testSet = false
  var testGet = false
  mixin.set = function (getter) { 
    testSet = true
  }
  mixin.get = function (getter) { 
    testGet = true
  }
  test.isFalse(testSet, 'should not be set') 
  test.isFalse(testGet, 'should not be set') 

  obj = ReactiveObjects.setProperty({}, 'singleProp', mixin)
  var fake = obj.singleProp
  test.isTrue(testSet, 'function should have run') 
  test.isTrue(testGet, 'function should have run') 

  testSet = false
  testGet = false
  fake = obj.singleProp
  obj.singleProp = 'value' //property setter
  test.isTrue(testSet, 'function should be rerun') 
  test.isTrue(testGet, 'function should be rerun') 


  //function changes input value
  var mixin = {}
  mixin.set = function (getter) { 
    getter.value = 'new value'
  }
  obj = ReactiveObjects.setProperty({}, 'singleProp', mixin)
  test.equal(obj.singleProp, 'new value', 'setter should have changed the value') 
  obj.singleProp = 'value' //property setter
  test.equal(obj.singleProp, 'new value', 'setter should have changed the value') 
});
