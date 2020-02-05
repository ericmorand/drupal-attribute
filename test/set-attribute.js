const tap = require('tap');
const DrupalAttribute = require('../src');

tap.test('setAttribute', function(test) {
  test.plan(2);

  test.test('should support method chaining', function(test) {
    let attribute = new DrupalAttribute();

    attribute = attribute.setAttribute('foo', 'bar');
    test.equal(true, DrupalAttribute.prototype.isPrototypeOf(attribute));
    test.end();
  });

  test.test('should support being passed a key and a value', function (test) {
    let attribute = new DrupalAttribute();

    attribute = attribute.setAttribute('foo', 'bar');

    test.equal(attribute.get('foo'), 'bar');
    test.end();
  });
});
