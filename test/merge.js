const tap = require('tap');
const DrupalAttribute = require('../src');

tap.test('merge', function(test) {
  test.plan(5);

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
});
