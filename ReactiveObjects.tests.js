//More test are needed!!!

var reactor = {
  red: true,
  blue: true,
  green: true
}

//ReactiveObjects.setPropery(reactor, 'orange')
//ReactiveObjects.setPropery(reactor, 'violet')
ReactiveObjects.setObject(reactor, ['red', 'blue', 'yellow'])

Tinytest.add('ReactiveObjects - Test Environment', function(test) {
  test.isTrue(typeof ReactiveObjects !== 'undefined', 'test environment not initialized ReactiveObjects');
  test.isTrue(typeof reactor !== 'undefined', 'test environment not initialized test object');
});

Tinytest.add('ReactiveObjects - setObject sets object', function(test) {
  test.isTrue(reactor.red, 'First variable value has been dropped');
  test.isTrue(reactor.blue, 'Secondary variable value has been dropped');
  test.isTrue(reactor.green, 'Non reactive variable has been lost');
  test.isTrue(typeof reactor.yellow == 'undefined', 'new reactive variable has been set a value');
  test.isTrue(typeof reactor.yellow == 'undefined', 'new reactive variable has been set a value');
});
