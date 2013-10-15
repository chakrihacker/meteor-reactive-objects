//_reactiveDeps
Tinytest.add('ReactiveObjects - private api - _reactiveDeps holds hidden deps handles for the set/get(s) on the object', function(test) {
  throw 'define me'
});

//_reactiveProperties
Tinytest.add('ReactiveObjects - private api - _reactiveProperties holds hidden properties for the set/get(s) on the object', function(test) {
  obj = ReactiveObjects.setProperty({}, 'singleProp')
  test.equal(obj._reactiveProperties.singleProp, 'value', 'should hold the hidden property') //property storage

  obj = ReactiveObjects.setProperty({}, ['Prop1', 'Prop2', 'Prop3'])
  test.equal(obj._reactiveProperties, {Prop1: 'value1', Prop2: 'value2', Prop3: 'value3'}, 'should hold the hidden properties') //property storage
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
