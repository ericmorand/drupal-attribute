const tap = require('tap');
const DrupalAttribute = require('../src');

tap.test('merge', function(test) {
  test.plan(8);

  test.test('should support method chaining', function(test) {
    let attribute1 = new DrupalAttribute();
    let attribute2 = new DrupalAttribute();

    test.equal(attribute1.merge(attribute2), attribute1);
    test.end();
  });

  test.test('should merge simple attributes correctly', function(test) {
    let attribute1 = new DrupalAttribute();
    attribute1.setAttribute('foo', 'bar');
    
    let attribute2 = new DrupalAttribute();
    attribute2.setAttribute('baz', 'qux');

    attribute1.merge(attribute2);

    test.equal(attribute1.get('foo'), 'bar');
    test.equal(attribute1.get('baz'), 'qux');
    test.end();
  });

  test.test('should merge class attributes correctly', function(test) {
    let attribute1 = new DrupalAttribute();
    attribute1.addClass('class1');
    
    let attribute2 = new DrupalAttribute();
    attribute2.addClass('class2');

    attribute1.merge(attribute2);

    test.same(attribute1.get('class'), ['class1', 'class2']);
    test.end();
  });

  test.test('should merge nested attributes correctly', function(test) {
    let attribute1 = new DrupalAttribute();
    attribute1.setAttribute('data', { key1: 'value1' });

    let attribute2 = new DrupalAttribute();
    attribute2.setAttribute('data', { key2: 'value2' });

    attribute1.merge(attribute2);

    test.same(attribute1.get('data'), { key1: 'value1', key2: 'value2' });
    test.end();
  });

  test.test('should merge arrays without duplicates', function(test) {
    let attribute1 = new DrupalAttribute();
    attribute1.setAttribute('class', ['class1', 'class2']);

    let attribute2 = new DrupalAttribute();
    attribute2.setAttribute('class', ['class2', 'class3']);

    attribute1.merge(attribute2);

    test.same(attribute1.get('class'), ['class1', 'class2', 'class3']);
    test.end();
  });

  test.test('should merge deeply nested objects correctly', function(test) {
    let attribute1 = new DrupalAttribute();
    attribute1.setAttribute('data', { nested: { one: 1, inner: { a: 'A' } } });

    let attribute2 = new DrupalAttribute();
    attribute2.setAttribute('data', { nested: { two: 2, inner: { b: 'B' } } });

    attribute1.merge(attribute2);

    test.same(attribute1.get('data'), { nested: { one: 1, two: 2, inner: { a: 'A', b: 'B' } } });
    test.end();
  });

  test.test('mergeDeep should initialise missing array target', function(test) {
    let attribute = new DrupalAttribute();

    // Start with empty target
    let target = {};
    let source = { classes: ['foo', 'bar'] };

    let result = attribute.mergeDeep(target, source);

    test.deepEqual(result.classes, ['foo', 'bar'], 'should copy array into empty target');
    test.end();
  });

  test.test('mergeDeep should initialise missing object target', function(test) {
    let attribute = new DrupalAttribute();

    // Start with empty target
    let target = {};
    let source = { data: { key: 'value' } };

    let result = attribute.mergeDeep(target, source);

    test.deepEqual(result.data, { key: 'value' }, 'should copy object into empty target');
    test.end();
  });
});
