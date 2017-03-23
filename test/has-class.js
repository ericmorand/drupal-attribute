const tap = require('tap');
const DrupalAttribute = require('../src');

tap.test('hasClass', function(test) {
  test.plan(2);

  test.test('should support being passed a string', function (test) {
    let attribute = new DrupalAttribute();

    attribute.addClass('foo');

    test.ok(attribute.hasClass('foo'));
    test.end();
  });

  test.test('should support being called on an instance with no class set', function (test) {
    let attribute = new DrupalAttribute();

    test.notOk(attribute.hasClass('foo'));
    test.end();
  });
});