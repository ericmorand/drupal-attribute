class DrupalAttribute extends Map {
  constructor(it) {
    super(it);
  }

  addClass(value) {
    if (!Array.isArray(value)) {
      value = [value];
    }

    if (!this.has('class')) {
      this.setAttribute('class', []);
    }

    let classes = this.get('class');

    value.forEach(function (d) {
      if (classes.indexOf(d) < 0) {
        classes.push(d);
      }
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
    this.set(key, value);

    return this;
  }

  removeAttribute(key) {
    this.delete(key);

    return this;
  }

  toString() {
    let components = [];

    this.forEach(function (value, key) {
      if (Array.isArray(value)) {
        value = value.join(' ');
      }

      components.push([key, '"' + value + '"'].join('='));
    });

    return components.join(' ');
  }
}

module.exports = DrupalAttribute;