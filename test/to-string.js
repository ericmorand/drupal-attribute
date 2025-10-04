const tap = require('tap');
const DrupalAttributes = require('../src');

tap.test('toString', function(test) {
  test.plan(3);

  test.test('should return an empty string when no attribute has been set', function (test) {
    let attribute = new DrupalAttributes();

    test.equal(attribute.toString(), '');
    test.end();
  });

  test.test('should return a valid HTML attribute string when at least one attribute has been set', function (test) {
    let attribute = new DrupalAttributes();

    attribute
      .setAttribute('foo', 'bar')
      .setAttribute('bar', 'foo')
      .setAttribute('foo-bar', ['foo', 'bar'])
    ;

    test.equal(attribute.toString(), ' foo="bar" bar="foo" foo-bar="foo bar"');
    test.end();
  });

  test.test('toString should skip nullish, false, and empty attributes', function(test) {
    let attribute = new DrupalAttributes();

    attribute.setAttribute('foo', null);
    attribute.setAttribute('bar', undefined);
    attribute.setAttribute('baz', false);
    attribute.setAttribute('qux', ''); // empty string
    attribute.setAttribute('valid', 'ok'); // only this one should render

    const output = attribute.toString();

    test.equal(output, ' valid="ok"', 'only non-nullish/falsey/empty attributes should render');
    test.end();
  });
});
