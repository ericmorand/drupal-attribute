# drupal-attribute

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

Emulate [Drupal Attribute](https://api.drupal.org/api/drupal/core!lib!Drupal!Core!Template!Attribute.php/class/Attribute) in JavaScript.

## Why would I need this?

If you're wondering, you probably don't need this.

## Installation

```bash
npm install drupal-attribute
```

## Usage

Example of using `drupal-attribute` within a [Storybook](https://storybook.js.org) component, copied [from this tutorial](https://www.intracto.com/en-be/blog/integrating-storybook-drupal).

```JavaScript
export default { title: 'Blocks' };

import block from './block.twig';
import drupalAttribute from 'drupal-attribute'
import './block.css';
import './block.js';
export const default_block = () => (
    block({
        attributes: new drupalAttribute(),
        title_attributes: new drupalAttribute(),
        plugin_id: "Some plugin",
        title_prefix: "",
        title_suffix: "",
        label: "I'm a block!",
        content: "Lorem ipsum dolor sit amet.",
        configuration: {
            provider: "Some module"
        }
    })
);
```

```twig
{%
  set classes = [
    'block',
    'block-' ~ configuration.provider|clean_class,
    'block-' ~ plugin_id|clean_class,
  ]
%}
<div{{ attributes.addClass(classes) }}>
  {{ title_prefix }}
  {% if label %}
    <h2{{ title_attributes }}>{{ label }}</h2>
  {% endif %}
  {{ title_suffix }}
  {% block content %}
    {{ content }}
  {% endblock %}
</div>
```



## License

Apache-2.0 © [Eric MORAND]()

[npm-image]: https://badge.fury.io/js/drupal-attribute.svg
[npm-url]: https://npmjs.org/package/drupal-attribute
[travis-image]: https://travis-ci.org/ericmorand/drupal-attribute.svg?branch=master
[travis-url]: https://travis-ci.org/ericmorand/drupal-attribute
[daviddm-image]: https://david-dm.org/ericmorand/drupal-attribute.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ericmorand/drupal-attribute
[coveralls-image]: https://coveralls.io/repos/github/ericmorand/drupal-attribute/badge.svg
[coveralls-url]: https://coveralls.io/github/ericmorand/drupal-attribute
