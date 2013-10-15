//More test are needed!!!


//setup test env
var reactor = {
  red: true,
  blue: true,
  green: true
}

ReactiveObjects.setProperties(reactor, ['red', 'blue', 'yellow'])

Tinytest.add('ReactiveObjects - Test Environment', function(test) {
  test.isTrue(typeof ReactiveObjects !== 'undefined', 'test environment not initialized ReactiveObjects');
  test.isTrue(typeof reactor !== 'undefined', 'test environment not initialized test object');
});


//setProperty


//setProperties

Tinytest.add('ReactiveObjects - setProperties sets object', function(test) {
  test.isTrue(reactor.red, 'First variable value has been dropped');
  test.isTrue(reactor.blue, 'Secondary variable value has been dropped');
  test.isTrue(reactor.green, 'Non reactive variable has been lost');
  test.isTrue(typeof reactor.yellow == 'undefined', 'new reactive variable has been set a value');
  test.isTrue(typeof reactor.yellow == 'undefined', 'new reactive variable has been set a value');
});


//setProperty rerun


//reactive property


//non reactive property


//reactive object


//invalidate property


//invalidate object


//is reactive property


//is reactive object


//get all reactive properties
