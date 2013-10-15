//_reactiveDeps
Tinytest.add('ReactiveObjects - private api - _reactiveDeps holds hidden deps handles for the set/get(s) on the object', function(test) {
  //single property
  obj = ReactiveObjects.setProperty({}, 'singleProp')
  test.isTrue(obj._reactiveDeps.singlePropDeps.hasOwnProperty('_dependentsById'), 'should hold the deps for property') //deps exists

  Deps.autorun(function () {
    var foo = obj.singleProp
  });

  test.equal(Object.keys(obj._reactiveDeps.singlePropDeps._dependentsById).length, 1, 'should hold the deps for property') //deps works


  //multi property
  obj2 = ReactiveObjects.setProperties({}, ['Prop1', 'Prop2', 'Prop3'])
  test.isTrue(obj2._reactiveDeps.Prop1Deps.hasOwnProperty('_dependentsById'), 'should hold the deps for property 1') //deps exists
  test.isTrue(obj2._reactiveDeps.Prop2Deps.hasOwnProperty('_dependentsById'), 'should hold the deps for property 2') //deps exists
  test.isTrue(obj2._reactiveDeps.Prop3Deps.hasOwnProperty('_dependentsById'), 'should hold the deps for property 3') //deps exists

  Deps.autorun(function () {
    var foo = obj2.Prop1
    var bar = obj2.Prop2
    var bat = obj2.Prop3
  });

  Deps.autorun(function () {
    var foo1 = obj2.Prop2
    var bar1 = obj2.Prop3
  });

  Deps.autorun(function () {
    var foo2 = obj2.Prop3
  });

  test.equal(Object.keys(obj2._reactiveDeps.Prop1Deps._dependentsById).length, 1, 'should hold the deps for property 1') //deps works
  test.equal(Object.keys(obj2._reactiveDeps.Prop2Deps._dependentsById).length, 2, 'should hold the deps for property 2') //deps works
  test.equal(Object.keys(obj2._reactiveDeps.Prop3Deps._dependentsById).length, 3, 'should hold the deps for property 3') //deps works

});

//_reactiveProperties
Tinytest.add('ReactiveObjects - private api - _reactiveProperties holds hidden properties for the set/get(s) on the object', function(test) {
  //single property
  obj = ReactiveObjects.setProperty({}, 'singleProp')
  obj.singleProp = 'value'
  test.equal(obj._reactiveProperties.singleProp, 'value', 'should hold the hidden property') //property storage

  //multi property
  obj2 = ReactiveObjects.setProperties({}, ['Prop1', 'Prop2', 'Prop3'])
  obj2.Prop1 = 'value1'
  obj2.Prop2 = 'value2'
  obj2.Prop3 = 'value3'

  test.equal(obj2._reactiveProperties, {Prop1: 'value1', Prop2: 'value2', Prop3: 'value3'}, 'should hold the hidden properties') //property storage
});

//persist default values
Tinytest.add('ReactiveObjects - private api - persist default value from the old object', function(test) {
  //single property
  obj = {singleProp: 'winning'}
  ReactiveObjects.setProperty(obj, 'singleProp')
  test.equal(obj._reactiveProperties.singleProp, 'winning', 'should hold the hidden property') //property storage

  //multi property
  obj = { Prop1: 'value1', Prop2: 'value2', Prop3: 'value3' }
  obj = ReactiveObjects.setProperties({}, ['Prop1', 'Prop2', 'Prop3'])
  test.equal(obj._reactiveProperties, {Prop1: 'value1', Prop2: 'value2', Prop3: 'value3'}, 'should hold the hidden properties') //property storage
});

