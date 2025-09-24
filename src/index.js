class DrupalAttribute extends Map {
  constructor(it) {
    super(it);
  }

  /**
   * @param {...string|string[]|Map} args
   * @returns {DrupalAttribute}
   */
  addClass(...args) {
    let self = this;

    args.forEach(function (value) {
      // Handle Maps by converting to array of value.
      if (value instanceof Map) {
        value = Array.from(value.values());
      }

      if (!Array.isArray(value)) {
        value = [value];
      }

      if (!self.has('class')) {
        self.set('class', []);
      }

      let classes = self.get('class');

      value.forEach(function (d) {
        if (d === null || d === undefined || d === '') {
          return;
        }
        d = String(d);
        if (classes.indexOf(d) < 0) {
          classes.push(d);
        }
      });
    });

    return this;
  }

  removeClass(value) {
    let classes = [];

    if (this.has('class')) {
      classes = this.get('class');
    }

    if (!Array.isArray(value)) {
      value = [value];
    }

    value.forEach(function (v) {
      let index = classes.indexOf(v);

      if (index > -1) {
        classes.splice(index, 1);
      }
    });

    return this;
  }

  hasClass(value) {
    let classes = [];

    if (this.has('class')) {
      classes = this.get('class');
    }

    return (classes.indexOf(value) > -1);
  }

  setAttribute(key, value) {
    // Omit attribute for nullish / false values.
    if (value === null || value === undefined || value === false) {
      this.delete(key);
      return this;
    }

    // Boolean true, render key="key".
    if (value === true) {
      this.set(key, key);
      return this;
    }

    // Reuse addClass method.
    if (key === 'class') {
      this.addClass(value);
      return this;
    }

    this.set(key, value);

    return this;
  }

  removeAttribute(key) {
    this.delete(key);

    return this;
  }

  toString() {
    let components = [];

    for (let key of this.keys()) {
      let value = this.get(key);

      // Skip nullish / falsey / empty attributes.
      if (value === null || value === undefined || value === false || value === '') {
        continue;
      }

      if (Array.isArray(value)) {

        // Remove nullish / empty values from array, and make sure all values
        // are converted to strings.
        const filtered = value
          .filter(v => v !== null && v !== undefined && v !== '')
          .map(String);

        // Skip empty arrays.
        if (filtered.length === 0) {
          continue;
        }

        value = filtered.join(' ');
      }

      components.push(`${key}="${String(value)}"`);
    }

    return components.length ? ' ' + components.join(' ') : '';
  }

  /**
   * Merge another DrupalAttribute instance into this one.
   * @param {DrupalAttribute} collection
   * @returns {DrupalAttribute}
   */
  merge(collection) {
    // Convert both the current attributes and the input collection's attributes to plain objects.
    let currentAttributes = Object.fromEntries(this);
    let newAttributes = Object.fromEntries(collection);

    // Perform a deep merge.
    let mergedAttributes = this.mergeDeep(currentAttributes, newAttributes);

    // Clear the current Map and set the merged attributes.
    this.clear();
    for (let key in mergedAttributes) {
      this.set(key, mergedAttributes[key]);
    }

    return this;
  }

  // Helper function for deep merging.
  mergeDeep(target, source) {
    for (let key in source) {
      if (source[key] instanceof Array) {
        if (!target[key]) target[key] = [];
        target[key] = Array.from(new Set(target[key].concat(source[key])));
      } else if (source[key] instanceof Object) {
        if (!target[key]) target[key] = {};
        Object.assign(source[key], this.mergeDeep(target[key], source[key]));
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }
}

module.exports = DrupalAttribute;
