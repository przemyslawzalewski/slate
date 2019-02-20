(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('slate')) :
	typeof define === 'function' && define.amd ? define(['exports', 'slate'], factory) :
	(factory((global.SlateSimulator = {}),global.Slate));
}(this, (function (exports,slate) { 'use strict';

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

/**
 * Event handlers that can be simulated.
 *
 * @type {Array}
 */

var EVENT_HANDLERS = ['onBeforeInput', 'onBlur', 'onCopy', 'onCut', 'onDrop', 'onFocus', 'onKeyDown', 'onKeyUp', 'onPaste', 'onSelect'];

/**
 * Simulator.
 *
 * @type {Simulator}
 */

var Simulator =
/**
 * Create a new `Simulator` with `plugins` and an initial `value`.
 *
 * @param {Object} attrs
 */

function Simulator(props) {
  classCallCheck(this, Simulator);
  var plugins = props.plugins,
      value = props.value;

  var stack = new slate.Stack({ plugins: plugins });
  this.props = props;
  this.stack = stack;
  this.value = value;
};

/**
 * Generate the event simulators.
 */

EVENT_HANDLERS.forEach(function (handler) {
  var method = getMethodName(handler);

  Simulator.prototype[method] = function (e) {
    if (e == null) e = {};

    var stack = this.stack,
        value = this.value;

    var editor = createEditor(this);
    var event = createEvent(e);
    var change = value.change();

    stack.run(handler, event, change, editor);
    stack.run('onChange', change, editor);

    this.value = change.value;
    return this;
  };
});

/**
 * Get the method name from a `handler` name.
 *
 * @param {String} handler
 * @return {String}
 */

function getMethodName(handler) {
  return handler.charAt(2).toLowerCase() + handler.slice(3);
}

/**
 * Create a fake editor from a `stack` and `value`.
 *
 * @param {Stack} stack
 * @param {Value} value
 */

function createEditor(_ref) {
  var stack = _ref.stack,
      value = _ref.value,
      props = _ref.props;

  var editor = {
    getSchema: function getSchema() {
      return stack.schema;
    },
    getState: function getState() {
      return value;
    },
    props: _extends({
      autoCorrect: true,
      autoFocus: false,
      onChange: function onChange() {},
      readOnly: false,
      spellCheck: true
    }, props)
  };

  return editor;
}

/**
 * Create a fake event with `attributes`.
 *
 * @param {Object} attributes
 * @return {Object}
 */

function createEvent(attributes) {
  var event = _extends({
    preventDefault: function preventDefault() {
      return event.isDefaultPrevented = true;
    },
    stopPropagation: function stopPropagation() {
      return event.isPropagationStopped = true;
    },
    isDefaultPrevented: false,
    isPropagationStopped: false
  }, attributes);

  return event;
}

exports.default = Simulator;

Object.defineProperty(exports, '__esModule', { value: true });

})));
