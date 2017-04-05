const tap = require('tap');
const DrupalAttribute = require('../src');

tap.test('addClass', function(test) {
  test.plan(5);

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
});