class DrupalAttribute extends Map {
  constructor(it) {
    super(it);
  }

  /**
   * @param {...String|Array} args
   * @returns {DrupalAttribute}
   */
  addClass(args) {
    let instance = new DrupalAttribute(this);
    let values = [];

    for (let i = 0; i < arguments.length; i++) {
      values.push(arguments[i]);
    }

    values.forEach(function (value) {
      if (!Array.isArray(value)) {
        value = [value];
      }

      if (!instance.has('class')) {
        instance.set('class', []);
      }

      let classes = instance.get('class');

      value.forEach(function (d) {
        if (classes.indexOf(d) < 0) {
          classes.push(d);
        }
      });
    });

    return instance;
  }

  removeClass(value) {
    let instance = new DrupalAttribute(this);
    let classes = [];

    if (instance.has('class')) {
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

    return instance;
  }

  hasClass(value) {
    let classes = [];

    if (this.has('class')) {
      classes = this.get('class');
    }

    return (classes.indexOf(value) > -1);
  }

  setAttribute(key, value) {
    let instance = new DrupalAttribute(this);
    instance.set(key, value);

    return instance;
  }

  removeAttribute(key) {
    let instance = new DrupalAttribute(this);
    instance.delete(key);

    return instance;
  }

  toString() {
    let result = '';
    let components = [];

    this.forEach(function (value, key) {
      if (Array.isArray(value)) {
        value = value.join(' ');
      }

      components.push([key, '"' + value + '"'].join('='));
    });

    let rendered = components.join(' ');

    if (rendered) {
      result += ' ' + rendered;
    }

    return result;
  }
}

module.exports = DrupalAttribute;
