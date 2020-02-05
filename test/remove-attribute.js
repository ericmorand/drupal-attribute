const tap = require('tap');
const DrupalAttribute = require('../src');

tap.test('removeAttribute', function(test) {
  test.plan(2);

  test.test('should support method chaining', function(test) {
    let attribute = new DrupalAttribute();

    attribute = attribute.removeAttribute('foo');
    test.equal(true, DrupalAttribute.prototype.isPrototypeOf(attribute));
    test.end();
  });

  test.test('should support being passed a string', function (test) {
    let attribute = new DrupalAttribute();

    attribute = attribute
      .setAttribute('foo', 'bar')
      .removeAttribute('foo')
    ;

    test.notOk(attribute.get('foo'));
    test.end();
  });
});
