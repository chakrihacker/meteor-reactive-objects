Tinytest.add('ReactiveObjects - Default Proxy - new property is `default` type by default', function(test) {
  var obj = new ReactiveObjects({'singleProp': ''})
  test.equal(obj.ReactiveSettings.singleProp.type, 'default');
});

Tinytest.add('ReactiveObjects - Default Proxy - with disableDynamicProxies `false` default is `default` type', function(test) {
  var dobj = new ReactiveObjects({'singleProp': ''})
  test.equal(dobj.ReactiveSettings.singleProp.type, 'default');
});

Tinytest.add('ReactiveObjects - Array Proxy - with disableDynamicProxies `true` array is `default` type', function(test) {
  ReactiveObjects.disableDynamicProxies = true;
  var obj = new ReactiveObjects({'singleProp': []})
  test.equal(obj.ReactiveSettings.singleProp.type, 'default');
});

Tinytest.add('ReactiveObjects - Array Proxy - with disableDynamicProxies `false` array is `array` type', function(test) {
  ReactiveObjects.disableDynamicProxies = false;
  var dobj = new ReactiveObjects({'singleProp': []})
  test.equal(dobj.ReactiveSettings.singleProp.type, 'array');
});

Tinytest.add('ReactiveObjects - Array Proxy - array property is reactive', function(test) {

  obj = new ReactiveObjects({'reactiveArray':[]})
  obj.ReactiveSettings.reactiveArray.type = 'array'

  Deps.autorun(function (c) {
    var arg = obj.reactiveArray 
    if (!c.firstRun) {
      completed();
      c.stop();
    }
  });
  
  obj.ReactiveSettings.reactiveArray.deps.changed();
});

Tinytest.add('ReactiveObjects - Array Proxy function - `push` function is reactive', function(test) {

  obj = new ReactiveObjects({'reactiveArray':[]})
  obj.ReactiveSettings.reactiveArray.type = 'array'

  Deps.autorun(function (c) {
    var arg = obj.reactiveArray 
    if (!c.firstRun) {
      completed();
      c.stop();
    }
  });
  
  obj.reactiveArray.push('a')
  test.equal(obj.reactiveArray, ['a'], 'push function should add to array')
});

Tinytest.add('ReactiveObjects - Array Proxy function - `pop` function is reactive', function(test) {

  obj = new ReactiveObjects({'reactiveArray':['a', 'b']})
  obj.ReactiveSettings.reactiveArray.type = 'array'

  Deps.autorun(function (c) {
    var arg = obj.reactiveArray 
    if (!c.firstRun) {
      completed();
      c.stop();
    }
  });
  
  obj.reactiveArray.pop()
  test.equal(obj.reactiveArray, ['a'], 'pop function should remove last item in array')
});

Tinytest.add('ReactiveObjects - Array Proxy function - `reverse` function is reactive', function(test) {

  obj = new ReactiveObjects({'reactiveArray':['a', 'b']})
  obj.ReactiveSettings.reactiveArray.type = 'array'

  Deps.autorun(function (c) {
    var arg = obj.reactiveArray 
    if (!c.firstRun) {
      completed();
      c.stop();
    }
  });
  
  obj.reactiveArray.reverse()
  test.equal(obj.reactiveArray, ['b','a'], 'reverse function should reverse items in array')
});

Tinytest.add('ReactiveObjects - Array Proxy function - `shift` function is reactive', function(test) {

  obj = new ReactiveObjects({'reactiveArray':['a','b']})
  obj.ReactiveSettings.reactiveArray.type = 'array'

  Deps.autorun(function (c) {
    var arg = obj.reactiveArray 
    if (!c.firstRun) {
      completed();
      c.stop();
    }
  });
  
  obj.reactiveArray.shift()
  test.equal(obj.reactiveArray, ['b'], 'shift function should remove the first item in array')
});

Tinytest.add('ReactiveObjects - Array Proxy function - `sort` function is reactive', function(test) {

  obj = new ReactiveObjects({'reactiveArray':['a', 'c', 'b']})
  obj.ReactiveSettings.reactiveArray.type = 'array'

  Deps.autorun(function (c) {
    var arg = obj.reactiveArray 
    if (!c.firstRun) {
      completed();
      c.stop();
    }
  });
  
  obj.reactiveArray.sort()
  test.equal(obj.reactiveArray, ['a','b','c'], 'sort function should alphabetize items in array')
});

Tinytest.add('ReactiveObjects - Array Proxy function - `splice` function is reactive', function(test) {

  obj = new ReactiveObjects({'reactiveArray':['a','b','c']})
  obj.ReactiveSettings.reactiveArray.type = 'array'

  Deps.autorun(function (c) {
    var arg = obj.reactiveArray 
    if (!c.firstRun) {
      completed();
      c.stop();
    }
  });
  
  obj.reactiveArray.splice(1,1)
  test.equal(obj.reactiveArray, ['a','c'], 'splice function [1,1] should remove the second item in array')
});

Tinytest.add('ReactiveObjects - Array Proxy function - `unshift` function is reactive', function(test) {

  obj = new ReactiveObjects({'reactiveArray':['a']})
  obj.ReactiveSettings.reactiveArray.type = 'array'

  Deps.autorun(function (c) {
    var arg = obj.reactiveArray 
    if (!c.firstRun) {
      completed();
      c.stop();
    }
  });
  
  obj.reactiveArray.unshift('z')
  test.equal(obj.reactiveArray, ['z','a'], 'unshift function should add the an item to the beginning of the array')
});