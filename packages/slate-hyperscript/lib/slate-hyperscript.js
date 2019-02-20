'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isPlainObject = _interopDefault(require('is-plain-object'));
var slate = require('slate');

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};













var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/**
 * Point classes that can be created at different points in the document and
 * then searched for afterwards, for creating ranges.
 *
 * @type {Class}
 */

var CursorPoint = function CursorPoint() {
  classCallCheck(this, CursorPoint);

  this.offset = null;
};

var AnchorPoint = function AnchorPoint() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  classCallCheck(this, AnchorPoint);
  var _attrs$key = attrs.key,
      key = _attrs$key === undefined ? null : _attrs$key,
      _attrs$offset = attrs.offset,
      offset = _attrs$offset === undefined ? null : _attrs$offset,
      _attrs$path = attrs.path,
      path = _attrs$path === undefined ? null : _attrs$path;

  this.key = key;
  this.offset = offset;
  this.path = path;
};

var FocusPoint = function FocusPoint() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  classCallCheck(this, FocusPoint);
  var _attrs$key2 = attrs.key,
      key = _attrs$key2 === undefined ? null : _attrs$key2,
      _attrs$offset2 = attrs.offset,
      offset = _attrs$offset2 === undefined ? null : _attrs$offset2,
      _attrs$path2 = attrs.path,
      path = _attrs$path2 === undefined ? null : _attrs$path2;

  this.key = key;
  this.offset = offset;
  this.path = path;
};

var DecorationPoint = function DecorationPoint(attrs) {
  var _this = this;

  classCallCheck(this, DecorationPoint);

  this.combine = function (focus) {
    if (!(focus instanceof DecorationPoint)) {
      throw new Error('misaligned decorations');
    }

    return slate.Decoration.create({
      anchor: {
        key: _this.key,
        offset: _this.offset
      },
      focus: {
        key: focus.key,
        offset: focus.offset
      },
      mark: {
        type: _this.type,
        data: _this.data
      }
    });
  };

  var _attrs$key3 = attrs.key,
      key = _attrs$key3 === undefined ? null : _attrs$key3,
      _attrs$data = attrs.data,
      data = _attrs$data === undefined ? {} : _attrs$data,
      type = attrs.type;

  this.id = key;
  this.offset = 0;
  this.type = type;
  this.data = data;
};

/**
 * The default Slate hyperscript creator functions.
 *
 * @type {Object}
 */

var CREATORS = {
  anchor: function anchor(tagName, attributes, children) {
    return new AnchorPoint(attributes);
  },
  block: function block(tagName, attributes, children) {
    return slate.Block.create(_extends({}, attributes, {
      nodes: createChildren(children)
    }));
  },
  cursor: function cursor(tagName, attributes, children) {
    return new CursorPoint();
  },
  decoration: function decoration(tagName, attributes, children) {
    var key = attributes.key,
        data = attributes.data;

    var type = tagName;

    if (key) {
      return new DecorationPoint({ key: key, type: type, data: data });
    }

    var nodes = createChildren(children);
    var node = nodes[0];

    var _node$__decorations = node.__decorations,
        __decorations = _node$__decorations === undefined ? [] : _node$__decorations;

    var __decoration = {
      anchorOffset: 0,
      focusOffset: nodes.reduce(function (len, n) {
        return len + n.text.length;
      }, 0),
      type: type,
      data: data
    };

    __decorations.push(__decoration);
    node.__decorations = __decorations;
    return nodes;
  },
  document: function document(tagName, attributes, children) {
    return slate.Document.create(_extends({}, attributes, {
      nodes: createChildren(children)
    }));
  },
  focus: function focus(tagName, attributes, children) {
    return new FocusPoint(attributes);
  },
  inline: function inline(tagName, attributes, children) {
    return slate.Inline.create(_extends({}, attributes, {
      nodes: createChildren(children)
    }));
  },
  mark: function mark(tagName, attributes, children) {
    var marks = slate.Mark.createSet([attributes]);
    var nodes = createChildren(children, { marks: marks });
    return nodes;
  },
  selection: function selection(tagName, attributes, children) {
    var anchor = children.find(function (c) {
      return c instanceof AnchorPoint;
    });
    var focus = children.find(function (c) {
      return c instanceof FocusPoint;
    });
    var marks = attributes.marks,
        focused = attributes.focused;

    var selection = slate.Selection.create({
      marks: marks,
      isFocused: focused,
      anchor: anchor && {
        key: anchor.key,
        offset: anchor.offset,
        path: anchor.path
      },
      focus: focus && {
        key: focus.key,
        offset: focus.offset,
        path: focus.path
      }
    });

    return selection;
  },
  text: function text(tagName, attributes, children) {
    var nodes = createChildren(children, { key: attributes.key });
    return nodes;
  },
  value: function value(tagName, attributes, children) {
    var data = attributes.data,
        _attributes$normalize = attributes.normalize,
        normalize = _attributes$normalize === undefined ? true : _attributes$normalize;

    var document = children.find(slate.Document.isDocument);
    var selection = children.find(slate.Selection.isSelection) || slate.Selection.create();
    var anchor = void 0;
    var focus = void 0;
    var decorations = [];
    var partials = {};

    // Search the document's texts to see if any of them have the anchor or
    // focus information saved, or decorations applied.
    if (document) {
      document.getTexts().forEach(function (text) {
        if (text.__anchor != null) {
          anchor = slate.Point.create({ key: text.key, offset: text.__anchor.offset });
        }

        if (text.__focus != null) {
          focus = slate.Point.create({ key: text.key, offset: text.__focus.offset });
        }

        if (text.__decorations != null) {
          text.__decorations.forEach(function (dec) {
            var id = dec.id;

            var range = void 0;

            if (!id) {
              range = slate.Decoration.create({
                anchor: {
                  key: text.key,
                  offset: dec.anchorOffset
                },
                focus: {
                  key: text.key,
                  offset: dec.focusOffset
                },
                mark: {
                  type: dec.type,
                  data: dec.data
                }
              });
            } else if (partials[id]) {
              var partial = partials[id];
              delete partials[id];

              range = slate.Decoration.create({
                anchor: {
                  key: partial.key,
                  offset: partial.offset
                },
                focus: {
                  key: text.key,
                  offset: dec.offset
                },
                mark: {
                  type: dec.type,
                  data: dec.data
                }
              });
            } else {
              dec.key = text.key;
              partials[id] = dec;
            }

            if (range) {
              decorations.push(range);
            }
          });
        }
      });
    }

    if (Object.keys(partials).length > 0) {
      throw new Error('Slate hyperscript must have both a start and an end defined for each decoration using the `key=` prop.');
    }

    if (anchor && !focus) {
      throw new Error('Slate hyperscript ranges must have both `<anchor />` and `<focus />` defined if one is defined, but you only defined `<anchor />`. For collapsed selections, use `<cursor />` instead.');
    }

    if (!anchor && focus) {
      throw new Error('Slate hyperscript ranges must have both `<anchor />` and `<focus />` defined if one is defined, but you only defined `<focus />`. For collapsed selections, use `<cursor />` instead.');
    }

    var value = slate.Value.fromJSON(_extends({ data: data, document: document, selection: selection }, attributes), { normalize: normalize });

    if (anchor || focus) {
      selection = selection.setPoints([anchor, focus]);
      selection = selection.setIsFocused(true);
      selection = selection.normalize(value.document);
      value = value.set('selection', selection);
    }

    if (decorations.length > 0) {
      decorations = decorations.map(function (d) {
        return d.normalize(value.document);
      });
      decorations = slate.Decoration.createList(decorations);
      value = value.set('decorations', decorations);
    }

    return value;
  }
};

/**
 * Create a Slate hyperscript function with `options`.
 *
 * @param {Object} options
 * @return {Function}
 */

function createHyperscript() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var creators = resolveCreators(options);

  function create(tagName, attributes) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    var creator = creators[tagName];

    if (!creator) {
      throw new Error('No hyperscript creator found for tag: "' + tagName + '"');
    }

    if (attributes == null) {
      attributes = {};
    }

    if (!isPlainObject(attributes)) {
      children = [attributes].concat(children);
      attributes = {};
    }

    children = children.filter(function (child) {
      return Boolean(child);
    }).reduce(function (memo, child) {
      return memo.concat(child);
    }, []);

    var element = creator(tagName, attributes, children);
    return element;
  }

  return create;
}

/**
 * Create an array of `children`, storing selection anchor and focus.
 *
 * @param {Array} children
 * @param {Object} options
 * @return {Array}
 */

function createChildren(children) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var array = [];
  var length = 0;

  // When creating the new node, try to preserve a key if one exists.
  var firstNodeOrText = children.find(function (c) {
    return typeof c !== 'string';
  });
  var firstText = slate.Text.isText(firstNodeOrText) ? firstNodeOrText : null;
  var key = options.key ? options.key : firstText ? firstText.key : undefined;
  var node = slate.Text.create({ key: key, leaves: [{ text: '', marks: options.marks }] });

  // Create a helper to update the current node while preserving any stored
  // anchor or focus information.
  function setNode(next) {
    var _node = node,
        __anchor = _node.__anchor,
        __focus = _node.__focus,
        __decorations = _node.__decorations;

    if (__anchor != null) next.__anchor = __anchor;
    if (__focus != null) next.__focus = __focus;
    if (__decorations != null) next.__decorations = __decorations;
    node = next;
  }

  children.forEach(function (child, index) {
    var isLast = index === children.length - 1;

    // If the child is a non-text node, push the current node and the new child
    // onto the array, then creating a new node for future selection tracking.
    if (slate.Node.isNode(child) && !slate.Text.isText(child)) {
      if (node.text.length || node.__anchor != null || node.__focus != null || node.getMarksAtIndex(0).size) {
        array.push(node);
      }

      array.push(child);

      node = isLast ? null : slate.Text.create({ leaves: [{ text: '', marks: options.marks }] });

      length = 0;
    }

    // If the child is a string insert it into the node.
    if (typeof child == 'string') {
      setNode(node.insertText(node.text.length, child, options.marks));
      length += child.length;
    }

    // If the node is a `Text` add its text and marks to the existing node. If
    // the existing node is empty, and the `key` option wasn't set, preserve the
    // child's key when updating the node.
    if (slate.Text.isText(child)) {
      var __anchor = child.__anchor,
          __focus = child.__focus,
          __decorations = child.__decorations;

      var i = node.text.length;

      if (!options.key && node.text.length == 0) {
        setNode(node.set('key', child.key));
      }

      child.getLeaves().forEach(function (leaf) {
        var marks = leaf.marks;

        if (options.marks) marks = marks.union(options.marks);
        setNode(node.insertText(i, leaf.text, marks));
        i += leaf.text.length;
      });

      if (__anchor != null) {
        node.__anchor = new AnchorPoint();
        node.__anchor.offset = __anchor.offset + length;
      }

      if (__focus != null) {
        node.__focus = new FocusPoint();
        node.__focus.offset = __focus.offset + length;
      }

      if (__decorations != null) {
        __decorations.forEach(function (d) {
          if (d instanceof DecorationPoint) {
            d.offset += length;
          } else {
            d.anchorOffset += length;
            d.focusOffset += length;
          }
        });

        node.__decorations = node.__decorations || [];
        node.__decorations = node.__decorations.concat(__decorations);
      }

      length += child.text.length;
    }

    if (child instanceof AnchorPoint || child instanceof CursorPoint) {
      child.offset = length;
      node.__anchor = child;
    }

    if (child instanceof FocusPoint || child instanceof CursorPoint) {
      child.offset = length;
      node.__focus = child;
    }

    if (child instanceof DecorationPoint) {
      child.offset = length;
      node.__decorations = node.__decorations || [];
      node.__decorations = node.__decorations.concat(child);
    }
  });

  // Make sure the most recent node is added.
  if (node != null) {
    array.push(node);
  }

  return array;
}

/**
 * Resolve a set of hyperscript creators an `options` object.
 *
 * @param {Object} options
 * @return {Object}
 */

function resolveCreators(options) {
  var _options$blocks = options.blocks,
      blocks = _options$blocks === undefined ? {} : _options$blocks,
      _options$inlines = options.inlines,
      inlines = _options$inlines === undefined ? {} : _options$inlines,
      _options$marks = options.marks,
      marks = _options$marks === undefined ? {} : _options$marks,
      _options$decorations = options.decorations,
      decorations = _options$decorations === undefined ? {} : _options$decorations,
      schema = options.schema;


  var creators = _extends({}, CREATORS, options.creators || {});

  Object.keys(blocks).map(function (key) {
    creators[key] = normalizeNode(blocks[key], 'block');
  });

  Object.keys(inlines).map(function (key) {
    creators[key] = normalizeNode(inlines[key], 'inline');
  });

  Object.keys(marks).map(function (key) {
    creators[key] = normalizeMark(marks[key]);
  });

  Object.keys(decorations).map(function (key) {
    creators[key] = normalizeNode(decorations[key], 'decoration');
  });

  creators.value = function (tagName) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var children = arguments[2];

    var attrs = _extends({ schema: schema }, attributes);
    return CREATORS.value(tagName, attrs, children);
  };

  return creators;
}

/**
 * Normalize a node creator of `value` and `object`.
 *
 * @param {Function|Object|String} value
 * @param {String} object
 * @return {Function}
 */

function normalizeNode(value, object) {
  if (typeof value == 'function') {
    return value;
  }

  if (typeof value == 'string') {
    value = { type: value };
  }

  if (isPlainObject(value)) {
    return function (tagName, attributes, children) {
      var key = attributes.key,
          rest = objectWithoutProperties(attributes, ['key']);

      var attrs = _extends({}, value, {
        object: object,
        key: key,
        data: _extends({}, value.data || {}, rest)
      });

      return CREATORS[object](tagName, attrs, children);
    };
  }

  throw new Error('Slate hyperscript ' + object + ' creators can be either functions, objects or strings, but you passed: ' + value);
}

/**
 * Normalize a mark creator of `value`.
 *
 * @param {Function|Object|String} value
 * @return {Function}
 */

function normalizeMark(value) {
  if (typeof value == 'function') {
    return value;
  }

  if (typeof value == 'string') {
    value = { type: value };
  }

  if (isPlainObject(value)) {
    return function (tagName, attributes, children) {
      var attrs = _extends({}, value, {
        data: _extends({}, value.data || {}, attributes)
      });

      return CREATORS.mark(tagName, attrs, children);
    };
  }

  throw new Error('Slate hyperscript mark creators can be either functions, objects or strings, but you passed: ' + value);
}

/**
 * Export.
 *
 * @type {Function}
 */

var index = createHyperscript();

exports.default = index;
exports.createHyperscript = createHyperscript;
//# sourceMappingURL=slate-hyperscript.js.map
