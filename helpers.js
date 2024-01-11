const helpers = {
  get_component: function(blockArray) {
    const blockTypes = blockArray.map((block) => {
      return block.type;
    });
    const component = blockArray.length ? blockTypes.join('-') : null;
    return component;
  },
  equal_values: function(a, b) {
    return a == b;
  },
  escape_html: function(input) {
    return escape(input);
  },
  get_partial: function(input) {
    return input + '/' + input;
  },
  get_style_classes: function(styles) {
    let stylesClass = '';
    if (styles && styles.margin) {
      stylesClass += `margin-${styles.margin}` 
    }
    if (styles && styles.width) {
      stylesClass += ` width-${styles.width}` 
    }

    return stylesClass;
  },
  get_style_attr: function(styles, attr) {
    if (styles && styles[attr]) return styles[attr];
  },
  has_keys: function(obj) {
    return obj && Object.keys(obj).length;
  },
  last_in_array: function(array, i) {
    return i === array.length - 1;
  },
  unescape_html: function(input) {
    return unescape(input);
  },
  to_json: function(obj) {
    return JSON.stringify(obj, null, 3);
  }
};

module.exports.helpers = helpers;