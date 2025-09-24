const tap = require('tap');
const DrupalAttribute = require('../src');

tap.test('addClass', function(test) {
  test.plan(6);

  test.test('should support method chaining', function(test) {
    let attribute = new DrupalAttribute();

    test.equal(attribute.addClass('foo'), attribute);
    test.end();
  });

  test.test('should support being passed a string', function (test) {
    let attribute = new DrupalAttribute();

    attribute
      .addClass('foo')
      .addClass('bar')
    ;

    test.same(attribute.get('class'), ['foo', 'bar']);
    test.end();
  });

  test.test('should support being passed an array', function (test) {
    let attribute = new DrupalAttribute();

    attribute.addClass(['foo', 'bar']);

    test.same(attribute.get('class'), ['foo', 'bar']);
    test.end();
  });

  test.test('should support adding an existing class', function (test) {
    let attribute = new DrupalAttribute();

    attribute
      .addClass('foo')
      .addClass('foo')
    ;

    test.same(attribute.get('class'), ['foo']);
    test.end();
  });

  test.test('should accept being passed multiple parameters', function (test) {
    let attribute = new DrupalAttribute();

    attribute
      .addClass('foo', 'bar', ['foo-bar'])
    ;

    test.same(attribute.get('class'), ['foo', 'bar', 'foo-bar']);
    test.end();
  });

  test.test('should handle Map values in addClass', function(test) {
    let attribute = new DrupalAttribute();

    // Create a Map with classes as values
    let map = new Map();
    map.set('one', 'foo');
    map.set('two', 'bar');

    attribute.addClass(map);

    test.ok(attribute.hasClass('foo'), 'class foo should be added');
    test.ok(attribute.hasClass('bar'), 'class bar should be added');
    test.end();
  });
});