//_reactiveDeps
Tinytest.add('ReactiveObjects - private api - _reactiveDeps holds hidden deps handles for the set/get(s) on the object', function(test) {
  obj = ReactiveObjects.setProperty({}, 'singleProp')
   test.isTrue(obj._reactiveDeps.singlePropDeps.hasOwnProperty('_dependentsById'), 'should hold the deps for property') //deps

   Deps.autorun(function () {
     var foo = obj.singleProp
   });

   test.equal(Object.keys(obj._reactiveDeps.singlePropDeps._dependentsById).length, 1, 'should hold the deps for property') //deps works

   obj = ReactiveObjects.setProperties({}, ['Prop1', 'Prop2', 'Prop3'])
   test.isTrue(obj._reactiveDeps.Prop1Deps.hasOwnProperty('_dependentsById'), 'should hold the deps for property 1') //deps 
   test.isTrue(obj._reactiveDeps.Prop2Deps.hasOwnProperty('_dependentsById'), 'should hold the deps for property 2') //deps 
   test.isTrue(obj._reactiveDeps.Prop3Deps.hasOwnProperty('_dependentsById'), 'should hold the deps for property 3') //deps 

   Deps.autorun(function () {
     var foo = obj.Prop1
     var bar = obj.Prop2
     var bat = obj.Prop3
   });

   Deps.autorun(function () {
     var foo1 = obj.Prop2
     var bar1 = obj.Prop3
   });

   Deps.autorun(function () {
     var foo2 = obj.Prop3
   });

   test.equal(Object.keys(obj._reactiveDeps.Prop1Deps._dependentsById).length, 1, 'should hold the deps for property 1') //deps works
   test.equal(Object.keys(obj._reactiveDeps.Prop2Deps._dependentsById).length, 2, 'should hold the deps for property 2') //deps works
   test.equal(Object.keys(obj._reactiveDeps.Prop3Deps._dependentsById).length, 3, 'should hold the deps for property 3') //deps works

});

//_reactiveProperties
Tinytest.add('ReactiveObjects - private api - _reactiveProperties holds hidden properties for the set/get(s) on the object', function(test) {
  obj = ReactiveObjects.setProperty({}, 'singleProp')
  test.equal(obj._reactiveProperties.singleProp, 'value', 'should hold the hidden property') //property storage

  obj = ReactiveObjects.setProperties({}, ['Prop1', 'Prop2', 'Prop3'])
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
