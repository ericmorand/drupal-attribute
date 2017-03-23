const tap = require('tap');
const DrupalAttribute = require('../src');

tap.test('removeClass', function(test) {
  test.plan(4);

  test.test('should support method chaining', function(test) {
    let attribute = new DrupalAttribute();

    test.equal(attribute.removeClass('foo'), attribute);
    test.end();
  });

  test.test('should support being passed a string', function (test) {
    let attribute = new DrupalAttribute();

    attribute
      .addClass('foo')
      .addClass('bar')
      .removeClass('bar')
    ;

    test.same(attribute.get('class'), ['foo']);
    test.end();
  });

  test.test('should support being passed an array', function (test) {
    let attribute = new DrupalAttribute();

    attribute
      .addClass(['foo', 'bar', 'foo-bar'])
      .removeClass(['foo', 'foo-bar'])
    ;

    test.same(attribute.get('class'), ['bar']);
    test.end();
  });

  test.test('should support being called on an instance with no class set', function (test) {
    let attribute = new DrupalAttribute();

    attribute
      .removeClass(['bar'])
    ;

    test.notOk(attribute.get('class'));
    test.end();
  });
});