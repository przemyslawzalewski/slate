import Debug from 'debug';
import React from 'react';
import Types from 'prop-types';
import SlateTypes from 'slate-prop-types';
import ImmutableTypes from 'react-immutable-proptypes';
import { PathUtils, Node, Value, Text, Schema, Stack } from 'slate';
import { Set } from 'immutable';
import warning from 'slate-dev-warning';
import getWindow from 'get-window';
import { IS_IE, IS_EDGE, IS_SAFARI, IS_IOS, IS_FIREFOX, HAS_INPUT_EVENTS_LEVEL_2 } from 'slate-dev-environment';
import isBackward from 'selection-is-backward';
import throttle from 'lodash/throttle';
import Base64 from 'slate-base64-serializer';
import Plain from 'slate-plain-serializer';
import Hotkeys from 'slate-hotkeys';
import { findDOMNode } from 'react-dom';
import memoizeOne from 'memoize-one';

/**
 * Event handlers used by Slate plugins.
 *
 * @type {Array}
 */

var EVENT_HANDLERS = ['onBeforeInput', 'onBlur', 'onClick', 'onContextMenu', 'onCompositionEnd', 'onCompositionStart', 'onCopy', 'onCut', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onInput', 'onFocus', 'onKeyDown', 'onKeyUp', 'onPaste', 'onSelect'];

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
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



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Props that can be defined by plugins.
 *
 * @type {Array}
 */

var PLUGIN_PROPS = [].concat(toConsumableArray(EVENT_HANDLERS), ['decorateNode', 'onChange', 'renderEditor', 'renderMark', 'renderNode', 'renderPlaceholder', 'renderPortal', 'schema', 'validateNode']);

/**
 * Offset key parser regex.
 *
 * @type {RegExp}
 */

var PARSER = /^([\w-]+)(?::(\d+))?$/;

/**
 * Parse an offset key `string`.
 *
 * @param {String} string
 * @return {Object}
 */

function parse(string) {
  var matches = PARSER.exec(string);

  if (!matches) {
    throw new Error("Invalid offset key string \"" + string + "\".");
  }

  var _matches = slicedToArray(matches, 3),
      original = _matches[0],
      key = _matches[1],
      index = _matches[2]; // eslint-disable-line no-unused-vars


  return {
    key: key,
    index: parseInt(index, 10)
  };
}

/**
 * Stringify an offset key `object`.
 *
 * @param {Object} object
 *   @property {String} key
 *   @property {Number} index
 * @return {String}
 */

function stringify(object) {
  return object.key + ":" + object.index;
}

/**
 * Export.
 *
 * @type {Object}
 */

var OffsetKey = {
  parse: parse,
  stringify: stringify
};

/**
 * Debugger.
 *
 * @type {Function}
 */

var debug = Debug('slate:leaves');

/**
 * Leaf.
 *
 * @type {Component}
 */

var Leaf = function (_React$Component) {
  inherits(Leaf, _React$Component);

  function Leaf() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Leaf);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Leaf.__proto__ || Object.getPrototypeOf(Leaf)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), possibleConstructorReturn(_this, _ret);
  }
  /**
   * Property types.
   *
   * @type {Object}
   */

  /**
   * Debug.
   *
   * @param {String} message
   * @param {Mixed} ...args
   */

  createClass(Leaf, [{
    key: 'shouldComponentUpdate',


    /**
     * Should component update?
     *
     * @param {Object} props
     * @return {Boolean}
     */

    value: function shouldComponentUpdate(props) {
      // If any of the regular properties have changed, re-render.
      if (props.index != this.props.index || props.marks != this.props.marks || props.text != this.props.text || props.parent != this.props.parent) {
        return true;
      }

      // Otherwise, don't update.
      return false;
    }

    /**
     * Render the leaf.
     *
     * @return {Element}
     */

  }, {
    key: 'render',
    value: function render() {
      this.debug('render', this);

      var _props = this.props,
          node = _props.node,
          index = _props.index;

      var offsetKey = OffsetKey.stringify({
        key: node.key,
        index: index
      });

      return React.createElement(
        'span',
        { 'data-offset-key': offsetKey },
        this.renderMarks()
      );
    }

    /**
     * Render all of the leaf's mark components.
     *
     * @return {Element}
     */

  }, {
    key: 'renderMarks',
    value: function renderMarks() {
      var _props2 = this.props,
          marks = _props2.marks,
          node = _props2.node,
          offset = _props2.offset,
          text = _props2.text,
          editor = _props2.editor;
      var stack = editor.stack;

      var leaf = this.renderText();
      var attributes = {
        'data-slate-leaf': true
      };

      return marks.reduce(function (children, mark) {
        var props = {
          editor: editor,
          mark: mark,
          marks: marks,
          node: node,
          offset: offset,
          text: text,
          children: children,
          attributes: attributes
        };
        var element = stack.find('renderMark', props);
        return element || children;
      }, leaf);
    }

    /**
     * Render the text content of the leaf, accounting for browsers.
     *
     * @return {Element}
     */

  }, {
    key: 'renderText',
    value: function renderText() {
      var _props3 = this.props,
          block = _props3.block,
          node = _props3.node,
          editor = _props3.editor,
          parent = _props3.parent,
          text = _props3.text,
          index = _props3.index,
          leaves = _props3.leaves;
      var value = editor.value;
      var schema = value.schema;

      // COMPAT: Render text inside void nodes with a zero-width space.
      // So the node can contain selection but the text is not visible.

      if (schema.isVoid(parent)) {
        return React.createElement(
          'span',
          { 'data-slate-zero-width': 'z' },
          '\u200B'
        );
      }

      // COMPAT: If this is the last text node in an empty block, render a zero-
      // width space that will convert into a line break when copying and pasting
      // to support expected plain text.
      if (text === '' && parent.object === 'block' && parent.text === '' && parent.nodes.last() === node) {
        return React.createElement(
          'span',
          { 'data-slate-zero-width': 'n' },
          '\u200B'
        );
      }

      // COMPAT: If the text is empty, it's because it's on the edge of an inline
      // node, so we render a zero-width space so that the selection can be
      // inserted next to it still.
      if (text === '') {
        return React.createElement(
          'span',
          { 'data-slate-zero-width': 'z' },
          '\u200B'
        );
      }

      // COMPAT: Browsers will collapse trailing new lines at the end of blocks,
      // so we need to add an extra trailing new lines to prevent that.
      var lastText = block.getLastText();
      var lastChar = text.charAt(text.length - 1);
      var isLastText = node === lastText;
      var isLastLeaf = index === leaves.size - 1;
      if (isLastText && isLastLeaf && lastChar === '\n') return text + '\n';

      // Otherwise, just return the text.
      return text;
    }
  }]);
  return Leaf;
}(React.Component);

/**
 * Export.
 *
 * @type {Component}
 */

Leaf.propTypes = {
  block: SlateTypes.block.isRequired,
  editor: Types.object.isRequired,
  index: Types.number.isRequired,
  leaves: SlateTypes.leaves.isRequired,
  marks: SlateTypes.marks.isRequired,
  node: SlateTypes.node.isRequired,
  offset: Types.number.isRequired,
  parent: SlateTypes.node.isRequired,
  text: Types.string.isRequired };

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.debug = function (message) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    debug.apply(undefined, [message, _this2.props.node.key + '-' + _this2.props.index].concat(args));
  };
};

/**
 * Debug.
 *
 * @type {Function}
 */

var debug$1 = Debug('slate:node');

/**
 * Text.
 *
 * @type {Component}
 */

var Text$1 = function (_React$Component) {
  inherits(Text$$1, _React$Component);

  function Text$$1() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Text$$1);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Text$$1.__proto__ || Object.getPrototypeOf(Text$$1)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps$1.call(_this), _temp), possibleConstructorReturn(_this, _ret);
  }
  /**
   * Property types.
   *
   * @type {Object}
   */

  /**
   * Default prop types.
   *
   * @type {Object}
   */

  /**
   * Debug.
   *
   * @param {String} message
   * @param {Mixed} ...args
   */

  /**
   * Should the node update?
   *
   * @param {Object} nextProps
   * @param {Object} value
   * @return {Boolean}
   */

  createClass(Text$$1, [{
    key: 'render',


    /**
     * Render.
     *
     * @return {Element}
     */

    value: function render() {
      var _this2 = this;

      this.debug('render', this);

      var _props = this.props,
          decorations = _props.decorations,
          editor = _props.editor,
          node = _props.node,
          style = _props.style;
      var value = editor.value;
      var document = value.document;
      var key = node.key;


      var decs = decorations.filter(function (d) {
        var start = d.start,
            end = d.end;

        // If either of the decoration's keys match, include it.

        if (start.key === key || end.key === key) return true;

        // Otherwise, if the decoration is in a single node, it's not ours.
        if (start.key === end.key) return false;

        // If the node's path is before the start path, ignore it.
        var path = document.assertPath(key);
        if (PathUtils.compare(path, start.path) === -1) return false;

        // If the node's path is after the end path, ignore it.
        if (PathUtils.compare(path, end.path) === 1) return false;

        // Otherwise, include it.
        return true;
      });

      // PERF: Take advantage of cache by avoiding arguments
      var leaves = decs.size === 0 ? node.getLeaves() : node.getLeaves(decs);
      var offset = 0;

      var children = leaves.map(function (leaf, i) {
        var child = _this2.renderLeaf(leaves, leaf, i, offset);
        offset += leaf.text.length;
        return child;
      });

      return React.createElement(
        'span',
        { 'data-key': key, style: style },
        children
      );
    }

    /**
     * Render a single leaf given a `leaf` and `offset`.
     *
     * @param {List<Leaf>} leaves
     * @param {Leaf} leaf
     * @param {Number} index
     * @param {Number} offset
     * @return {Element} leaf
     */

  }]);
  return Text$$1;
}(React.Component);

/**
 * Export.
 *
 * @type {Component}
 */

Text$1.propTypes = {
  block: SlateTypes.block,
  decorations: ImmutableTypes.list.isRequired,
  editor: Types.object.isRequired,
  node: SlateTypes.node.isRequired,
  parent: SlateTypes.node.isRequired,
  style: Types.object };
Text$1.defaultProps = {
  style: null };

var _initialiseProps$1 = function _initialiseProps() {
  var _this3 = this;

  this.debug = function (message) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var node = _this3.props.node;
    var key = node.key;

    debug$1.apply(undefined, [message, key + ' (text)'].concat(args));
  };

  this.shouldComponentUpdate = function (nextProps) {
    var props = _this3.props;

    var n = nextProps;
    var p = props;

    // If the node has changed, update. PERF: There are cases where it will have
    // changed, but it's properties will be exactly the same (eg. copy-paste)
    // which this won't catch. But that's rare and not a drag on performance, so
    // for simplicity we just let them through.
    if (n.node != p.node) return true;

    // If the node parent is a block node, and it was the last child of the
    // block, re-render to cleanup extra `\n`.
    if (n.parent.object == 'block') {
      var pLast = p.parent.nodes.last();
      var nLast = n.parent.nodes.last();
      if (p.node == pLast && n.node != nLast) return true;
    }

    // Re-render if the current decorations have changed.
    if (!n.decorations.equals(p.decorations)) return true;

    // Otherwise, don't update.
    return false;
  };

  this.renderLeaf = function (leaves, leaf, index, offset) {
    var _props2 = _this3.props,
        block = _props2.block,
        node = _props2.node,
        parent = _props2.parent,
        editor = _props2.editor;
    var text = leaf.text,
        marks = leaf.marks;


    return React.createElement(Leaf, {
      key: node.key + '-' + index,
      block: block,
      editor: editor,
      index: index,
      marks: marks,
      node: node,
      offset: offset,
      parent: parent,
      leaves: leaves,
      text: text
    });
  };
};

/**
 * Debug.
 *
 * @type {Function}
 */

var debug$2 = Debug('slate:void');

/**
 * Void.
 *
 * @type {Component}
 */

var Void = function (_React$Component) {
  inherits(Void, _React$Component);

  function Void() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Void);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Void.__proto__ || Object.getPrototypeOf(Void)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps$2.call(_this), _temp), possibleConstructorReturn(_this, _ret);
  }
  /**
   * Property types.
   *
   * @type {Object}
   */

  /**
   * Debug.
   *
   * @param {String} message
   * @param {Mixed} ...args
   */

  createClass(Void, [{
    key: 'render',


    /**
     * Render.
     *
     * @return {Element}
     */

    value: function render() {
      var props = this.props;
      var children = props.children,
          node = props.node,
          readOnly = props.readOnly;

      var Tag = node.object == 'block' ? 'div' : 'span';
      var style = {
        height: '0',
        color: 'transparent',
        outline: 'none',
        position: 'absolute'
      };

      var spacer = React.createElement(
        Tag,
        { 'data-slate-spacer': true, style: style },
        this.renderText()
      );

      var content = React.createElement(
        Tag,
        { contentEditable: readOnly ? null : false },
        children
      );

      this.debug('render', { props: props });

      return React.createElement(
        Tag,
        {
          'data-slate-void': true,
          'data-key': node.key,
          contentEditable: readOnly || node.object == 'block' ? null : false
        },
        readOnly ? null : spacer,
        content
      );
    }

    /**
     * Render the void node's text node, which will catch the cursor when it the
     * void node is navigated to with the arrow keys.
     *
     * Having this text node there means the browser continues to manage the
     * selection natively, so it keeps track of the right offset when moving
     * across the block.
     *
     * @return {Element}
     */

  }]);
  return Void;
}(React.Component);

/**
 * Export.
 *
 * @type {Component}
 */

Void.propTypes = {
  block: SlateTypes.block,
  children: Types.any.isRequired,
  editor: Types.object.isRequired,
  node: SlateTypes.node.isRequired,
  parent: SlateTypes.node.isRequired,
  readOnly: Types.bool.isRequired };

var _initialiseProps$2 = function _initialiseProps() {
  var _this2 = this;

  this.debug = function (message) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var node = _this2.props.node;
    var key = node.key,
        type = node.type;

    var id = key + ' (' + type + ')';
    debug$2.apply(undefined, [message, '' + id].concat(args));
  };

  this.renderText = function () {
    var _props = _this2.props,
        block = _props.block,
        decorations = _props.decorations,
        node = _props.node,
        readOnly = _props.readOnly,
        editor = _props.editor;

    var child = node.getFirstText();
    return React.createElement(Text$1, {
      block: node.object == 'block' ? node : block,
      decorations: decorations,
      editor: editor,
      key: child.key,
      node: child,
      parent: node,
      readOnly: readOnly
    });
  };
};

/**
 * Split the decorations in lists of relevant decorations for each child.
 *
 * @param {Node} node
 * @param {List} decorations
 * @return {Array<List<Decoration>>}
 */

function getChildrenDecorations(node, decorations) {
  var activeDecorations = Set().asMutable();
  var childrenDecorations = [];

  orderChildDecorations(node, decorations).forEach(function (item) {
    if (item.isRangeStart) {
      // Item is a decoration start
      activeDecorations.add(item.decoration);
    } else if (item.isRangeEnd) {
      // item is a decoration end
      activeDecorations.remove(item.decoration);
    } else {
      // Item is a child node
      childrenDecorations.push(activeDecorations.toList());
    }
  });

  return childrenDecorations;
}

/**
 * Orders the children of provided node and its decoration endpoints (start, end)
 * so that decorations can be passed only to relevant children (see use in Node.render())
 *
 * @param {Node} node
 * @param {List} decorations
 * @return {Array<Item>}
 *
 * where type Item =
 * {
 *   child: Node,
 *   // Index of the child in its parent
 *   index: number
 * }
 * or {
 *   // True if this represents the start of the given decoration
 *   isRangeStart: boolean,
 *   // True if this represents the end of the given decoration
 *   isRangeEnd: boolean,
 *   decoration: Range
 * }
 */

function orderChildDecorations(node, decorations) {
  if (decorations.isEmpty()) {
    return node.nodes.toArray().map(function (child, index) {
      return {
        child: child,
        index: index
      };
    });
  }

  // Map each key to its global order
  var keyOrders = defineProperty({}, node.key, 0);
  var globalOrder = 1;

  node.forEachDescendant(function (child) {
    keyOrders[child.key] = globalOrder;
    globalOrder = globalOrder + 1;
  });

  var childNodes = node.nodes.toArray();

  var endPoints = childNodes.map(function (child, index) {
    return {
      child: child,
      index: index,
      order: keyOrders[child.key]
    };
  });

  decorations.forEach(function (decoration) {
    // Range start.
    // A rangeStart should be before the child containing its startKey, in order
    // to consider it active before going down the child.
    var startKeyOrder = keyOrders[decoration.start.key];
    var containingChildOrder = startKeyOrder === undefined ? 0 : getContainingChildOrder(childNodes, keyOrders, startKeyOrder);

    endPoints.push({
      isRangeStart: true,
      order: containingChildOrder - 0.5,
      decoration: decoration
    });

    // Range end.
    var endKeyOrder = (keyOrders[decoration.end.key] || globalOrder) + 0.5;

    endPoints.push({
      isRangeEnd: true,
      order: endKeyOrder,
      decoration: decoration
    });
  });

  return endPoints.sort(function (a, b) {
    return a.order > b.order ? 1 : -1;
  });
}

/*
 * Returns the key order of the child right before the given order.
 */

function getContainingChildOrder(children, keyOrders, order) {
  // Find the first child that is after the given key
  var nextChildIndex = children.findIndex(function (child) {
    return order < keyOrders[child.key];
  });

  if (nextChildIndex <= 0) {
    return 0;
  }

  var containingChild = children[nextChildIndex - 1];
  return keyOrders[containingChild.key];
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug$3 = Debug('slate:node');

/**
 * Node.
 *
 * @type {Component}
 */

var Node$1 = function (_React$Component) {
  inherits(Node$$1, _React$Component);

  function Node$$1() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Node$$1);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Node$$1.__proto__ || Object.getPrototypeOf(Node$$1)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps$3.call(_this), _temp), possibleConstructorReturn(_this, _ret);
  }
  /**
   * Property types.
   *
   * @type {Object}
   */

  /**
   * Debug.
   *
   * @param {String} message
   * @param {Mixed} ...args
   */

  createClass(Node$$1, [{
    key: 'shouldComponentUpdate',


    /**
     * Should the node update?
     *
     * @param {Object} nextProps
     * @param {Object} value
     * @return {Boolean}
     */

    value: function shouldComponentUpdate(nextProps) {
      var props = this.props;
      var stack = props.editor.stack;

      var shouldUpdate = stack.find('shouldNodeComponentUpdate', props, nextProps);
      var n = nextProps;
      var p = props;

      // If the `Component` has a custom logic to determine whether the component
      // needs to be updated or not, return true if it returns true. If it returns
      // false, we need to ignore it, because it shouldn't be allowed it.
      if (shouldUpdate != null) {
        if (shouldUpdate) {
          return true;
        }

        warning(shouldUpdate !== false, "Returning false in `shouldNodeComponentUpdate` does not disable Slate's internal `shouldComponentUpdate` logic. If you want to prevent updates, use React's `shouldComponentUpdate` instead.");
      }

      // If the `readOnly` status has changed, re-render in case there is any
      // user-land logic that depends on it, like nested editable contents.
      if (n.readOnly != p.readOnly) return true;

      // If the node has changed, update. PERF: There are cases where it will have
      // changed, but it's properties will be exactly the same (eg. copy-paste)
      // which this won't catch. But that's rare and not a drag on performance, so
      // for simplicity we just let them through.
      if (n.node != p.node) return true;

      // If the selection value of the node or of some of its children has changed,
      // re-render in case there is any user-land logic depends on it to render.
      // if the node is selected update it, even if it was already selected: the
      // selection value of some of its children could have been changed and they
      // need to be rendered again.
      if (n.isSelected || p.isSelected) return true;
      if (n.isFocused || p.isFocused) return true;

      // If the decorations have changed, update.
      if (!n.decorations.equals(p.decorations)) return true;

      // Otherwise, don't update.
      return false;
    }

    /**
     * Render.
     *
     * @return {Element}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.debug('render', this);
      var _props = this.props,
          editor = _props.editor,
          isSelected = _props.isSelected,
          isFocused = _props.isFocused,
          node = _props.node,
          decorations = _props.decorations,
          parent = _props.parent,
          readOnly = _props.readOnly;
      var value = editor.value;
      var selection = value.selection,
          schema = value.schema;
      var stack = editor.stack;

      var indexes = node.getSelectionIndexes(selection, isSelected);
      var decs = decorations.concat(node.getDecorations(stack));
      var childrenDecorations = getChildrenDecorations(node, decs);

      var children = [];

      node.nodes.forEach(function (child, i) {
        var isChildSelected = !!indexes && indexes.start <= i && i < indexes.end;

        children.push(_this2.renderNode(child, isChildSelected, childrenDecorations[i]));
      });

      // Attributes that the developer must mix into the element in their
      // custom node renderer component.
      var attributes = { 'data-key': node.key

        // If it's a block node with inline children, add the proper `dir` attribute
        // for text direction.
      };if (node.object == 'block' && node.nodes.first().object != 'block') {
        var direction = node.getTextDirection();
        if (direction == 'rtl') attributes.dir = 'rtl';
      }

      var props = {
        key: node.key,
        editor: editor,
        isFocused: isFocused,
        isSelected: isSelected,
        node: node,
        parent: parent,
        readOnly: readOnly
      };

      var placeholder = stack.find('renderPlaceholder', props);

      if (placeholder) {
        placeholder = React.cloneElement(placeholder, {
          key: node.key + '-placeholder'
        });

        children = [placeholder].concat(toConsumableArray(children));
      }

      var element = stack.find('renderNode', _extends({}, props, {
        attributes: attributes,
        children: children
      }));

      return schema.isVoid(node) ? React.createElement(
        Void,
        this.props,
        element
      ) : element;
    }

    /**
     * Render a `child` node.
     *
     * @param {Node} child
     * @param {Boolean} isSelected
     * @param {Array<Decoration>} decorations
     * @return {Element}
     */

  }]);
  return Node$$1;
}(React.Component);

/**
 * Export.
 *
 * @type {Component}
 */

Node$1.propTypes = {
  block: SlateTypes.block,
  decorations: ImmutableTypes.list.isRequired,
  editor: Types.object.isRequired,
  isFocused: Types.bool.isRequired,
  isSelected: Types.bool.isRequired,
  node: SlateTypes.node.isRequired,
  parent: SlateTypes.node.isRequired,
  readOnly: Types.bool.isRequired };

var _initialiseProps$3 = function _initialiseProps() {
  var _this3 = this;

  this.debug = function (message) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var node = _this3.props.node;
    var key = node.key,
        type = node.type;

    debug$3.apply(undefined, [message, key + ' (' + type + ')'].concat(args));
  };

  this.renderNode = function (child, isSelected, decorations) {
    var _props2 = _this3.props,
        block = _props2.block,
        editor = _props2.editor,
        node = _props2.node,
        readOnly = _props2.readOnly,
        isFocused = _props2.isFocused;

    var Component = child.object == 'text' ? Text$1 : Node$1;

    return React.createElement(Component, {
      block: node.object == 'block' ? node : block,
      decorations: decorations,
      editor: editor,
      isSelected: isSelected,
      isFocused: isFocused && isSelected,
      key: child.key,
      node: child,
      parent: node,
      readOnly: readOnly
    });
  };
};

/**
 * Find the DOM node for a `key`.
 *
 * @param {String|Node} key
 * @param {Window} win (optional)
 * @return {Element}
 */

function findDOMNode$1(key) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

  if (Node.isNode(key)) {
    key = key.key;
  }

  var el = win.document.querySelector('[data-key="' + key + '"]');

  if (!el) {
    throw new Error('Unable to find a DOM node for "' + key + '". This is often because of forgetting to add `props.attributes` to a custom component.');
  }

  return el;
}

/**
 * Find a native DOM selection point from a Slate `point`.
 *
 * @param {Point} point
 * @param {Window} win (optional)
 * @return {Object|Null}
 */

function findDOMPoint(point) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

  var el = findDOMNode$1(point.key, win);
  var start = 0;
  var n = void 0;

  // COMPAT: In IE, this method's arguments are not optional, so we have to
  // pass in all four even though the last two are defaults. (2017/10/25)
  var iterator = win.document.createNodeIterator(el, NodeFilter.SHOW_TEXT, function () {
    return NodeFilter.FILTER_ACCEPT;
  }, false);

  while (n = iterator.nextNode()) {
    var length = n.textContent.length;

    var end = start + length;

    if (point.offset <= end) {
      var o = point.offset - start;
      return { node: n, offset: o >= 0 ? o : 0 };
    }

    start = end;
  }

  return null;
}

/**
 * Find a native DOM range Slate `range`.
 *
 * @param {Range} range
 * @param {Window} win (optional)
 * @return {Object|Null}
 */

function findDOMRange(range) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var anchor = range.anchor,
      focus = range.focus,
      isBackward$$1 = range.isBackward,
      isCollapsed = range.isCollapsed;

  var domAnchor = findDOMPoint(anchor, win);
  var domFocus = isCollapsed ? domAnchor : findDOMPoint(focus, win);

  if (!domAnchor || !domFocus) return null;

  var r = win.document.createRange();
  var start = isBackward$$1 ? domFocus : domAnchor;
  var end = isBackward$$1 ? domAnchor : domFocus;
  r.setStart(start.node, start.offset);
  r.setEnd(end.node, end.offset);
  return r;
}

/**
 * Constants.
 *
 * @type {String}
 */

var ZERO_WIDTH_ATTRIBUTE = 'data-slate-zero-width';
var ZERO_WIDTH_SELECTOR = '[' + ZERO_WIDTH_ATTRIBUTE + ']';
var OFFSET_KEY_ATTRIBUTE = 'data-offset-key';
var RANGE_SELECTOR = '[' + OFFSET_KEY_ATTRIBUTE + ']';
var TEXT_SELECTOR = '[data-key]';
var VOID_SELECTOR = '[data-slate-void]';

/**
 * Find a Slate point from a DOM selection's `nativeNode` and `nativeOffset`.
 *
 * @param {Element} nativeNode
 * @param {Number} nativeOffset
 * @param {Value} value
 * @return {Point}
 */

function findPoint(nativeNode, nativeOffset, value) {
  var _normalizeNodeAndOffs = normalizeNodeAndOffset(nativeNode, nativeOffset),
      nearestNode = _normalizeNodeAndOffs.node,
      nearestOffset = _normalizeNodeAndOffs.offset;

  var window = getWindow(nativeNode);
  var parentNode = nearestNode.parentNode;

  var rangeNode = parentNode.closest(RANGE_SELECTOR);
  var offset = void 0;
  var node = void 0;

  // Calculate how far into the text node the `nearestNode` is, so that we can
  // determine what the offset relative to the text node is.
  if (rangeNode) {
    var range = window.document.createRange();
    var textNode = rangeNode.closest(TEXT_SELECTOR);
    range.setStart(textNode, 0);
    range.setEnd(nearestNode, nearestOffset);
    node = textNode;
    offset = range.toString().length;
  } else {
    // For void nodes, the element with the offset key will be a cousin, not an
    // ancestor, so find it by going down from the nearest void parent.
    var voidNode = parentNode.closest(VOID_SELECTOR);
    if (!voidNode) return null;
    rangeNode = voidNode.querySelector(RANGE_SELECTOR);
    if (!rangeNode) return null;
    node = rangeNode;
    offset = node.textContent.length;
  }

  // COMPAT: If the parent node is a Slate zero-width space, this is because the
  // text node should have no characters. However, during IME composition the
  // ASCII characters will be prepended to the zero-width space, so subtract 1
  // from the offset to account for the zero-width space character.
  if (offset == node.textContent.length && parentNode.hasAttribute(ZERO_WIDTH_ATTRIBUTE)) {
    offset--;
  }

  // Get the string value of the offset key attribute.
  var offsetKey = rangeNode.getAttribute(OFFSET_KEY_ATTRIBUTE);
  if (!offsetKey) return null;

  var _OffsetKey$parse = OffsetKey.parse(offsetKey),
      key = _OffsetKey$parse.key;

  // COMPAT: If someone is clicking from one Slate editor into another, the
  // select event fires twice, once for the old editor's `element` first, and
  // then afterwards for the correct `element`. (2017/03/03)


  if (!value.document.hasDescendant(key)) return null;

  var point = value.document.createPoint({ key: key, offset: offset });
  return point;
}

/**
 * From a DOM selection's `node` and `offset`, normalize so that it always
 * refers to a text node.
 *
 * @param {Element} node
 * @param {Number} offset
 * @return {Object}
 */

function normalizeNodeAndOffset(node, offset) {
  // If it's an element node, its offset refers to the index of its children
  // including comment nodes, so try to find the right text child node.
  if (node.nodeType == 1 && node.childNodes.length) {
    var isLast = offset == node.childNodes.length;
    var direction = isLast ? 'backward' : 'forward';
    var index = isLast ? offset - 1 : offset;
    node = getEditableChild(node, index, direction);

    // If the node has children, traverse until we have a leaf node. Leaf nodes
    // can be either text nodes, or other void DOM nodes.
    while (node.nodeType == 1 && node.childNodes.length) {
      var i = isLast ? node.childNodes.length - 1 : 0;
      node = getEditableChild(node, i, direction);
    }

    // Determine the new offset inside the text node.
    offset = isLast ? node.textContent.length : 0;
  }

  // Return the node and offset.
  return { node: node, offset: offset };
}

/**
 * Get the nearest editable child at `index` in a `parent`, preferring
 * `direction`.
 *
 * @param {Element} parent
 * @param {Number} index
 * @param {String} direction ('forward' or 'backward')
 * @return {Element|Null}
 */

function getEditableChild(parent, index, direction) {
  var childNodes = parent.childNodes;

  var child = childNodes[index];
  var i = index;
  var triedForward = false;
  var triedBackward = false;

  // While the child is a comment node, or an element node with no children,
  // keep iterating to find a sibling non-void, non-comment node.
  while (child.nodeType == 8 || child.nodeType == 1 && child.childNodes.length == 0 || child.nodeType == 1 && child.getAttribute('contenteditable') == 'false') {
    if (triedForward && triedBackward) break;

    if (i >= childNodes.length) {
      triedForward = true;
      i = index - 1;
      direction = 'backward';
      continue;
    }

    if (i < 0) {
      triedBackward = true;
      i = index + 1;
      direction = 'forward';
      continue;
    }

    child = childNodes[i];
    if (direction == 'forward') i++;
    if (direction == 'backward') i--;
  }

  return child || null;
}

/**
 * Find a Slate range from a DOM `native` selection.
 *
 * @param {Selection} native
 * @param {Value} value
 * @return {Range}
 */

function findRange(native, value) {
  var el = native.anchorNode || native.startContainer;
  if (!el) return null;

  var window = getWindow(el);

  // If the `native` object is a DOM `Range` or `StaticRange` object, change it
  // into something that looks like a DOM `Selection` instead.
  if (native instanceof window.Range || window.StaticRange && native instanceof window.StaticRange) {
    native = {
      anchorNode: native.startContainer,
      anchorOffset: native.startOffset,
      focusNode: native.endContainer,
      focusOffset: native.endOffset
    };
  }

  var _native = native,
      anchorNode = _native.anchorNode,
      anchorOffset = _native.anchorOffset,
      focusNode = _native.focusNode,
      focusOffset = _native.focusOffset,
      isCollapsed = _native.isCollapsed;

  var anchor = findPoint(anchorNode, anchorOffset, value);
  var focus = isCollapsed ? anchor : findPoint(focusNode, focusOffset, value);
  if (!anchor || !focus) return null;

  // COMPAT: ??? The Edge browser seems to have a case where if you select the
  // last word of a span, it sets the endContainer to the containing span.
  // `selection-is-backward` doesn't handle this case.
  if (IS_IE || IS_EDGE) {
    var domAnchor = findDOMPoint(anchor);
    var domFocus = findDOMPoint(focus);

    native = {
      anchorNode: domAnchor.node,
      anchorOffset: domAnchor.offset,
      focusNode: domFocus.node,
      focusOffset: domFocus.offset
    };
  }

  var document = value.document;

  var range = document.createRange({
    anchor: anchor,
    focus: focus
  });

  return range;
}

/**
 * CSS overflow values that would cause scrolling.
 *
 * @type {Array}
 */

var OVERFLOWS = ['auto', 'overlay', 'scroll'];

/**
 * Detect whether we are running IOS version 11
 */

var IS_IOS_11 = IS_IOS && !!window.navigator.userAgent.match(/os 11_/i);

/**
 * Find the nearest parent with scrolling, or window.
 *
 * @param {el} Element
 */

function findScrollContainer(el, window) {
  var parent = el.parentNode;
  var scroller = void 0;

  while (!scroller) {
    if (!parent.parentNode) break;

    var style = window.getComputedStyle(parent);
    var overflowY = style.overflowY;


    if (OVERFLOWS.includes(overflowY)) {
      scroller = parent;
      break;
    }

    parent = parent.parentNode;
  }

  // COMPAT: Because Chrome does not allow doucment.body.scrollTop, we're
  // assuming that window.scrollTo() should be used if the scrollable element
  // turns out to be document.body or document.documentElement. This will work
  // unless body is intentionally set to scrollable by restricting its height
  // (e.g. height: 100vh).
  if (!scroller) {
    return window.document.body;
  }

  return scroller;
}

/**
 * Scroll the current selection's focus point into view if needed.
 *
 * @param {Selection} selection
 */

function scrollToSelection(selection) {
  if (IS_IOS_11) return;
  if (!selection.anchorNode) return;

  var window = getWindow(selection.anchorNode);
  var scroller = findScrollContainer(selection.anchorNode, window);
  var isWindow = scroller == window.document.body || scroller == window.document.documentElement;
  var backward = isBackward(selection);

  var range = selection.getRangeAt(0).cloneRange();
  range.collapse(backward);
  var cursorRect = range.getBoundingClientRect();

  // COMPAT: range.getBoundingClientRect() returns 0s in Safari when range is
  // collapsed. Expanding the range by 1 is a relatively effective workaround
  // for vertical scroll, although horizontal may be off by 1 character.
  // https://bugs.webkit.org/show_bug.cgi?id=138949
  // https://bugs.chromium.org/p/chromium/issues/detail?id=435438
  if (IS_SAFARI) {
    if (range.collapsed && cursorRect.top == 0 && cursorRect.height == 0) {
      if (range.startOffset == 0) {
        range.setEnd(range.endContainer, 1);
      } else {
        range.setStart(range.startContainer, range.startOffset - 1);
      }

      cursorRect = range.getBoundingClientRect();

      if (cursorRect.top == 0 && cursorRect.height == 0) {
        if (range.getClientRects().length) {
          cursorRect = range.getClientRects()[0];
        }
      }
    }
  }

  var width = void 0;
  var height = void 0;
  var yOffset = void 0;
  var xOffset = void 0;
  var scrollerTop = 0;
  var scrollerLeft = 0;
  var scrollerBordersY = 0;
  var scrollerBordersX = 0;
  var scrollerPaddingTop = 0;
  var scrollerPaddingBottom = 0;
  var scrollerPaddingLeft = 0;
  var scrollerPaddingRight = 0;

  if (isWindow) {
    var innerWidth = window.innerWidth,
        innerHeight = window.innerHeight,
        pageYOffset = window.pageYOffset,
        pageXOffset = window.pageXOffset;

    width = innerWidth;
    height = innerHeight;
    yOffset = pageYOffset;
    xOffset = pageXOffset;
  } else {
    var offsetWidth = scroller.offsetWidth,
        offsetHeight = scroller.offsetHeight,
        scrollTop = scroller.scrollTop,
        scrollLeft = scroller.scrollLeft;

    var _window$getComputedSt = window.getComputedStyle(scroller),
        borderTopWidth = _window$getComputedSt.borderTopWidth,
        borderBottomWidth = _window$getComputedSt.borderBottomWidth,
        borderLeftWidth = _window$getComputedSt.borderLeftWidth,
        borderRightWidth = _window$getComputedSt.borderRightWidth,
        paddingTop = _window$getComputedSt.paddingTop,
        paddingBottom = _window$getComputedSt.paddingBottom,
        paddingLeft = _window$getComputedSt.paddingLeft,
        paddingRight = _window$getComputedSt.paddingRight;

    var scrollerRect = scroller.getBoundingClientRect();
    width = offsetWidth;
    height = offsetHeight;
    scrollerTop = scrollerRect.top + parseInt(borderTopWidth, 10);
    scrollerLeft = scrollerRect.left + parseInt(borderLeftWidth, 10);

    scrollerBordersY = parseInt(borderTopWidth, 10) + parseInt(borderBottomWidth, 10);

    scrollerBordersX = parseInt(borderLeftWidth, 10) + parseInt(borderRightWidth, 10);

    scrollerPaddingTop = parseInt(paddingTop, 10);
    scrollerPaddingBottom = parseInt(paddingBottom, 10);
    scrollerPaddingLeft = parseInt(paddingLeft, 10);
    scrollerPaddingRight = parseInt(paddingRight, 10);
    yOffset = scrollTop;
    xOffset = scrollLeft;
  }

  var cursorTop = cursorRect.top + yOffset - scrollerTop;
  var cursorLeft = cursorRect.left + xOffset - scrollerLeft;

  var x = xOffset;
  var y = yOffset;

  if (cursorLeft < xOffset) {
    // selection to the left of viewport
    x = cursorLeft - scrollerPaddingLeft;
  } else if (cursorLeft + cursorRect.width + scrollerBordersX > xOffset + width) {
    // selection to the right of viewport
    x = cursorLeft + scrollerBordersX + scrollerPaddingRight - width;
  }

  if (cursorTop < yOffset) {
    // selection above viewport
    y = cursorTop - scrollerPaddingTop;
  } else if (cursorTop + cursorRect.height + scrollerBordersY > yOffset + height) {
    // selection below viewport
    y = cursorTop + scrollerBordersY + scrollerPaddingBottom + cursorRect.height - height;
  }

  if (isWindow) {
    window.scrollTo(x, y);
  } else {
    scroller.scrollTop = y;
    scroller.scrollLeft = x;
  }
}

/**
 * COMPAT: if we are in <= IE11 and the selection contains
 * tables, `removeAllRanges()` will throw
 * "unable to complete the operation due to error 800a025e"
 *
 * @param {Selection} selection document selection
 */

function removeAllRanges(selection) {
  var doc = window.document;

  if (doc && doc.body.createTextRange) {
    // All IE but Edge
    var range = doc.body.createTextRange();
    range.collapse();
    range.select();
  } else {
    selection.removeAllRanges();
  }
}

var FIREFOX_NODE_TYPE_ACCESS_ERROR = /Permission denied to access property "nodeType"/;

/**
 * Debug.
 *
 * @type {Function}
 */

var debug$4 = Debug('slate:content');

/**
 * Content.
 *
 * @type {Component}
 */

var Content = function (_React$Component) {
  inherits(Content, _React$Component);

  function Content() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Content);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Content.__proto__ || Object.getPrototypeOf(Content)).call.apply(_ref, [this].concat(args))), _this), _this.tmp = {
      isUpdatingSelection: false

      /**
       * Create a set of bound event handlers.
       *
       * @type {Object}
       */

    }, _this.handlers = EVENT_HANDLERS.reduce(function (obj, handler) {
      obj[handler] = function (event) {
        return _this.onEvent(handler, event);
      };
      return obj;
    }, {}), _this.updateSelection = function () {
      var editor = _this.props.editor;
      var value = editor.value;
      var selection = value.selection;
      var isBackward$$1 = selection.isBackward;

      var window = getWindow(_this.element);
      var native = window.getSelection();

      // .getSelection() can return null in some cases
      // https://bugzilla.mozilla.org/show_bug.cgi?id=827585
      if (!native) return;

      var rangeCount = native.rangeCount,
          anchorNode = native.anchorNode;

      // If both selections are blurred, do nothing.

      if (!rangeCount && selection.isBlurred) return;

      // If the selection has been blurred, but is still inside the editor in the
      // DOM, blur it manually.
      if (selection.isBlurred) {
        if (!_this.isInEditor(anchorNode)) return;
        removeAllRanges(native);
        _this.element.blur();
        debug$4('updateSelection', { selection: selection, native: native });
        return;
      }

      // If the selection isn't set, do nothing.
      if (selection.isUnset) return;

      // Otherwise, figure out which DOM nodes should be selected...
      var current = !!rangeCount && native.getRangeAt(0);
      var range = findDOMRange(selection, window);

      if (!range) {
        warning(false, 'Unable to find a native DOM range from the current selection.');

        return;
      }

      var startContainer = range.startContainer,
          startOffset = range.startOffset,
          endContainer = range.endContainer,
          endOffset = range.endOffset;

      // If the new range matches the current selection, there is nothing to fix.
      // COMPAT: The native `Range` object always has it's "start" first and "end"
      // last in the DOM. It has no concept of "backwards/forwards", so we have
      // to check both orientations here. (2017/10/31)

      if (current) {
        if (startContainer == current.startContainer && startOffset == current.startOffset && endContainer == current.endContainer && endOffset == current.endOffset || startContainer == current.endContainer && startOffset == current.endOffset && endContainer == current.startContainer && endOffset == current.startOffset) {
          return;
        }
      }

      // Otherwise, set the `isUpdatingSelection` flag and update the selection.
      _this.tmp.isUpdatingSelection = true;
      removeAllRanges(native);

      // COMPAT: IE 11 does not support Selection.setBaseAndExtent
      if (native.setBaseAndExtent) {
        // COMPAT: Since the DOM range has no concept of backwards/forwards
        // we need to check and do the right thing here.
        if (isBackward$$1) {
          native.setBaseAndExtent(range.endContainer, range.endOffset, range.startContainer, range.startOffset);
        } else {
          native.setBaseAndExtent(range.startContainer, range.startOffset, range.endContainer, range.endOffset);
        }
      } else {
        // COMPAT: IE 11 does not support Selection.extend, fallback to addRange
        native.addRange(range);
      }

      // Scroll to the selection, in case it's out of view.
      scrollToSelection(native);

      // Then unset the `isUpdatingSelection` flag after a delay.
      setTimeout(function () {
        // COMPAT: In Firefox, it's not enough to create a range, you also need to
        // focus the contenteditable element too. (2016/11/16)
        if (IS_FIREFOX && _this.element) _this.element.focus();
        _this.tmp.isUpdatingSelection = false;
      });

      debug$4('updateSelection', { selection: selection, native: native });
    }, _this.ref = function (element) {
      _this.element = element;
    }, _this.isInEditor = function (target) {
      var _this2 = _this,
          element = _this2.element;


      var el = void 0;

      try {
        // COMPAT: Text nodes don't have `isContentEditable` property. So, when
        // `target` is a text node use its parent node for check.
        el = target.nodeType === 3 ? target.parentNode : target;
      } catch (err) {
        // COMPAT: In Firefox, `target.nodeType` will throw an error if target is
        // originating from an internal "restricted" element (e.g. a stepper
        // arrow on a number input)
        // see github.com/ianstormtaylor/slate/issues/1819
        if (IS_FIREFOX && FIREFOX_NODE_TYPE_ACCESS_ERROR.test(err.message)) {
          return false;
        }

        throw err;
      }
      return el.isContentEditable && (el === element || el.closest('[data-slate-editor]') === element);
    }, _this.onNativeSelectionChange = throttle(function (event) {
      if (_this.props.readOnly) return;

      var window = getWindow(event.target);
      var activeElement = window.document.activeElement;

      if (activeElement !== _this.element) return;

      _this.props.onSelect(event);
    }, 100), _this.renderNode = function (child, isSelected, decorations) {
      var _this$props = _this.props,
          editor = _this$props.editor,
          readOnly = _this$props.readOnly;
      var value = editor.value;
      var document = value.document,
          selection = value.selection;
      var isFocused = selection.isFocused;


      return React.createElement(Node$1, {
        block: null,
        editor: editor,
        decorations: decorations,
        isSelected: isSelected,
        isFocused: isFocused && isSelected,
        key: child.key,
        node: child,
        parent: document,
        readOnly: readOnly
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }
  /**
   * Property types.
   *
   * @type {Object}
   */

  /**
   * Default properties.
   *
   * @type {Object}
   */

  /**
   * Temporary values.
   *
   * @type {Object}
   */

  createClass(Content, [{
    key: 'componentDidMount',


    /**
     * When the editor first mounts in the DOM we need to:
     *
     *   - Add native DOM event listeners.
     *   - Update the selection, in case it starts focused.
     */

    value: function componentDidMount() {
      var window = getWindow(this.element);

      window.document.addEventListener('selectionchange', this.onNativeSelectionChange);

      // COMPAT: Restrict scope of `beforeinput` to clients that support the
      // Input Events Level 2 spec, since they are preventable events.
      if (HAS_INPUT_EVENTS_LEVEL_2) {
        this.element.addEventListener('beforeinput', this.handlers.onBeforeInput);
      }

      this.updateSelection();
    }

    /**
     * When unmounting, remove DOM event listeners.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var window = getWindow(this.element);

      if (window) {
        window.document.removeEventListener('selectionchange', this.onNativeSelectionChange);
      }

      if (HAS_INPUT_EVENTS_LEVEL_2) {
        this.element.removeEventListener('beforeinput', this.handlers.onBeforeInput);
      }
    }

    /**
     * On update, update the selection.
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateSelection();
    }

    /**
     * Update the native DOM selection to reflect the internal model.
     */

    /**
     * The React ref method to set the root content element locally.
     *
     * @param {Element} element
     */

    /**
     * Check if an event `target` is fired from within the contenteditable
     * element. This should be false for edits happening in non-contenteditable
     * children, such as void nodes and other nested Slate editors.
     *
     * @param {Element} target
     * @return {Boolean}
     */

  }, {
    key: 'onEvent',


    /**
     * On `event` with `handler`.
     *
     * @param {String} handler
     * @param {Event} event
     */

    value: function onEvent(handler, event) {
      debug$4('onEvent', handler);

      // Ignore `onBlur`, `onFocus` and `onSelect` events generated
      // programmatically while updating selection.
      if (this.tmp.isUpdatingSelection && (handler == 'onSelect' || handler == 'onBlur' || handler == 'onFocus')) {
        return;
      }

      // COMPAT: There are situations where a select event will fire with a new
      // native selection that resolves to the same internal position. In those
      // cases we don't need to trigger any changes, since our internal model is
      // already up to date, but we do want to update the native selection again
      // to make sure it is in sync. (2017/10/16)
      if (handler == 'onSelect') {
        var editor = this.props.editor;
        var value = editor.value;
        var selection = value.selection;

        var window = getWindow(event.target);
        var native = window.getSelection();
        var range = findRange(native, value);

        if (range && range.equals(selection.toRange())) {
          this.updateSelection();
          return;
        }
      }

      // Don't handle drag and drop events coming from embedded editors.
      if (handler == 'onDragEnd' || handler == 'onDragEnter' || handler == 'onDragExit' || handler == 'onDragLeave' || handler == 'onDragOver' || handler == 'onDragStart' || handler == 'onDrop') {
        var target = event.target;

        var targetEditorNode = target.closest('[data-slate-editor]');
        if (targetEditorNode !== this.element) return;
      }

      // Some events require being in editable in the editor, so if the event
      // target isn't, ignore them.
      if (handler == 'onBeforeInput' || handler == 'onBlur' || handler == 'onCompositionEnd' || handler == 'onCompositionStart' || handler == 'onCopy' || handler == 'onCut' || handler == 'onFocus' || handler == 'onInput' || handler == 'onKeyDown' || handler == 'onKeyUp' || handler == 'onPaste' || handler == 'onSelect') {
        if (!this.isInEditor(event.target)) return;
      }

      this.props[handler](event);
    }

    /**
     * On native `selectionchange` event, trigger the `onSelect` handler. This is
     * needed to account for React's `onSelect` being non-standard and not firing
     * until after a selection has been released. This causes issues in situations
     * where another change happens while a selection is being made.
     *
     * @param {Event} event
     */

  }, {
    key: 'render',


    /**
     * Render the editor content.
     *
     * @return {Element}
     */

    value: function render() {
      var _this3 = this;

      var props = this.props,
          handlers = this.handlers;
      var className = props.className,
          readOnly = props.readOnly,
          editor = props.editor,
          tabIndex = props.tabIndex,
          role = props.role,
          tagName = props.tagName,
          spellCheck = props.spellCheck;
      var value = editor.value,
          stack = editor.stack;

      var Container = tagName;
      var document = value.document,
          selection = value.selection,
          decorations = value.decorations;

      var indexes = document.getSelectionIndexes(selection);
      var decs = document.getDecorations(stack).concat(decorations);
      var childrenDecorations = getChildrenDecorations(document, decs);

      var children = document.nodes.toArray().map(function (child, i) {
        var isSelected = !!indexes && indexes.start <= i && i < indexes.end;

        return _this3.renderNode(child, isSelected, childrenDecorations[i]);
      });

      var style = _extends({
        // Prevent the default outline styles.
        outline: 'none',
        // Preserve adjacent whitespace and new lines.
        whiteSpace: 'pre-wrap',
        // Allow words to break if they are too long.
        wordWrap: 'break-word'
      }, readOnly ? {} : { WebkitUserModify: 'read-write-plaintext-only' }, props.style);

      debug$4('render', { props: props });

      return React.createElement(
        Container,
        _extends({}, handlers, {
          'data-slate-editor': true,
          ref: this.ref,
          'data-key': document.key,
          contentEditable: readOnly ? null : true,
          suppressContentEditableWarning: true,
          className: className,
          autoCorrect: props.autoCorrect ? 'on' : 'off',
          spellCheck: spellCheck,
          style: style,
          role: readOnly ? null : role || 'textbox',
          tabIndex: tabIndex
          // COMPAT: The Grammarly Chrome extension works by changing the DOM out
          // from under `contenteditable` elements, which leads to weird behaviors
          // so we have to disable it like this. (2017/04/24)
          , 'data-gramm': false
        }),
        children
      );
    }

    /**
     * Render a `child` node of the document.
     *
     * @param {Node} child
     * @param {Boolean} isSelected
     * @return {Element}
     */

  }]);
  return Content;
}(React.Component);

/**
 * Mix in handler prop types.
 */

Content.propTypes = {
  autoCorrect: Types.bool.isRequired,
  className: Types.string,
  editor: Types.object.isRequired,
  readOnly: Types.bool.isRequired,
  role: Types.string,
  spellCheck: Types.bool.isRequired,
  style: Types.object,
  tabIndex: Types.number,
  tagName: Types.string };
Content.defaultProps = {
  style: {},
  tagName: 'div' };
EVENT_HANDLERS.forEach(function (handler) {
  Content.propTypes[handler] = Types.func.isRequired;
});

/**
 * The transfer types that Slate recognizes.
 *
 * @type {Object}
 */

var TRANSFER_TYPES = {
  FRAGMENT: 'application/x-slate-fragment',
  HTML: 'text/html',
  NODE: 'application/x-slate-node',
  RICH: 'text/rtf',
  TEXT: 'text/plain'

  /**
   * Export.
   *
   * @type {Object}
   */

};

var FRAGMENT = TRANSFER_TYPES.FRAGMENT;
var HTML = TRANSFER_TYPES.HTML;
var TEXT = TRANSFER_TYPES.TEXT;

/**
 * Prepares a Slate document fragment to be copied to the clipboard.
 *
 * @param {Event} event
 * @param {Value} value
 * @param {Document} [fragment]
 */

function cloneFragment(event, value) {
  var fragment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : value.fragment;
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {
    return undefined;
  };

  var window = getWindow(event.target);
  var native = window.getSelection();
  var schema = value.schema;
  var _value$selection = value.selection,
      start = _value$selection.start,
      end = _value$selection.end;

  var startVoid = value.document.getClosestVoid(start.key, schema);
  var endVoid = value.document.getClosestVoid(end.key, schema);

  // If the selection is collapsed, and it isn't inside a void node, abort.
  if (native.isCollapsed && !startVoid) return;

  // Create a fake selection so that we can add a Base64-encoded copy of the
  // fragment to the HTML, to decode on future pastes.
  var encoded = Base64.serializeNode(fragment);
  var range = native.getRangeAt(0);
  var contents = range.cloneContents();
  var attach = contents.childNodes[0];

  // Make sure attach is a non-empty node, since empty nodes will not get copied
  contents.childNodes.forEach(function (node) {
    if (node.textContent && node.textContent.trim() !== '') {
      attach = node;
    }
  });

  // COMPAT: If the end node is a void node, we need to move the end of the
  // range from the void node's spacer span, to the end of the void node's
  // content, since the spacer is before void's content in the DOM.
  if (endVoid) {
    var r = range.cloneRange();
    var node = findDOMNode$1(endVoid, window);
    r.setEndAfter(node);
    contents = r.cloneContents();
  }

  // COMPAT: If the start node is a void node, we need to attach the encoded
  // fragment to the void node's content node instead of the spacer, because
  // attaching it to empty `<div>/<span>` nodes will end up having it erased by
  // most browsers. (2018/04/27)
  if (startVoid) {
    attach = contents.childNodes[0].childNodes[1].firstChild;
  }

  // Remove any zero-width space spans from the cloned DOM so that they don't
  // show up elsewhere when pasted.
  [].slice.call(contents.querySelectorAll(ZERO_WIDTH_SELECTOR)).forEach(function (zw) {
    var isNewline = zw.getAttribute(ZERO_WIDTH_ATTRIBUTE) === 'n';
    zw.textContent = isNewline ? '\n' : '';
  });

  // Set a `data-slate-fragment` attribute on a non-empty node, so it shows up
  // in the HTML, and can be used for intra-Slate pasting. If it's a text
  // node, wrap it in a `<span>` so we have something to set an attribute on.
  if (attach.nodeType == 3) {
    var span = window.document.createElement('span');

    // COMPAT: In Chrome and Safari, if we don't add the `white-space` style
    // then leading and trailing spaces will be ignored. (2017/09/21)
    span.style.whiteSpace = 'pre';

    span.appendChild(attach);
    contents.appendChild(span);
    attach = span;
  }

  attach.setAttribute('data-slate-fragment', encoded);

  //  Creates value from only the selected blocks
  //  Then gets plaintext for clipboard with proper linebreaks for BLOCK elements
  //  Via Plain serializer
  var valFromSelection = Value.create({ document: fragment });
  var plainText = Plain.serialize(valFromSelection);

  // Add the phony content to a div element. This is needed to copy the
  // contents into the html clipboard register.
  var div = window.document.createElement('div');
  div.appendChild(contents);

  // For browsers supporting it, we set the clipboard registers manually,
  // since the result is more predictable.
  // COMPAT: IE supports the setData method, but only in restricted sense.
  // IE doesn't support arbitrary MIME types or common ones like 'text/plain';
  // it only accepts "Text" (which gets mapped to 'text/plain') and "Url"
  // (mapped to 'text/url-list'); so, we should only enter block if !IS_IE
  if (event.clipboardData && event.clipboardData.setData && !IS_IE) {
    event.preventDefault();
    event.clipboardData.setData(TEXT, plainText);
    event.clipboardData.setData(FRAGMENT, encoded);
    event.clipboardData.setData(HTML, div.innerHTML);
    callback();
  }

  // COMPAT: For browser that don't support the Clipboard API's setData method,
  // we must rely on the browser to natively copy what's selected.
  // So we add the div (containing our content) to the DOM, and select it.
  var editor = event.target.closest('[data-slate-editor]');
  div.setAttribute('contenteditable', true);
  div.style.position = 'absolute';
  div.style.left = '-9999px';
  editor.appendChild(div);
  native.selectAllChildren(div);

  // Revert to the previous selection right after copying.
  window.requestAnimationFrame(function () {
    editor.removeChild(div);
    removeAllRanges(native);
    native.addRange(range);
    callback();
  });
}

/**
 * Find a Slate node from a DOM `element`.
 *
 * @param {Element} element
 * @param {Value} value
 * @return {Node|Null}
 */

function findNode(element, value) {
  var closest = element.closest('[data-key]');
  if (!closest) return null;

  var key = closest.getAttribute('data-key');
  if (!key) return null;

  var node = value.document.getNode(key);
  return node || null;
}

/**
 * Get the target range from a DOM `event`.
 *
 * @param {Event} event
 * @param {Value} value
 * @return {Range}
 */

function getEventRange(event, value) {
  if (event.nativeEvent) {
    event = event.nativeEvent;
  }

  var _event = event,
      x = _event.x,
      y = _event.y,
      target = _event.target;

  if (x == null || y == null) return null;

  var document = value.document,
      schema = value.schema;

  var node = findNode(target, value);
  if (!node) return null;

  // If the drop target is inside a void node, move it into either the next or
  // previous node, depending on which side the `x` and `y` coordinates are
  // closest to.
  if (schema.isVoid(node)) {
    var rect = target.getBoundingClientRect();
    var isPrevious = node.object == 'inline' ? x - rect.left < rect.left + rect.width - x : y - rect.top < rect.top + rect.height - y;

    var text = node.getFirstText();
    var _range = document.createRange();

    if (isPrevious) {
      var previousText = document.getPreviousText(text.key);

      if (previousText) {
        return _range.moveToEndOfNode(previousText);
      }
    }

    var nextText = document.getNextText(text.key);
    return nextText ? _range.moveToStartOfNode(nextText) : null;
  }

  // Else resolve a range from the caret position where the drop occured.
  var window = getWindow(target);
  var native = void 0;

  // COMPAT: In Firefox, `caretRangeFromPoint` doesn't exist. (2016/07/25)
  if (window.document.caretRangeFromPoint) {
    native = window.document.caretRangeFromPoint(x, y);
  } else if (window.document.caretPositionFromPoint) {
    var position = window.document.caretPositionFromPoint(x, y);
    native = window.document.createRange();
    native.setStart(position.offsetNode, position.offset);
    native.setEnd(position.offsetNode, position.offset);
  } else if (window.document.body.createTextRange) {
    // COMPAT: In IE, `caretRangeFromPoint` and
    // `caretPositionFromPoint` don't exist. (2018/07/11)
    native = window.document.body.createTextRange();

    try {
      native.moveToPoint(x, y);
    } catch (error) {
      // IE11 will raise an `unspecified error` if `moveToPoint` is
      // called during a dropEvent.
      return null;
    }
  }

  // Resolve a Slate range from the DOM range.
  var range = findRange(native, value);
  if (!range) return null;

  return range;
}

/**
 * Transfer types.
 *
 * @type {String}
 */

var FRAGMENT$1 = TRANSFER_TYPES.FRAGMENT;
var HTML$1 = TRANSFER_TYPES.HTML;
var NODE = TRANSFER_TYPES.NODE;
var RICH = TRANSFER_TYPES.RICH;
var TEXT$1 = TRANSFER_TYPES.TEXT;

/**
 * Fragment matching regexp for HTML nodes.
 *
 * @type {RegExp}
 */

var FRAGMENT_MATCHER = / data-slate-fragment="([^\s"]+)"/;

/**
 * Get the transfer data from an `event`.
 *
 * @param {Event} event
 * @return {Object}
 */

function getEventTransfer(event) {
  // COMPAT: IE 11 doesn't populate nativeEvent with either
  // dataTransfer or clipboardData. We'll need to use the base event
  // object (2018/14/6)
  if (!IS_IE && event.nativeEvent) {
    event = event.nativeEvent;
  }

  var transfer = event.dataTransfer || event.clipboardData;
  var fragment = getType(transfer, FRAGMENT$1);
  var node = getType(transfer, NODE);
  var html = getType(transfer, HTML$1);
  var rich = getType(transfer, RICH);
  var text = getType(transfer, TEXT$1);
  var files = void 0;

  // If there isn't a fragment, but there is HTML, check to see if the HTML is
  // actually an encoded fragment.
  if (!fragment && html && ~html.indexOf(' data-slate-fragment="')) {
    var matches = FRAGMENT_MATCHER.exec(html);

    var _matches = slicedToArray(matches, 2),
        full = _matches[0],
        encoded = _matches[1]; // eslint-disable-line no-unused-vars


    if (encoded) fragment = encoded;
  }

  // COMPAT: Edge doesn't handle custom data types
  // These will be embedded in text/plain in this case (2017/7/12)
  if (text) {
    var embeddedTypes = getEmbeddedTypes(text);

    if (embeddedTypes[FRAGMENT$1]) fragment = embeddedTypes[FRAGMENT$1];
    if (embeddedTypes[NODE]) node = embeddedTypes[NODE];
    if (embeddedTypes[TEXT$1]) text = embeddedTypes[TEXT$1];
  }

  // Decode a fragment or node if they exist.
  if (fragment) fragment = Base64.deserializeNode(fragment);
  if (node) node = Base64.deserializeNode(node);

  // COMPAT: Edge sometimes throws 'NotSupportedError'
  // when accessing `transfer.items` (2017/7/12)
  try {
    // Get and normalize files if they exist.
    if (transfer.items && transfer.items.length) {
      files = Array.from(transfer.items).map(function (item) {
        return item.kind == 'file' ? item.getAsFile() : null;
      }).filter(function (exists) {
        return exists;
      });
    } else if (transfer.files && transfer.files.length) {
      files = Array.from(transfer.files);
    }
  } catch (err) {
    if (transfer.files && transfer.files.length) {
      files = Array.from(transfer.files);
    }
  }

  // Determine the type of the data.
  var data = { files: files, fragment: fragment, html: html, node: node, rich: rich, text: text };
  data.type = getTransferType(data);
  return data;
}

/**
 * Takes text input, checks whether contains embedded data
 * and returns object with original text +/- additional data
 *
 * @param {String} text
 * @return {Object}
 */

function getEmbeddedTypes(text) {
  var prefix = 'SLATE-DATA-EMBED::';

  if (text.substring(0, prefix.length) != prefix) {
    return { TEXT: text };
  }

  // Attempt to parse, if fails then just standard text/plain
  // Otherwise, already had data embedded
  try {
    return JSON.parse(text.substring(prefix.length));
  } catch (err) {
    throw new Error('Unable to parse custom Slate drag event data.');
  }
}

/**
 * Get the type of a transfer from its `data`.
 *
 * @param {Object} data
 * @return {String}
 */

function getTransferType(data) {
  if (data.fragment) return 'fragment';
  if (data.node) return 'node';

  // COMPAT: Microsoft Word adds an image of the selected text to the data.
  // Since files are preferred over HTML or text, this would cause the type to
  // be considered `files`. But it also adds rich text data so we can check
  // for that and properly set the type to `html` or `text`. (2016/11/21)
  if (data.rich && data.html) return 'html';
  if (data.rich && data.text) return 'text';

  if (data.files && data.files.length) return 'files';
  if (data.html) return 'html';
  if (data.text) return 'text';
  return 'unknown';
}

/**
 * Get one of types `TYPES.FRAGMENT`, `TYPES.NODE`, `text/html`, `text/rtf` or
 * `text/plain` from transfers's `data` if possible, otherwise return null.
 *
 * @param {Object} transfer
 * @param {String} type
 * @return {String}
 */

function getType(transfer, type) {
  if (!transfer.types || !transfer.types.length) {
    // COMPAT: In IE 11, there is no `types` field but `getData('Text')`
    // is supported`. (2017/06/23)
    return type == TEXT$1 ? transfer.getData('Text') || null : null;
  }

  // COMPAT: In Edge, transfer.types doesn't respond to `indexOf`. (2017/10/25)
  var types = Array.from(transfer.types);

  return types.indexOf(type) !== -1 ? transfer.getData(type) || null : null;
}

/**
 * The default plain text transfer type.
 *
 * @type {String}
 */

var TEXT$2 = TRANSFER_TYPES.TEXT;

/**
 * Set data with `type` and `content` on an `event`.
 *
 * COMPAT: In Edge, custom types throw errors, so embed all non-standard
 * types in text/plain compound object. (2017/7/12)
 *
 * @param {Event} event
 * @param {String} type
 * @param {String} content
 */

function setEventTransfer(event, type, content) {
  var mime = TRANSFER_TYPES[type.toUpperCase()];

  if (!mime) {
    throw new Error('Cannot set unknown transfer type "' + mime + '".');
  }

  if (event.nativeEvent) {
    event = event.nativeEvent;
  }

  var transfer = event.dataTransfer || event.clipboardData;

  try {
    transfer.setData(mime, content);
    // COMPAT: Safari needs to have the 'text' (and not 'text/plain') value in dataTransfer
    // to display the cursor while dragging internally.
    transfer.setData('text', transfer.getData('text'));
  } catch (err) {
    var prefix = 'SLATE-DATA-EMBED::';
    var text = transfer.getData(TEXT$2);
    var obj = {};

    // If the existing plain text data is prefixed, it's Slate JSON data.
    if (text.substring(0, prefix.length) === prefix) {
      try {
        obj = JSON.parse(text.substring(prefix.length));
      } catch (e) {
        throw new Error('Failed to parse Slate data from `DataTransfer` object.');
      }
    } else {
      // Otherwise, it's just set it as is.
      obj[TEXT$2] = text;
    }

    obj[mime] = content;
    var string = '' + prefix + JSON.stringify(obj);
    transfer.setData(TEXT$2, string);
  }
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug$5 = Debug('slate:after');

/**
 * The after plugin.
 *
 * @return {Object}
 */

function AfterPlugin() {
  var isDraggingInternally = null;

  /**
   * On before input.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onBeforeInput(event, change, editor) {
    debug$5('onBeforeInput', { event: event });

    var isSynthetic = !!event.nativeEvent;

    // If the event is synthetic, it's React's polyfill of `beforeinput` that
    // isn't a true `beforeinput` event with meaningful information. It only
    // gets triggered for character insertions, so we can just insert directly.
    if (isSynthetic) {
      event.preventDefault();
      change.insertText(event.data);
      return;
    }

    // Otherwise, we can use the information in the `beforeinput` event to
    // figure out the exact change that will occur, and prevent it.

    var _event$getTargetRange = event.getTargetRanges(),
        _event$getTargetRange2 = slicedToArray(_event$getTargetRange, 1),
        targetRange = _event$getTargetRange2[0];

    if (!targetRange) return;

    event.preventDefault();

    var value = change.value;
    var document = value.document,
        selection = value.selection,
        schema = value.schema;

    var range = findRange(targetRange, value);

    switch (event.inputType) {
      case 'deleteByDrag':
      case 'deleteByCut':
      case 'deleteContent':
      case 'deleteContentBackward':
      case 'deleteContentForward':
        {
          change.deleteAtRange(range);
          return;
        }

      case 'deleteWordBackward':
        {
          change.deleteWordBackwardAtRange(range);
          return;
        }

      case 'deleteWordForward':
        {
          change.deleteWordForwardAtRange(range);
          return;
        }

      case 'deleteSoftLineBackward':
      case 'deleteHardLineBackward':
        {
          change.deleteLineBackwardAtRange(range);
          return;
        }

      case 'deleteSoftLineForward':
      case 'deleteHardLineForward':
        {
          change.deleteLineForwardAtRange(range);
          return;
        }

      case 'insertLineBreak':
      case 'insertParagraph':
        {
          var hasVoidParent = document.hasVoidParent(selection.start.path, schema);

          if (hasVoidParent) {
            change.moveToStartOfNextText();
          } else {
            change.splitBlockAtRange(range);
          }

          return;
        }

      case 'insertFromYank':
      case 'insertReplacementText':
      case 'insertText':
        {
          // COMPAT: `data` should have the text for the `insertText` input type
          // and `dataTransfer` should have the text for the
          // `insertReplacementText` input type, but Safari uses `insertText` for
          // spell check replacements and sets `data` to `null`. (2018/08/09)
          var text = event.data == null ? event.dataTransfer.getData('text/plain') : event.data;

          if (text == null) return;

          change.insertTextAtRange(range, text, selection.marks);

          // If the text was successfully inserted, and the selection had marks
          // on it, unset the selection's marks.
          if (selection.marks && value.document != change.value.document) {
            change.select({ marks: null });
          }

          return;
        }
    }
  }

  /**
   * On blur.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onBlur(event, change, editor) {
    debug$5('onBlur', { event: event });

    change.blur();
  }

  /**
   * On click.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onClick(event, change, editor) {
    if (editor.props.readOnly) return true;

    var value = change.value;
    var document = value.document,
        schema = value.schema;

    var node = findNode(event.target, value);
    var ancestors = document.getAncestors(node.key);
    var isVoid = node && (schema.isVoid(node) || ancestors.some(function (a) {
      return schema.isVoid(a);
    }));

    if (isVoid) {
      // COMPAT: In Chrome & Safari, selections that are at the zero offset of
      // an inline node will be automatically replaced to be at the last offset
      // of a previous inline node, which screws us up, so we always want to set
      // it to the end of the node. (2016/11/29)
      change.focus().moveToEndOfNode(node);
    }

    debug$5('onClick', { event: event });
  }

  /**
   * On copy.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onCopy(event, change, editor) {
    debug$5('onCopy', { event: event });

    cloneFragment(event, change.value);
  }

  /**
   * On cut.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onCut(event, change, editor) {
    debug$5('onCut', { event: event });

    // Once the fake cut content has successfully been added to the clipboard,
    // delete the content in the current selection.
    cloneFragment(event, change.value, change.value.fragment, function () {
      // If user cuts a void block node or a void inline node,
      // manually removes it since selection is collapsed in this case.
      var value = change.value;
      var endBlock = value.endBlock,
          endInline = value.endInline,
          selection = value.selection,
          schema = value.schema;
      var isCollapsed = selection.isCollapsed;

      var isVoidBlock = endBlock && schema.isVoid(endBlock) && isCollapsed;
      var isVoidInline = endInline && schema.isVoid(endInline) && isCollapsed;

      if (isVoidBlock) {
        editor.change(function (c) {
          return c.removeNodeByKey(endBlock.key);
        });
      } else if (isVoidInline) {
        editor.change(function (c) {
          return c.removeNodeByKey(endInline.key);
        });
      } else {
        editor.change(function (c) {
          return c.delete();
        });
      }
    });
  }

  /**
   * On drag end.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragEnd(event, change, editor) {
    debug$5('onDragEnd', { event: event });

    isDraggingInternally = null;
  }

  /**
   * On drag over.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragOver(event, change, editor) {
    debug$5('onDragOver', { event: event });
  }

  /**
   * On drag start.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragStart(event, change, editor) {
    debug$5('onDragStart', { event: event });

    isDraggingInternally = true;

    var value = change.value;
    var document = value.document,
        schema = value.schema;

    var node = findNode(event.target, value);
    var ancestors = document.getAncestors(node.key);
    var isVoid = node && (schema.isVoid(node) || ancestors.some(function (a) {
      return schema.isVoid(a);
    }));
    var selectionIncludesNode = value.blocks.some(function (block) {
      return block.key === node.key;
    });

    // If a void block is dragged and is not selected, select it (necessary for local drags).
    if (isVoid && !selectionIncludesNode) {
      change.moveToRangeOfNode(node);
    }

    var fragment = change.value.fragment;
    var encoded = Base64.serializeNode(fragment);
    setEventTransfer(event, 'fragment', encoded);
  }

  /**
   * On drop.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDrop(event, change, editor) {
    debug$5('onDrop', { event: event });

    var value = change.value;
    var document = value.document,
        selection = value.selection,
        schema = value.schema;

    var window = getWindow(event.target);
    var target = getEventRange(event, value);
    if (!target) return;

    var transfer = getEventTransfer(event);
    var type = transfer.type,
        fragment = transfer.fragment,
        text = transfer.text;


    change.focus();

    // If the drag is internal and the target is after the selection, it
    // needs to account for the selection's content being deleted.
    if (isDraggingInternally && selection.end.key == target.end.key && selection.end.offset < target.end.offset) {
      target = target.moveForward(selection.start.key == selection.end.key ? 0 - selection.end.offset + selection.start.offset : 0 - selection.end.offset);
    }

    if (isDraggingInternally) {
      change.delete();
    }

    change.select(target);

    if (type == 'text' || type == 'html') {
      var _target = target,
          anchor = _target.anchor;

      var hasVoidParent = document.hasVoidParent(anchor.key, schema);

      if (hasVoidParent) {
        var n = document.getNode(anchor.key);

        while (hasVoidParent) {
          n = document.getNextText(n.key);
          if (!n) break;
          hasVoidParent = document.hasVoidParent(n.key, schema);
        }

        if (n) change.moveToStartOfNode(n);
      }

      if (text) {
        text.split('\n').forEach(function (line, i) {
          if (i > 0) change.splitBlock();
          change.insertText(line);
        });
      }
    }

    if (type == 'fragment') {
      change.insertFragment(fragment);
    }

    // COMPAT: React's onSelect event breaks after an onDrop event
    // has fired in a node: https://github.com/facebook/react/issues/11379.
    // Until this is fixed in React, we dispatch a mouseup event on that
    // DOM node, since that will make it go back to normal.
    var focusNode = document.getNode(target.focus.key);
    var el = findDOMNode$1(focusNode, window);
    if (!el) return;

    el.dispatchEvent(new MouseEvent('mouseup', {
      view: window,
      bubbles: true,
      cancelable: true
    }));
  }

  /**
   * On input.
   *
   * @param {Event} eventvent
   * @param {Change} change
   */

  function onInput(event, change, editor) {
    debug$5('onInput', { event: event });

    var window = getWindow(event.target);
    var value = change.value;

    // Get the selection point.

    var native = window.getSelection();
    var anchorNode = native.anchorNode;

    var point = findPoint(anchorNode, 0, value);
    if (!point) return;

    // Get the text node and leaf in question.
    var document = value.document,
        selection = value.selection;

    var node = document.getDescendant(point.key);
    var block = document.getClosestBlock(node.key);
    var leaves = node.getLeaves();
    var lastText = block.getLastText();
    var lastLeaf = leaves.last();
    var start = 0;
    var end = 0;

    var leaf = leaves.find(function (r) {
      start = end;
      end += r.text.length;
      if (end > point.offset) return true;
    }) || lastLeaf;

    // Get the text information.
    var text = leaf.text;
    var textContent = anchorNode.textContent;

    var isLastText = node == lastText;
    var isLastLeaf = leaf == lastLeaf;
    var lastChar = textContent.charAt(textContent.length - 1);

    // COMPAT: If this is the last leaf, and the DOM text ends in a new line,
    // we will have added another new line in <Leaf>'s render method to account
    // for browsers collapsing a single trailing new lines, so remove it.
    if (isLastText && isLastLeaf && lastChar == '\n') {
      textContent = textContent.slice(0, -1);
    }

    // If the text is no different, abort.
    if (textContent == text) return;

    // Determine what the selection should be after changing the text.
    var delta = textContent.length - text.length;
    var corrected = selection.moveToEnd().moveForward(delta);
    var entire = selection.moveAnchorTo(point.key, start).moveFocusTo(point.key, end);

    entire = document.resolveRange(entire);

    // Change the current value to have the leaf's text replaced.
    change.insertTextAtRange(entire, textContent, leaf.marks).select(corrected);
  }

  /**
   * On key down.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onKeyDown(event, change, editor) {
    debug$5('onKeyDown', { event: event });

    var value = change.value;
    var document = value.document,
        selection = value.selection,
        schema = value.schema;

    var hasVoidParent = document.hasVoidParent(selection.start.path, schema);

    // COMPAT: In iOS, some of these hotkeys are handled in the
    // `onNativeBeforeInput` handler of the `<Content>` component in order to
    // preserve native autocorrect behavior, so they shouldn't be handled here.
    if (Hotkeys.isSplitBlock(event) && !IS_IOS) {
      return hasVoidParent ? change.moveToStartOfNextText() : change.splitBlock();
    }

    if (Hotkeys.isDeleteBackward(event) && !IS_IOS) {
      return change.deleteCharBackward();
    }

    if (Hotkeys.isDeleteForward(event) && !IS_IOS) {
      return change.deleteCharForward();
    }

    if (Hotkeys.isDeleteLineBackward(event)) {
      return change.deleteLineBackward();
    }

    if (Hotkeys.isDeleteLineForward(event)) {
      return change.deleteLineForward();
    }

    if (Hotkeys.isDeleteWordBackward(event)) {
      return change.deleteWordBackward();
    }

    if (Hotkeys.isDeleteWordForward(event)) {
      return change.deleteWordForward();
    }

    if (Hotkeys.isRedo(event)) {
      return change.redo();
    }

    if (Hotkeys.isUndo(event)) {
      return change.undo();
    }

    // COMPAT: Certain browsers don't handle the selection updates properly. In
    // Chrome, the selection isn't properly extended. And in Firefox, the
    // selection isn't properly collapsed. (2017/10/17)
    if (Hotkeys.isMoveLineBackward(event)) {
      event.preventDefault();
      return change.moveToStartOfBlock();
    }

    if (Hotkeys.isMoveLineForward(event)) {
      event.preventDefault();
      return change.moveToEndOfBlock();
    }

    if (Hotkeys.isExtendLineBackward(event)) {
      event.preventDefault();
      return change.moveFocusToStartOfBlock();
    }

    if (Hotkeys.isExtendLineForward(event)) {
      event.preventDefault();
      return change.moveFocusToEndOfBlock();
    }

    // COMPAT: If a void node is selected, or a zero-width text node adjacent to
    // an inline is selected, we need to handle these hotkeys manually because
    // browsers won't know what to do.
    if (Hotkeys.isMoveBackward(event)) {
      var previousText = value.previousText,
          startText = value.startText;

      var isPreviousInVoid = previousText && document.hasVoidParent(previousText.key, schema);

      if (hasVoidParent || isPreviousInVoid || startText.text == '') {
        event.preventDefault();
        return change.moveBackward();
      }
    }

    if (Hotkeys.isMoveForward(event)) {
      var nextText = value.nextText,
          _startText = value.startText;

      var isNextInVoid = nextText && document.hasVoidParent(nextText.key, schema);

      if (hasVoidParent || isNextInVoid || _startText.text == '') {
        event.preventDefault();
        return change.moveForward();
      }
    }

    if (Hotkeys.isExtendBackward(event)) {
      var _previousText = value.previousText,
          _startText2 = value.startText;

      var _isPreviousInVoid = _previousText && document.hasVoidParent(_previousText.key, schema);

      if (hasVoidParent || _isPreviousInVoid || _startText2.text == '') {
        event.preventDefault();
        return change.moveFocusBackward();
      }
    }

    if (Hotkeys.isExtendForward(event)) {
      var _nextText = value.nextText,
          _startText3 = value.startText;

      var _isNextInVoid = _nextText && document.hasVoidParent(_nextText.key, schema);

      if (hasVoidParent || _isNextInVoid || _startText3.text == '') {
        event.preventDefault();
        return change.moveFocusForward();
      }
    }
  }

  /**
   * On paste.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onPaste(event, change, editor) {
    debug$5('onPaste', { event: event });

    var transfer = getEventTransfer(event);
    var type = transfer.type,
        fragment = transfer.fragment,
        text = transfer.text;


    if (type == 'fragment') {
      change.insertFragment(fragment);
    }

    if (type == 'text' || type == 'html') {
      if (!text) return;
      var value = change.value;
      var document = value.document,
          selection = value.selection,
          startBlock = value.startBlock,
          schema = value.schema;

      if (schema.isVoid(startBlock)) return;

      var defaultBlock = startBlock;
      var defaultMarks = document.getInsertMarksAtRange(selection);
      var frag = Plain.deserialize(text, { defaultBlock: defaultBlock, defaultMarks: defaultMarks }).document;
      change.insertFragment(frag);
    }
  }

  /**
   * On select.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onSelect(event, change, editor) {
    debug$5('onSelect', { event: event });

    var window = getWindow(event.target);
    var value = change.value;
    var document = value.document,
        schema = value.schema;

    var native = window.getSelection();

    // If there are no ranges, the editor was blurred natively.
    if (!native.rangeCount) {
      change.blur();
      return;
    }

    // Otherwise, determine the Slate selection from the native one.
    var range = findRange(native, value);
    if (!range) return;

    var _range = range,
        anchor = _range.anchor,
        focus = _range.focus;

    var anchorText = document.getNode(anchor.key);
    var focusText = document.getNode(focus.key);
    var anchorInline = document.getClosestInline(anchor.key);
    var focusInline = document.getClosestInline(focus.key);
    var focusBlock = document.getClosestBlock(focus.key);
    var anchorBlock = document.getClosestBlock(anchor.key);

    // COMPAT: If the anchor point is at the start of a non-void, and the
    // focus point is inside a void node with an offset that isn't `0`, set
    // the focus offset to `0`. This is due to void nodes <span>'s being
    // positioned off screen, resulting in the offset always being greater
    // than `0`. Since we can't know what it really should be, and since an
    // offset of `0` is less destructive because it creates a hanging
    // selection, go with `0`. (2017/09/07)
    if (anchorBlock && !schema.isVoid(anchorBlock) && anchor.offset == 0 && focusBlock && schema.isVoid(focusBlock) && focus.offset != 0) {
      range = range.setFocus(focus.setOffset(0));
    }

    // COMPAT: If the selection is at the end of a non-void inline node, and
    // there is a node after it, put it in the node after instead. This
    // standardizes the behavior, since it's indistinguishable to the user.
    if (anchorInline && !schema.isVoid(anchorInline) && anchor.offset == anchorText.text.length) {
      var block = document.getClosestBlock(anchor.key);
      var next = block.getNextText(anchor.key);
      if (next) range = range.moveAnchorTo(next.key, 0);
    }

    if (focusInline && !schema.isVoid(focusInline) && focus.offset == focusText.text.length) {
      var _block = document.getClosestBlock(focus.key);
      var _next = _block.getNextText(focus.key);
      if (_next) range = range.moveFocusTo(_next.key, 0);
    }

    var selection = document.createSelection(range);
    selection = selection.setIsFocused(true);

    // Preserve active marks from the current selection.
    // They will be cleared by `change.select` if the selection actually moved.
    selection = selection.set('marks', value.selection.marks);

    change.select(selection);
  }

  /**
   * Render editor.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @return {Object}
   */

  function renderEditor(props, editor) {
    var handlers = editor.handlers;

    return React.createElement(Content, _extends({}, handlers, {
      autoCorrect: props.autoCorrect,
      className: props.className,
      editor: editor,
      readOnly: props.readOnly,
      role: props.role,
      spellCheck: props.spellCheck,
      style: props.style,
      tabIndex: props.tabIndex,
      tagName: props.tagName
    }));
  }

  /**
   * Render node.
   *
   * @param {Object} props
   * @return {Element}
   */

  function renderNode(props) {
    var attributes = props.attributes,
        children = props.children,
        node = props.node;

    if (node.object != 'block' && node.object != 'inline') return;
    var Tag = node.object == 'block' ? 'div' : 'span';
    var style = { position: 'relative' };
    return React.createElement(
      Tag,
      _extends({}, attributes, { style: style }),
      children
    );
  }

  /**
   * Render placeholder.
   *
   * @param {Object} props
   * @return {Element}
   */

  function renderPlaceholder(props) {
    var editor = props.editor,
        node = props.node;

    if (!editor.props.placeholder) return;
    if (editor.state.isComposing) return;
    if (node.object != 'block') return;
    if (!Text.isTextList(node.nodes)) return;
    if (node.text != '') return;
    if (editor.value.document.getBlocks().size > 1) return;

    var style = {
      pointerEvents: 'none',
      display: 'inline-block',
      width: '0',
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      opacity: '0.333'
    };

    return React.createElement(
      'span',
      { contentEditable: false, style: style },
      editor.props.placeholder
    );
  }

  /**
   * Return the plugin.
   *
   * @type {Object}
   */

  return {
    onBeforeInput: onBeforeInput,
    onBlur: onBlur,
    onClick: onClick,
    onCopy: onCopy,
    onCut: onCut,
    onDragEnd: onDragEnd,
    onDragOver: onDragOver,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onInput: onInput,
    onKeyDown: onKeyDown,
    onPaste: onPaste,
    onSelect: onSelect,
    renderEditor: renderEditor,
    renderNode: renderNode,
    renderPlaceholder: renderPlaceholder
  };
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug$6 = Debug('slate:before');

/**
 * The core before plugin.
 *
 * @return {Object}
 */

function BeforePlugin() {
  var activeElement = null;
  var compositionCount = 0;
  var isComposing = false;
  var isCopying = false;
  var isDragging = false;

  /**
   * On before input.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onBeforeInput(event, change, editor) {
    if (editor.props.readOnly) return true;

    var isSynthetic = !!event.nativeEvent;

    // COMPAT: If the browser supports Input Events Level 2, we will have
    // attached a custom handler for the real `beforeinput` events, instead of
    // allowing React's synthetic polyfill, so we need to ignore synthetics.
    if (isSynthetic && HAS_INPUT_EVENTS_LEVEL_2) return true;

    debug$6('onBeforeInput', { event: event });
  }

  /**
   * On blur.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onBlur(event, change, editor) {
    if (isCopying) return true;
    if (editor.props.readOnly) return true;

    var value = change.value;
    var schema = value.schema;
    var relatedTarget = event.relatedTarget,
        target = event.target;

    var window = getWindow(target);

    // COMPAT: If the current `activeElement` is still the previous one, this is
    // due to the window being blurred when the tab itself becomes unfocused, so
    // we want to abort early to allow to editor to stay focused when the tab
    // becomes focused again.
    if (activeElement == window.document.activeElement) return true;

    // COMPAT: The `relatedTarget` can be null when the new focus target is not
    // a "focusable" element (eg. a `<div>` without `tabindex` set).
    if (relatedTarget) {
      var el = findDOMNode(editor);

      // COMPAT: The event should be ignored if the focus is returning to the
      // editor from an embedded editable element (eg. an <input> element inside
      // a void node).
      if (relatedTarget == el) return true;

      // COMPAT: The event should be ignored if the focus is moving from the
      // editor to inside a void node's spacer element.
      if (relatedTarget.hasAttribute('data-slate-spacer')) return true;

      // COMPAT: The event should be ignored if the focus is moving to a non-
      // editable section of an element that isn't a void node (eg. a list item
      // of the check list example).
      var node = findNode(relatedTarget, value);
      if (el.contains(relatedTarget) && node && !schema.isVoid(node)) return true;
    }

    debug$6('onBlur', { event: event });
  }

  /**
   * On change.
   *
   * @param {Change} change
   * @param {Editor} editor
   */

  function onChange(change, editor) {
    var value = change.value;

    // If the value's schema isn't the editor's schema, update it. This can
    // happen on the initialization of the editor, or if the schema changes.
    // This change isn't save into history since only schema is updated.

    if (value.schema != editor.schema) {
      change.withoutSaving(function () {
        change.setValue({ schema: editor.schema }).normalize();
      });
    }

    debug$6('onChange');
  }

  /**
   * On composition end.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onCompositionEnd(event, change, editor) {
    var n = compositionCount;

    // The `count` check here ensures that if another composition starts
    // before the timeout has closed out this one, we will abort unsetting the
    // `isComposing` flag, since a composition is still in affect.
    window.requestAnimationFrame(function () {
      if (compositionCount > n) return;
      isComposing = false;

      // HACK: we need to re-render the editor here so that it will update its
      // placeholder in case one is currently rendered. This should be handled
      // differently ideally, in a less invasive way?
      // (apply force re-render if isComposing changes)
      if (editor.state.isComposing) {
        editor.setState({ isComposing: false });
      }
    });

    debug$6('onCompositionEnd', { event: event });
  }

  /**
   * On composition start.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onCompositionStart(event, change, editor) {
    isComposing = true;
    compositionCount++;

    // HACK: we need to re-render the editor here so that it will update its
    // placeholder in case one is currently rendered. This should be handled
    // differently ideally, in a less invasive way?
    // (apply force re-render if isComposing changes)
    if (!editor.state.isComposing) {
      editor.setState({ isComposing: true });
    }

    debug$6('onCompositionStart', { event: event });
  }

  /**
   * On copy.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onCopy(event, change, editor) {
    var window = getWindow(event.target);
    isCopying = true;
    window.requestAnimationFrame(function () {
      return isCopying = false;
    });

    debug$6('onCopy', { event: event });
  }

  /**
   * On cut.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onCut(event, change, editor) {
    if (editor.props.readOnly) return true;

    var window = getWindow(event.target);
    isCopying = true;
    window.requestAnimationFrame(function () {
      return isCopying = false;
    });

    debug$6('onCut', { event: event });
  }

  /**
   * On drag end.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragEnd(event, change, editor) {
    isDragging = false;

    debug$6('onDragEnd', { event: event });
  }

  /**
   * On drag enter.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragEnter(event, change, editor) {
    debug$6('onDragEnter', { event: event });
  }

  /**
   * On drag exit.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragExit(event, change, editor) {
    debug$6('onDragExit', { event: event });
  }

  /**
   * On drag leave.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragLeave(event, change, editor) {
    debug$6('onDragLeave', { event: event });
  }

  /**
   * On drag over.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragOver(event, change, editor) {
    // If the target is inside a void node, and only in this case,
    // call `preventDefault` to signal that drops are allowed.
    // When the target is editable, dropping is already allowed by
    // default, and calling `preventDefault` hides the cursor.
    var value = editor.value;
    var schema = value.schema;

    var node = findNode(event.target, editor.value);
    if (schema.isVoid(node)) event.preventDefault();

    // COMPAT: IE won't call onDrop on contentEditables unless the
    // default dragOver is prevented:
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/913982/
    // (2018/07/11)
    if (IS_IE) event.preventDefault();

    // If a drag is already in progress, don't do this again.
    if (!isDragging) {
      isDragging = true;

      // COMPAT: IE will raise an `unspecified error` if dropEffect is
      // set. (2018/07/11)
      if (!IS_IE) {
        event.nativeEvent.dataTransfer.dropEffect = 'move';
      }
    }

    debug$6('onDragOver', { event: event });
  }

  /**
   * On drag start.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragStart(event, change, editor) {
    isDragging = true;

    debug$6('onDragStart', { event: event });
  }

  /**
   * On drop.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDrop(event, change, editor) {
    // Nothing happens in read-only mode.
    if (editor.props.readOnly) return true;

    // Prevent default so the DOM's value isn't corrupted.
    event.preventDefault();

    debug$6('onDrop', { event: event });
  }

  /**
   * On focus.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onFocus(event, change, editor) {
    if (isCopying) return true;
    if (editor.props.readOnly) return true;

    var el = findDOMNode(editor);

    // Save the new `activeElement`.
    var window = getWindow(event.target);
    activeElement = window.document.activeElement;

    // COMPAT: If the editor has nested editable elements, the focus can go to
    // those elements. In Firefox, this must be prevented because it results in
    // issues with keyboard navigation. (2017/03/30)
    if (IS_FIREFOX && event.target != el) {
      el.focus();
      return true;
    }

    debug$6('onFocus', { event: event });
  }

  /**
   * On input.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onInput(event, change, editor) {
    if (isComposing) return true;
    if (change.value.selection.isBlurred) return true;

    debug$6('onInput', { event: event });
  }

  /**
   * On key down.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onKeyDown(event, change, editor) {
    if (editor.props.readOnly) return true;

    // When composing, we need to prevent all hotkeys from executing while
    // typing. However, certain characters also move the selection before
    // we're able to handle it, so prevent their default behavior.
    if (isComposing) {
      if (Hotkeys.isCompose(event)) event.preventDefault();
      return true;
    }

    // Certain hotkeys have native editing behaviors in `contenteditable`
    // elements which will change the DOM and cause our value to be out of sync,
    // so they need to always be prevented.
    if (!IS_IOS && (Hotkeys.isBold(event) || Hotkeys.isDeleteBackward(event) || Hotkeys.isDeleteForward(event) || Hotkeys.isDeleteLineBackward(event) || Hotkeys.isDeleteLineForward(event) || Hotkeys.isDeleteWordBackward(event) || Hotkeys.isDeleteWordForward(event) || Hotkeys.isItalic(event) || Hotkeys.isRedo(event) || Hotkeys.isSplitBlock(event) || Hotkeys.isTransposeCharacter(event) || Hotkeys.isUndo(event))) {
      event.preventDefault();
    }

    debug$6('onKeyDown', { event: event });
  }

  /**
   * On paste.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onPaste(event, change, editor) {
    if (editor.props.readOnly) return true;

    // Prevent defaults so the DOM state isn't corrupted.
    event.preventDefault();

    debug$6('onPaste', { event: event });
  }

  /**
   * On select.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onSelect(event, change, editor) {
    if (isCopying) return true;
    if (isComposing) return true;
    if (editor.props.readOnly) return true;

    // Save the new `activeElement`.
    var window = getWindow(event.target);
    activeElement = window.document.activeElement;

    debug$6('onSelect', { event: event });
  }

  /**
   * Return the plugin.
   *
   * @type {Object}
   */

  return {
    onBeforeInput: onBeforeInput,
    onBlur: onBlur,
    onChange: onChange,
    onCompositionEnd: onCompositionEnd,
    onCompositionStart: onCompositionStart,
    onCopy: onCopy,
    onCut: onCut,
    onDragEnd: onDragEnd,
    onDragEnter: onDragEnter,
    onDragExit: onDragExit,
    onDragLeave: onDragLeave,
    onDragOver: onDragOver,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onFocus: onFocus,
    onInput: onInput,
    onKeyDown: onKeyDown,
    onPaste: onPaste,
    onSelect: onSelect
  };
}

/**
 * Noop.
 *
 * @return {Void}
 */

function noop() {}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug$7 = Debug('slate:editor');

/**
 * Editor.
 *
 * @type {Component}
 */

var Editor = function (_React$Component) {
  inherits(Editor, _React$Component);

  function Editor() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Editor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Editor.__proto__ || Object.getPrototypeOf(Editor)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps$4.call(_this), _temp), possibleConstructorReturn(_this, _ret);
  }
  /**
   * Property types.
   *
   * @type {Object}
   */

  /**
   * Default properties.
   *
   * @type {Object}
   */

  /**
   * Initial state.
   *
   * @type {Object}
   */

  /**
   * Temporary values.
   *
   * @type {Object}
   */

  /**
   * Create a set of bound event handlers.
   *
   * @type {Object}
   */

  createClass(Editor, [{
    key: 'componentDidMount',


    /**
     * When the component first mounts, flush any temporary changes, and then,
     * focus the editor if `autoFocus` is set.
     */

    value: function componentDidMount() {
      this.tmp.updates++;

      var autoFocus = this.props.autoFocus;
      var change = this.tmp.change;


      if (autoFocus) {
        if (change) {
          change.focus();
        } else {
          this.focus();
        }
      }

      if (change) {
        this.onChange(change);
      }
    }

    /**
     * When the component updates, flush any temporary change.
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.tmp.updates++;

      var _tmp = this.tmp,
          change = _tmp.change,
          resolves = _tmp.resolves,
          updates = _tmp.updates;

      // If we've resolved a few times already, and it's exactly in line with
      // the updates, then warn the user that they may be doing something wrong.

      warning(resolves < 5 || resolves !== updates, 'A Slate <Editor> component is re-resolving `props.plugins` or `props.schema` on each update, which leads to poor performance. This is often due to passing in a new `schema` or `plugins` prop with each render by declaring them inline in your render function. Do not do this!');

      if (change) {
        this.onChange(change);
      }
    }

    /**
     * Render the editor.
     *
     * @return {Element}
     */

  }, {
    key: 'render',
    value: function render() {
      debug$7('render', this);
      var props = _extends({}, this.props);
      var tree = this.stack.render('renderEditor', props, this);
      return tree;
    }

    /**
     * Get the editor's current plugins.
     *
     * @return {Array}
     */

  }, {
    key: 'plugins',
    get: function get$$1() {
      var plugins = this.resolvePlugins(this.props.plugins, this.props.schema);
      return plugins;
    }

    /**
     * Get the editor's current schema.
     *
     * @return {Schema}
     */

  }, {
    key: 'schema',
    get: function get$$1() {
      var schema = this.resolveSchema(this.plugins);
      return schema;
    }

    /**
     * Get the editor's current stack.
     *
     * @return {Stack}
     */

  }, {
    key: 'stack',
    get: function get$$1() {
      var stack = this.resolveStack(this.plugins);
      return stack;
    }

    /**
     * Get the editor's current value.
     *
     * @return {Value}
     */

  }, {
    key: 'value',
    get: function get$$1() {
      // If the current `plugins` and `value` are the same as the last seen ones
      // that were saved in `tmp`, don't re-resolve because that will trigger
      // extra `onChange` runs.
      if (this.plugins === this.tmp.plugins && this.props.value === this.tmp.value) {
        return this.tmp.value;
      }

      var value = this.resolveValue(this.plugins, this.props.value);
      return value;
    }

    /**
     * Perform a change on the editor, passing `...args` to `change.call`.
     *
     * @param {Mixed} ...args
     */

    /**
     * Programmatically blur the editor.
     */

    /**
     * Programmatically focus the editor.
     */

    /**
     * On change.
     *
     * @param {Change} change
     */

    /**
     * On event.
     *
     * @param {String} handler
     * @param {Event} event
     */

    /**
     * Resolve a change from the current `plugins`, a potential `change` and its
     * current operations `size`.
     *
     * @param {Array} plugins
     * @param {Change} change
     * @param {Number} size
     */

    /**
     * Resolve a set of plugins from potential `plugins` and a `schema`.
     *
     * In addition to the plugins provided in props, this will initialize three
     * other plugins:
     *
     * - The top-level editor plugin, which allows for top-level handlers, etc.
     * - The two "core" plugins, one before all the other and one after.
     *
     * @param {Array|Void} plugins
     * @param {Schema|Object|Void} schema
     * @return {Array}
     */

    /**
     * Resolve a schema from the current `plugins`.
     *
     * @param {Array} plugins
     * @return {Schema}
     */

    /**
     * Resolve a stack from the current `plugins`.
     *
     * @param {Array} plugins
     * @return {Stack}
     */

    /**
     * Resolve a value from the current `plugins` and a potential `value`.
     *
     * @param {Array} plugins
     * @param {Value} value
     * @return {Change}
     */

  }]);
  return Editor;
}(React.Component);

/**
 * Mix in the prop types for the event handlers.
 */

Editor.propTypes = {
  autoCorrect: Types.bool,
  autoFocus: Types.bool,
  className: Types.string,
  onChange: Types.func,
  placeholder: Types.any,
  plugins: Types.array,
  readOnly: Types.bool,
  role: Types.string,
  schema: Types.object,
  spellCheck: Types.bool,
  style: Types.object,
  tabIndex: Types.number,
  value: SlateTypes.value.isRequired };
Editor.defaultProps = {
  autoFocus: false,
  autoCorrect: true,
  onChange: noop,
  plugins: [],
  readOnly: false,
  schema: {},
  spellCheck: true };

var _initialiseProps$4 = function _initialiseProps() {
  var _this2 = this;

  this.state = {};
  this.tmp = {
    change: null,
    isChanging: false,
    operationsSize: null,
    plugins: null,
    resolves: 0,
    updates: 0,
    value: null };
  this.handlers = EVENT_HANDLERS.reduce(function (obj, handler) {
    obj[handler] = function (event) {
      return _this2.onEvent(handler, event);
    };
    return obj;
  }, {});

  this.change = function () {
    if (_this2.tmp.isChanging) {
      warning(false, "The `editor.change` method was called from within an existing `editor.change` callback. This is not allowed, and often due to calling `editor.change` directly from a plugin's event handler which is unnecessary.");

      return;
    }

    var change = _this2.value.change();

    try {
      _this2.tmp.isChanging = true;
      change.call.apply(change, arguments);
    } catch (error) {
      throw error;
    } finally {
      _this2.tmp.isChanging = false;
    }

    _this2.onChange(change);
  };

  this.blur = function () {
    _this2.change(function (c) {
      return c.blur();
    });
  };

  this.focus = function () {
    _this2.change(function (c) {
      return c.focus();
    });
  };

  this.onChange = function (change) {
    // If the change doesn't define any operations to apply, abort.
    if (change.operations.size === 0) {
      return;
    }

    debug$7('onChange', { change: change });
    change = _this2.resolveChange(_this2.plugins, change, change.operations.size);

    // Store a reference to the last `value` and `plugins` that were seen by the
    // editor, so we can know whether to normalize a new unknown value if one
    // is passed in via `this.props`.
    _this2.tmp.value = change.value;
    _this2.tmp.plugins = _this2.plugins;

    // Remove the temporary `change`, since it's being flushed.
    delete _this2.tmp.change;
    delete _this2.tmp.operationsSize;

    _this2.props.onChange(change);
  };

  this.onEvent = function (handler, event) {
    _this2.change(function (change) {
      _this2.stack.run(handler, event, change, _this2);
    });
  };

  this.resolveChange = memoizeOne(function (plugins, change, size) {
    var stack = _this2.resolveStack(plugins);
    stack.run('onChange', change, _this2);
    return change;
  });
  this.resolvePlugins = memoizeOne(function () {
    var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    debug$7('resolvePlugins', { plugins: plugins, schema: schema });
    _this2.tmp.resolves++;

    var beforePlugin = BeforePlugin();
    var afterPlugin = AfterPlugin();
    var editorPlugin = { schema: schema };

    var _loop = function _loop(_prop) {
      // Skip `onChange` because the editor's `onChange` is special.
      if (_prop == 'onChange') return 'continue';

      // Skip `schema` because it can't be proxied easily, so it must be passed
      // in as an argument to this function instead.
      if (_prop == 'schema') return 'continue';

      // Define a function that will just proxies into `props`.
      editorPlugin[_prop] = function () {
        var _props;

        return _this2.props[_prop] && (_props = _this2.props)[_prop].apply(_props, arguments);
      };
    };

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = PLUGIN_PROPS[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _prop = _step2.value;

        var _ret2 = _loop(_prop);

        if (_ret2 === 'continue') continue;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return [beforePlugin, editorPlugin].concat(toConsumableArray(plugins), [afterPlugin]);
  });
  this.resolveSchema = memoizeOne(function (plugins) {
    debug$7('resolveSchema', { plugins: plugins });
    var schema = Schema.create({ plugins: plugins });
    return schema;
  });
  this.resolveStack = memoizeOne(function (plugins) {
    debug$7('resolveStack', { plugins: plugins });
    var stack = Stack.create({ plugins: plugins });
    return stack;
  });
  this.resolveValue = memoizeOne(function (plugins, value) {
    debug$7('resolveValue', { plugins: plugins, value: value });
    var change = value.change();
    change = _this2.resolveChange(plugins, change, change.operations.size);

    // Store the change and it's operations count so that it can be flushed once
    // the component next updates.
    _this2.tmp.change = change;
    _this2.tmp.operationsSize = change.operations.size;

    return change.value;
  });
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = EVENT_HANDLERS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var prop = _step.value;

    Editor.propTypes[prop] = Types.func;
  }

  /**
   * Export.
   *
   * @type {Component}
   */
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var index = {
  Editor: Editor,
  cloneFragment: cloneFragment,
  findDOMNode: findDOMNode$1,
  findDOMRange: findDOMRange,
  findNode: findNode,
  findRange: findRange,
  getEventRange: getEventRange,
  getEventTransfer: getEventTransfer,
  setEventTransfer: setEventTransfer,
  AfterPlugin: AfterPlugin,
  BeforePlugin: BeforePlugin
};

export default index;
export { Editor, cloneFragment, findDOMNode$1 as findDOMNode, findDOMRange, findNode, findRange, getEventRange, getEventTransfer, setEventTransfer, AfterPlugin, BeforePlugin };
//# sourceMappingURL=slate-react.es.js.map
