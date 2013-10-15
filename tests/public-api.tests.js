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
  obj = ReactiveObjects.setProperty({}, ['Prop1', 'Prop2', 'Prop3'])
  obj.Prop1 = 'value1' //property setter
  obj.Prop2 = 'value2' //property setter
  obj.Prop3 = 'value3' //property setter
  test.equal(obj.Prop1, 'value1','should set the getter') //property getter
  test.equal(obj.Prop2, 'value2','should set the getter') //property getter
  test.equal(obj.Prop3, 'value3','should set the getter') //property getter
});

//persist default values

//reactive property


//non reactive property


//reactive object


//invalidate property


//invalidate object


//is reactive property


//is reactive object


//get all reactive properties
