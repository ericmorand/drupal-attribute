const tap = require('tap');
const DrupalAttribute = require('../src');

tap.test('setAttribute', function (test) {
  test.plan(7);

  test.test('should support method chaining', function (test) {
    let attribute = new DrupalAttribute();

    test.equal(attribute.setAttribute('foo', 'bar'), attribute);
    test.end();
  });

  test.test('should support being passed a key and a value', function (test) {
    let attribute = new DrupalAttribute();

    attribute.setAttribute('foo', 'bar');

    test.equal(attribute.get('foo'), 'bar');
    test.end();
  });

  test.test('should omit attributes set to false or null', function (test) {
    let attr = new DrupalAttribute()
      .setAttribute('disabled', false)
      .setAttribute('readonly', null);

    test.equal(attr.toString(), '');
    test.end();
  });

  test.test('should render true as key="key"', function (test) {
    let attr = new DrupalAttribute()
      .setAttribute('required', true);

    test.equal(attr.toString(), ' required="required"');
    test.end();
  });

  test.test('should normalise class arrays with space separation', function (test) {
    let attr = new DrupalAttribute()
      .setAttribute('class', ['foo', null, 'bar', '', undefined]);

    test.equal(attr.toString(), ' class="foo bar"');
    test.end();
  });

  test.test('should skip attributes with arrays of only empty values in toString', function(test) {
    let attribute = new DrupalAttribute();
    attribute.setAttribute('class', [null, undefined, '']); // filtered to []

    test.equal(attribute.toString(), ''); // nothing rendered
    test.end();
  });

  test.test('should render key="key" when setAttribute called with true', function(test) {
    let attribute = new DrupalAttribute();
    attribute.setAttribute('disabled', true);

    test.equal(attribute.toString(), ' disabled="disabled"');
    test.end();
  });
});