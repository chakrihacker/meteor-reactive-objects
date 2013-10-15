reactor = {
  red: true,
  blue: true,
  green: true
}

ReactiveObjects.setProperties(reactor, ['red', 'blue', 'yellow'])

Tinytest.add('ReactiveObjects - Test Environment', function(test) {
  test.isTrue(typeof ReactiveObjects !== 'undefined', 'test environment not initialized ReactiveObjects');
  test.isTrue(typeof reactor !== 'undefined', 'test environment not initialized test object');
});
