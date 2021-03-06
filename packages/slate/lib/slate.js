'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isPlainObject = _interopDefault(require('is-plain-object'));
var immutable = require('immutable');
var warning = _interopDefault(require('slate-dev-warning'));
var omit = _interopDefault(require('lodash/omit'));
var pick = _interopDefault(require('lodash/pick'));
var Debug = _interopDefault(require('debug'));
var direction = _interopDefault(require('direction'));

/**
 * Mix in an `Interface` to a `Class`.
 *
 * @param {Class} Class
 * @param {Class} Interface
 */

function mixin(Interface, Classes) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Classes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var Class = _step.value;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.getOwnPropertyNames(Interface)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var name = _step2.value;

          if (Class.hasOwnProperty(name)) continue;
          var desc = Object.getOwnPropertyDescriptor(Interface, name);
          Object.defineProperty(Class, name, desc);
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

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Object.getOwnPropertyNames(Interface.prototype)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _name = _step3.value;

          if (Class.prototype.hasOwnProperty(_name)) continue;
          var desc = Object.getOwnPropertyDescriptor(Interface.prototype, _name);
          Object.defineProperty(Class.prototype, _name, desc);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
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
}

/**
 * An auto-incrementing index for generating keys.
 *
 * @type {Number}
 */

var n = void 0;

/**
 * The global key generating function.
 *
 * @type {Function}
 */

var generate = void 0;

/**
 * Create a key, using a provided key if available.
 *
 * @param {String|Void} key
 * @return {String}
 */

function create(key) {
  if (key == null) {
    return generate();
  }

  if (typeof key === 'string') {
    return key;
  }

  throw new Error('Keys must be strings, but you passed: ' + key);
}

/**
 * Set a different unique ID generating `function`.
 *
 * @param {Function} func
 */

function setGenerator(func) {
  generate = func;
}

/**
 * Reset the key generating function to its initial state.
 */

function resetGenerator() {
  n = 0;
  generate = function generate() {
    return '' + n++;
  };
}

/**
 * Set the initial state.
 */

resetGenerator();

/**
 * Export.
 *
 * @type {Object}
 */

var KeyUtils = {
  create: create,
  setGenerator: setGenerator,
  resetGenerator: resetGenerator
};

/**
 * Slate-specific model types.
 *
 * @type {Object}
 */

var MODEL_TYPES = {
  BLOCK: '@@__SLATE_BLOCK__@@',
  CHANGE: '@@__SLATE_CHANGE__@@',
  DECORATION: '@@__SLATE_DECORATION__@@',
  DOCUMENT: '@@__SLATE_DOCUMENT__@@',
  HISTORY: '@@__SLATE_HISTORY__@@',
  INLINE: '@@__SLATE_INLINE__@@',
  LEAF: '@@__SLATE_LEAF__@@',
  MARK: '@@__SLATE_MARK__@@',
  OPERATION: '@@__SLATE_OPERATION__@@',
  POINT: '@@__SLATE_POINT__@@',
  RANGE: '@@__SLATE_RANGE__@@',
  SCHEMA: '@@__SLATE_SCHEMA__@@',
  SELECTION: '@@__SLATE_SELECTION__@@',
  STACK: '@@__SLATE_STACK__@@',
  TEXT: '@@__SLATE_TEXT__@@',
  VALUE: '@@__SLATE_VALUE__@@'

  /**
   * Export type identification function
   *
   * @param {string} type
   * @param {any} any
   * @return {boolean}
   */

};function isType(type, any) {
  return !!(any && any[MODEL_TYPES[type]]);
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











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









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
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
 * Data.
 *
 * This isn't an immutable record, it's just a thin wrapper around `Map` so that
 * we can allow for more convenient creation.
 *
 * @type {Object}
 */

var Data = function () {
  function Data() {
    classCallCheck(this, Data);
  }

  createClass(Data, null, [{
    key: 'create',

    /**
     * Create a new `Data` with `attrs`.
     *
     * @param {Object|Data|Map} attrs
     * @return {Data} data
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (immutable.Map.isMap(attrs)) {
        return attrs;
      }

      if (isPlainObject(attrs)) {
        return Data.fromJSON(attrs);
      }

      throw new Error('`Data.create` only accepts objects or maps, but you passed it: ' + attrs);
    }

    /**
     * Create a `Data` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Data}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      return new immutable.Map(object);
    }

    /**
     * Alias `fromJS`.
     */

  }]);
  return Data;
}();

/**
 * Export.
 *
 * @type {Object}
 */

Data.fromJS = Data.fromJSON;

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  data: new immutable.Map(),
  key: undefined,
  nodes: new immutable.List()

  /**
   * Document.
   *
   * @type {Document}
   */

};
var Document = function (_Record) {
  inherits(Document, _Record);

  function Document() {
    classCallCheck(this, Document);
    return possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).apply(this, arguments));
  }

  createClass(Document, [{
    key: 'toJSON',


    /**
     * Return a JSON representation of the document.
     *
     * @param {Object} options
     * @return {Object}
     */

    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        data: this.data.toJSON(),
        nodes: this.nodes.toArray().map(function (n) {
          return n.toJSON(options);
        })
      };

      if (options.preserveKeys) {
        object.key = this.key;
      }

      return object;
    }
  }, {
    key: 'object',


    /**
     * Object.
     *
     * @return {String}
     */

    get: function get$$1() {
      return 'document';
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Document` with `attrs`.
     *
     * @param {Object|Array|List|Text} attrs
     * @return {Document}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Document.isDocument(attrs)) {
        return attrs;
      }

      if (immutable.List.isList(attrs) || Array.isArray(attrs)) {
        attrs = { nodes: attrs };
      }

      if (isPlainObject(attrs)) {
        return Document.fromJSON(attrs);
      }

      throw new Error('`Document.create` only accepts objects, arrays, lists or documents, but you passed it: ' + attrs);
    }

    /**
     * Create a `Document` from a JSON `object`.
     *
     * @param {Object|Document} object
     * @return {Document}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Document.isDocument(object)) {
        return object;
      }

      var _object$data = object.data,
          data = _object$data === undefined ? {} : _object$data,
          _object$key = object.key,
          key = _object$key === undefined ? KeyUtils.create() : _object$key,
          _object$nodes = object.nodes,
          nodes = _object$nodes === undefined ? [] : _object$nodes;


      var document = new Document({
        key: key,
        data: new immutable.Map(data),
        nodes: Node.createList(nodes)
      });

      return document;
    }

    /**
     * Check if `any` is a `Document`.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }]);
  return Document;
}(immutable.Record(DEFAULTS));

/**
 * Attach a pseudo-symbol for type checking.
 */

Document.isDocument = isType.bind(null, 'DOCUMENT');
Document.prototype[MODEL_TYPES.DOCUMENT] = true;

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$1 = {
  data: new immutable.Map(),
  key: undefined,
  nodes: new immutable.List(),
  type: undefined

  /**
   * Inline.
   *
   * @type {Inline}
   */

};
var Inline = function (_Record) {
  inherits(Inline, _Record);

  function Inline() {
    classCallCheck(this, Inline);
    return possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).apply(this, arguments));
  }

  createClass(Inline, [{
    key: 'toJSON',


    /**
     * Return a JSON representation of the inline.
     *
     * @param {Object} options
     * @return {Object}
     */

    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        type: this.type,
        data: this.data.toJSON(),
        nodes: this.nodes.toArray().map(function (n) {
          return n.toJSON(options);
        })
      };

      if (options.preserveKeys) {
        object.key = this.key;
      }

      return object;
    }
  }, {
    key: 'object',


    /**
     * Object.
     *
     * @return {String}
     */

    get: function get$$1() {
      return 'inline';
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Inline` with `attrs`.
     *
     * @param {Object|String|Inline} attrs
     * @return {Inline}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Inline.isInline(attrs)) {
        return attrs;
      }

      if (typeof attrs == 'string') {
        attrs = { type: attrs };
      }

      if (isPlainObject(attrs)) {
        return Inline.fromJSON(attrs);
      }

      throw new Error('`Inline.create` only accepts objects, strings or inlines, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Inlines` from an array.
     *
     * @param {Array<Inline|Object>|List<Inline|Object>} elements
     * @return {List<Inline>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (immutable.List.isList(elements) || Array.isArray(elements)) {
        var list = new immutable.List(elements.map(Inline.create));
        return list;
      }

      throw new Error('`Inline.createList` only accepts arrays or lists, but you passed it: ' + elements);
    }

    /**
     * Create a `Inline` from a JSON `object`.
     *
     * @param {Object|Inline} object
     * @return {Inline}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Inline.isInline(object)) {
        return object;
      }

      var _object$data = object.data,
          data = _object$data === undefined ? {} : _object$data,
          _object$key = object.key,
          key = _object$key === undefined ? KeyUtils.create() : _object$key,
          _object$nodes = object.nodes,
          nodes = _object$nodes === undefined ? [] : _object$nodes,
          type = object.type;


      if (typeof type != 'string') {
        throw new Error('`Inline.fromJS` requires a `type` string.');
      }

      var inline = new Inline({
        key: key,
        type: type,
        data: new immutable.Map(data),
        nodes: Node.createList(nodes)
      });

      return inline;
    }

    /**
     * Check if `any` is a `Inline`.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isInlineList',


    /**
     * Check if `any` is a list of inlines.
     *
     * @param {Any} any
     * @return {Boolean}
     */

    value: function isInlineList(any) {
      return immutable.List.isList(any) && any.every(function (item) {
        return Inline.isInline(item);
      });
    }
  }]);
  return Inline;
}(immutable.Record(DEFAULTS$1));

/**
 * Attach a pseudo-symbol for type checking.
 */

Inline.isInline = isType.bind(null, 'INLINE');
Inline.prototype[MODEL_TYPES.INLINE] = true;

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$2 = {
  data: new immutable.Map(),
  type: undefined

  /**
   * Mark.
   *
   * @type {Mark}
   */

};
var Mark = function (_Record) {
  inherits(Mark, _Record);

  function Mark() {
    classCallCheck(this, Mark);
    return possibleConstructorReturn(this, (Mark.__proto__ || Object.getPrototypeOf(Mark)).apply(this, arguments));
  }

  createClass(Mark, [{
    key: 'toJSON',


    /**
     * Return a JSON representation of the mark.
     *
     * @return {Object}
     */

    value: function toJSON() {
      var object = {
        object: this.object,
        type: this.type,
        data: this.data.toJSON()
      };

      return object;
    }
  }, {
    key: 'object',


    /**
     * Object.
     */

    get: function get$$1() {
      return 'mark';
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Mark` with `attrs`.
     *
     * @param {Object|Mark} attrs
     * @return {Mark}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Mark.isMark(attrs)) {
        return attrs;
      }

      if (typeof attrs == 'string') {
        attrs = { type: attrs };
      }

      if (isPlainObject(attrs)) {
        return Mark.fromJSON(attrs);
      }

      throw new Error('`Mark.create` only accepts objects, strings or marks, but you passed it: ' + attrs);
    }

    /**
     * Create a set of marks.
     *
     * @param {Array<Object|Mark>} elements
     * @return {Set<Mark>}
     */

  }, {
    key: 'createSet',
    value: function createSet(elements) {
      if (immutable.Set.isSet(elements) || Array.isArray(elements)) {
        var marks = new immutable.Set(elements.map(Mark.create));
        return marks;
      }

      if (elements == null) {
        return immutable.Set();
      }

      throw new Error('`Mark.createSet` only accepts sets, arrays or null, but you passed it: ' + elements);
    }

    /**
     * Create a dictionary of settable mark properties from `attrs`.
     *
     * @param {Object|String|Mark} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Mark.isMark(attrs)) {
        return {
          data: attrs.data,
          type: attrs.type
        };
      }

      if (typeof attrs == 'string') {
        return { type: attrs };
      }

      if (isPlainObject(attrs)) {
        var props = {};
        if ('type' in attrs) props.type = attrs.type;
        if ('data' in attrs) props.data = Data.create(attrs.data);
        return props;
      }

      throw new Error('`Mark.createProperties` only accepts objects, strings or marks, but you passed it: ' + attrs);
    }

    /**
     * Create a `Mark` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Mark}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var _object$data = object.data,
          data = _object$data === undefined ? {} : _object$data,
          type = object.type;


      if (typeof type != 'string') {
        throw new Error('`Mark.fromJS` requires a `type` string.');
      }

      var mark = new Mark({
        type: type,
        data: new immutable.Map(data)
      });

      return mark;
    }

    /**
     * Check if `any` is a `Mark`.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isMarkSet',


    /**
     * Check if `any` is a set of marks.
     *
     * @param {Any} any
     * @return {Boolean}
     */

    value: function isMarkSet(any) {
      return immutable.Set.isSet(any) && any.every(function (item) {
        return Mark.isMark(item);
      });
    }
  }]);
  return Mark;
}(immutable.Record(DEFAULTS$2));

/**
 * Attach a pseudo-symbol for type checking.
 */

Mark.isMark = isType.bind(null, 'MARK');
Mark.prototype[MODEL_TYPES.MARK] = true;

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$3 = {
  marks: immutable.Set(),
  text: ''

  /**
   * Leaf.
   *
   * @type {Leaf}
   */

};
var Leaf = function (_Record) {
  inherits(Leaf, _Record);

  function Leaf() {
    classCallCheck(this, Leaf);
    return possibleConstructorReturn(this, (Leaf.__proto__ || Object.getPrototypeOf(Leaf)).apply(this, arguments));
  }

  createClass(Leaf, [{
    key: 'updateMark',


    /**
     * Update a `mark` at leaf, replace with newMark
     *
     * @param {Mark} mark
     * @param {Mark} newMark
     * @returns {Leaf}
     */

    value: function updateMark(mark, newMark) {
      var marks = this.marks;

      if (newMark.equals(mark)) return this;
      if (!marks.has(mark)) return this;
      var newMarks = marks.withMutations(function (collection) {
        collection.remove(mark).add(newMark);
      });
      return this.set('marks', newMarks);
    }

    /**
     * Add a `mark` to the leaf.
     *
     * @param {Mark} mark
     * @returns {Text}
     */

  }, {
    key: 'addMark',
    value: function addMark(mark) {
      var marks = this.marks;

      return this.set('marks', marks.add(mark));
    }

    /**
     * Add a `set` of marks to the leaf.
     *
     * @param {Set<Mark>} set
     * @returns {Text}
     */

  }, {
    key: 'addMarks',
    value: function addMarks(set$$1) {
      var marks = this.marks;

      return this.set('marks', marks.union(set$$1));
    }

    /**
     * Remove a `mark` from the leaf.
     *
     * @param {Mark} mark
     * @returns {Text}
     */

  }, {
    key: 'removeMark',
    value: function removeMark(mark) {
      var marks = this.marks;

      return this.set('marks', marks.remove(mark));
    }

    /**
     * Return a JSON representation of the leaf.
     *
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var object = {
        object: this.object,
        text: this.text,
        marks: this.marks.toArray().map(function (m) {
          return m.toJSON();
        })
      };

      return object;
    }
  }, {
    key: 'object',


    /**
     * Object.
     *
     * @return {String}
     */

    get: function get$$1() {
      return 'leaf';
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Leaf` with `attrs`.
     *
     * @param {Object|Leaf} attrs
     * @return {Leaf}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Leaf.isLeaf(attrs)) {
        return attrs;
      }

      if (typeof attrs == 'string') {
        attrs = { text: attrs };
      }

      if (isPlainObject(attrs)) {
        return Leaf.fromJSON(attrs);
      }

      throw new Error('`Leaf.create` only accepts objects, strings or leaves, but you passed it: ' + attrs);
    }

    /**
     * Create a valid List of `Leaf` from `leaves`
     *
     * @param {List<Leaf>} leaves
     * @return {List<Leaf>}
     */

  }, {
    key: 'createLeaves',
    value: function createLeaves(leaves) {
      if (leaves.size <= 1) return leaves;

      var invalid = false;

      // TODO: we can make this faster with [List] and then flatten
      var result = immutable.List().withMutations(function (cache) {
        // Search from the leaves left end to find invalid node;
        leaves.findLast(function (leaf, index) {
          var firstLeaf = cache.first();

          // If the first leaf of cache exist, check whether the first leaf is connectable with the current leaf
          if (firstLeaf) {
            // If marks equals, then the two leaves can be connected
            if (firstLeaf.marks.equals(leaf.marks)) {
              invalid = true;
              cache.set(0, firstLeaf.set('text', '' + leaf.text + firstLeaf.text));
              return;
            }

            // If the cached leaf is empty, drop the empty leaf with the upcoming leaf
            if (firstLeaf.text === '') {
              invalid = true;
              cache.set(0, leaf);
              return;
            }

            // If the current leaf is empty, drop the leaf
            if (leaf.text === '') {
              invalid = true;
              return;
            }
          }

          cache.unshift(leaf);
        });
      });

      if (!invalid) return leaves;
      return result;
    }

    /**
     * Split a list of leaves to two lists; if the leaves are valid leaves, the returned leaves are also valid
     * Corner Cases:
     *   1. if offset is smaller than 0, then return [List(), leaves]
     *   2. if offset is bigger than the text length, then return [leaves, List()]
     *
     * @param {List<Leaf> leaves
     * @return {Array<List<Leaf>>}
     */

  }, {
    key: 'splitLeaves',
    value: function splitLeaves(leaves, offset) {
      if (offset < 0) return [immutable.List(), leaves];

      if (leaves.size === 0) {
        return [immutable.List(), immutable.List()];
      }

      var endOffset = 0;
      var index = -1;
      var left = void 0,
          right = void 0;

      leaves.find(function (leaf) {
        index++;
        var startOffset = endOffset;
        var text = leaf.text;

        endOffset += text.length;

        if (endOffset < offset) return false;
        if (startOffset > offset) return false;

        var length = offset - startOffset;
        left = leaf.set('text', text.slice(0, length));
        right = leaf.set('text', text.slice(length));
        return true;
      });

      if (!left) return [leaves, immutable.List()];

      if (left.text === '') {
        if (index === 0) {
          return [immutable.List.of(left), leaves];
        }

        return [leaves.take(index), leaves.skip(index)];
      }

      if (right.text === '') {
        if (index === leaves.size - 1) {
          return [leaves, immutable.List.of(right)];
        }

        return [leaves.take(index + 1), leaves.skip(index + 1)];
      }

      return [leaves.take(index).push(left), leaves.skip(index + 1).unshift(right)];
    }

    /**
     * Create a `Leaf` list from `attrs`.
     *
     * @param {Array<Leaf|Object>|List<Leaf|Object>} attrs
     * @return {List<Leaf>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (immutable.List.isList(attrs) || Array.isArray(attrs)) {
        var list = new immutable.List(attrs.map(Leaf.create));
        return list;
      }

      throw new Error('`Leaf.createList` only accepts arrays or lists, but you passed it: ' + attrs);
    }

    /**
     * Create a `Leaf` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Leaf}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var _object$text = object.text,
          text = _object$text === undefined ? '' : _object$text,
          _object$marks = object.marks,
          marks = _object$marks === undefined ? [] : _object$marks;


      var leaf = new Leaf({
        text: text,
        marks: immutable.Set(marks.map(Mark.fromJSON))
      });

      return leaf;
    }

    /**
     * Check if `any` is a `Leaf`.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isLeafList',


    /**
     * Check if `any` is a list of leaves.
     *
     * @param {Any} any
     * @return {Boolean}
     */

    value: function isLeafList(any) {
      return immutable.List.isList(any) && any.every(function (item) {
        return Leaf.isLeaf(item);
      });
    }
  }]);
  return Leaf;
}(immutable.Record(DEFAULTS$3));

/**
 * Attach a pseudo-symbol for type checking.
 */

Leaf.isLeaf = isType.bind(null, 'LEAF');
Leaf.prototype[MODEL_TYPES.LEAF] = true;

/**
 * GLOBAL: True if memoization should is enabled.
 *
 * @type {Boolean}
 */

var ENABLED = true;

/**
 * GLOBAL: Changing this cache key will clear all previous cached results.
 *
 * @type {Number}
 */

var CACHE_KEY = 0;

/**
 * The leaf node of a cache tree. Used to support variable argument length. A
 * unique object, so that native Maps will key it by reference.
 *
 * @type {Object}
 */

var LEAF = {};

/**
 * A value to represent a memoized undefined value. Allows efficient value
 * retrieval using Map.get only.
 *
 * @type {Object}
 */

var UNDEFINED = {};

/**
 * Default value for unset keys in native Maps
 *
 * @type {Undefined}
 */

var UNSET = undefined;

/**
 * Memoize all of the `properties` on a `object`.
 *
 * @param {Object} object
 * @param {Array} properties
 * @return {Record}
 */

function memoize(object, properties) {
  var _loop = function _loop(property) {
    var original = object[property];

    if (!original) {
      throw new Error("Object does not have a property named \"" + property + "\".");
    }

    object[property] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // If memoization is disabled, call into the original method.
      if (!ENABLED) return original.apply(this, args);

      // If the cache key is different, previous caches must be cleared.
      if (CACHE_KEY !== this.__cache_key) {
        this.__cache_key = CACHE_KEY;
        this.__cache = new Map(); // eslint-disable-line no-undef,no-restricted-globals
        this.__cache_no_args = {};
      }

      if (!this.__cache) {
        this.__cache = new Map(); // eslint-disable-line no-undef,no-restricted-globals
      }

      if (!this.__cache_no_args) {
        this.__cache_no_args = {};
      }

      var takesArguments = args.length !== 0;

      var cachedValue = void 0;
      var keys = void 0;

      if (takesArguments) {
        keys = [property].concat(args);
        cachedValue = getIn(this.__cache, keys);
      } else {
        cachedValue = this.__cache_no_args[property];
      }

      // If we've got a result already, return it.
      if (cachedValue !== UNSET) {
        return cachedValue === UNDEFINED ? undefined : cachedValue;
      }

      // Otherwise calculate what it should be once and cache it.
      var value = original.apply(this, args);
      var v = value === undefined ? UNDEFINED : value;

      if (takesArguments) {
        this.__cache = setIn(this.__cache, keys, v);
      } else {
        this.__cache_no_args[property] = v;
      }

      return value;
    };
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var property = _step.value;

      _loop(property);
    }
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
}

/**
 * Get a value at a key path in a tree of Map.
 *
 * If not set, returns UNSET.
 * If the set value is undefined, returns UNDEFINED.
 *
 * @param {Map} map
 * @param {Array} keys
 * @return {Any|UNSET|UNDEFINED}
 */

function getIn(map, keys) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var key = _step2.value;

      map = map.get(key);
      if (map === UNSET) return UNSET;
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

  return map.get(LEAF);
}

/**
 * Set a value at a key path in a tree of Map, creating Maps on the go.
 *
 * @param {Map} map
 * @param {Array} keys
 * @param {Any} value
 * @return {Map}
 */

function setIn(map, keys, value) {
  var parent = map;
  var child = void 0;

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var key = _step3.value;

      child = parent.get(key);

      // If the path was not created yet...
      if (child === UNSET) {
        child = new Map(); // eslint-disable-line no-undef,no-restricted-globals
        parent.set(key, child);
      }

      parent = child;
    }

    // The whole path has been created, so set the value to the bottom most map.
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  child.set(LEAF, value);
  return map;
}

/**
 * In DEV mode, clears the previously memoized values, globally.
 *
 * @return {Void}
 */

function resetMemoization() {
  CACHE_KEY++;

  if (CACHE_KEY >= Number.MAX_SAFE_INTEGER) {
    CACHE_KEY = 0;
  }
}

/**
 * In DEV mode, enable or disable the use of memoize values, globally.
 *
 * @param {Boolean} enabled
 * @return {Void}
 */

function useMemoization(enabled) {
  ENABLED = enabled;
}

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$4 = {
  leaves: immutable.List(),
  key: undefined

  /**
   * Text.
   *
   * @type {Text}
   */

};
var Text = function (_Record) {
  inherits(Text, _Record);

  function Text() {
    classCallCheck(this, Text);
    return possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
  }

  createClass(Text, [{
    key: 'searchLeafAtOffset',


    /**
     * Find the 'first' leaf at offset; By 'first' the alorighthm prefers `endOffset === offset` than `startOffset === offset`
     * Corner Cases:
     *   1. if offset is negative, return the first leaf;
     *   2. if offset is larger than text length, the leaf is null, startOffset, endOffset and index is of the last leaf
     *
     * @param {number}
     * @returns {Object}
     *   @property {number} startOffset
     *   @property {number} endOffset
     *   @property {number} index
     *   @property {Leaf} leaf
     */

    value: function searchLeafAtOffset(offset) {
      var endOffset = 0;
      var startOffset = 0;
      var index = -1;

      var leaf = this.leaves.find(function (l) {
        index++;
        startOffset = endOffset;
        endOffset = startOffset + l.text.length;
        return endOffset >= offset;
      });

      return {
        leaf: leaf,
        endOffset: endOffset,
        index: index,
        startOffset: startOffset
      };
    }

    /**
     * Add a `mark` at `index` and `length`.
     *
     * @param {Number} index
     * @param {Number} length
     * @param {Mark} mark
     * @return {Text}
     */

  }, {
    key: 'addMark',
    value: function addMark(index, length, mark) {
      var marks = immutable.Set.of(mark);
      return this.addMarks(index, length, marks);
    }

    /**
     * Add a `set` of marks at `index` and `length`.
     * Corner Cases:
     *   1. If empty text, and if length === 0 and index === 0, will make sure the text contain an empty leaf with the given mark.
     *
     * @param {Number} index
     * @param {Number} length
     * @param {Set<Mark>} set
     * @return {Text}
     */

  }, {
    key: 'addMarks',
    value: function addMarks(index, length, set$$1) {
      if (this.text === '' && length === 0 && index === 0) {
        var _leaves = this.leaves;

        var first = _leaves.first();

        if (!first) {
          return this.set('leaves', immutable.List.of(Leaf.fromJSON({ text: '', marks: set$$1 })));
        }

        var newFirst = first.addMarks(set$$1);
        if (newFirst === first) return this;
        return this.set('leaves', immutable.List.of(newFirst));
      }

      if (this.text === '') return this;
      if (length === 0) return this;
      if (index >= this.text.length) return this;

      var _Leaf$splitLeaves = Leaf.splitLeaves(this.leaves, index),
          _Leaf$splitLeaves2 = slicedToArray(_Leaf$splitLeaves, 2),
          before = _Leaf$splitLeaves2[0],
          bundle = _Leaf$splitLeaves2[1];

      var _Leaf$splitLeaves3 = Leaf.splitLeaves(bundle, length),
          _Leaf$splitLeaves4 = slicedToArray(_Leaf$splitLeaves3, 2),
          middle = _Leaf$splitLeaves4[0],
          after = _Leaf$splitLeaves4[1];

      var leaves = before.concat(middle.map(function (x) {
        return x.addMarks(set$$1);
      }), after);
      return this.setLeaves(leaves);
    }

    /**
     * Derive the leaves for a list of `decorations`.
     *
     * @param {Array|Void} decorations (optional)
     * @return {List<Leaf>}
     */

  }, {
    key: 'getLeaves',
    value: function getLeaves() {
      var _this2 = this;

      var decorations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var leaves = this.leaves;

      if (leaves.size === 0) return immutable.List.of(Leaf.create({}));
      if (!decorations || decorations.length === 0) return leaves;
      if (this.text.length === 0) return leaves;
      var key = this.key;


      decorations.forEach(function (dec) {
        var start = dec.start,
            end = dec.end,
            mark = dec.mark;

        var hasStart = start.key == key;
        var hasEnd = end.key == key;

        if (hasStart && hasEnd) {
          var index = hasStart ? start.offset : 0;
          var length = hasEnd ? end.offset - index : _this2.text.length - index;

          if (length < 1) return;
          if (index >= _this2.text.length) return;

          if (index !== 0 || length < _this2.text.length) {
            var _Leaf$splitLeaves5 = Leaf.splitLeaves(leaves, index),
                _Leaf$splitLeaves6 = slicedToArray(_Leaf$splitLeaves5, 2),
                before = _Leaf$splitLeaves6[0],
                bundle = _Leaf$splitLeaves6[1];

            var _Leaf$splitLeaves7 = Leaf.splitLeaves(bundle, length),
                _Leaf$splitLeaves8 = slicedToArray(_Leaf$splitLeaves7, 2),
                middle = _Leaf$splitLeaves8[0],
                after = _Leaf$splitLeaves8[1];

            leaves = before.concat(middle.map(function (x) {
              return x.addMark(mark);
            }), after);
            return;
          }
        }

        leaves = leaves.map(function (x) {
          return x.addMark(mark);
        });
      });

      if (leaves === this.leaves) return leaves;
      return Leaf.createLeaves(leaves);
    }

    /**
     * Get all of the active marks on between two offsets
     * Corner Cases:
     *   1. if startOffset is equal or bigger than endOffset, then return Set();
     *   2. If no text is selected between start and end, then return Set()
     *
     * @return {Set<Mark>}
     */

  }, {
    key: 'getActiveMarksBetweenOffsets',
    value: function getActiveMarksBetweenOffsets(startOffset, endOffset) {
      if (startOffset <= 0 && endOffset >= this.text.length) {
        return this.getActiveMarks();
      }

      if (startOffset >= endOffset) return immutable.Set();
      // For empty text in a paragraph, use getActiveMarks;
      if (this.text === '') return this.getActiveMarks();

      var result = null;
      var leafEnd = 0;

      this.leaves.forEach(function (leaf) {
        var leafStart = leafEnd;
        leafEnd = leafStart + leaf.text.length;

        if (leafEnd <= startOffset) return;
        if (leafStart >= endOffset) return false;

        if (!result) {
          result = leaf.marks;
          return;
        }

        result = result.intersect(leaf.marks);
        if (result && result.size === 0) return false;
        return false;
      });

      return result || immutable.Set();
    }

    /**
     * Get all of the active marks on the text
     *
     * @return {Set<Mark>}
     */

  }, {
    key: 'getActiveMarks',
    value: function getActiveMarks() {
      var _this3 = this;

      if (this.leaves.size === 0) return immutable.Set();

      var result = this.leaves.first().marks;
      if (result.size === 0) return result;

      return result.withMutations(function (x) {
        _this3.leaves.forEach(function (c) {
          x.intersect(c.marks);
          if (x.size === 0) return false;
        });
      });
    }

    /**
     * Get all of the marks on between two offsets
     * Corner Cases:
     *   1. if startOffset is equal or bigger than endOffset, then return Set();
     *   2. If no text is selected between start and end, then return Set()
     *
     * @return {OrderedSet<Mark>}
     */

  }, {
    key: 'getMarksBetweenOffsets',
    value: function getMarksBetweenOffsets(startOffset, endOffset) {
      if (startOffset <= 0 && endOffset >= this.text.length) {
        return this.getMarks();
      }

      if (startOffset >= endOffset) return immutable.Set();
      // For empty text in a paragraph, use getActiveMarks;
      if (this.text === '') return this.getActiveMarks();

      var result = null;
      var leafEnd = 0;

      this.leaves.forEach(function (leaf) {
        var leafStart = leafEnd;
        leafEnd = leafStart + leaf.text.length;

        if (leafEnd <= startOffset) return;
        if (leafStart >= endOffset) return false;

        if (!result) {
          result = leaf.marks;
          return;
        }

        result = result.union(leaf.marks);
      });

      return result || immutable.Set();
    }

    /**
     * Get all of the marks on the text.
     *
     * @return {OrderedSet<Mark>}
     */

  }, {
    key: 'getMarks',
    value: function getMarks() {
      var array = this.getMarksAsArray();
      return new immutable.OrderedSet(array);
    }

    /**
     * Get all of the marks on the text as an array
     *
     * @return {Array}
     */

  }, {
    key: 'getMarksAsArray',
    value: function getMarksAsArray() {
      if (this.leaves.size === 0) return [];
      var first = this.leaves.first().marks;
      if (this.leaves.size === 1) return first.toArray();

      var result = [];

      this.leaves.forEach(function (leaf) {
        result.push(leaf.marks.toArray());
      });

      return Array.prototype.concat.apply(first.toArray(), result);
    }

    /**
     * Get the marks on the text at `index`.
     * Corner Cases:
     *   1. if no text is before the index, and index !== 0, then return Set()
     *   2. (for insert after split node or mark at range) if index === 0, and text === '', then return the leaf.marks
     *   3. if index === 0, text !== '', return Set()
     *
     *
     * @param {Number} index
     * @return {Set<Mark>}
     */

  }, {
    key: 'getMarksAtIndex',
    value: function getMarksAtIndex(index) {
      var _searchLeafAtOffset = this.searchLeafAtOffset(index),
          leaf = _searchLeafAtOffset.leaf;

      if (!leaf) return immutable.Set();
      return leaf.marks;
    }

    /**
     * Insert `text` at `index`.
     *
     * @param {Numbder} offset
     * @param {String} text
     * @param {Set} marks (optional)
     * @return {Text}
     */

  }, {
    key: 'insertText',
    value: function insertText(offset, text, marks) {
      if (this.text === '') {
        return this.set('leaves', immutable.List.of(Leaf.create({ text: text, marks: marks })));
      }

      if (text.length === 0) return this;
      if (!marks) marks = immutable.Set();

      var _searchLeafAtOffset2 = this.searchLeafAtOffset(offset),
          startOffset = _searchLeafAtOffset2.startOffset,
          leaf = _searchLeafAtOffset2.leaf,
          index = _searchLeafAtOffset2.index;

      var delta = offset - startOffset;
      var beforeText = leaf.text.slice(0, delta);
      var afterText = leaf.text.slice(delta);
      var leaves = this.leaves;


      if (leaf.marks.equals(marks)) {
        return this.set('leaves', leaves.set(index, leaf.set('text', beforeText + text + afterText)));
      }

      var nextLeaves = leaves.splice(index, 1, leaf.set('text', beforeText), Leaf.create({ text: text, marks: marks }), leaf.set('text', afterText));

      return this.setLeaves(nextLeaves);
    }

    /**
     * Remove a `mark` at `index` and `length`.
     *
     * @param {Number} index
     * @param {Number} length
     * @param {Mark} mark
     * @return {Text}
     */

  }, {
    key: 'removeMark',
    value: function removeMark(index, length, mark) {
      if (this.text === '' && index === 0 && length === 0) {
        var first = this.leaves.first();
        if (!first) return this;
        var newFirst = first.removeMark(mark);
        if (newFirst === first) return this;
        return this.set('leaves', immutable.List.of(newFirst));
      }

      if (length <= 0) return this;
      if (index >= this.text.length) return this;

      var _Leaf$splitLeaves9 = Leaf.splitLeaves(this.leaves, index),
          _Leaf$splitLeaves10 = slicedToArray(_Leaf$splitLeaves9, 2),
          before = _Leaf$splitLeaves10[0],
          bundle = _Leaf$splitLeaves10[1];

      var _Leaf$splitLeaves11 = Leaf.splitLeaves(bundle, length),
          _Leaf$splitLeaves12 = slicedToArray(_Leaf$splitLeaves11, 2),
          middle = _Leaf$splitLeaves12[0],
          after = _Leaf$splitLeaves12[1];

      var leaves = before.concat(middle.map(function (x) {
        return x.removeMark(mark);
      }), after);
      return this.setLeaves(leaves);
    }

    /**
     * Remove text from the text node at `start` for `length`.
     *
     * @param {Number} start
     * @param {Number} length
     * @return {Text}
     */

  }, {
    key: 'removeText',
    value: function removeText(start, length) {
      if (length <= 0) return this;
      if (start >= this.text.length) return this;

      // PERF: For simple backspace, we can operate directly on the leaf
      if (length === 1) {
        var _searchLeafAtOffset3 = this.searchLeafAtOffset(start + 1),
            leaf = _searchLeafAtOffset3.leaf,
            index = _searchLeafAtOffset3.index,
            startOffset = _searchLeafAtOffset3.startOffset;

        var offset = start - startOffset;

        if (leaf) {
          if (leaf.text.length === 1) {
            var _leaves2 = this.leaves.remove(index);
            return this.setLeaves(_leaves2);
          }

          var beforeText = leaf.text.slice(0, offset);
          var afterText = leaf.text.slice(offset + length);
          var text = beforeText + afterText;

          if (text.length > 0) {
            return this.set('leaves', this.leaves.set(index, leaf.set('text', text)));
          }
        }
      }

      var _Leaf$splitLeaves13 = Leaf.splitLeaves(this.leaves, start),
          _Leaf$splitLeaves14 = slicedToArray(_Leaf$splitLeaves13, 2),
          before = _Leaf$splitLeaves14[0],
          bundle = _Leaf$splitLeaves14[1];

      var after = Leaf.splitLeaves(bundle, length)[1];
      var leaves = Leaf.createLeaves(before.concat(after));

      if (leaves.size === 1) {
        var first = leaves.first();

        if (first.text === '') {
          return this.set('leaves', immutable.List.of(first.set('marks', this.getActiveMarks())));
        }
      }

      return this.set('leaves', leaves);
    }

    /**
     * Return a JSON representation of the text.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        leaves: this.getLeaves().toArray().map(function (r) {
          return r.toJSON();
        })
      };

      if (options.preserveKeys) {
        object.key = this.key;
      }

      return object;
    }

    /**
     * Update a `mark` at `index` and `length` with `properties`.
     *
     * @param {Number} index
     * @param {Number} length
     * @param {Mark} mark
     * @param {Object} properties
     * @return {Text}
     */

  }, {
    key: 'updateMark',
    value: function updateMark(index, length, mark, properties) {
      var newMark = mark.merge(properties);

      if (this.text === '' && length === 0 && index === 0) {
        var _leaves3 = this.leaves;

        var first = _leaves3.first();
        if (!first) return this;
        var newFirst = first.updateMark(mark, newMark);
        if (newFirst === first) return this;
        return this.set('leaves', immutable.List.of(newFirst));
      }

      if (length <= 0) return this;
      if (index >= this.text.length) return this;

      var _Leaf$splitLeaves15 = Leaf.splitLeaves(this.leaves, index),
          _Leaf$splitLeaves16 = slicedToArray(_Leaf$splitLeaves15, 2),
          before = _Leaf$splitLeaves16[0],
          bundle = _Leaf$splitLeaves16[1];

      var _Leaf$splitLeaves17 = Leaf.splitLeaves(bundle, length),
          _Leaf$splitLeaves18 = slicedToArray(_Leaf$splitLeaves17, 2),
          middle = _Leaf$splitLeaves18[0],
          after = _Leaf$splitLeaves18[1];

      var leaves = before.concat(middle.map(function (x) {
        return x.updateMark(mark, newMark);
      }), after);

      return this.setLeaves(leaves);
    }

    /**
     * Split this text and return two different texts
     * @param {Number} position
     * @returns {Array<Text>}
     */

  }, {
    key: 'splitText',
    value: function splitText(offset) {
      var splitted = Leaf.splitLeaves(this.leaves, offset);
      var one = this.set('leaves', splitted[0]);
      var two = this.set('leaves', splitted[1]).regenerateKey();
      return [one, two];
    }

    /**
     * merge this text and another text at the end
     * @param {Text} text
     * @returns {Text}
     */

  }, {
    key: 'mergeText',
    value: function mergeText(text) {
      var leaves = this.leaves.concat(text.leaves);
      return this.setLeaves(leaves);
    }

    /**
     * Set leaves with normalized `leaves`
     *
     * @param {Schema} schema
     * @returns {Text|Null}
     */

  }, {
    key: 'setLeaves',
    value: function setLeaves(leaves) {
      var result = Leaf.createLeaves(leaves);

      if (result.size === 1) {
        var first = result.first();

        if (!first.marks || first.marks.size === 0) {
          if (first.text === '') {
            return this.set('leaves', immutable.List());
          }
        }
      }

      return this.set('leaves', Leaf.createLeaves(leaves));
    }
  }, {
    key: 'object',


    /**
     * Object.
     *
     * @return {String}
     */

    get: function get$$1() {
      return 'text';
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Text` with `attrs`.
     *
     * @param {Object|Array|List|String|Text} attrs
     * @return {Text}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (Text.isText(attrs)) {
        return attrs;
      }

      if (typeof attrs == 'string') {
        attrs = { leaves: [{ text: attrs }] };
      }

      if (isPlainObject(attrs)) {
        if (attrs.text) {
          var _attrs = attrs,
              text = _attrs.text,
              marks = _attrs.marks,
              key = _attrs.key;

          attrs = { key: key, leaves: [{ text: text, marks: marks }] };
        }

        return Text.fromJSON(attrs);
      }

      throw new Error('`Text.create` only accepts objects, arrays, strings or texts, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Texts` from `elements`.
     *
     * @param {Array<Text|Object>|List<Text|Object>} elements
     * @return {List<Text>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (immutable.List.isList(elements) || Array.isArray(elements)) {
        var list = new immutable.List(elements.map(Text.create));
        return list;
      }

      throw new Error('`Text.createList` only accepts arrays or lists, but you passed it: ' + elements);
    }

    /**
     * Create a `Text` from a JSON `object`.
     *
     * @param {Object|Text} object
     * @return {Text}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Text.isText(object)) {
        return object;
      }

      var _object$key = object.key,
          key = _object$key === undefined ? KeyUtils.create() : _object$key;
      var leaves = object.leaves;


      if (!leaves) {
        if (object.ranges) {
          warning(false, 'As of slate@0.27.0, the `ranges` property of Slate objects has been renamed to `leaves`.');

          leaves = object.ranges;
        } else {
          leaves = immutable.List();
        }
      }

      if (Array.isArray(leaves)) {
        leaves = immutable.List(leaves.map(function (x) {
          return Leaf.create(x);
        }));
      } else if (immutable.List.isList(leaves)) {
        leaves = leaves.map(function (x) {
          return Leaf.create(x);
        });
      } else {
        throw new Error('leaves must be either Array or Immutable.List');
      }

      var node = new Text({
        leaves: Leaf.createLeaves(leaves),
        key: key
      });

      return node;
    }

    /**
     * Check if `any` is a `Text`.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isTextList',


    /**
     * Check if `any` is a list of texts.
     *
     * @param {Any} any
     * @return {Boolean}
     */

    value: function isTextList(any) {
      return immutable.List.isList(any) && any.every(function (item) {
        return Text.isText(item);
      });
    }
  }]);
  return Text;
}(immutable.Record(DEFAULTS$4));

/**
 * Attach a pseudo-symbol for type checking.
 */

Text.isText = isType.bind(null, 'TEXT');
Text.prototype[MODEL_TYPES.TEXT] = true;

/**
 * Memoize read methods.
 */

memoize(Text.prototype, ['getActiveMarks', 'getMarks', 'getMarksAsArray']);

/**
 * A pseudo-model that is used for its static methods only.
 *
 * @type {Node}
 */

var Node = function () {
  function Node() {
    classCallCheck(this, Node);
  }

  createClass(Node, null, [{
    key: 'create',

    /**
     * Create a new `Node` with `attrs`.
     *
     * @param {Object|Node} attrs
     * @return {Node}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Node.isNode(attrs)) {
        return attrs;
      }

      if (isPlainObject(attrs)) {
        var object = attrs.object;


        if (!object && attrs.kind) {
          warning(false, 'As of slate@0.32.0, the `kind` property of Slate objects has been renamed to `object`.');

          object = attrs.kind;
        }

        switch (object) {
          case 'block':
            return Block.create(attrs);
          case 'document':
            return Document.create(attrs);
          case 'inline':
            return Inline.create(attrs);
          case 'text':
            return Text.create(attrs);

          default:
            {
              throw new Error('`Node.create` requires a `object` string.');
            }
        }
      }

      throw new Error('`Node.create` only accepts objects or nodes but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Nodes` from an array.
     *
     * @param {Array<Object|Node>} elements
     * @return {List<Node>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (immutable.List.isList(elements) || Array.isArray(elements)) {
        var list = immutable.List(elements.map(Node.create));
        return list;
      }

      throw new Error('`Node.createList` only accepts lists or arrays, but you passed it: ' + elements);
    }

    /**
     * Create a dictionary of settable node properties from `attrs`.
     *
     * @param {Object|String|Node} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Block.isBlock(attrs) || Inline.isInline(attrs)) {
        return {
          data: attrs.data,
          type: attrs.type
        };
      }

      if (typeof attrs == 'string') {
        return { type: attrs };
      }

      if (isPlainObject(attrs)) {
        var props = {};
        if ('type' in attrs) props.type = attrs.type;
        if ('data' in attrs) props.data = Data.create(attrs.data);
        return props;
      }

      throw new Error('`Node.createProperties` only accepts objects, strings, blocks or inlines, but you passed it: ' + attrs);
    }

    /**
     * Create a `Node` from a JSON `value`.
     *
     * @param {Object} value
     * @return {Node}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(value) {
      var object = value.object;


      if (!object && value.kind) {
        warning(false, 'As of slate@0.32.0, the `kind` property of Slate objects has been renamed to `object`.');

        object = value.kind;
      }

      switch (object) {
        case 'block':
          return Block.fromJSON(value);
        case 'document':
          return Document.fromJSON(value);
        case 'inline':
          return Inline.fromJSON(value);
        case 'text':
          return Text.fromJSON(value);

        default:
          {
            throw new Error('`Node.fromJSON` requires an `object` of either \'block\', \'document\', \'inline\' or \'text\', but you passed: ' + value);
          }
      }
    }

    /**
     * Check if `any` is a `Node`.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isNode',
    value: function isNode(any) {
      return !!['BLOCK', 'DOCUMENT', 'INLINE', 'TEXT'].find(function (type) {
        return isType(type, any);
      });
    }

    /**
     * Check if `any` is a list of nodes.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isNodeList',
    value: function isNodeList(any) {
      return immutable.List.isList(any) && any.every(function (item) {
        return Node.isNode(item);
      });
    }
  }]);
  return Node;
}();

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$5 = {
  data: new immutable.Map(),
  key: undefined,
  nodes: new immutable.List(),
  type: undefined

  /**
   * Block.
   *
   * @type {Block}
   */

};
var Block = function (_Record) {
  inherits(Block, _Record);

  function Block() {
    classCallCheck(this, Block);
    return possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).apply(this, arguments));
  }

  createClass(Block, [{
    key: 'toJSON',


    /**
     * Return a JSON representation of the block.
     *
     * @param {Object} options
     * @return {Object}
     */

    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        type: this.type,
        data: this.data.toJSON(),
        nodes: this.nodes.toArray().map(function (n) {
          return n.toJSON(options);
        })
      };

      if (options.preserveKeys) {
        object.key = this.key;
      }

      return object;
    }
  }, {
    key: 'object',


    /**
     * Object.
     *
     * @return {String}
     */

    get: function get$$1() {
      return 'block';
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Block` from `attrs`.
     *
     * @param {Object|String|Block} attrs
     * @return {Block}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Block.isBlock(attrs)) {
        return attrs;
      }

      if (typeof attrs == 'string') {
        attrs = { type: attrs };
      }

      if (isPlainObject(attrs)) {
        return Block.fromJSON(attrs);
      }

      throw new Error('`Block.create` only accepts objects, strings or blocks, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Blocks` from `attrs`.
     *
     * @param {Array<Block|Object>|List<Block|Object>} attrs
     * @return {List<Block>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (immutable.List.isList(attrs) || Array.isArray(attrs)) {
        var list = new immutable.List(attrs.map(Block.create));
        return list;
      }

      throw new Error('`Block.createList` only accepts arrays or lists, but you passed it: ' + attrs);
    }

    /**
     * Create a `Block` from a JSON `object`.
     *
     * @param {Object|Block} object
     * @return {Block}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Block.isBlock(object)) {
        return object;
      }

      var _object$data = object.data,
          data = _object$data === undefined ? {} : _object$data,
          _object$key = object.key,
          key = _object$key === undefined ? KeyUtils.create() : _object$key,
          _object$nodes = object.nodes,
          nodes = _object$nodes === undefined ? [] : _object$nodes,
          type = object.type;


      if (typeof type != 'string') {
        throw new Error('`Block.fromJSON` requires a `type` string.');
      }

      var block = new Block({
        key: key,
        type: type,
        data: immutable.Map(data),
        nodes: Node.createList(nodes)
      });

      return block;
    }

    /**
     * Check if `any` is a `Block`.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isBlockList',


    /**
     * Check if `any` is a block list.
     *
     * @param {Any} any
     * @return {Boolean}
     */

    value: function isBlockList(any) {
      return immutable.List.isList(any) && any.every(function (item) {
        return Block.isBlock(item);
      });
    }
  }]);
  return Block;
}(immutable.Record(DEFAULTS$5));

/**
 * Attach a pseudo-symbol for type checking.
 */

Block.isBlock = isType.bind(null, 'BLOCK');
Block.prototype[MODEL_TYPES.BLOCK] = true;

/**
 * Changes.
 *
 * @type {Object}
 */

var Changes = {};

/**
 * Mix in the changes that pass through to their at-range equivalents because
 * they don't have any effect on the selection.
 */

var PROXY_TRANSFORMS = ['deleteBackward', 'deleteCharBackward', 'deleteLineBackward', 'deleteWordBackward', 'deleteForward', 'deleteCharForward', 'deleteWordForward', 'deleteLineForward', 'setBlocks', 'setInlines', 'splitInline', 'unwrapBlock', 'unwrapInline', 'wrapBlock', 'wrapInline'];

PROXY_TRANSFORMS.forEach(function (method) {
  Changes[method] = function (change) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var value = change.value;
    var selection = value.selection;

    var methodAtRange = method + 'AtRange';
    change[methodAtRange].apply(change, [selection].concat(args));

    if (method.match(/Backward$/)) {
      change.moveToStart();
    } else if (method.match(/Forward$/)) {
      change.moveToEnd();
    }
  };
});

/**
 * Add a `mark` to the characters in the current selection.
 *
 * @param {Change} change
 * @param {Mark} mark
 */

Changes.addMark = function (change, mark) {
  mark = Mark.create(mark);
  var value = change.value;
  var document = value.document,
      selection = value.selection;


  if (selection.isExpanded) {
    change.addMarkAtRange(selection, mark);
  } else if (selection.marks) {
    var marks = selection.marks.add(mark);
    var sel = selection.set('marks', marks);
    change.select(sel);
  } else {
    var _marks = document.getActiveMarksAtRange(selection).add(mark);
    var _sel = selection.set('marks', _marks);
    change.select(_sel);
  }
};

/**
 * Add a list of `marks` to the characters in the current selection.
 *
 * @param {Change} change
 * @param {Mark} mark
 */

Changes.addMarks = function (change, marks) {
  marks.forEach(function (mark) {
    return change.addMark(mark);
  });
};

/**
 * Delete at the current selection.
 *
 * @param {Change} change
 */

Changes.delete = function (change) {
  var value = change.value;
  var selection = value.selection;

  change.deleteAtRange(selection);

  // Ensure that the selection is collapsed to the start, because in certain
  // cases when deleting across inline nodes, when splitting the inline node the
  // end point of the selection will end up after the split point.
  change.moveToStart();
};

/**
 * Insert a `block` at the current selection.
 *
 * @param {Change} change
 * @param {String|Object|Block} block
 */

Changes.insertBlock = function (change, block) {
  block = Block.create(block);
  var value = change.value;
  var selection = value.selection;

  change.insertBlockAtRange(selection, block);

  // If the node was successfully inserted, update the selection.
  var node = change.value.document.getNode(block.key);
  if (node) change.moveToEndOfNode(node);
};

/**
 * Insert a `fragment` at the current selection.
 *
 * @param {Change} change
 * @param {Document} fragment
 */

Changes.insertFragment = function (change, fragment) {
  if (!fragment.nodes.size) return;

  var value = change.value;
  var _value = value,
      document = _value.document,
      selection = _value.selection;
  var start = selection.start,
      end = selection.end;
  var _value2 = value,
      startText = _value2.startText,
      endText = _value2.endText,
      startInline = _value2.startInline;

  var lastText = fragment.getLastText();
  var lastInline = fragment.getClosestInline(lastText.key);
  var firstChild = fragment.nodes.first();
  var lastChild = fragment.nodes.last();
  var keys = document.getTexts().map(function (text) {
    return text.key;
  });
  var isAppending = !startInline || start.isAtStartOfNode(startText) || end.isAtStartOfNode(startText) || start.isAtEndOfNode(endText) || end.isAtEndOfNode(endText);

  var isInserting = firstChild.hasBlockChildren() || lastChild.hasBlockChildren();

  change.insertFragmentAtRange(selection, fragment);
  value = change.value;
  document = value.document;

  var newTexts = document.getTexts().filter(function (n) {
    return !keys.includes(n.key);
  });
  var newText = isAppending ? newTexts.last() : newTexts.takeLast(2).first();

  if (newText && (lastInline || isInserting)) {
    change.select(selection.moveToEndOfNode(newText));
  } else if (newText) {
    change.select(selection.moveToStartOfNode(newText).moveForward(lastText.text.length));
  } else {
    change.select(selection.moveToStart().moveForward(lastText.text.length));
  }
};

/**
 * Insert an `inline` at the current selection.
 *
 * @param {Change} change
 * @param {String|Object|Inline} inline
 */

Changes.insertInline = function (change, inline) {
  inline = Inline.create(inline);
  var value = change.value;
  var selection = value.selection;

  change.insertInlineAtRange(selection, inline);

  // If the node was successfully inserted, update the selection.
  var node = change.value.document.getNode(inline.key);
  if (node) change.moveToEndOfNode(node);
};

/**
 * Insert a string of `text` with optional `marks` at the current selection.
 *
 * @param {Change} change
 * @param {String} text
 * @param {Set<Mark>} marks (optional)
 */

Changes.insertText = function (change, text, marks) {
  var value = change.value;
  var document = value.document,
      selection = value.selection;

  marks = marks || selection.marks || document.getInsertMarksAtRange(selection);
  change.insertTextAtRange(selection, text, marks);

  // If the text was successfully inserted, and the selection had marks on it,
  // unset the selection's marks.
  if (selection.marks && document != change.value.document) {
    change.select({ marks: null });
  }
};

/**
 * Remove a `mark` from the characters in the current selection.
 *
 * @param {Change} change
 * @param {Mark} mark
 */

Changes.removeMark = function (change, mark) {
  mark = Mark.create(mark);
  var value = change.value;
  var document = value.document,
      selection = value.selection;


  if (selection.isExpanded) {
    change.removeMarkAtRange(selection, mark);
  } else if (selection.marks) {
    var marks = selection.marks.remove(mark);
    var sel = selection.set('marks', marks);
    change.select(sel);
  } else {
    var _marks2 = document.getActiveMarksAtRange(selection).remove(mark);
    var _sel2 = selection.set('marks', _marks2);
    change.select(_sel2);
  }
};

/**
 * Replace an `oldMark` with a `newMark` in the characters in the current selection.
 *
 * @param {Change} change
 * @param {Mark} oldMark
 * @param {Mark} newMark
 */

Changes.replaceMark = function (change, oldMark, newMark) {
  change.removeMark(oldMark);
  change.addMark(newMark);
};

/**
 * Split the block node at the current selection, to optional `depth`.
 *
 * @param {Change} change
 * @param {Number} depth (optional)
 */

Changes.splitBlock = function (change) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var value = change.value;
  var selection = value.selection,
      document = value.document;

  var marks = selection.marks || document.getInsertMarksAtRange(selection);
  change.splitBlockAtRange(selection, depth).moveToEnd();

  if (marks && marks.size !== 0) {
    change.select({ marks: marks });
  }
};

/**
 * Add or remove a `mark` from the characters in the current selection,
 * depending on whether it's already there.
 *
 * @param {Change} change
 * @param {Mark} mark
 */

Changes.toggleMark = function (change, mark) {
  mark = Mark.create(mark);
  var value = change.value;

  var exists = value.activeMarks.has(mark);

  if (exists) {
    change.removeMark(mark);
  } else {
    change.addMark(mark);
  }
};

/**
 * Wrap the current selection with prefix/suffix.
 *
 * @param {Change} change
 * @param {String} prefix
 * @param {String} suffix
 */

Changes.wrapText = function (change, prefix) {
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : prefix;
  var value = change.value;
  var selection = value.selection;

  change.wrapTextAtRange(selection, prefix, suffix);

  // If the selection was collapsed, it will have moved the start offset too.
  if (selection.isCollapsed) {
    change.moveStartBackward(prefix.length);
  }

  // Adding the suffix will have pushed the end of the selection further on, so
  // we need to move it back to account for this.
  change.moveEndBackward(suffix.length);

  // There's a chance that the selection points moved "through" each other,
  // resulting in a now-incorrect selection direction.
  if (selection.isForward != change.value.selection.isForward) {
    change.flip();
  }
};

var regexSymbolWithCombiningMarks = /(<%= allExceptCombiningMarks %>)(<%= combiningMarks %>+)/g;
var regexSurrogatePair = /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g;

var reverse = function reverse(string) {
  // Step 1: deal with combining marks and astral symbols (surrogate pairs)
  string = string
  // Swap symbols with their combining marks so the combining marks go first
  .replace(regexSymbolWithCombiningMarks, function ($_, $1, $2) {
    // Reverse the combining marks so they will end up in the same order
    // later on (after another round of reversing)
    return reverse($2) + $1;
  })
  // Swap high and low surrogates so the low surrogates go first
  .replace(regexSurrogatePair, '$2$1');

  // Step 2: reverse the code units in the string
  var result = [];
  var index = string.length;

  while (index--) {
    result.push(string.charAt(index));
  }

  return result.join('');
};

/**
 * Surrogate pair start and end points.
 *
 * @type {Number}
 */

var SURROGATE_START = 0xd800;
var SURROGATE_END = 0xdfff;

/**
 * A regex to match space characters.
 *
 * @type {RegExp}
 */

var SPACE = /\s/;

/**
 * A regex to match chameleon characters, that count as word characters as long
 * as they are inside of a word.
 *
 * @type {RegExp}
 */

var CHAMELEON = /['\u2018\u2019]/;

/**
 * A regex that matches punctuation.
 *
 * @type {RegExp}
 */

var PUNCTUATION = /[\u0021-\u0023\u0025-\u002A\u002C-\u002F\u003A\u003B\u003F\u0040\u005B-\u005D\u005F\u007B\u007D\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E3B\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;

/**
 * Is a character `code` in a surrogate character.
 *
 * @param {Number} code
 * @return {Boolean}
 */

function isSurrogate(code) {
  return SURROGATE_START <= code && code <= SURROGATE_END;
}

/**
 * Is a character a word character? Needs the `remaining` characters too.
 *
 * @param {String} char
 * @param {String|Void} remaining
 * @return {Boolean}
 */

function isWord(char, remaining) {
  if (SPACE.test(char)) return false;

  // If it's a chameleon character, recurse to see if the next one is or not.
  if (CHAMELEON.test(char)) {
    var next = remaining.charAt(0);
    var length = getCharLength(next);
    next = remaining.slice(0, length);
    var rest = remaining.slice(length);
    if (isWord(next, rest)) return true;
  }

  if (PUNCTUATION.test(char)) return false;
  return true;
}

/**
 * Get the length of a `character`.
 *
 * @param {String} char
 * @return {Number}
 */

function getCharLength(char) {
  return isSurrogate(char.charCodeAt(0)) ? 2 : 1;
}

/**
 * Get the offset to the end of the first character in `text`.
 *
 * @param {String} text
 * @return {Number}
 */

function getCharOffset(text) {
  var char = text.charAt(0);
  return getCharLength(char);
}

/**
 * Get the offset to the end of the character before an `offset` in `text`.
 *
 * @param {String} text
 * @param {Number} offset
 * @return {Number}
 */

function getCharOffsetBackward(text, offset) {
  text = text.slice(0, offset);
  text = reverse(text);
  return getCharOffset(text);
}

/**
 * Get the offset to the end of the character after an `offset` in `text`.
 *
 * @param {String} text
 * @param {Number} offset
 * @return {Number}
 */

function getCharOffsetForward(text, offset) {
  text = text.slice(offset);
  return getCharOffset(text);
}

/**
 * Get the offset to the end of the first word in `text`.
 *
 * @param {String} text
 * @return {Number}
 */

function getWordOffset(text) {
  var length = 0;
  var i = 0;
  var started = false;
  var char = void 0;

  while (char = text.charAt(i)) {
    var l = getCharLength(char);
    char = text.slice(i, i + l);
    var rest = text.slice(i + l);

    if (isWord(char, rest)) {
      started = true;
      length += l;
    } else if (!started) {
      length += l;
    } else {
      break;
    }

    i += l;
  }

  return length;
}

/**
 * Get the offset to the end of the word before an `offset` in `text`.
 *
 * @param {String} text
 * @param {Number} offset
 * @return {Number}
 */

function getWordOffsetBackward(text, offset) {
  text = text.slice(0, offset);
  text = reverse(text);
  var o = getWordOffset(text);
  return o;
}

/**
 * Get the offset to the end of the word after an `offset` in `text`.
 *
 * @param {String} text
 * @param {Number} offset
 * @return {Number}
 */

function getWordOffsetForward(text, offset) {
  text = text.slice(offset);
  var o = getWordOffset(text);
  return o;
}

/**
 * Export.
 *
 * @type {Object}
 */

var TextUtils = {
  getCharLength: getCharLength,
  getCharOffset: getCharOffset,
  getCharOffsetBackward: getCharOffsetBackward,
  getCharOffsetForward: getCharOffsetForward,
  getWordOffset: getWordOffset,
  getWordOffsetBackward: getWordOffsetBackward,
  getWordOffsetForward: getWordOffsetForward,
  isSurrogate: isSurrogate,
  isWord: isWord
};

/**
 * Changes.
 *
 * @type {Object}
 */

var Changes$1 = {};

/**
 * Add a new `mark` to the characters at `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Mixed} mark
 */

Changes$1.addMarkAtRange = function (change, range, mark) {
  if (range.isCollapsed) return;

  var value = change.value;
  var document = value.document;
  var start = range.start,
      end = range.end;

  var texts = document.getTextsAtRange(range);

  change.withoutNormalizing(function () {
    texts.forEach(function (node) {
      var key = node.key;

      var index = 0;
      var length = node.text.length;

      if (key == start.key) index = start.offset;
      if (key == end.key) length = end.offset;
      if (key == start.key && key == end.key) length = end.offset - start.offset;

      change.addMarkByKey(key, index, length, mark);
    });
  });
};

/**
 * Add a list of `marks` to the characters at `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Array<Mixed>} mark
 */

Changes$1.addMarksAtRange = function (change, range, marks) {
  marks.forEach(function (mark) {
    return change.addMarkAtRange(range, mark);
  });
};

/**
 * Delete everything in a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 */

Changes$1.deleteAtRange = function (change, range) {
  // Snapshot the selection, which creates an extra undo save point, so that
  // when you undo a delete, the expanded selection will be retained.
  change.snapshotSelection();

  var value = change.value;
  var start = range.start,
      end = range.end;

  var startKey = start.key;
  var startOffset = start.offset;
  var endKey = end.key;
  var endOffset = end.offset;
  var document = value.document,
      schema = value.schema;

  var isStartVoid = document.hasVoidParent(startKey, schema);
  var isEndVoid = document.hasVoidParent(endKey, schema);
  var startBlock = document.getClosestBlock(startKey, schema);
  var endBlock = document.getClosestBlock(endKey, schema);

  // Check if we have a "hanging" selection case where the even though the
  // selection extends into the start of the end node, we actually want to
  // ignore that for UX reasons.
  var isHanging = startOffset == 0 && endOffset == 0 && isStartVoid == false && startKey == startBlock.getFirstText().key && endKey == endBlock.getFirstText().key;

  // If it's a hanging selection, nudge it back to end in the previous text.
  if (isHanging && isEndVoid) {
    var prevText = document.getPreviousText(endKey);
    endKey = prevText.key;
    endOffset = prevText.text.length;
    isEndVoid = document.hasVoidParent(endKey, schema);
  }

  change.withoutNormalizing(function () {
    // If the start node is inside a void node, remove the void node and update
    // the starting point to be right after it, continuously until the start point
    // is not a void, or until the entire range is handled.
    while (isStartVoid) {
      var startVoid = document.getClosestVoid(startKey, schema);
      var nextText = document.getNextText(startKey);
      change.removeNodeByKey(startVoid.key);

      // If the start and end keys are the same, we're done.
      if (startKey == endKey) return;

      // If there is no next text node, we're done.
      if (!nextText) return;

      // Continue...
      document = change.value.document;
      startKey = nextText.key;
      startOffset = 0;
      isStartVoid = document.hasVoidParent(startKey, schema);
    }

    // If the end node is inside a void node, do the same thing but backwards. But
    // we don't need any aborting checks because if we've gotten this far there
    // must be a non-void node that will exit the loop.
    while (isEndVoid) {
      var endVoid = document.getClosestVoid(endKey, schema);
      var _prevText = document.getPreviousText(endKey);
      change.removeNodeByKey(endVoid.key);

      // Continue...
      document = change.value.document;
      endKey = _prevText.key;
      endOffset = _prevText.text.length;
      isEndVoid = document.hasVoidParent(endKey, schema);
    }

    // If the start and end key are the same, and it was a hanging selection, we
    // can just remove the entire block.
    if (startKey == endKey && isHanging) {
      change.removeNodeByKey(startBlock.key);
      return;
    } else if (startKey == endKey) {
      // Otherwise, if it wasn't hanging, we're inside a single text node, so we can
      // simply remove the text in the range.
      var index = startOffset;
      var length = endOffset - startOffset;
      change.removeTextByKey(startKey, index, length);
      return;
    } else {
      // Otherwise, we need to recursively remove text and nodes inside the start
      // block after the start offset and inside the end block before the end
      // offset. Then remove any blocks that are in between the start and end
      // blocks. Then finally merge the start and end nodes.
      startBlock = document.getClosestBlock(startKey);
      endBlock = document.getClosestBlock(endKey);
      var startText = document.getNode(startKey);
      var endText = document.getNode(endKey);
      var startLength = startText.text.length - startOffset;
      var endLength = endOffset;

      var ancestor = document.getCommonAncestor(startKey, endKey);
      var startChild = ancestor.getFurthestAncestor(startKey);
      var endChild = ancestor.getFurthestAncestor(endKey);

      var startParent = document.getParent(startBlock.key);
      var startParentIndex = startParent.nodes.indexOf(startBlock);
      var endParentIndex = startParent.nodes.indexOf(endBlock);

      var child = void 0;

      // Iterate through all of the nodes in the tree after the start text node
      // but inside the end child, and remove them.
      child = startText;

      while (child.key != startChild.key) {
        var parent = document.getParent(child.key);
        var _index = parent.nodes.indexOf(child);
        var afters = parent.nodes.slice(_index + 1);

        afters.reverse().forEach(function (node) {
          change.removeNodeByKey(node.key);
        });

        child = parent;
      }

      // Remove all of the middle children.
      var startChildIndex = ancestor.nodes.indexOf(startChild);
      var endChildIndex = ancestor.nodes.indexOf(endChild);
      var middles = ancestor.nodes.slice(startChildIndex + 1, endChildIndex);

      middles.reverse().forEach(function (node) {
        change.removeNodeByKey(node.key);
      });

      // Remove the nodes before the end text node in the tree.
      child = endText;

      while (child.key != endChild.key) {
        var _parent = document.getParent(child.key);
        var _index2 = _parent.nodes.indexOf(child);
        var befores = _parent.nodes.slice(0, _index2);

        befores.reverse().forEach(function (node) {
          change.removeNodeByKey(node.key);
        });

        child = _parent;
      }

      // Remove any overlapping text content from the leaf text nodes.
      if (startLength != 0) {
        change.removeTextByKey(startKey, startOffset, startLength);
      }

      if (endLength != 0) {
        change.removeTextByKey(endKey, 0, endOffset);
      }

      // If the start and end blocks aren't the same, move and merge the end block
      // into the start block.
      if (startBlock.key != endBlock.key) {
        document = change.value.document;
        var lonely = document.getFurthestOnlyChildAncestor(endBlock.key);

        // Move the end block to be right after the start block.
        if (endParentIndex != startParentIndex + 1) {
          change.moveNodeByKey(endBlock.key, startParent.key, startParentIndex + 1);
        }

        // If the selection is hanging, just remove the start block, otherwise
        // merge the end block into it.
        if (isHanging) {
          change.removeNodeByKey(startBlock.key);
        } else {
          change.mergeNodeByKey(endBlock.key);
        }

        // If nested empty blocks are left over above the end block, remove them.
        if (lonely) {
          change.removeNodeByKey(lonely.key);
        }
      }
    }
  });
};

/**
 * Delete backward until the character boundary at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 */

Changes$1.deleteCharBackwardAtRange = function (change, range) {
  var value = change.value;
  var document = value.document;
  var start = range.start;

  var startBlock = document.getClosestBlock(start.key);
  var offset = startBlock.getOffset(start.key);
  var o = offset + start.offset;
  var text = startBlock.text;

  var n = TextUtils.getCharOffsetBackward(text, o);
  change.deleteBackwardAtRange(range, n);
};

/**
 * Delete backward until the line boundary at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 */

Changes$1.deleteLineBackwardAtRange = function (change, range) {
  var value = change.value;
  var document = value.document;
  var start = range.start;

  var startBlock = document.getClosestBlock(start.key);
  var offset = startBlock.getOffset(start.key);
  var o = offset + start.offset;
  change.deleteBackwardAtRange(range, o);
};

/**
 * Delete backward until the word boundary at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 */

Changes$1.deleteWordBackwardAtRange = function (change, range) {
  var value = change.value;
  var document = value.document;
  var start = range.start;

  var startBlock = document.getClosestBlock(start.key);
  var offset = startBlock.getOffset(start.key);
  var o = offset + start.offset;
  var text = startBlock.text;

  var n = o === 0 ? 1 : TextUtils.getWordOffsetBackward(text, o);
  change.deleteBackwardAtRange(range, n);
};

/**
 * Delete backward `n` characters at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Number} n (optional)
 */

Changes$1.deleteBackwardAtRange = function (change, range) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (n === 0) return;
  var value = change.value;
  var document = value.document,
      schema = value.schema;
  var _range = range,
      start = _range.start,
      focus = _range.focus;

  // If the range is expanded, perform a regular delete instead.

  if (range.isExpanded) {
    change.deleteAtRange(range);
    return;
  }

  var voidParent = document.getClosestVoid(start.key, schema);

  // If there is a void parent, delete it.
  if (voidParent) {
    change.removeNodeByKey(voidParent.key);
    return;
  }

  var block = document.getClosestBlock(start.key);

  // If the closest is not void, but empty, remove it
  if (block && !schema.isVoid(block) && block.text === '' && document.nodes.size !== 1) {
    change.removeNodeByKey(block.key);
    return;
  }

  // If the range is at the start of the document, abort.
  if (start.isAtStartOfNode(document)) {
    return;
  }

  // If the range is at the start of the text node, we need to figure out what
  // is behind it to know how to delete...
  var text = document.getDescendant(start.key);

  if (start.isAtStartOfNode(text)) {
    var prev = document.getPreviousText(text.key);
    var prevBlock = document.getClosestBlock(prev.key);
    var prevVoid = document.getClosestVoid(prev.key, schema);

    // If the previous text node has a void parent, remove it.
    if (prevVoid) {
      change.removeNodeByKey(prevVoid.key);
      return;
    }

    // If we're deleting by one character and the previous text node is not
    // inside the current block, we need to merge the two blocks together.
    if (n == 1 && prevBlock != block) {
      range = range.moveAnchorTo(prev.key, prev.text.length);
      change.deleteAtRange(range);
      return;
    }
  }

  // If the focus offset is farther than the number of characters to delete,
  // just remove the characters backwards inside the current node.
  if (n < focus.offset) {
    range = range.moveFocusBackward(n);
    change.deleteAtRange(range);
    return;
  }

  // Otherwise, we need to see how many nodes backwards to go.
  var node = text;
  var offset = 0;
  var traversed = focus.offset;

  while (n > traversed) {
    node = document.getPreviousText(node.key);
    var next = traversed + node.text.length;

    if (n <= next) {
      offset = next - n;
      break;
    } else {
      traversed = next;
    }
  }

  range = range.moveAnchorTo(node.key, offset);
  change.deleteAtRange(range);
};

/**
 * Delete forward until the character boundary at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 */

Changes$1.deleteCharForwardAtRange = function (change, range) {
  var value = change.value;
  var document = value.document;
  var start = range.start;

  var startBlock = document.getClosestBlock(start.key);
  var offset = startBlock.getOffset(start.key);
  var o = offset + start.offset;
  var text = startBlock.text;

  var n = TextUtils.getCharOffsetForward(text, o);
  change.deleteForwardAtRange(range, n);
};

/**
 * Delete forward until the line boundary at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 */

Changes$1.deleteLineForwardAtRange = function (change, range) {
  var value = change.value;
  var document = value.document;
  var start = range.start;

  var startBlock = document.getClosestBlock(start.key);
  var offset = startBlock.getOffset(start.key);
  var o = offset + start.offset;
  change.deleteForwardAtRange(range, startBlock.text.length - o);
};

/**
 * Delete forward until the word boundary at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 */

Changes$1.deleteWordForwardAtRange = function (change, range) {
  var value = change.value;
  var document = value.document;
  var start = range.start;

  var startBlock = document.getClosestBlock(start.key);
  var offset = startBlock.getOffset(start.key);
  var o = offset + start.offset;
  var text = startBlock.text;

  var n = TextUtils.getWordOffsetForward(text, o);
  change.deleteForwardAtRange(range, n);
};

/**
 * Delete forward `n` characters at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Number} n (optional)
 */

Changes$1.deleteForwardAtRange = function (change, range) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (n === 0) return;
  var value = change.value;
  var document = value.document,
      schema = value.schema;
  var _range2 = range,
      start = _range2.start,
      focus = _range2.focus;

  // If the range is expanded, perform a regular delete instead.

  if (range.isExpanded) {
    change.deleteAtRange(range);
    return;
  }

  var voidParent = document.getClosestVoid(start.key, schema);

  // If the node has a void parent, delete it.
  if (voidParent) {
    change.removeNodeByKey(voidParent.key);
    return;
  }

  var block = document.getClosestBlock(start.key);

  // If the closest is not void, but empty, remove it
  if (block && !schema.isVoid(block) && block.text === '' && document.nodes.size !== 1) {
    var nextBlock = document.getNextBlock(block.key);
    change.removeNodeByKey(block.key);

    if (nextBlock && nextBlock.key) {
      change.moveToStartOfNode(nextBlock);
    }

    return;
  }

  // If the range is at the start of the document, abort.
  if (start.isAtEndOfNode(document)) {
    return;
  }

  // If the range is at the start of the text node, we need to figure out what
  // is behind it to know how to delete...
  var text = document.getDescendant(start.key);

  if (start.isAtEndOfNode(text)) {
    var next = document.getNextText(text.key);
    var _nextBlock = document.getClosestBlock(next.key);
    var nextVoid = document.getClosestVoid(next.key, schema);

    // If the next text node has a void parent, remove it.
    if (nextVoid) {
      change.removeNodeByKey(nextVoid.key);
      return;
    }

    // If we're deleting by one character and the previous text node is not
    // inside the current block, we need to merge the two blocks together.
    if (n == 1 && _nextBlock != block) {
      range = range.moveFocusTo(next.key, 0);
      change.deleteAtRange(range);
      return;
    }
  }

  // If the remaining characters to the end of the node is greater than or equal
  // to the number of characters to delete, just remove the characters forwards
  // inside the current node.
  if (n <= text.text.length - focus.offset) {
    range = range.moveFocusForward(n);
    change.deleteAtRange(range);
    return;
  }

  // Otherwise, we need to see how many nodes forwards to go.
  var node = text;
  var offset = focus.offset;
  var traversed = text.text.length - focus.offset;

  while (n > traversed) {
    node = document.getNextText(node.key);
    var _next = traversed + node.text.length;

    if (n <= _next) {
      offset = n - traversed;
      break;
    } else {
      traversed = _next;
    }
  }

  range = range.moveFocusTo(node.key, offset);
  change.deleteAtRange(range);
};

/**
 * Insert a `block` node at `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Block|String|Object} block
 */

Changes$1.insertBlockAtRange = function (change, range, block) {
  block = Block.create(block);

  if (range.isExpanded) {
    change.deleteAtRange(range);
    range = range.moveToStart();
  }

  var value = change.value;
  var document = value.document,
      schema = value.schema;
  var _range3 = range,
      start = _range3.start;

  var startKey = start.key;
  var startOffset = start.offset;
  var startBlock = document.getClosestBlock(startKey);
  var startInline = document.getClosestInline(startKey);
  var parent = document.getParent(startBlock.key);
  var index = parent.nodes.indexOf(startBlock);

  if (schema.isVoid(startBlock)) {
    var extra = start.isAtEndOfNode(startBlock) ? 1 : 0;
    change.insertNodeByKey(parent.key, index + extra, block);
  } else if (!startInline && startBlock.text === '') {
    change.insertNodeByKey(parent.key, index + 1, block);
  } else if (start.isAtStartOfNode(startBlock)) {
    change.insertNodeByKey(parent.key, index, block);
  } else if (start.isAtEndOfNode(startBlock)) {
    change.insertNodeByKey(parent.key, index + 1, block);
  } else {
    if (startInline && schema.isVoid(startInline)) {
      var atEnd = start.isAtEndOfNode(startInline);
      var siblingText = atEnd ? document.getNextText(startKey) : document.getPreviousText(startKey);

      var splitRange = atEnd ? range.moveToStartOfNode(siblingText) : range.moveToEndOfNode(siblingText);

      startKey = splitRange.start.key;
      startOffset = splitRange.start.offset;
    }

    change.withoutNormalizing(function () {
      change.splitDescendantsByKey(startBlock.key, startKey, startOffset);
      change.insertNodeByKey(parent.key, index + 1, block);
    });
  }
};

/**
 * Insert a `fragment` at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Document} fragment
 */

Changes$1.insertFragmentAtRange = function (change, range, fragment) {
  change.withoutNormalizing(function () {
    // If the range is expanded, delete it first.
    if (range.isExpanded) {
      change.deleteAtRange(range);

      if (change.value.document.getDescendant(range.start.key)) {
        range = range.moveToStart();
      } else {
        range = range.moveTo(range.end.key, 0).normalize(change.value.document);
      }
    }

    // If the fragment is empty, there's nothing to do after deleting.
    if (!fragment.nodes.size) return;

    // Regenerate the keys for all of the fragments nodes, so that they're
    // guaranteed not to collide with the existing keys in the document. Otherwise
    // they will be rengerated automatically and we won't have an easy way to
    // reference them.
    fragment = fragment.mapDescendants(function (child) {
      return child.regenerateKey();
    });

    // Calculate a few things...
    var _range4 = range,
        start = _range4.start;
    var value = change.value;
    var schema = value.schema;
    var document = value.document;

    var startText = document.getDescendant(start.key);
    var startBlock = document.getClosestBlock(startText.key);
    var startChild = startBlock.getFurthestAncestor(startText.key);
    var isAtStart = start.isAtStartOfNode(startBlock);
    var parent = document.getParent(startBlock.key);
    var index = parent.nodes.indexOf(startBlock);
    var blocks = fragment.getBlocks();
    var firstChild = fragment.nodes.first();
    var lastChild = fragment.nodes.last();
    var firstBlock = blocks.first();
    var lastBlock = blocks.last();

    // If the fragment only contains a void block, use `insertBlock` instead.
    if (firstBlock === lastBlock && schema.isVoid(firstBlock)) {
      change.insertBlockAtRange(range, firstBlock);
      return;
    }

    // If the fragment starts or ends with single nested block, (e.g., table),
    // do not merge this fragment with existing blocks.
    if (firstChild.hasBlockChildren() || lastChild.hasBlockChildren()) {
      fragment.nodes.reverse().forEach(function (node) {
        change.insertBlockAtRange(range, node);
      });
      return;
    }

    // If the first and last block aren't the same, we need to insert all of the
    // nodes after the fragment's first block at the index.
    if (firstBlock != lastBlock) {
      var lonelyParent = fragment.getFurthest(firstBlock.key, function (p) {
        return p.nodes.size == 1;
      });
      var lonelyChild = lonelyParent || firstBlock;
      var startIndex = parent.nodes.indexOf(startBlock);
      fragment = fragment.removeNode(lonelyChild.key);

      fragment.nodes.forEach(function (node, i) {
        var newIndex = startIndex + i + 1;
        change.insertNodeByKey(parent.key, newIndex, node);
      });
    }

    // Check if we need to split the node.
    if (start.offset != 0) {
      change.splitDescendantsByKey(startChild.key, start.key, start.offset);
    }

    // Update our variables with the new value.
    document = change.value.document;
    startText = document.getDescendant(start.key);
    startBlock = document.getClosestBlock(start.key);
    startChild = startBlock.getFurthestAncestor(startText.key);

    // If the first and last block aren't the same, we need to move any of the
    // starting block's children after the split into the last block of the
    // fragment, which has already been inserted.
    if (firstBlock != lastBlock) {
      var nextChild = isAtStart ? startChild : startBlock.getNextSibling(startChild.key);
      var nextNodes = nextChild ? startBlock.nodes.skipUntil(function (n) {
        return n.key == nextChild.key;
      }) : immutable.List();
      var lastIndex = lastBlock.nodes.size;

      nextNodes.forEach(function (node, i) {
        var newIndex = lastIndex + i;
        change.moveNodeByKey(node.key, lastBlock.key, newIndex);
      });
    }

    // If the starting block is empty, we replace it entirely with the first block
    // of the fragment, since this leads to a more expected behavior for the user.
    if (!schema.isVoid(startBlock) && startBlock.text === '') {
      change.removeNodeByKey(startBlock.key);
      change.insertNodeByKey(parent.key, index, firstBlock);
    } else {
      // Otherwise, we maintain the starting block, and insert all of the first
      // block's inline nodes into it at the split point.
      var inlineChild = startBlock.getFurthestAncestor(startText.key);
      var inlineIndex = startBlock.nodes.indexOf(inlineChild);

      firstBlock.nodes.forEach(function (inline, i) {
        var o = start.offset == 0 ? 0 : 1;
        var newIndex = inlineIndex + i + o;
        change.insertNodeByKey(startBlock.key, newIndex, inline);
      });
    }
  });
};

/**
 * Insert an `inline` node at `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Inline|String|Object} inline
 */

Changes$1.insertInlineAtRange = function (change, range, inline) {
  inline = Inline.create(inline);

  change.withoutNormalizing(function () {
    if (range.isExpanded) {
      change.deleteAtRange(range);
      range = range.moveToStart();
    }

    var value = change.value;
    var document = value.document,
        schema = value.schema;
    var _range5 = range,
        start = _range5.start;

    var parent = document.getParent(start.key);
    var startText = document.assertDescendant(start.key);
    var index = parent.nodes.indexOf(startText);

    if (schema.isVoid(parent)) return;

    change.splitNodeByKey(start.key, start.offset);
    change.insertNodeByKey(parent.key, index + 1, inline);
  });
};

/**
 * Insert `text` at a `range`, with optional `marks`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {String} text
 * @param {Set<Mark>} marks (optional)
 */

Changes$1.insertTextAtRange = function (change, range, text, marks) {
  var value = change.value;
  var document = value.document,
      schema = value.schema;
  var start = range.start;

  var key = start.key;
  var offset = start.offset;
  var parent = document.getParent(start.key);

  if (schema.isVoid(parent)) {
    return;
  }

  change.withoutNormalizing(function () {
    if (range.isExpanded) {
      change.deleteAtRange(range);

      // Update range start after delete
      if (change.value.selection.start.key !== key) {
        key = change.value.selection.start.key;
        offset = change.value.selection.start.offset;
      }
    }

    change.insertTextByKey(key, offset, text, marks);
  });
};

/**
 * Remove an existing `mark` to the characters at `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Mark|String} mark (optional)
 */

Changes$1.removeMarkAtRange = function (change, range, mark) {
  if (range.isCollapsed) return;

  var value = change.value;
  var document = value.document;

  var texts = document.getTextsAtRange(range);
  var start = range.start,
      end = range.end;


  change.withoutNormalizing(function () {
    texts.forEach(function (node) {
      var key = node.key;

      var index = 0;
      var length = node.text.length;

      if (key == start.key) index = start.offset;
      if (key == end.key) length = end.offset;
      if (key == start.key && key == end.key) length = end.offset - start.offset;

      change.removeMarkByKey(key, index, length, mark);
    });
  });
};

/**
 * Set the `properties` of block nodes in a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Object|String} properties
 */

Changes$1.setBlocksAtRange = function (change, range, properties) {
  var value = change.value;
  var document = value.document,
      schema = value.schema;

  var blocks = document.getBlocksAtRange(range);

  var start = range.start,
      end = range.end,
      isCollapsed = range.isCollapsed;

  var isStartVoid = document.hasVoidParent(start.key, schema);
  var startBlock = document.getClosestBlock(start.key);
  var endBlock = document.getClosestBlock(end.key);

  // Check if we have a "hanging" selection case where the even though the
  // selection extends into the start of the end node, we actually want to
  // ignore that for UX reasons.
  var isHanging = isCollapsed == false && start.offset == 0 && end.offset == 0 && isStartVoid == false && start.key == startBlock.getFirstText().key && end.key == endBlock.getFirstText().key;

  // If it's a hanging selection, ignore the last block.
  var sets = isHanging ? blocks.slice(0, -1) : blocks;

  change.withoutNormalizing(function () {
    sets.forEach(function (block) {
      change.setNodeByKey(block.key, properties);
    });
  });
};

/**
 * Set the `properties` of inline nodes in a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Object|String} properties
 */

Changes$1.setInlinesAtRange = function (change, range, properties) {
  var value = change.value;
  var document = value.document;

  var inlines = document.getInlinesAtRange(range);

  change.withoutNormalizing(function () {
    inlines.forEach(function (inline) {
      change.setNodeByKey(inline.key, properties);
    });
  });
};

/**
 * Split the block nodes at a `range`, to optional `height`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Number} height (optional)
 */

Changes$1.splitBlockAtRange = function (change, range) {
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var _range6 = range,
      start = _range6.start,
      end = _range6.end;
  var value = change.value;
  var _value = value,
      document = _value.document;

  var node = document.assertDescendant(start.key);
  var parent = document.getClosestBlock(node.key);
  var h = 0;

  while (parent && parent.object == 'block' && h < height) {
    node = parent;
    parent = document.getClosestBlock(parent.key);
    h++;
  }

  change.withoutNormalizing(function () {
    change.splitDescendantsByKey(node.key, start.key, start.offset);

    value = change.value;
    document = value.document;

    if (range.isExpanded) {
      if (range.isBackward) range = range.flip();
      var nextBlock = document.getNextBlock(node.key);
      range = range.moveAnchorToStartOfNode(nextBlock);
      range = range.setFocus(range.focus.setPath(null));

      if (start.key === end.key) {
        range = range.moveFocusTo(range.anchor.key, end.offset - start.offset);
      }

      range = document.resolveRange(range);
      change.deleteAtRange(range);
    }
  });
};

/**
 * Split the inline nodes at a `range`, to optional `height`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Number} height (optional)
 */

Changes$1.splitInlineAtRange = function (change, range) {
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;

  if (range.isExpanded) {
    change.deleteAtRange(range);
    range = range.moveToStart();
  }

  var _range7 = range,
      start = _range7.start;
  var value = change.value;
  var document = value.document;

  var node = document.assertDescendant(start.key);
  var parent = document.getClosestInline(node.key);
  var h = 0;

  while (parent && parent.object == 'inline' && h < height) {
    node = parent;
    parent = document.getClosestInline(parent.key);
    h++;
  }

  change.splitDescendantsByKey(node.key, start.key, start.offset);
};

/**
 * Add or remove a `mark` from the characters at `range`, depending on whether
 * it's already there.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Mixed} mark
 */

Changes$1.toggleMarkAtRange = function (change, range, mark) {
  if (range.isCollapsed) return;

  mark = Mark.create(mark);

  var value = change.value;
  var document = value.document;

  var marks = document.getActiveMarksAtRange(range);
  var exists = marks.some(function (m) {
    return m.equals(mark);
  });

  if (exists) {
    change.removeMarkAtRange(range, mark);
  } else {
    change.addMarkAtRange(range, mark);
  }
};

/**
 * Unwrap all of the block nodes in a `range` from a block with `properties`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {String|Object} properties
 */

Changes$1.unwrapBlockAtRange = function (change, range, properties) {
  properties = Node.createProperties(properties);

  var value = change.value;
  var document = value.document;

  var blocks = document.getBlocksAtRange(range);
  var wrappers = blocks.map(function (block) {
    return document.getClosest(block.key, function (parent) {
      if (parent.object != 'block') return false;
      if (properties.type != null && parent.type != properties.type) return false;
      if (properties.data != null && !parent.data.isSuperset(properties.data)) return false;
      return true;
    });
  }).filter(function (exists) {
    return exists;
  }).toOrderedSet().toList();

  change.withoutNormalizing(function () {
    wrappers.forEach(function (block) {
      var first = block.nodes.first();
      var last = block.nodes.last();
      var parent = document.getParent(block.key);
      var index = parent.nodes.indexOf(block);

      var children = block.nodes.filter(function (child) {
        return blocks.some(function (b) {
          return child == b || child.hasDescendant(b.key);
        });
      });

      var firstMatch = children.first();
      var lastMatch = children.last();

      if (first == firstMatch && last == lastMatch) {
        block.nodes.forEach(function (child, i) {
          change.moveNodeByKey(child.key, parent.key, index + i);
        });

        change.removeNodeByKey(block.key);
      } else if (last == lastMatch) {
        block.nodes.skipUntil(function (n) {
          return n == firstMatch;
        }).forEach(function (child, i) {
          change.moveNodeByKey(child.key, parent.key, index + 1 + i);
        });
      } else if (first == firstMatch) {
        block.nodes.takeUntil(function (n) {
          return n == lastMatch;
        }).push(lastMatch).forEach(function (child, i) {
          change.moveNodeByKey(child.key, parent.key, index + i);
        });
      } else {
        var firstText = firstMatch.getFirstText();

        change.splitDescendantsByKey(block.key, firstText.key, 0);

        document = change.value.document;

        children.forEach(function (child, i) {
          if (i == 0) {
            var extra = child;
            child = document.getNextBlock(child.key);
            change.removeNodeByKey(extra.key);
          }

          change.moveNodeByKey(child.key, parent.key, index + 1 + i);
        });
      }
    });
  });
};

/**
 * Unwrap the inline nodes in a `range` from an inline with `properties`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {String|Object} properties
 */

Changes$1.unwrapInlineAtRange = function (change, range, properties) {
  properties = Node.createProperties(properties);

  var value = change.value;
  var document = value.document;

  var texts = document.getTextsAtRange(range);
  var inlines = texts.map(function (text) {
    return document.getClosest(text.key, function (parent) {
      if (parent.object != 'inline') return false;
      if (properties.type != null && parent.type != properties.type) return false;
      if (properties.data != null && !parent.data.isSuperset(properties.data)) return false;
      return true;
    });
  }).filter(function (exists) {
    return exists;
  }).toOrderedSet().toList();

  change.withoutNormalizing(function () {
    inlines.forEach(function (inline) {
      var parent = change.value.document.getParent(inline.key);
      var index = parent.nodes.indexOf(inline);

      inline.nodes.forEach(function (child, i) {
        change.moveNodeByKey(child.key, parent.key, index + i);
      });

      change.removeNodeByKey(inline.key);
    });
  });
};

/**
 * Wrap all of the blocks in a `range` in a new `block`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Block|Object|String} block
 */

Changes$1.wrapBlockAtRange = function (change, range, block) {
  block = Block.create(block);
  block = block.set('nodes', block.nodes.clear());

  var value = change.value;
  var document = value.document;


  var blocks = document.getBlocksAtRange(range);
  var firstblock = blocks.first();
  var lastblock = blocks.last();
  var parent = void 0,
      siblings = void 0,
      index = void 0;

  // If there is only one block in the selection then we know the parent and
  // siblings.
  if (blocks.length === 1) {
    parent = document.getParent(firstblock.key);
    siblings = blocks;
  } else {
    // Determine closest shared parent to all blocks in selection.
    parent = document.getClosest(firstblock.key, function (p1) {
      return !!document.getClosest(lastblock.key, function (p2) {
        return p1 == p2;
      });
    });
  }

  // If no shared parent could be found then the parent is the document.
  if (parent == null) parent = document;

  // Create a list of direct children siblings of parent that fall in the
  // selection.
  if (siblings == null) {
    var indexes = parent.nodes.reduce(function (ind, node, i) {
      if (node == firstblock || node.hasDescendant(firstblock.key)) ind[0] = i;
      if (node == lastblock || node.hasDescendant(lastblock.key)) ind[1] = i;
      return ind;
    }, []);

    index = indexes[0];
    siblings = parent.nodes.slice(indexes[0], indexes[1] + 1);
  }

  // Get the index to place the new wrapped node at.
  if (index == null) {
    index = parent.nodes.indexOf(siblings.first());
  }

  change.withoutNormalizing(function () {
    // Inject the new block node into the parent.
    change.insertNodeByKey(parent.key, index, block);

    // Move the sibling nodes into the new block node.
    siblings.forEach(function (node, i) {
      change.moveNodeByKey(node.key, block.key, i);
    });
  });
};

/**
 * Wrap the text and inlines in a `range` in a new `inline`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Inline|Object|String} inline
 */

Changes$1.wrapInlineAtRange = function (change, range, inline) {
  var value = change.value;
  var document = value.document,
      schema = value.schema;
  var start = range.start,
      end = range.end;


  if (range.isCollapsed) {
    // Wrapping an inline void
    var inlineParent = document.getClosestInline(start.key);

    if (!schema.isVoid(inlineParent)) {
      return;
    }

    return change.wrapInlineByKey(inlineParent.key, inline);
  }

  inline = Inline.create(inline);
  inline = inline.set('nodes', inline.nodes.clear());

  var blocks = document.getBlocksAtRange(range);
  var startBlock = document.getClosestBlock(start.key);
  var endBlock = document.getClosestBlock(end.key);
  var startInline = document.getClosestInline(start.key);
  var endInline = document.getClosestInline(end.key);
  var startChild = startBlock.getFurthestAncestor(start.key);
  var endChild = endBlock.getFurthestAncestor(end.key);

  change.withoutNormalizing(function () {
    if (!startInline || startInline != endInline) {
      change.splitDescendantsByKey(endChild.key, end.key, end.offset);
      change.splitDescendantsByKey(startChild.key, start.key, start.offset);
    }

    document = change.value.document;
    startBlock = document.getDescendant(startBlock.key);
    endBlock = document.getDescendant(endBlock.key);
    startChild = startBlock.getFurthestAncestor(start.key);
    endChild = endBlock.getFurthestAncestor(end.key);
    var startIndex = startBlock.nodes.indexOf(startChild);
    var endIndex = endBlock.nodes.indexOf(endChild);

    if (startInline && startInline == endInline) {
      var text = startBlock.getTextsAtRange(range).get(0).splitText(start.offset)[1].splitText(end.offset - start.offset)[0];

      inline = inline.set('nodes', immutable.List([text]));
      change.insertInlineAtRange(range, inline);

      var inlinekey = inline.getFirstText().key;
      var rng = {
        anchor: {
          key: inlinekey,
          offset: 0
        },
        focus: {
          key: inlinekey,
          offset: end.offset - start.offset
        },
        isFocused: true
      };
      change.select(rng);
    } else if (startBlock == endBlock) {
      document = change.value.document;
      startBlock = document.getClosestBlock(start.key);
      startChild = startBlock.getFurthestAncestor(start.key);

      var startInner = document.getNextSibling(startChild.key);
      var startInnerIndex = startBlock.nodes.indexOf(startInner);
      var endInner = start.key == end.key ? startInner : startBlock.getFurthestAncestor(end.key);
      var inlines = startBlock.nodes.skipUntil(function (n) {
        return n == startInner;
      }).takeUntil(function (n) {
        return n == endInner;
      }).push(endInner);

      var node = inline.regenerateKey();

      change.insertNodeByKey(startBlock.key, startInnerIndex, node);

      inlines.forEach(function (child, i) {
        change.moveNodeByKey(child.key, node.key, i);
      });
    } else {
      var startInlines = startBlock.nodes.slice(startIndex + 1);
      var endInlines = endBlock.nodes.slice(0, endIndex + 1);
      var startNode = inline.regenerateKey();
      var endNode = inline.regenerateKey();

      change.insertNodeByKey(startBlock.key, startIndex + 1, startNode);
      change.insertNodeByKey(endBlock.key, endIndex, endNode);

      startInlines.forEach(function (child, i) {
        change.moveNodeByKey(child.key, startNode.key, i);
      });

      endInlines.forEach(function (child, i) {
        change.moveNodeByKey(child.key, endNode.key, i);
      });

      blocks.slice(1, -1).forEach(function (block) {
        var node = inline.regenerateKey();
        change.insertNodeByKey(block.key, 0, node);

        block.nodes.forEach(function (child, i) {
          change.moveNodeByKey(child.key, node.key, i);
        });
      });
    }
  });
};

/**
 * Wrap the text in a `range` in a prefix/suffix.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {String} prefix
 * @param {String} suffix (optional)
 */

Changes$1.wrapTextAtRange = function (change, range, prefix) {
  var suffix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : prefix;
  var start = range.start,
      end = range.end;

  var startRange = range.moveToStart();
  var endRange = range.moveToEnd();

  if (start.key == end.key) {
    endRange = endRange.moveForward(prefix.length);
  }

  change.withoutNormalizing(function () {
    change.insertTextAtRange(startRange, prefix, []);
    change.insertTextAtRange(endRange, suffix, []);
  });
};

/**
 * Compare paths `path` and `b` to see which is before or after.
 *
 * @param {List} path
 * @param {List} b
 * @return {Number|Null}
 */

function compare(path, target) {
  // PERF: if the paths are not the same size we can exit early.
  if (path.size !== target.size) return null;

  for (var i = 0; i < path.size; i++) {
    var pv = path.get(i);
    var tv = target.get(i);

    // If the path's value is ever less than the target's, it's before.
    if (pv < tv) return -1;

    // If the target's value is ever less than the path's, it's after.
    if (pv > tv) return 1;
  }

  // Otherwise they were equal the whole way, it's the same.
  return 0;
}

/**
 * Create a path from `attrs`.
 *
 * @param {Array|List} attrs
 * @return {List}
 */

function create$1(attrs) {
  if (attrs == null) {
    return null;
  }

  if (immutable.List.isList(attrs)) {
    return attrs;
  }

  if (Array.isArray(attrs)) {
    return immutable.List(attrs);
  }

  throw new Error('Paths can only be created from arrays or lists, but you passed: ' + attrs);
}

/**
 * Crop paths `a` and `b` to an equal size, defaulting to the shortest.
 *
 * @param {List} a
 * @param {List} b
 */

function crop(a, b) {
  var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : min(a, b);

  var ca = a.slice(0, size);
  var cb = b.slice(0, size);
  return [ca, cb];
}

/**
 * Decrement a `path` by `n` at `index`, defaulting to the last index.
 *
 * @param {List} path
 * @param {Number} n
 * @param {Number} index
 */

function decrement(path) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : path.size - 1;

  return increment(path, 0 - n, index);
}

/**
 * Increment a `path` by `n` at `index`, defaulting to the last index.
 *
 * @param {List} path
 * @param {Number} n
 * @param {Number} index
 */

function increment(path) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : path.size - 1;

  var value = path.get(index);
  var newValue = value + n;
  var newPath = path.set(index, newValue);
  return newPath;
}

/**
 * Is a `path` above another `target` path?
 *
 * @param {List} path
 * @param {List} target
 * @return {Boolean}
 */

function isAbove(path, target) {
  var _crop = crop(path, target),
      _crop2 = slicedToArray(_crop, 2),
      p = _crop2[0],
      t = _crop2[1];

  return path.size < target.size && compare(p, t) === 0;
}

/**
 * Is a `path` after another `target` path in a document?
 *
 * @param {List} path
 * @param {List} target
 * @return {Boolean}
 */

function isAfter(path, target) {
  var _crop3 = crop(path, target),
      _crop4 = slicedToArray(_crop3, 2),
      p = _crop4[0],
      t = _crop4[1];

  return compare(p, t) === 1;
}

/**
 * Is a `path` before another `target` path in a document?
 *
 * @param {List} path
 * @param {List} target
 * @return {Boolean}
 */

function isBefore(path, target) {
  var _crop5 = crop(path, target),
      _crop6 = slicedToArray(_crop5, 2),
      p = _crop6[0],
      t = _crop6[1];

  return compare(p, t) === -1;
}

/**
 * Is a `path` equal to another `target` path in a document?
 *
 * @param {List} path
 * @param {List} target
 * @return {Boolean}
 */

function isEqual(path, target) {
  return path.equals(target);
}

/**
 * Is a `path` a sibling of a `target` path?
 *
 * @param {List} path
 * @param {List} target
 * @return {Boolean}
 */

function isSibling(path, target) {
  if (path.size !== target.size) return false;
  var p = path.butLast();
  var t = target.butLast();
  return p.equals(t);
}

/**
 * Lift a `path` to refer to its parent.
 *
 * @param {List} path
 * @return {Array}
 */

function lift(path) {
  var parent = path.slice(0, -1);
  return parent;
}

/**
 * Get the maximum length of paths `a` and `b`.
 *
 * @param {List} path
 * @param {List} path
 * @return {Number}
 */

function max(a, b) {
  var n = Math.max(a.size, b.size);
  return n;
}

/**
 * Get the minimum length of paths `a` and `b`.
 *
 * @param {List} path
 * @param {List} path
 * @return {Number}
 */

function min(a, b) {
  var n = Math.min(a.size, b.size);
  return n;
}

/**
 * Get the common ancestor path of path `a` and path `b`.
 *
 * @param {List} a
 * @param {List} b
 * @return {List}
 */

function relate(a, b) {
  var array = [];

  for (var i = 0; i < a.size && i < b.size; i++) {
    var av = a.get(i);
    var bv = b.get(i);

    // If the values aren't equal, they've diverged and don't share an ancestor.
    if (av !== bv) break;

    // Otherwise, the current value is still a common ancestor.
    array.push(av);
  }

  var path = create$1(array);
  return path;
}

/**
 * Export.
 *
 * @type {Object}
 */

var PathUtils = {
  compare: compare,
  create: create$1,
  crop: crop,
  decrement: decrement,
  increment: increment,
  isAbove: isAbove,
  isAfter: isAfter,
  isBefore: isBefore,
  isEqual: isEqual,
  isSibling: isSibling,
  lift: lift,
  max: max,
  min: min,
  relate: relate
};

/**
 * Changes.
 *
 * @type {Object}
 */

var Changes$2 = {};

/**
 * Add mark to text at `offset` and `length` in node by `path`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Number} offset
 * @param {Number} length
 * @param {Mixed} mark
 */

Changes$2.addMarkByPath = function (change, path, offset, length, mark) {
  mark = Mark.create(mark);
  var value = change.value;
  var document = value.document;

  var node = document.assertNode(path);
  var leaves = node.getLeaves();

  var operations = [];
  var bx = offset;
  var by = offset + length;
  var o = 0;

  leaves.forEach(function (leaf) {
    var ax = o;
    var ay = ax + leaf.text.length;

    o += leaf.text.length;

    // If the leaf doesn't overlap with the operation, continue on.
    if (ay < bx || by < ax) return;

    // If the leaf already has the mark, continue on.
    if (leaf.marks.has(mark)) return;

    // Otherwise, determine which offset and characters overlap.
    var start = Math.max(ax, bx);
    var end = Math.min(ay, by);

    operations.push({
      type: 'add_mark',
      value: value,
      path: path,
      offset: start,
      length: end - start,
      mark: mark
    });
  });

  change.applyOperations(operations);
};

/**
 * Insert a `fragment` at `index` in a node by `path`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Number} index
 * @param {Fragment} fragment
 */

Changes$2.insertFragmentByPath = function (change, path, index, fragment) {
  fragment.nodes.forEach(function (node, i) {
    change.insertNodeByPath(path, index + i, node);
  });
};

/**
 * Insert a `node` at `index` in a node by `path`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Number} index
 * @param {Node} node
 */

Changes$2.insertNodeByPath = function (change, path, index, node) {
  var value = change.value;


  change.applyOperation({
    type: 'insert_node',
    value: value,
    path: path.concat(index),
    node: node
  });
};

/**
 * Insert `text` at `offset` in node by `path`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Number} offset
 * @param {String} text
 * @param {Set<Mark>} marks (optional)
 */

Changes$2.insertTextByPath = function (change, path, offset, text, marks) {
  var value = change.value;
  var document = value.document;

  var node = document.assertNode(path);
  marks = marks || node.getMarksAtIndex(offset);

  change.applyOperation({
    type: 'insert_text',
    value: value,
    path: path,
    offset: offset,
    text: text,
    marks: marks
  });
};

/**
 * Merge a node by `path` with the previous node.
 *
 * @param {Change} change
 * @param {Array} path
 */

Changes$2.mergeNodeByPath = function (change, path) {
  var value = change.value;
  var document = value.document;

  var original = document.getDescendant(path);
  var previous = document.getPreviousSibling(path);

  if (!previous) {
    throw new Error('Unable to merge node with path "' + path + '", because it has no previous sibling.');
  }

  var position = previous.object == 'text' ? previous.text.length : previous.nodes.size;

  change.applyOperation({
    type: 'merge_node',
    value: value,
    path: path,
    position: position,
    // for undos to succeed we only need the type and data because
    // these are the only properties that get changed in the merge operation
    properties: {
      type: original.type,
      data: original.data
    },
    target: null
  });
};

/**
 * Move a node by `path` to a new parent by `newPath` and `index`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {String} newPath
 * @param {Number} index
 */

Changes$2.moveNodeByPath = function (change, path, newPath, newIndex) {
  var value = change.value;


  change.applyOperation({
    type: 'move_node',
    value: value,
    path: path,
    newPath: newPath.concat(newIndex)
  });
};

/**
 * Remove mark from text at `offset` and `length` in node by `path`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Number} offset
 * @param {Number} length
 * @param {Mark} mark
 */

Changes$2.removeMarkByPath = function (change, path, offset, length, mark) {
  mark = Mark.create(mark);
  var value = change.value;
  var document = value.document;

  var node = document.assertNode(path);
  var leaves = node.getLeaves();

  var operations = [];
  var bx = offset;
  var by = offset + length;
  var o = 0;

  leaves.forEach(function (leaf) {
    var ax = o;
    var ay = ax + leaf.text.length;

    o += leaf.text.length;

    // If the leaf doesn't overlap with the operation, continue on.
    if (ay < bx || by < ax) return;

    // If the leaf already has the mark, continue on.
    if (!leaf.marks.has(mark)) return;

    // Otherwise, determine which offset and characters overlap.
    var start = Math.max(ax, bx);
    var end = Math.min(ay, by);

    operations.push({
      type: 'remove_mark',
      value: value,
      path: path,
      offset: start,
      length: end - start,
      mark: mark
    });
  });

  change.applyOperations(operations);
};

/**
 * Remove all `marks` from node by `path`.
 *
 * @param {Change} change
 * @param {Array} path
 */

Changes$2.removeAllMarksByPath = function (change, path) {
  var state = change.state;
  var document = state.document;

  var node = document.assertNode(path);
  var texts = node.object === 'text' ? [node] : node.getTextsAsArray();

  texts.forEach(function (text) {
    text.getMarksAsArray().forEach(function (mark) {
      change.removeMarkByKey(text.key, 0, text.text.length, mark);
    });
  });
};

/**
 * Remove a node by `path`.
 *
 * @param {Change} change
 * @param {Array} path
 */

Changes$2.removeNodeByPath = function (change, path) {
  var value = change.value;
  var document = value.document;

  var node = document.assertNode(path);

  change.applyOperation({
    type: 'remove_node',
    value: value,
    path: path,
    node: node
  });
};

/**
 * Remove text at `offset` and `length` in node by `path`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Number} offset
 * @param {Number} length
 */

Changes$2.removeTextByPath = function (change, path, offset, length) {
  var value = change.value;
  var document = value.document;

  var node = document.assertNode(path);
  var leaves = node.getLeaves();
  var text = node.text;


  var removals = [];
  var bx = offset;
  var by = offset + length;
  var o = 0;

  leaves.forEach(function (leaf) {
    var ax = o;
    var ay = ax + leaf.text.length;

    o += leaf.text.length;

    // If the leaf doesn't overlap with the removal, continue on.
    if (ay < bx || by < ax) return;

    // Otherwise, determine which offset and characters overlap.
    var start = Math.max(ax, bx);
    var end = Math.min(ay, by);
    var string = text.slice(start, end);

    removals.push({
      type: 'remove_text',
      value: value,
      path: path,
      offset: start,
      text: string,
      marks: leaf.marks
    });
  });

  // Apply in reverse order, so subsequent removals don't impact previous ones.
  change.applyOperations(removals.reverse());
};

/**
`* Replace a `node` with another `node`
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Object|Node} node
 */

Changes$2.replaceNodeByPath = function (change, path, newNode) {
  newNode = Node.create(newNode);
  var index = path.last();
  var parentPath = PathUtils.lift(path);

  change.withoutNormalizing(function () {
    change.removeNodeByPath(path);
    change.insertNodeByPath(parentPath, index, newNode);
  });
};

/**
 * Replace A Length of Text with another string or text
 * @param {Change} change
 * @param {String} key
 * @param {Number} offset
 * @param {Number} length
 * @param {string} text
 * @param {Set<Mark>} marks (optional)
 */

Changes$2.replaceTextByPath = function (change, path, offset, length, text, marks) {
  var document = change.value.document;

  var node = document.assertNode(path);

  if (length + offset > node.text.length) {
    length = node.text.length - offset;
  }

  var range = document.createRange({
    anchor: { path: path, offset: offset },
    focus: { path: path, offset: offset + length }
  });

  var activeMarks = document.getActiveMarksAtRange(range);

  change.withoutNormalizing(function () {
    change.removeTextByPath(path, offset, length);

    if (!marks) {
      // Do not use mark at index when marks and activeMarks are both empty
      marks = activeMarks ? activeMarks : [];
    } else if (activeMarks) {
      // Do not use `has` because we may want to reset marks like font-size with
      // an updated data;
      activeMarks = activeMarks.filter(function (activeMark) {
        return !marks.find(function (m) {
          return activeMark.type === m.type;
        });
      });

      marks = activeMarks.merge(marks);
    }

    change.insertTextByPath(path, offset, text, marks);
  });
};

/**
 * Set `properties` on mark on text at `offset` and `length` in node by `path`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Number} offset
 * @param {Number} length
 * @param {Mark} mark
 */

Changes$2.setMarkByPath = function (change, path, offset, length, mark, properties) {
  mark = Mark.create(mark);
  properties = Mark.createProperties(properties);
  var value = change.value;


  change.applyOperation({
    type: 'set_mark',
    value: value,
    path: path,
    offset: offset,
    length: length,
    mark: mark,
    properties: properties
  });
};

/**
 * Set `properties` on a node by `path`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Object|String} properties
 */

Changes$2.setNodeByPath = function (change, path, properties) {
  properties = Node.createProperties(properties);
  var value = change.value;
  var document = value.document;

  var node = document.assertNode(path);

  change.applyOperation({
    type: 'set_node',
    value: value,
    path: path,
    node: node,
    properties: properties
  });
};

/**
 * Insert `text` at `offset` in node by `path`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {String} text
 * @param {Set<Mark>} marks (optional)
 */

Changes$2.setTextByPath = function (change, path, text, marks) {
  var value = change.value;
  var document = value.document;

  var node = document.assertNode(path);
  var end = node.text.length;
  change.replaceTextByPath(path, 0, end, text, marks);
};

/**
 * Split a node by `path` at `position`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Number} position
 * @param {Object} options
 */

Changes$2.splitNodeByPath = function (change, path, position) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$target = options.target,
      target = _options$target === undefined ? null : _options$target;
  var value = change.value;
  var document = value.document;

  var node = document.getDescendant(path);

  change.applyOperation({
    type: 'split_node',
    value: value,
    path: path,
    position: position,
    target: target,
    properties: {
      type: node.type,
      data: node.data
    }
  });
};

/**
 * Split a node deeply down the tree by `path`, `textPath` and `textOffset`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Array} textPath
 * @param {Number} textOffset
 */

Changes$2.splitDescendantsByPath = function (change, path, textPath, textOffset) {
  if (path.equals(textPath)) {
    change.splitNodeByPath(textPath, textOffset);
    return;
  }

  var value = change.value;
  var document = value.document;

  var node = document.assertNode(path);
  var text = document.assertNode(textPath);
  var ancestors = document.getAncestors(textPath);
  var nodes = ancestors.skipUntil(function (a) {
    return a.key == node.key;
  }).reverse().unshift(text);

  var previous = void 0;
  var index = void 0;

  change.withoutNormalizing(function () {
    nodes.forEach(function (n) {
      var prevIndex = index == null ? null : index;
      index = previous ? n.nodes.indexOf(previous) + 1 : textOffset;
      previous = n;
      change.splitNodeByKey(n.key, index, { target: prevIndex });
    });
  });
};

/**
 * Unwrap content from an inline parent with `properties`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Object|String} properties
 */

Changes$2.unwrapInlineByPath = function (change, path, properties) {
  var value = change.value;
  var document = value.document,
      selection = value.selection;

  var node = document.assertNode(path);
  var first = node.getFirstText();
  var last = node.getLastText();
  var range = selection.moveToRangeOfNode(first, last);
  change.unwrapInlineAtRange(range, properties);
};

/**
 * Unwrap content from a block parent with `properties`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Object|String} properties
 */

Changes$2.unwrapBlockByPath = function (change, path, properties) {
  var value = change.value;
  var document = value.document,
      selection = value.selection;

  var node = document.assertNode(path);
  var first = node.getFirstText();
  var last = node.getLastText();
  var range = selection.moveToRangeOfNode(first, last);
  change.unwrapBlockAtRange(range, properties);
};

/**
 * Unwrap a single node from its parent.
 *
 * If the node is surrounded with siblings, its parent will be
 * split. If the node is the only child, the parent is removed, and
 * simply replaced by the node itself.  Cannot unwrap a root node.
 *
 * @param {Change} change
 * @param {Array} path
 */

Changes$2.unwrapNodeByPath = function (change, path) {
  var value = change.value;
  var document = value.document;

  document.assertNode(path);

  var parentPath = PathUtils.lift(path);
  var parent = document.assertNode(parentPath);
  var index = path.last();
  var parentIndex = parentPath.last();
  var grandPath = PathUtils.lift(parentPath);
  var isFirst = index === 0;
  var isLast = index === parent.nodes.size - 1;

  change.withoutNormalizing(function () {
    if (parent.nodes.size === 1) {
      change.moveNodeByPath(path, grandPath, parentIndex + 1);
      change.removeNodeByPath(parentPath);
    } else if (isFirst) {
      change.moveNodeByPath(path, grandPath, parentIndex);
    } else if (isLast) {
      change.moveNodeByPath(path, grandPath, parentIndex + 1);
    } else {
      var updatedPath = PathUtils.increment(path, 1, parentPath.size - 1);
      updatedPath = updatedPath.set(updatedPath.size - 1, 0);
      change.splitNodeByPath(parentPath, index);
      change.moveNodeByPath(updatedPath, grandPath, parentIndex + 1);
    }
  });
};

/**
 * Wrap a node in a block with `properties`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Block|Object|String} block
 */

Changes$2.wrapBlockByPath = function (change, path, block) {
  block = Block.create(block);
  block = block.set('nodes', block.nodes.clear());
  var parentPath = PathUtils.lift(path);
  var index = path.last();
  var newPath = PathUtils.increment(path);

  change.withoutNormalizing(function () {
    change.insertNodeByPath(parentPath, index, block);
    change.moveNodeByPath(newPath, path, 0);
  });
};

/**
 * Wrap a node in an inline with `properties`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Block|Object|String} inline
 */

Changes$2.wrapInlineByPath = function (change, path, inline) {
  inline = Inline.create(inline);
  inline = inline.set('nodes', inline.nodes.clear());
  var parentPath = PathUtils.lift(path);
  var index = path.last();
  var newPath = PathUtils.increment(path);

  change.withoutNormalizing(function () {
    change.insertNodeByPath(parentPath, index, inline);
    change.moveNodeByPath(newPath, path, 0);
  });
};

/**
 * Wrap a node by `path` with `node`.
 *
 * @param {Change} change
 * @param {Array} path
 * @param {Node|Object} node
 */

Changes$2.wrapNodeByPath = function (change, path, node) {
  node = Node.create(node);

  if (node.object === 'block') {
    change.wrapBlockByPath(path, node);
  } else if (node.object === 'inline') {
    change.wrapInlineByPath(path, node);
  }
};

/**
 * Mix in `*ByKey` variants.
 */

var CHANGES = ['addMark', 'insertFragment', 'insertNode', 'insertText', 'mergeNode', 'removeMark', 'removeAllMarks', 'removeNode', 'setText', 'replaceText', 'removeText', 'replaceNode', 'setMark', 'setNode', 'splitNode', 'unwrapInline', 'unwrapBlock', 'unwrapNode', 'wrapBlock', 'wrapInline', 'wrapNode'];

var _loop = function _loop(method) {
  Changes$2[method + 'ByKey'] = function (change, key) {
    for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      args[_key3 - 2] = arguments[_key3];
    }

    var value = change.value;
    var document = value.document;

    var path = document.assertPath(key);
    change[method + 'ByPath'].apply(change, [path].concat(args));
  };
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = CHANGES[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var method = _step.value;

    _loop(method);
  }

  // Moving nodes takes two keys, so it's slightly different.
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

Changes$2.moveNodeByKey = function (change, key, newKey) {
  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var value = change.value;
  var document = value.document;

  var path = document.assertPath(key);
  var newPath = document.assertPath(newKey);
  change.moveNodeByPath.apply(change, [path, newPath].concat(args));
};

// Splitting descendants takes two keys, so it's slightly different.
Changes$2.splitDescendantsByKey = function (change, key, textKey) {
  for (var _len2 = arguments.length, args = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    args[_key2 - 3] = arguments[_key2];
  }

  var value = change.value;
  var document = value.document;

  var path = document.assertPath(key);
  var textPath = document.assertPath(textKey);
  change.splitDescendantsByPath.apply(change, [path, textPath].concat(args));
};

/**
 * Changes.
 *
 * @type {Object}
 */

var Changes$3 = {};

/**
 * Redo to the next value in the history.
 *
 * @param {Change} change
 */

Changes$3.redo = function (change) {
  var value = change.value;
  var _value = value,
      history = _value.history;

  if (!history) return;

  var _history = history,
      undos = _history.undos,
      redos = _history.redos;

  var next = redos.peek();
  if (!next) return;

  // Shift the next value into the undo stack.
  redos = redos.pop();
  undos = undos.push(next);

  // Replay the next operations.
  next.forEach(function (op) {
    var _op = op,
        type = _op.type,
        properties = _op.properties;

    // When the operation mutates the selection, omit its `isFocused` value to
    // prevent the editor focus from changing during redoing.

    if (type == 'set_selection') {
      op = op.set('properties', omit(properties, 'isFocused'));
    }

    change.withoutSaving(function () {
      change.applyOperation(op);
    });
  });

  // Update the history.
  value = change.value;
  history = history.set('undos', undos).set('redos', redos);
  value = value.set('history', history);
  change.value = value;
};

/**
 * Undo the previous operations in the history.
 *
 * @param {Change} change
 */

Changes$3.undo = function (change) {
  var value = change.value;
  var _value2 = value,
      history = _value2.history;

  if (!history) return;

  var _history2 = history,
      undos = _history2.undos,
      redos = _history2.redos;

  var previous = undos.peek();
  if (!previous) return;

  // Shift the previous operations into the redo stack.
  undos = undos.pop();
  redos = redos.push(previous);

  // Replay the inverse of the previous operations.
  previous.slice().reverse().map(function (op) {
    return op.invert();
  }).forEach(function (inverse) {
    var _inverse = inverse,
        type = _inverse.type,
        properties = _inverse.properties;

    // When the operation mutates the selection, omit its `isFocused` value to
    // prevent the editor focus from changing during undoing.

    if (type == 'set_selection') {
      inverse = inverse.set('properties', omit(properties, 'isFocused'));
    }

    change.withoutSaving(function () {
      change.applyOperation(inverse);
    });
  });

  // Update the history.
  value = change.value;
  history = history.set('undos', undos).set('redos', redos);
  value = value.set('history', history);
  change.value = value;
};

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$6 = {
  key: null,
  offset: null,
  path: null

  /**
   * Point.
   *
   * @type {Point}
   */

};
var Point = function (_Record) {
  inherits(Point, _Record);

  function Point() {
    classCallCheck(this, Point);
    return possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).apply(this, arguments));
  }

  createClass(Point, [{
    key: 'isAtEndOfNode',


    /**
     * Check whether the point is at the end of a `node`.
     *
     * @param {Node} node
     * @return {Boolean}
     */

    value: function isAtEndOfNode(node) {
      if (this.isUnset) return false;
      var last = node.getLastText();
      var is = this.key === last.key && this.offset === last.text.length;
      return is;
    }

    /**
     * Check whether the point is at the start of a `node`.
     *
     * @param {Node} node
     * @return {Boolean}
     */

  }, {
    key: 'isAtStartOfNode',
    value: function isAtStartOfNode(node) {
      if (this.isUnset) return false;

      // PERF: Do a check for a `0` offset first since it's quickest.
      if (this.offset != 0) return false;

      var first = node.getFirstText();
      var is = this.key === first.key;
      return is;
    }

    /**
     * Check whether the point is in a `node`.
     *
     * @param {Node} node
     * @return {Boolean}
     */

  }, {
    key: 'isInNode',
    value: function isInNode(node) {
      if (this.isUnset) return false;
      if (node.object === 'text' && node.key === this.key) return true;
      if (node.hasNode(this.key)) return true;
      return false;
    }

    /**
     * Move the point's offset backward `n` characters.
     *
     * @param {Number} n (optional)
     * @return {Point}
     */

  }, {
    key: 'moveBackward',
    value: function moveBackward() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      if (n === 0) return this;
      if (n < 0) return this.moveForward(-n);
      var point = this.setOffset(this.offset - n);
      return point;
    }

    /**
     * Move the point's offset forward `n` characters.
     *
     * @param {Number} n (optional)
     * @return {Point}
     */

  }, {
    key: 'moveForward',
    value: function moveForward() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      if (n === 0) return this;
      if (n < 0) return this.moveBackward(-n);
      var point = this.setOffset(this.offset + n);
      return point;
    }

    /**
     * Move the point's anchor point to a new `path` and `offset`.
     *
     * Optionally, the `path` can be a key string, or omitted entirely in which
     * case it would be the offset number.
     *
     * @param {List|String|Number} path
     * @param {Number} offset
     * @return {Point}
     */

  }, {
    key: 'moveTo',
    value: function moveTo(path) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var key = this.key;

      if (typeof path === 'number') {
        offset = path;
        path = this.path;
      } else if (typeof path === 'string') {
        key = path;
        path = key === this.key ? this.path : null;
      } else {
        key = path.equals(this.path) ? this.key : null;
      }

      var point = this.merge({ key: key, path: path, offset: offset });
      return point;
    }

    /**
     * Move the point's anchor point to the start of a `node`.
     *
     * @param {Node} node
     * @return {Point}
     */

  }, {
    key: 'moveToStartOfNode',
    value: function moveToStartOfNode(node) {
      var first = node.getFirstText();
      var point = this.moveTo(first.key, 0);
      return point;
    }

    /**
     * Move the point's anchor point to the end of a `node`.
     *
     * @param {Node} node
     * @return {Point}
     */

  }, {
    key: 'moveToEndOfNode',
    value: function moveToEndOfNode(node) {
      var last = node.getLastText();
      var point = this.moveTo(last.key, last.text.length);
      return point;
    }

    /**
     * Normalize the point relative to a `node`, ensuring that its key and path
     * reference a text node, or that it gets unset.
     *
     * @param {Node} node
     * @return {Point}
     */

  }, {
    key: 'normalize',
    value: function normalize(node) {
      // If both the key and path are null, there's no reference to a node, so
      // make sure it is entirely unset.
      if (this.key == null && this.path == null) {
        return this.setOffset(null);
      }

      var key = this.key,
          offset = this.offset,
          path = this.path;

      var target = node.getNode(key || path);

      if (!target) {
        warning(false, "A point's `path` or `key` invalid and was reset!");

        var text = node.getFirstText();
        if (!text) return Point.create();

        var _point = this.merge({
          key: text.key,
          offset: 0,
          path: node.getPath(text.key)
        });

        return _point;
      }

      if (target.object !== 'text') {
        warning(false, 'A point should not reference a non-text node!');

        var _text = target.getTextAtOffset(offset);
        var before = target.getOffset(_text.key);
        var _point2 = this.merge({
          offset: offset - before,
          key: _text.key,
          path: node.getPath(_text.key)
        });

        return _point2;
      }

      if (target && path && key && key !== target.key) {
        warning(false, "A point's `key` did not match its `path`!");
      }

      var point = this.merge({
        key: target.key,
        path: path == null ? node.getPath(target.key) : path,
        offset: offset == null ? 0 : Math.min(offset, target.text.length)
      });

      return point;
    }

    /**
     * Set the point's key to a new `key`.
     *
     * @param {String} key
     * @return {Point}
     */

  }, {
    key: 'setKey',
    value: function setKey(key) {
      if (key !== null) {
        key = KeyUtils.create(key);
      }

      var point = this.set('key', key);
      return point;
    }

    /**
     * Set the point's offset to a new `offset`.
     *
     * @param {Number} offset
     * @return {Point}
     */

  }, {
    key: 'setOffset',
    value: function setOffset(offset) {
      var point = this.set('offset', offset);
      return point;
    }

    /**
     * Set the point's path to a new `path`.
     *
     * @param {List|Array} path
     * @return {Point}
     */

  }, {
    key: 'setPath',
    value: function setPath(path) {
      if (path !== null) {
        path = PathUtils.create(path);
      }

      var point = this.set('path', path);
      return point;
    }

    /**
     * Return a JSON representation of the point.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        key: this.key,
        offset: this.offset,
        path: this.path && this.path.toArray()
      };

      if (!options.preserveKeys) {
        delete object.key;
      }

      return object;
    }

    /**
     * Unset the point.
     *
     * @return {Point}
     */

  }, {
    key: 'unset',
    value: function unset() {
      return this.merge({
        key: null,
        offset: null,
        path: null
      });
    }
  }, {
    key: 'object',


    /**
     * Object.
     *
     * @return {String}
     */

    get: function get$$1() {
      return 'point';
    }

    /**
     * Check whether all properties of the point are set.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isSet',
    get: function get$$1() {
      return this.key != null && this.offset != null && this.path != null;
    }

    /**
     * Check whether any property of the point is not set.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isUnset',
    get: function get$$1() {
      return !this.isSet;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Point` with `attrs`.
     *
     * @param {Object|Point} attrs
     * @return {Point}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Point.isPoint(attrs)) {
        return attrs;
      }

      if (isPlainObject(attrs)) {
        return Point.fromJSON(attrs);
      }

      throw new Error('`Point.create` only accepts objects or points, but you passed it: ' + attrs);
    }

    /**
     * Create a dictionary of settable point properties from `attrs`.
     *
     * @param {Object|Point} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Point.isPoint(a)) {
        return {
          key: a.key,
          offset: a.offset,
          path: a.path
        };
      }

      if (isPlainObject(a)) {
        var p = {};
        if ('key' in a) p.key = a.key;
        if ('offset' in a) p.offset = a.offset;
        if ('path' in a) p.path = PathUtils.create(a.path);

        // If only a path is set, or only a key is set, ensure that the other is
        // set to null so that it can be normalized back to the right value.
        // Otherwise we won't realize that the path and key don't match anymore.
        if ('path' in a && !('key' in a)) p.key = null;
        if ('key' in a && !('path' in a)) p.path = null;

        return p;
      }

      throw new Error('`Point.createProperties` only accepts objects or points, but you passed it: ' + a);
    }

    /**
     * Create a `Point` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Point}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var _object$key = object.key,
          key = _object$key === undefined ? null : _object$key,
          _object$offset = object.offset,
          offset = _object$offset === undefined ? null : _object$offset,
          _object$path = object.path,
          path = _object$path === undefined ? null : _object$path;


      var point = new Point({
        key: key,
        offset: offset,
        path: PathUtils.create(path)
      });

      return point;
    }

    /**
     * Check if an `obj` is a `Point`.
     *
     * @param {Any} obj
     * @return {Boolean}
     */

  }, {
    key: 'isPoint',
    value: function isPoint(obj) {
      return !!(obj && obj[MODEL_TYPES.POINT]);
    }
  }]);
  return Point;
}(immutable.Record(DEFAULTS$6));

/**
 * Attach a pseudo-symbol for type checking.
 */

Point.prototype[MODEL_TYPES.POINT] = true;

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$7 = {
  anchor: Point.create(),
  focus: Point.create(),
  mark: undefined

  /**
   * Decoration.
   *
   * @type {Decoration}
   */

};
var Decoration = function (_Record) {
  inherits(Decoration, _Record);

  function Decoration() {
    classCallCheck(this, Decoration);
    return possibleConstructorReturn(this, (Decoration.__proto__ || Object.getPrototypeOf(Decoration)).apply(this, arguments));
  }

  createClass(Decoration, [{
    key: 'setProperties',


    /**
     * Set new `properties` on the decoration.
     *
     * @param {Object|Range|Selection} properties
     * @return {Range}
     */

    value: function setProperties(properties) {
      properties = Decoration.createProperties(properties);
      var _properties = properties,
          anchor = _properties.anchor,
          focus = _properties.focus,
          mark = _properties.mark;

      var props = {};

      if (anchor) {
        props.anchor = Point.create(anchor);
      }

      if (focus) {
        props.focus = Point.create(focus);
      }

      if (mark) {
        props.mark = Mark.create(mark);
      }

      var decoration = this.merge(props);
      return decoration;
    }

    /**
     * Return a JSON representation of the decoration.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        anchor: this.anchor.toJSON(options),
        focus: this.focus.toJSON(options),
        mark: this.mark.toJSON(options)
      };

      return object;
    }
  }, {
    key: 'object',


    /**
     * Object.
     *
     * @return {String}
     */

    get: function get$$1() {
      return 'decoration';
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Decoration` with `attrs`.
     *
     * @param {Object|Decoration} attrs
     * @return {Decoration}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Decoration.isDecoration(attrs)) {
        return attrs;
      }

      if (Range.isRange(attrs)) {
        return Decoration.fromJSON(Range.createProperties(attrs));
      }

      if (isPlainObject(attrs)) {
        return Decoration.fromJSON(attrs);
      }

      throw new Error('`Decoration.create` only accepts objects or decorations, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Ranges` from `elements`.
     *
     * @param {Array<Decoration|Object>|List<Decoration|Object>} elements
     * @return {List<Decoration>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (immutable.List.isList(elements) || Array.isArray(elements)) {
        var list = new immutable.List(elements.map(Decoration.create));
        return list;
      }

      throw new Error('`Decoration.createList` only accepts arrays or lists, but you passed it: ' + elements);
    }

    /**
     * Create a dictionary of settable decoration properties from `attrs`.
     *
     * @param {Object|String|Decoration} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Decoration.isDecoration(a)) {
        return {
          anchor: Point.createProperties(a.anchor),
          focus: Point.createProperties(a.focus),
          mark: Mark.create(a.mark)
        };
      }

      if (isPlainObject(a)) {
        var p = {};
        if ('anchor' in a) p.anchor = Point.create(a.anchor);
        if ('focus' in a) p.focus = Point.create(a.focus);
        if ('mark' in a) p.mark = Mark.create(a.mark);
        return p;
      }

      throw new Error('`Decoration.createProperties` only accepts objects or decorations, but you passed it: ' + a);
    }

    /**
     * Create a `Decoration` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Decoration}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var anchor = object.anchor,
          focus = object.focus,
          mark = object.mark;


      if (!mark) {
        throw new Error('Decorations must be created with a `mark`, but you passed: ' + JSON.stringify(object));
      }

      var decoration = new Decoration({
        anchor: Point.fromJSON(anchor || {}),
        focus: Point.fromJSON(focus || {}),
        mark: Mark.fromJSON(mark)
      });

      return decoration;
    }

    /**
     * Check if an `obj` is a `Decoration`.
     *
     * @param {Any} obj
     * @return {Boolean}
     */

  }, {
    key: 'isDecoration',
    value: function isDecoration(obj) {
      return !!(obj && obj[MODEL_TYPES.DECORATION]);
    }
  }]);
  return Decoration;
}(immutable.Record(DEFAULTS$7));

/**
 * Attach a pseudo-symbol for type checking.
 */

Decoration.prototype[MODEL_TYPES.DECORATION] = true;

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$8 = {
  anchor: Point.create(),
  focus: Point.create()

  /**
   * Range.
   *
   * @type {Range}
   */

};
var Range = function (_Record) {
  inherits(Range, _Record);

  function Range() {
    classCallCheck(this, Range);
    return possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).apply(this, arguments));
  }

  createClass(Range, [{
    key: 'toJSON',


    /**
     * Return a JSON representation of the range.
     *
     * @param {Object} options
     * @return {Object}
     */

    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        anchor: this.anchor.toJSON(options),
        focus: this.focus.toJSON(options)
      };

      return object;
    }
  }, {
    key: 'object',


    /**
     * Object.
     *
     * @return {String}
     */

    get: function get$$1() {
      return 'range';
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Range` with `attrs`.
     *
     * @param {Object|Range} attrs
     * @return {Range}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Range.isRange(attrs)) {
        if (attrs.object === 'range') {
          return attrs;
        } else {
          return Range.fromJSON(Range.createProperties(attrs));
        }
      }

      if (isPlainObject(attrs)) {
        return Range.fromJSON(attrs);
      }

      throw new Error('`Range.create` only accepts objects or ranges, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Ranges` from `elements`.
     *
     * @param {Array<Range|Object>|List<Range|Object>} elements
     * @return {List<Range>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (immutable.List.isList(elements) || Array.isArray(elements)) {
        var list = new immutable.List(elements.map(Range.create));
        return list;
      }

      throw new Error('`Range.createList` only accepts arrays or lists, but you passed it: ' + elements);
    }

    /**
     * Create a dictionary of settable range properties from `attrs`.
     *
     * @param {Object|String|Range} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Range.isRange(a)) {
        return {
          anchor: Point.createProperties(a.anchor),
          focus: Point.createProperties(a.focus)
        };
      }

      if (isPlainObject(a)) {
        var p = {};
        if ('anchor' in a) p.anchor = Point.create(a.anchor);
        if ('focus' in a) p.focus = Point.create(a.focus);
        return p;
      }

      throw new Error('`Range.createProperties` only accepts objects, decorations, ranges or selections, but you passed it: ' + a);
    }

    /**
     * Create a `Range` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Range}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var anchor = object.anchor,
          focus = object.focus;

      var range = new Range({
        anchor: Point.fromJSON(anchor || {}),
        focus: Point.fromJSON(focus || {})
      });

      return range;
    }

    /**
     * Check if an `obj` is a `Range`, or is range-like.
     *
     * @param {Any} obj
     * @return {Boolean}
     */

  }, {
    key: 'isRange',
    value: function isRange(obj) {
      return !!(obj && obj[MODEL_TYPES.RANGE]) || Decoration.isDecoration(obj) || Selection.isSelection(obj);
    }
  }]);
  return Range;
}(immutable.Record(DEFAULTS$8));

/**
 * Attach a pseudo-symbol for type checking.
 */

Range.prototype[MODEL_TYPES.RANGE] = true;

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$9 = {
  anchor: Point.create(),
  focus: Point.create(),
  isFocused: false,
  marks: null

  /**
   * Selection.
   *
   * @type {Selection}
   */

};
var Selection = function (_Record) {
  inherits(Selection, _Record);

  function Selection() {
    classCallCheck(this, Selection);
    return possibleConstructorReturn(this, (Selection.__proto__ || Object.getPrototypeOf(Selection)).apply(this, arguments));
  }

  createClass(Selection, [{
    key: 'setIsFocused',


    /**
     * Set the `isFocused` property to a new `value`.
     *
     * @param {Boolean} value
     * @return {Selection}
     */

    value: function setIsFocused(value) {
      var selection = this.set('isFocused', value);
      return selection;
    }

    /**
     * Set the `marks` property to a new set of `marks`.
     *
     * @param {Set} marks
     * @return {Selection}
     */

  }, {
    key: 'setMarks',
    value: function setMarks(marks) {
      var selection = this.set('marks', marks);
      return selection;
    }

    /**
     * Set new `properties` on the selection.
     *
     * @param {Object|Range|Selection} properties
     * @return {Range}
     */

  }, {
    key: 'setProperties',
    value: function setProperties(properties) {
      properties = Selection.createProperties(properties);
      var _properties = properties,
          anchor = _properties.anchor,
          focus = _properties.focus,
          props = objectWithoutProperties(_properties, ['anchor', 'focus']);


      if (anchor) {
        props.anchor = Point.create(anchor);
      }

      if (focus) {
        props.focus = Point.create(focus);
      }

      var selection = this.merge(props);
      return selection;
    }

    /**
     * Return a JSON representation of the selection.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        anchor: this.anchor.toJSON(options),
        focus: this.focus.toJSON(options),
        isFocused: this.isFocused,
        marks: this.marks == null ? null : this.marks.toArray().map(function (m) {
          return m.toJSON();
        })
      };

      return object;
    }
  }, {
    key: 'object',


    /**
     * Object.
     *
     * @return {String}
     */

    get: function get$$1() {
      return 'selection';
    }

    /**
     * Check whether the selection is blurred.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isBlurred',
    get: function get$$1() {
      return !this.isFocused;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Selection` with `attrs`.
     *
     * @param {Object|Selection} attrs
     * @return {Selection}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Selection.isSelection(attrs)) {
        return attrs;
      }

      if (Range.isRange(attrs)) {
        return Selection.fromJSON(Range.createProperties(attrs));
      }

      if (isPlainObject(attrs)) {
        return Selection.fromJSON(attrs);
      }

      throw new Error('`Selection.create` only accepts objects, ranges or selections, but you passed it: ' + attrs);
    }

    /**
     * Create a dictionary of settable selection properties from `attrs`.
     *
     * @param {Object|String|Selection} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Selection.isSelection(a)) {
        return {
          anchor: Point.createProperties(a.anchor),
          focus: Point.createProperties(a.focus),
          isFocused: a.isFocused,
          marks: a.marks
        };
      }

      if (Range.isRange(a)) {
        return {
          anchor: Point.createProperties(a.anchor),
          focus: Point.createProperties(a.focus)
        };
      }

      if (isPlainObject(a)) {
        var p = {};
        if ('anchor' in a) p.anchor = Point.create(a.anchor);
        if ('focus' in a) p.focus = Point.create(a.focus);
        if ('isFocused' in a) p.isFocused = a.isFocused;
        if ('marks' in a) p.marks = a.marks == null ? null : Mark.createSet(a.marks);
        return p;
      }

      throw new Error('`Selection.createProperties` only accepts objects, ranges or selections, but you passed it: ' + a);
    }

    /**
     * Create a `Selection` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Selection}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var anchor = object.anchor,
          focus = object.focus,
          _object$isFocused = object.isFocused,
          isFocused = _object$isFocused === undefined ? false : _object$isFocused,
          _object$marks = object.marks,
          marks = _object$marks === undefined ? null : _object$marks;

      var selection = new Selection({
        anchor: Point.fromJSON(anchor || {}),
        focus: Point.fromJSON(focus || {}),
        isFocused: isFocused,
        marks: marks == null ? null : new immutable.Set(marks.map(Mark.fromJSON))
      });

      return selection;
    }

    /**
     * Check if an `obj` is a `Selection`.
     *
     * @param {Any} obj
     * @return {Boolean}
     */

  }, {
    key: 'isSelection',
    value: function isSelection(obj) {
      return !!(obj && obj[MODEL_TYPES.SELECTION]);
    }
  }]);
  return Selection;
}(immutable.Record(DEFAULTS$9));

/**
 * Attach a pseudo-symbol for type checking.
 */

Selection.prototype[MODEL_TYPES.SELECTION] = true;

var Changes$4 = {};

Changes$4.blur = function (change) {
  change.select({ isFocused: false });
};

Changes$4.deselect = function (change) {
  var range = Selection.create();
  change.select(range);
};

Changes$4.focus = function (change) {
  change.select({ isFocused: true });
};

Changes$4.flip = function (change) {
  change.call(proxy, 'flip');
};

Changes$4.moveAnchorBackward = function (change) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  change.call.apply(change, [pointBackward, 'anchor'].concat(args));
};

Changes$4.moveAnchorForward = function (change) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  change.call.apply(change, [pointForward, 'anchor'].concat(args));
};

Changes$4.moveAnchorTo = function (change) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  change.call.apply(change, [proxy, 'moveAnchorTo'].concat(args));
};

Changes$4.moveAnchorToEndOfBlock = function (change) {
  change.call(pointEdgeObject, 'anchor', 'end', 'block');
};

Changes$4.moveAnchorToEndOfInline = function (change) {
  change.call(pointEdgeObject, 'anchor', 'end', 'inline');
};

Changes$4.moveAnchorToEndOfDocument = function (change) {
  change.moveAnchorToEndOfNode(change.value.document).moveToAnchor();
};

Changes$4.moveAnchorToEndOfNextBlock = function (change) {
  change.call(pointEdgeSideObject, 'anchor', 'end', 'next', 'block');
};

Changes$4.moveAnchorToEndOfNextInline = function (change) {
  change.call(pointEdgeSideObject, 'anchor', 'end', 'next', 'inline');
};

Changes$4.moveAnchorToEndOfNextText = function (change) {
  change.call(pointEdgeSideObject, 'anchor', 'end', 'next', 'text');
};

Changes$4.moveAnchorToEndOfNode = function (change) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  change.call.apply(change, [proxy, 'moveAnchorToEndOfNode'].concat(args));
};

Changes$4.moveAnchorToEndOfPreviousBlock = function (change) {
  change.call(pointEdgeSideObject, 'anchor', 'end', 'previous', 'block');
};

Changes$4.moveAnchorToEndOfPreviousInline = function (change) {
  change.call(pointEdgeSideObject, 'anchor', 'end', 'previous', 'inline');
};

Changes$4.moveAnchorToEndOfPreviousText = function (change) {
  change.call(pointEdgeSideObject, 'anchor', 'end', 'previous', 'text');
};

Changes$4.moveAnchorToEndOfText = function (change) {
  change.call(pointEdgeObject, 'anchor', 'end', 'text');
};

Changes$4.moveAnchorToStartOfBlock = function (change) {
  change.call(pointEdgeObject, 'anchor', 'start', 'block');
};

Changes$4.moveAnchorToStartOfDocument = function (change) {
  change.moveAnchorToStartOfNode(change.value.document).moveToAnchor();
};

Changes$4.moveAnchorToStartOfInline = function (change) {
  change.call(pointEdgeObject, 'anchor', 'start', 'inline');
};

Changes$4.moveAnchorToStartOfNextBlock = function (change) {
  change.call(pointEdgeSideObject, 'anchor', 'start', 'next', 'block');
};

Changes$4.moveAnchorToStartOfNextInline = function (change) {
  change.call(pointEdgeSideObject, 'anchor', 'start', 'next', 'inline');
};

Changes$4.moveAnchorToStartOfNextText = function (change) {
  change.call(pointEdgeSideObject, 'anchor', 'start', 'next', 'text');
};

Changes$4.moveAnchorToStartOfNode = function (change) {
  for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  change.call.apply(change, [proxy, 'moveAnchorToStartOfNode'].concat(args));
};

Changes$4.moveAnchorToStartOfPreviousBlock = function (change) {
  change.call(pointEdgeSideObject, 'anchor', 'start', 'previous', 'block');
};

Changes$4.moveAnchorToStartOfPreviousInline = function (change) {
  change.call(pointEdgeSideObject, 'anchor', 'start', 'previous', 'inline');
};

Changes$4.moveAnchorToStartOfPreviousText = function (change) {
  change.call(pointEdgeSideObject, 'anchor', 'start', 'previous', 'text');
};

Changes$4.moveAnchorToStartOfText = function (change) {
  change.call(pointEdgeObject, 'anchor', 'start', 'text');
};

Changes$4.moveBackward = function (change) {
  var _change$moveAnchorBac;

  for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    args[_key6 - 1] = arguments[_key6];
  }

  (_change$moveAnchorBac = change.moveAnchorBackward.apply(change, args)).moveFocusBackward.apply(_change$moveAnchorBac, args);
};

Changes$4.moveEndBackward = function (change) {
  for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    args[_key7 - 1] = arguments[_key7];
  }

  change.call.apply(change, [pointBackward, 'end'].concat(args));
};

Changes$4.moveEndForward = function (change) {
  for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
    args[_key8 - 1] = arguments[_key8];
  }

  change.call.apply(change, [pointForward, 'end'].concat(args));
};

Changes$4.moveEndTo = function (change) {
  for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
    args[_key9 - 1] = arguments[_key9];
  }

  change.call.apply(change, [proxy, 'moveEndTo'].concat(args));
};

Changes$4.moveEndToEndOfBlock = function (change) {
  change.call(pointEdgeObject, 'end', 'end', 'block');
};

Changes$4.moveEndToEndOfDocument = function (change) {
  change.moveEndToEndOfNode(change.value.document).moveToEnd();
};

Changes$4.moveEndToEndOfInline = function (change) {
  change.call(pointEdgeObject, 'end', 'end', 'inline');
};

Changes$4.moveEndToEndOfNextBlock = function (change) {
  change.call(pointEdgeSideObject, 'end', 'end', 'next', 'block');
};

Changes$4.moveEndToEndOfNextInline = function (change) {
  change.call(pointEdgeSideObject, 'end', 'end', 'next', 'inline');
};

Changes$4.moveEndToEndOfNextText = function (change) {
  change.call(pointEdgeSideObject, 'end', 'end', 'next', 'text');
};

Changes$4.moveEndToEndOfNode = function (change) {
  for (var _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
    args[_key10 - 1] = arguments[_key10];
  }

  change.call.apply(change, [proxy, 'moveEndToEndOfNode'].concat(args));
};

Changes$4.moveEndToEndOfPreviousBlock = function (change) {
  change.call(pointEdgeSideObject, 'end', 'end', 'previous', 'block');
};

Changes$4.moveEndToEndOfPreviousInline = function (change) {
  change.call(pointEdgeSideObject, 'end', 'end', 'previous', 'inline');
};

Changes$4.moveEndToEndOfPreviousText = function (change) {
  change.call(pointEdgeSideObject, 'end', 'end', 'previous', 'text');
};

Changes$4.moveEndToEndOfText = function (change) {
  change.call(pointEdgeObject, 'end', 'end', 'text');
};

Changes$4.moveEndToStartOfBlock = function (change) {
  change.call(pointEdgeObject, 'end', 'start', 'block');
};

Changes$4.moveEndToStartOfDocument = function (change) {
  change.moveEndToStartOfNode(change.value.document).moveToEnd();
};

Changes$4.moveEndToStartOfInline = function (change) {
  change.call(pointEdgeObject, 'end', 'start', 'inline');
};

Changes$4.moveEndToStartOfNextBlock = function (change) {
  change.call(pointEdgeSideObject, 'end', 'start', 'next', 'block');
};

Changes$4.moveEndToStartOfNextInline = function (change) {
  change.call(pointEdgeSideObject, 'end', 'start', 'next', 'inline');
};

Changes$4.moveEndToStartOfNextText = function (change) {
  change.call(pointEdgeSideObject, 'end', 'start', 'next', 'text');
};

Changes$4.moveEndToStartOfNode = function (change) {
  for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
    args[_key11 - 1] = arguments[_key11];
  }

  change.call.apply(change, [proxy, 'moveEndToStartOfNode'].concat(args));
};

Changes$4.moveEndToStartOfPreviousBlock = function (change) {
  change.call(pointEdgeSideObject, 'end', 'start', 'previous', 'block');
};

Changes$4.moveEndToStartOfPreviousInline = function (change) {
  change.call(pointEdgeSideObject, 'end', 'start', 'previous', 'inline');
};

Changes$4.moveEndToStartOfPreviousText = function (change) {
  change.call(pointEdgeSideObject, 'end', 'start', 'previous', 'text');
};

Changes$4.moveEndToStartOfText = function (change) {
  change.call(pointEdgeObject, 'end', 'start', 'text');
};

Changes$4.moveFocusBackward = function (change) {
  for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
    args[_key12 - 1] = arguments[_key12];
  }

  change.call.apply(change, [pointBackward, 'focus'].concat(args));
};

Changes$4.moveFocusForward = function (change) {
  for (var _len13 = arguments.length, args = Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
    args[_key13 - 1] = arguments[_key13];
  }

  change.call.apply(change, [pointForward, 'focus'].concat(args));
};

Changes$4.moveFocusTo = function (change) {
  for (var _len14 = arguments.length, args = Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
    args[_key14 - 1] = arguments[_key14];
  }

  change.call.apply(change, [proxy, 'moveFocusTo'].concat(args));
};

Changes$4.moveFocusToEndOfBlock = function (change) {
  change.call(pointEdgeObject, 'focus', 'end', 'block');
};

Changes$4.moveFocusToEndOfDocument = function (change) {
  change.moveFocusToEndOfNode(change.value.document).moveToFocus();
};

Changes$4.moveFocusToEndOfInline = function (change) {
  change.call(pointEdgeObject, 'focus', 'end', 'inline');
};

Changes$4.moveFocusToEndOfNextBlock = function (change) {
  change.call(pointEdgeSideObject, 'focus', 'end', 'next', 'block');
};

Changes$4.moveFocusToEndOfNextInline = function (change) {
  change.call(pointEdgeSideObject, 'focus', 'end', 'next', 'inline');
};

Changes$4.moveFocusToEndOfNextText = function (change) {
  change.call(pointEdgeSideObject, 'focus', 'end', 'next', 'text');
};

Changes$4.moveFocusToEndOfNode = function (change) {
  for (var _len15 = arguments.length, args = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
    args[_key15 - 1] = arguments[_key15];
  }

  change.call.apply(change, [proxy, 'moveFocusToEndOfNode'].concat(args));
};

Changes$4.moveFocusToEndOfPreviousBlock = function (change) {
  change.call(pointEdgeSideObject, 'focus', 'end', 'previous', 'block');
};

Changes$4.moveFocusToEndOfPreviousInline = function (change) {
  change.call(pointEdgeSideObject, 'focus', 'end', 'previous', 'inline');
};

Changes$4.moveFocusToEndOfPreviousText = function (change) {
  change.call(pointEdgeSideObject, 'focus', 'end', 'previous', 'text');
};

Changes$4.moveFocusToEndOfText = function (change) {
  change.call(pointEdgeObject, 'focus', 'end', 'text');
};

Changes$4.moveFocusToStartOfBlock = function (change) {
  change.call(pointEdgeObject, 'focus', 'start', 'block');
};

Changes$4.moveFocusToStartOfDocument = function (change) {
  change.moveFocusToStartOfNode(change.value.document).moveToFocus();
};

Changes$4.moveFocusToStartOfInline = function (change) {
  change.call(pointEdgeObject, 'focus', 'start', 'inline');
};

Changes$4.moveFocusToStartOfNextBlock = function (change) {
  change.call(pointEdgeSideObject, 'focus', 'start', 'next', 'block');
};

Changes$4.moveFocusToStartOfNextInline = function (change) {
  change.call(pointEdgeSideObject, 'focus', 'start', 'next', 'inline');
};

Changes$4.moveFocusToStartOfNextText = function (change) {
  change.call(pointEdgeSideObject, 'focus', 'start', 'next', 'text');
};

Changes$4.moveFocusToStartOfNode = function (change) {
  for (var _len16 = arguments.length, args = Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
    args[_key16 - 1] = arguments[_key16];
  }

  change.call.apply(change, [proxy, 'moveFocusToStartOfNode'].concat(args));
};

Changes$4.moveFocusToStartOfPreviousBlock = function (change) {
  change.call(pointEdgeSideObject, 'focus', 'start', 'previous', 'block');
};

Changes$4.moveFocusToStartOfPreviousInline = function (change) {
  change.call(pointEdgeSideObject, 'focus', 'start', 'previous', 'inline');
};

Changes$4.moveFocusToStartOfPreviousText = function (change) {
  change.call(pointEdgeSideObject, 'focus', 'start', 'previous', 'text');
};

Changes$4.moveFocusToStartOfText = function (change) {
  change.call(pointEdgeObject, 'focus', 'start', 'text');
};

Changes$4.moveForward = function (change) {
  var _change$moveAnchorFor;

  for (var _len17 = arguments.length, args = Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
    args[_key17 - 1] = arguments[_key17];
  }

  (_change$moveAnchorFor = change.moveAnchorForward.apply(change, args)).moveFocusForward.apply(_change$moveAnchorFor, args);
};

Changes$4.moveStartBackward = function (change) {
  for (var _len18 = arguments.length, args = Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
    args[_key18 - 1] = arguments[_key18];
  }

  change.call.apply(change, [pointBackward, 'start'].concat(args));
};

Changes$4.moveStartForward = function (change) {
  for (var _len19 = arguments.length, args = Array(_len19 > 1 ? _len19 - 1 : 0), _key19 = 1; _key19 < _len19; _key19++) {
    args[_key19 - 1] = arguments[_key19];
  }

  change.call.apply(change, [pointForward, 'start'].concat(args));
};

Changes$4.moveStartTo = function (change) {
  for (var _len20 = arguments.length, args = Array(_len20 > 1 ? _len20 - 1 : 0), _key20 = 1; _key20 < _len20; _key20++) {
    args[_key20 - 1] = arguments[_key20];
  }

  change.call.apply(change, [proxy, 'moveStartTo'].concat(args));
};

Changes$4.moveStartToEndOfBlock = function (change) {
  change.call(pointEdgeObject, 'start', 'end', 'block');
};

Changes$4.moveStartToEndOfDocument = function (change) {
  change.moveStartToEndOfNode(change.value.document).moveToStart();
};

Changes$4.moveStartToEndOfInline = function (change) {
  change.call(pointEdgeObject, 'start', 'end', 'inline');
};

Changes$4.moveStartToEndOfNextBlock = function (change) {
  change.call(pointEdgeSideObject, 'start', 'end', 'next', 'block');
};

Changes$4.moveStartToEndOfNextInline = function (change) {
  change.call(pointEdgeSideObject, 'start', 'end', 'next', 'inline');
};

Changes$4.moveStartToEndOfNextText = function (change) {
  change.call(pointEdgeSideObject, 'start', 'end', 'next', 'text');
};

Changes$4.moveStartToEndOfNode = function (change) {
  for (var _len21 = arguments.length, args = Array(_len21 > 1 ? _len21 - 1 : 0), _key21 = 1; _key21 < _len21; _key21++) {
    args[_key21 - 1] = arguments[_key21];
  }

  change.call.apply(change, [proxy, 'moveStartToEndOfNode'].concat(args));
};

Changes$4.moveStartToEndOfPreviousBlock = function (change) {
  change.call(pointEdgeSideObject, 'start', 'end', 'previous', 'block');
};

Changes$4.moveStartToEndOfPreviousInline = function (change) {
  change.call(pointEdgeSideObject, 'start', 'end', 'previous', 'inline');
};

Changes$4.moveStartToEndOfPreviousText = function (change) {
  change.call(pointEdgeSideObject, 'start', 'end', 'previous', 'text');
};

Changes$4.moveStartToEndOfText = function (change) {
  change.call(pointEdgeObject, 'start', 'end', 'text');
};

Changes$4.moveStartToStartOfBlock = function (change) {
  change.call(pointEdgeObject, 'start', 'start', 'block');
};

Changes$4.moveStartToStartOfDocument = function (change) {
  change.moveStartToStartOfNode(change.value.document).moveToStart();
};

Changes$4.moveStartToStartOfInline = function (change) {
  change.call(pointEdgeObject, 'start', 'start', 'inline');
};

Changes$4.moveStartToStartOfNextBlock = function (change) {
  change.call(pointEdgeSideObject, 'start', 'start', 'next', 'block');
};

Changes$4.moveStartToStartOfNextInline = function (change) {
  change.call(pointEdgeSideObject, 'start', 'start', 'next', 'inline');
};

Changes$4.moveStartToStartOfNextText = function (change) {
  change.call(pointEdgeSideObject, 'start', 'start', 'next', 'text');
};

Changes$4.moveStartToStartOfNode = function (change) {
  for (var _len22 = arguments.length, args = Array(_len22 > 1 ? _len22 - 1 : 0), _key22 = 1; _key22 < _len22; _key22++) {
    args[_key22 - 1] = arguments[_key22];
  }

  change.call.apply(change, [proxy, 'moveStartToStartOfNode'].concat(args));
};

Changes$4.moveStartToStartOfPreviousBlock = function (change) {
  change.call(pointEdgeSideObject, 'start', 'start', 'previous', 'block');
};

Changes$4.moveStartToStartOfPreviousInline = function (change) {
  change.call(pointEdgeSideObject, 'start', 'start', 'previous', 'inline');
};

Changes$4.moveStartToStartOfPreviousText = function (change) {
  change.call(pointEdgeSideObject, 'start', 'start', 'previous', 'text');
};

Changes$4.moveStartToStartOfText = function (change) {
  change.call(pointEdgeObject, 'start', 'start', 'text');
};

Changes$4.moveTo = function (change) {
  for (var _len23 = arguments.length, args = Array(_len23 > 1 ? _len23 - 1 : 0), _key23 = 1; _key23 < _len23; _key23++) {
    args[_key23 - 1] = arguments[_key23];
  }

  change.call.apply(change, [proxy, 'moveTo'].concat(args));
};

Changes$4.moveToAnchor = function (change) {
  change.call(proxy, 'moveToAnchor');
};

Changes$4.moveToEnd = function (change) {
  change.call(proxy, 'moveToEnd');
};

Changes$4.moveToEndOfBlock = function (change) {
  change.moveEndToEndOfBlock().moveToEnd();
};

Changes$4.moveToEndOfDocument = function (change) {
  change.moveEndToEndOfNode(change.value.document).moveToEnd();
};

Changes$4.moveToEndOfInline = function (change) {
  change.moveEndToEndOfInline().moveToEnd();
};

Changes$4.moveToEndOfNextBlock = function (change) {
  change.moveEndToEndOfNextBlock().moveToEnd();
};

Changes$4.moveToEndOfNextInline = function (change) {
  change.moveEndToEndOfNextInline().moveToEnd();
};

Changes$4.moveToEndOfNextText = function (change) {
  change.moveEndToEndOfNextText().moveToEnd();
};

Changes$4.moveToEndOfNode = function (change) {
  for (var _len24 = arguments.length, args = Array(_len24 > 1 ? _len24 - 1 : 0), _key24 = 1; _key24 < _len24; _key24++) {
    args[_key24 - 1] = arguments[_key24];
  }

  change.call.apply(change, [proxy, 'moveToEndOfNode'].concat(args));
};

Changes$4.moveToEndOfPreviousBlock = function (change) {
  change.moveStartToEndOfPreviousBlock().moveToStart();
};

Changes$4.moveToEndOfPreviousInline = function (change) {
  change.moveStartToEndOfPreviousInline().moveToStart();
};

Changes$4.moveToEndOfPreviousText = function (change) {
  change.moveStartToEndOfPreviousText().moveToStart();
};

Changes$4.moveToEndOfText = function (change) {
  change.moveEndToEndOfText().moveToEnd();
};

Changes$4.moveToFocus = function (change) {
  change.call(proxy, 'moveToFocus');
};

Changes$4.moveToRangeOfDocument = function (change) {
  change.moveToRangeOfNode(change.value.document);
};

Changes$4.moveToRangeOfNode = function (change) {
  for (var _len25 = arguments.length, args = Array(_len25 > 1 ? _len25 - 1 : 0), _key25 = 1; _key25 < _len25; _key25++) {
    args[_key25 - 1] = arguments[_key25];
  }

  change.call.apply(change, [proxy, 'moveToRangeOfNode'].concat(args));
};

Changes$4.moveToStart = function (change) {
  change.call(proxy, 'moveToStart');
};

Changes$4.moveToStartOfBlock = function (change) {
  change.moveStartToStartOfBlock().moveToStart();
};

Changes$4.moveToStartOfDocument = function (change) {
  change.moveStartToStartOfNode(change.value.document).moveToStart();
};

Changes$4.moveToStartOfInline = function (change) {
  change.moveStartToStartOfInline().moveToStart();
};

Changes$4.moveToStartOfNextBlock = function (change) {
  change.moveEndToStartOfNextBlock().moveToEnd();
};

Changes$4.moveToStartOfNextInline = function (change) {
  change.moveEndToStartOfNextInline().moveToEnd();
};

Changes$4.moveToStartOfNextText = function (change) {
  change.moveEndToStartOfNextText().moveToEnd();
};

Changes$4.moveToStartOfNode = function (change) {
  for (var _len26 = arguments.length, args = Array(_len26 > 1 ? _len26 - 1 : 0), _key26 = 1; _key26 < _len26; _key26++) {
    args[_key26 - 1] = arguments[_key26];
  }

  change.call.apply(change, [proxy, 'moveToStartOfNode'].concat(args));
};

Changes$4.moveToStartOfPreviousBlock = function (change) {
  change.moveStartToStartOfPreviousBlock().moveToStart();
};

Changes$4.moveToStartOfPreviousInline = function (change) {
  change.moveStartToStartOfPreviousInline().moveToStart();
};

Changes$4.moveToStartOfPreviousText = function (change) {
  change.moveStartToStartOfPreviousText().moveToStart();
};

Changes$4.moveToStartOfText = function (change) {
  change.moveStartToStartOfText().moveToStart();
};

Changes$4.select = function (change, properties) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  properties = Selection.createProperties(properties);
  var _options$snapshot = options.snapshot,
      snapshot = _options$snapshot === undefined ? false : _options$snapshot;
  var value = change.value;
  var document = value.document,
      selection = value.selection;

  var props = {};
  var next = selection.setProperties(properties);
  next = document.resolveSelection(next);

  // Re-compute the properties, to ensure that we get their normalized values.
  properties = pick(next, Object.keys(properties));

  // Remove any properties that are already equal to the current selection. And
  // create a dictionary of the previous values for all of the properties that
  // are being changed, for the inverse operation.
  for (var k in properties) {
    if (snapshot === true || !immutable.is(properties[k], selection[k])) {
      props[k] = properties[k];
    }
  }

  // If the selection moves, clear any marks, unless the new selection
  // properties change the marks in some way.
  if (selection.marks && !props.marks && (props.anchor || props.focus)) {
    props.marks = null;
  }

  // If there are no new properties to set, abort to avoid extra operations.
  if (Object.keys(props).length === 0) {
    return;
  }

  change.applyOperation({
    type: 'set_selection',
    value: value,
    properties: props,
    selection: selection.toJSON()
  }, snapshot ? { skip: false, merge: false } : {});
};

Changes$4.setAnchor = function (change) {
  for (var _len27 = arguments.length, args = Array(_len27 > 1 ? _len27 - 1 : 0), _key27 = 1; _key27 < _len27; _key27++) {
    args[_key27 - 1] = arguments[_key27];
  }

  change.call.apply(change, [proxy, 'setAnchor'].concat(args));
};

Changes$4.setEnd = function (change) {
  for (var _len28 = arguments.length, args = Array(_len28 > 1 ? _len28 - 1 : 0), _key28 = 1; _key28 < _len28; _key28++) {
    args[_key28 - 1] = arguments[_key28];
  }

  change.call.apply(change, [proxy, 'setEnd'].concat(args));
};

Changes$4.setFocus = function (change) {
  for (var _len29 = arguments.length, args = Array(_len29 > 1 ? _len29 - 1 : 0), _key29 = 1; _key29 < _len29; _key29++) {
    args[_key29 - 1] = arguments[_key29];
  }

  change.call.apply(change, [proxy, 'setFocus'].concat(args));
};

Changes$4.setStart = function (change) {
  for (var _len30 = arguments.length, args = Array(_len30 > 1 ? _len30 - 1 : 0), _key30 = 1; _key30 < _len30; _key30++) {
    args[_key30 - 1] = arguments[_key30];
  }

  change.call.apply(change, [proxy, 'setStart'].concat(args));
};

Changes$4.snapshotSelection = function (change) {
  change.select(change.value.selection, { snapshot: true });
};

/**
 * Helpers.
 */

function proxy(change, method) {
  var _change$value$selecti;

  for (var _len31 = arguments.length, args = Array(_len31 > 2 ? _len31 - 2 : 0), _key31 = 2; _key31 < _len31; _key31++) {
    args[_key31 - 2] = arguments[_key31];
  }

  var range = (_change$value$selecti = change.value.selection)[method].apply(_change$value$selecti, args);
  change.select(range);
}

function pointEdgeObject(change, point, edge, object) {
  var Point = point.slice(0, 1).toUpperCase() + point.slice(1);
  var Edge = edge.slice(0, 1).toUpperCase() + edge.slice(1);
  var Object = object.slice(0, 1).toUpperCase() + object.slice(1);
  var method = 'move' + Point + 'To' + Edge + 'OfNode';
  var getNode = object == 'text' ? 'getNode' : 'getClosest' + Object;
  var value = change.value;
  var document = value.document,
      selection = value.selection;

  var p = selection[point];
  var node = document[getNode](p.key);
  if (!node) return;
  change[method](node);
}

function pointEdgeSideObject(change, point, edge, side, object) {
  var Point = point.slice(0, 1).toUpperCase() + point.slice(1);
  var Edge = edge.slice(0, 1).toUpperCase() + edge.slice(1);
  var Side = side.slice(0, 1).toUpperCase() + side.slice(1);
  var Object = object.slice(0, 1).toUpperCase() + object.slice(1);
  var method = 'move' + Point + 'To' + Edge + 'OfNode';
  var getNode = object == 'text' ? 'getNode' : 'getClosest' + Object;
  var getDirectionNode = 'get' + Side + Object;
  var value = change.value;
  var document = value.document,
      selection = value.selection;

  var p = selection[point];
  var node = document[getNode](p.key);
  if (!node) return;
  var target = document[getDirectionNode](node.key);
  if (!target) return;
  change[method](target);
}

function pointBackward(change, point) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (n === 0) return;
  if (n < 0) return pointForward(change, point, -n);

  var Point = point.slice(0, 1).toUpperCase() + point.slice(1);
  var value = change.value;
  var document = value.document,
      selection = value.selection,
      schema = value.schema;

  var p = selection[point];
  var hasVoidParent = document.hasVoidParent(p.path, schema);

  // what is this?
  if (!hasVoidParent && p.offset - n >= 0) {
    var range = selection['move' + Point + 'Backward'](n);
    change.select(range);
    return;
  }

  var previous = document.getPreviousText(p.path);
  if (!previous) return;

  var block = document.getClosestBlock(p.path);
  var isInBlock = block.hasNode(previous.key);
  var isPreviousInVoid = previous && document.hasVoidParent(previous.key, schema);
  change['move' + Point + 'ToEndOfNode'](previous);

  // when is this called?
  if (!hasVoidParent && !isPreviousInVoid && isInBlock) {
    var _range = change.value.selection['move' + Point + 'Backward'](n);
    change.select(_range);
  }
}

function pointForward(change, point) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (n === 0) return;
  if (n < 0) return pointBackward(change, point, -n);

  var Point = point.slice(0, 1).toUpperCase() + point.slice(1);
  var value = change.value;
  var document = value.document,
      selection = value.selection,
      schema = value.schema;

  var p = selection[point];
  var text = document.getNode(p.path);
  var hasVoidParent = document.hasVoidParent(p.path, schema);

  // what is this?
  if (!hasVoidParent && p.offset + n <= text.text.length) {
    var range = selection['move' + Point + 'Forward'](n);
    change.select(range);
    return;
  }

  var next = document.getNextText(p.path);
  if (!next) return;

  var block = document.getClosestBlock(p.path);
  var isInBlock = block.hasNode(next.key);
  var isNextInVoid = document.hasVoidParent(next.key, schema);
  change['move' + Point + 'ToStartOfNode'](next);

  // when is this called?
  if (!hasVoidParent && !isNextInVoid && isInBlock) {
    var _range2 = change.value.selection['move' + Point + 'Forward'](n);
    change.select(_range2);
  }
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = Debug('slate:history');

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$10 = {
  redos: new immutable.Stack(),
  undos: new immutable.Stack()

  /**
   * History.
   *
   * @type {History}
   */

};
var History = function (_Record) {
  inherits(History, _Record);

  function History() {
    classCallCheck(this, History);
    return possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).apply(this, arguments));
  }

  createClass(History, [{
    key: 'save',


    /**
     * Save an `operation` into the history.
     *
     * @param {Object} operation
     * @param {Object} options
     * @return {History}
     */

    value: function save(operation) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var history = this;
      var _history = history,
          undos = _history.undos,
          redos = _history.redos;
      var merge = options.merge,
          skip = options.skip;


      if (skip) {
        return history;
      }

      var prevBatch = undos.peek();
      var prevOperation = prevBatch && prevBatch.last();

      if (merge == null) {
        merge = shouldMerge(operation, prevOperation);
      }

      debug('save', { operation: operation, merge: merge });

      // If the `merge` flag is true, add the operation to the previous batch.
      if (merge && prevBatch) {
        var batch = prevBatch.push(operation);
        undos = undos.pop();
        undos = undos.push(batch);
      } else {
        // Otherwise, create a new batch with the operation.
        var _batch = new immutable.List([operation]);
        undos = undos.push(_batch);
      }

      // Constrain the history to 100 entries for memory's sake.
      if (undos.size > 100) {
        undos = undos.take(100);
      }

      // Clear the redos and update the history.
      redos = redos.clear();
      history = history.set('undos', undos).set('redos', redos);
      return history;
    }

    /**
     * Return a JSON representation of the history.
     *
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var object = {
        object: this.object,
        redos: this.redos.toJSON(),
        undos: this.undos.toJSON()
      };

      return object;
    }
  }, {
    key: 'object',


    /**
     * Object.
     *
     * @return {String}
     */

    get: function get$$1() {
      return 'history';
    }
  }], [{
    key: 'create',

    /**
     * Create a new `History` with `attrs`.
     *
     * @param {Object|History} attrs
     * @return {History}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (History.isHistory(attrs)) {
        return attrs;
      }

      if (isPlainObject(attrs)) {
        return History.fromJSON(attrs);
      }

      throw new Error('`History.create` only accepts objects or histories, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Operations` from `operations`.
     *
     * @param {Array<Object>|List<Object>} operations
     * @return {List<Object>}
     */

  }, {
    key: 'createOperationsList',
    value: function createOperationsList() {
      var operations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (immutable.List.isList(operations)) {
        return operations;
      }

      if (Array.isArray(operations)) {
        return new immutable.List(operations);
      }

      throw new Error('`History.createList` only accepts arrays or lists, but you passed it: ' + operations);
    }

    /**
     * Create a `History` from a JSON `object`.
     *
     * @param {Object} object
     * @return {History}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var _object$redos = object.redos,
          redos = _object$redos === undefined ? [] : _object$redos,
          _object$undos = object.undos,
          undos = _object$undos === undefined ? [] : _object$undos;


      var history = new History({
        redos: new immutable.Stack(redos.map(this.createOperationsList)),
        undos: new immutable.Stack(undos.map(this.createOperationsList))
      });

      return history;
    }

    /**
     * Check if `any` is a `History`.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }]);
  return History;
}(immutable.Record(DEFAULTS$10));

/**
 * Attach a pseudo-symbol for type checking.
 */

History.isHistory = isType.bind(null, 'HISTORY');
History.prototype[MODEL_TYPES.HISTORY] = true;

/**
 * Check whether to merge a new operation `o` into the previous operation `p`.
 *
 * @param {Object} o
 * @param {Object} p
 * @return {Boolean}
 */

function shouldMerge(o, p) {
  if (!p) return false;

  var merge = o.type == 'set_selection' && p.type == 'set_selection' || o.type == 'insert_text' && p.type == 'insert_text' && o.offset == p.offset + p.text.length && o.path.equals(p.path) || o.type == 'remove_text' && p.type == 'remove_text' && o.offset + o.text.length == p.offset && o.path.equals(p.path);

  return merge;
}

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$11 = {
  plugins: []

  /**
   * Stack.
   *
   * @type {Stack}
   */

};
var Stack = function (_Record) {
  inherits(Stack, _Record);

  function Stack() {
    classCallCheck(this, Stack);
    return possibleConstructorReturn(this, (Stack.__proto__ || Object.getPrototypeOf(Stack)).apply(this, arguments));
  }

  createClass(Stack, [{
    key: 'getPluginsWith',


    /**
     * Get all plugins with `property`.
     *
     * @param {String} property
     * @return {Array}
     */

    value: function getPluginsWith(property) {
      return this.plugins.filter(function (plugin) {
        return plugin[property] != null;
      });
    }

    /**
     * Iterate the plugins with `property`, returning the first non-null value.
     *
     * @param {String} property
     * @param {Any} ...args
     */

  }, {
    key: 'find',
    value: function find(property) {
      var plugins = this.getPluginsWith(property);

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var plugin = _step.value;

          var ret = plugin[property].apply(plugin, args);
          if (ret != null) return ret;
        }
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
    }

    /**
     * Iterate the plugins with `property`, returning all the non-null values.
     *
     * @param {String} property
     * @param {Any} ...args
     * @return {Array}
     */

  }, {
    key: 'map',
    value: function map(property) {
      var plugins = this.getPluginsWith(property);
      var array = [];

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = plugins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var plugin = _step2.value;

          var ret = plugin[property].apply(plugin, args);
          if (ret != null) array.push(ret);
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

      return array;
    }

    /**
     * Iterate the plugins with `property`, breaking on any a non-null values.
     *
     * @param {String} property
     * @param {Any} ...args
     */

  }, {
    key: 'run',
    value: function run(property) {
      var plugins = this.getPluginsWith(property);

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = plugins[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var plugin = _step3.value;

          var ret = plugin[property].apply(plugin, args);
          if (ret != null) return;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }

    /**
     * Iterate the plugins with `property`, reducing to a set of React children.
     *
     * @param {String} property
     * @param {Object} props
     * @param {Any} ...args
     */

  }, {
    key: 'render',
    value: function render(property, props) {
      for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }

      var plugins = this.getPluginsWith(property);
      return plugins.reduceRight(function (children, plugin) {
        if (!plugin[property]) return children;
        var ret = plugin[property].apply(plugin, [props].concat(args));
        if (ret == null) return children;
        props.children = ret;
        return ret;
      }, props.children === undefined ? null : props.children);
    }
  }, {
    key: 'object',


    /**
     * Object.
     *
     * @return {String}
     */

    get: function get$$1() {
      return 'stack';
    }
  }], [{
    key: 'create',

    /**
     * Constructor.
     *
     * @param {Object} attrs
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _attrs$plugins = attrs.plugins,
          plugins = _attrs$plugins === undefined ? [] : _attrs$plugins;

      var stack = new Stack({ plugins: plugins });
      return stack;
    }

    /**
     * Check if `any` is a `Stack`.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isStack',
    value: function isStack(any) {
      return !!(any && any[MODEL_TYPES.STACK]);
    }
  }]);
  return Stack;
}(immutable.Record(DEFAULTS$11));

/**
 * Attach a pseudo-symbol for type checking.
 */

Stack.prototype[MODEL_TYPES.STACK] = true;

/**
 * Memoize read methods.
 */

memoize(Stack.prototype, ['getPluginsWith']);

/**
 * Define a Slate error.
 *
 * @type {SlateError}
 */

var SlateError = function (_Error) {
  inherits(SlateError, _Error);

  function SlateError(code) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, SlateError);

    var _this = possibleConstructorReturn(this, (SlateError.__proto__ || Object.getPrototypeOf(SlateError)).call(this, code));

    _this.code = code;

    for (var key in attrs) {
      _this[key] = attrs[key];
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      _this.stack = new Error().stack;
    }
    return _this;
  }

  return SlateError;
}(Error);

/**
 * Debug.
 *
 * @type {Function}
 */

var debug$1 = Debug('slate:schema');

/**
 * Define the core schema rules, order-sensitive.
 *
 * @type {Array}
 */

var CORE_RULES = [
// Only allow block nodes in documents.
{
  match: { object: 'document' },
  nodes: [{
    match: { object: 'block' }
  }]
},

// Only allow block nodes or inline and text nodes in blocks.
{
  match: {
    object: 'block',
    first: { object: 'block' }
  },
  nodes: [{
    match: { object: 'block' }
  }]
}, {
  match: {
    object: 'block',
    first: [{ object: 'inline' }, { object: 'text' }]
  },
  nodes: [{
    match: [{ object: 'inline' }, { object: 'text' }]
  }]
},

// Only allow inline and text nodes in inlines.
{
  match: { object: 'inline' },
  nodes: [{ match: [{ object: 'inline' }, { object: 'text' }] }]
},

// Ensure that block and inline nodes have at least one text child.
{
  match: [{ object: 'block' }, { object: 'inline' }],
  nodes: [{ min: 1 }],
  normalize: function normalize(change, error) {
    var code = error.code,
        node = error.node;

    if (code !== 'child_required') return;
    change.insertNodeByKey(node.key, 0, Text.create(), { normalize: false });
  }
},

// Ensure that inline nodes are surrounded by text nodes.
{
  match: { object: 'block' },
  first: [{ object: 'block' }, { object: 'text' }],
  last: [{ object: 'block' }, { object: 'text' }],
  normalize: function normalize(change, error) {
    var code = error.code,
        node = error.node;

    var text = Text.create();
    var i = void 0;

    if (code === 'first_child_object_invalid') {
      i = 0;
    } else if (code === 'last_child_object_invalid') {
      i = node.nodes.size;
    } else {
      return;
    }

    change.insertNodeByKey(node.key, i, text, { normalize: false });
  }
}, {
  match: { object: 'inline' },
  first: [{ object: 'block' }, { object: 'text' }],
  last: [{ object: 'block' }, { object: 'text' }],
  previous: [{ object: 'block' }, { object: 'text' }],
  next: [{ object: 'block' }, { object: 'text' }],
  normalize: function normalize(change, error) {
    var code = error.code,
        node = error.node,
        index = error.index;

    var text = Text.create();
    var i = void 0;

    if (code === 'first_child_object_invalid') {
      i = 0;
    } else if (code === 'last_child_object_invalid') {
      i = node.nodes.size;
    } else if (code === 'previous_sibling_object_invalid') {
      i = index;
    } else if (code === 'next_sibling_object_invalid') {
      i = index + 1;
    } else {
      return;
    }

    change.insertNodeByKey(node.key, i, text, { normalize: false });
  }
},

// Merge adjacent text nodes.
{
  match: { object: 'text' },
  next: [{ object: 'block' }, { object: 'inline' }],
  normalize: function normalize(change, error) {
    var code = error.code,
        next = error.next;

    if (code !== 'next_sibling_object_invalid') return;
    change.mergeNodeByKey(next.key, { normalize: false });
  }
}];

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$12 = {
  stack: Stack.create(),
  rules: []

  /**
   * Schema.
   *
   * @type {Schema}
   */

};
var Schema = function (_Record) {
  inherits(Schema, _Record);

  function Schema() {
    classCallCheck(this, Schema);
    return possibleConstructorReturn(this, (Schema.__proto__ || Object.getPrototypeOf(Schema)).apply(this, arguments));
  }

  createClass(Schema, [{
    key: 'getNodeRules',


    /**
     * Get the schema rules for a `node`.
     *
     * @param {Node} node
     * @return {Array}
     */

    value: function getNodeRules(node) {
      var rules = this.rules.filter(function (r) {
        return testRules(node, r.match);
      });
      return rules;
    }

    /**
     * Validate a `node` with the schema, returning an error if it's invalid.
     *
     * @param {Node} node
     * @return {Error|Void}
     */

  }, {
    key: 'validateNode',
    value: function validateNode(node) {
      var rules = this.getNodeRules(node);
      var failure = validateRules(node, rules, this.rules, { every: true });
      if (!failure) return;
      var error = new SlateError(failure.code, failure);
      return error;
    }

    /**
     * Test whether a `node` is valid against the schema.
     *
     * @param {Node} node
     * @return {Boolean}
     */

  }, {
    key: 'testNode',
    value: function testNode(node) {
      var error = this.validateNode(node);
      return !error;
    }

    /**
     * Assert that a `node` is valid against the schema.
     *
     * @param {Node} node
     * @throws
     */

  }, {
    key: 'assertNode',
    value: function assertNode(node) {
      var error = this.validateNode(node);
      if (error) throw error;
    }

    /**
     * Normalize a `node` with the schema, returning a function that will fix the
     * invalid node, or void if the node is valid.
     *
     * @param {Node} node
     * @return {Function|Void}
     */

  }, {
    key: 'normalizeNode',
    value: function normalizeNode(node) {
      var ret = this.stack.find('normalizeNode', node);
      if (ret) return ret;
      if (node.object == 'text') return;

      var error = this.validateNode(node);
      if (!error) return;

      return function (change) {
        debug$1('normalizing', { error: error });
        var rule = error.rule;
        var size = change.operations.size;

        // First run the user-provided `normalize` function if one exists...

        if (rule.normalize) {
          rule.normalize(change, error);
        }

        // If the `normalize` function did not add any operations to the change
        // object, it can't have normalized, so run the default one.
        if (change.operations.size === size) {
          defaultNormalize(change, error);
        }
      };
    }

    /**
     * Check if a mark is void.
     *
     * @param {Mark}
     * @return {Boolean}
     */

  }, {
    key: 'isAtomic',
    value: function isAtomic(mark) {
      var rule = this.rules.find(function (r) {
        return 'isAtomic' in r && testRules(mark, r.match);
      });

      return rule ? rule.isAtomic : false;
    }

    /**
     * Check if a node is void.
     *
     * @param {Node}
     * @return {Boolean}
     */

  }, {
    key: 'isVoid',
    value: function isVoid(node) {
      var rule = this.rules.find(function (r) {
        return 'isVoid' in r && testRules(node, r.match);
      });
      return rule ? rule.isVoid : false;
    }

    /**
     * Return a JSON representation of the schema.
     *
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var object = {
        object: this.object,
        rules: this.rules
      };

      return object;
    }
  }, {
    key: 'object',


    /**
     * Object.
     *
     * @return {String}
     */

    get: function get$$1() {
      return 'schema';
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Schema` with `attrs`.
     *
     * @param {Object|Schema} attrs
     * @return {Schema}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Schema.isSchema(attrs)) {
        return attrs;
      }

      if (isPlainObject(attrs)) {
        return Schema.fromJSON(attrs);
      }

      throw new Error('`Schema.create` only accepts objects or schemas, but you passed it: ' + attrs);
    }

    /**
     * Create a `Schema` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Schema}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Schema.isSchema(object)) {
        return object;
      }

      var plugins = object.plugins ? object.plugins : [{ schema: object }];
      var rules = [].concat(CORE_RULES);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var plugin = _step.value;
          var _plugin$schema = plugin.schema,
              schema = _plugin$schema === undefined ? {} : _plugin$schema;
          var _schema$blocks = schema.blocks,
              blocks = _schema$blocks === undefined ? {} : _schema$blocks,
              _schema$inlines = schema.inlines,
              inlines = _schema$inlines === undefined ? {} : _schema$inlines,
              _schema$marks = schema.marks,
              marks = _schema$marks === undefined ? {} : _schema$marks;


          if (schema.rules) {
            rules = rules.concat(schema.rules);
          }

          if (schema.document) {
            rules.push(_extends({
              match: [{ object: 'document' }]
            }, schema.document));
          }

          for (var key in blocks) {
            rules.push(_extends({
              match: [{ object: 'block', type: key }]
            }, blocks[key]));
          }

          for (var _key in inlines) {
            rules.push(_extends({
              match: [{ object: 'inline', type: _key }]
            }, inlines[_key]));
          }

          for (var _key2 in marks) {
            rules.push(_extends({
              match: [{ object: 'mark', type: _key2 }]
            }, marks[_key2]));
          }
        }
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

      var stack = Stack.create({ plugins: plugins });
      var ret = new Schema({ stack: stack, rules: rules });
      return ret;
    }

    /**
     * Check if `any` is a `Schema`.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isSchema',
    value: function isSchema(any) {
      return !!(any && any[MODEL_TYPES.SCHEMA]);
    }
  }]);
  return Schema;
}(immutable.Record(DEFAULTS$12));

/**
 * Normalize an invalid value with `error` with default remedies.
 *
 * @param {Change} change
 * @param {SlateError} error
 */

function defaultNormalize(change, error) {
  var code = error.code,
      node = error.node,
      child = error.child,
      next = error.next,
      previous = error.previous,
      key = error.key,
      mark = error.mark;


  switch (code) {
    case 'child_object_invalid':
    case 'child_type_invalid':
    case 'child_unknown':
    case 'first_child_object_invalid':
    case 'first_child_type_invalid':
    case 'last_child_object_invalid':
    case 'last_child_type_invalid':
      {
        return child.object === 'text' && node.object === 'block' && node.nodes.size === 1 ? change.removeNodeByKey(node.key, { normalize: false }) : change.removeNodeByKey(child.key, { normalize: false });
      }

    case 'previous_sibling_object_invalid':
    case 'previous_sibling_type_invalid':
      {
        return previous.object === 'text' && node.object === 'block' && node.nodes.size === 1 ? change.removeNodeByKey(node.key, { normalize: false }) : change.removeNodeByKey(previous.key, { normalize: false });
      }

    case 'next_sibling_object_invalid':
    case 'next_sibling_type_invalid':
      {
        return next.object === 'text' && node.object === 'block' && node.nodes.size === 1 ? change.removeNodeByKey(node.key, { normalize: false }) : change.removeNodeByKey(next.key, { normalize: false });
      }

    case 'child_required':
    case 'node_text_invalid':
    case 'parent_object_invalid':
    case 'parent_type_invalid':
      {
        return node.object === 'document' ? node.nodes.forEach(function (n) {
          return change.removeNodeByKey(n.key, { normalize: false });
        }) : change.removeNodeByKey(node.key, { normalize: false });
      }

    case 'node_data_invalid':
      {
        return node.data.get(key) === undefined && node.object !== 'document' ? change.removeNodeByKey(node.key, { normalize: false }) : change.setNodeByKey(node.key, { data: node.data.delete(key) }, { normalize: false });
      }

    case 'node_mark_invalid':
      {
        return node.getTexts().forEach(function (t) {
          return change.removeMarkByKey(t.key, 0, t.text.length, mark, {
            normalize: false
          });
        });
      }

    default:
      {
        return change.removeNodeByKey(node.key, { normalize: false });
      }
  }
}

/**
 * Check that an `object` matches one of a set of `rules`.
 *
 * @param {Mixed} object
 * @param {Object|Array} rules
 * @return {Boolean}
 */

function testRules(object, rules) {
  var error = validateRules(object, rules);
  return !error;
}

/**
 * Validate that a `object` matches a `rule` object or array.
 *
 * @param {Mixed} object
 * @param {Object|Array} rule
 * @param {Array|Void} rules
 * @return {Error|Void}
 */

function validateRules(object, rule, rules) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$every = options.every,
      every = _options$every === undefined ? false : _options$every;


  if (Array.isArray(rule)) {
    var array = rule.length ? rule : [{}];
    var first = void 0;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = array[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var r = _step2.value;

        var _error = validateRules(object, r, rules);
        first = first || _error;
        if (every && _error) return _error;
        if (!every && !_error) return;
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

    return first;
  }

  var error = validateObject(object, rule) || validateType(object, rule) || validateData(object, rule) || validateMarks(object, rule) || validateText(object, rule) || validateFirst(object, rule) || validateLast(object, rule) || validateNodes(object, rule, rules);

  return error;
}

function validateObject(node, rule) {
  if (rule.object == null) return;
  if (rule.object === node.object) return;
  if (typeof rule.object === 'function' && rule.object(node.object)) return;
  return fail('node_object_invalid', { rule: rule, node: node });
}

function validateType(node, rule) {
  if (rule.type == null) return;
  if (rule.type === node.type) return;
  if (typeof rule.type === 'function' && rule.type(node.type)) return;
  return fail('node_type_invalid', { rule: rule, node: node });
}

function validateData(node, rule) {
  if (rule.data == null) return;
  if (node.data == null) return;

  if (typeof rule.data === 'function') {
    if (rule.data(node.data)) return;
    return fail('node_data_invalid', { rule: rule, node: node });
  }

  for (var key in rule.data) {
    var fn = rule.data[key];
    var value = node.data && node.data.get(key);
    var valid = typeof fn === 'function' ? fn(value) : fn === value;
    if (valid) continue;
    return fail('node_data_invalid', { rule: rule, node: node, key: key, value: value });
  }
}

function validateMarks(node, rule) {
  if (rule.marks == null) return;
  var marks = node.getMarks().toArray();

  var _loop = function _loop(mark) {
    var valid = rule.marks.some(function (def) {
      return typeof def.type === 'function' ? def.type(mark.type) : def.type === mark.type;
    });
    if (valid) return 'continue';
    return {
      v: fail('node_mark_invalid', { rule: rule, node: node, mark: mark })
    };
  };

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = marks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var mark = _step3.value;

      var _ret = _loop(mark);

      switch (_ret) {
        case 'continue':
          continue;

        default:
          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

function validateText(node, rule) {
  if (rule.text == null) return;
  var text = node.text;

  var valid = typeof rule.text === 'function' ? rule.text(text) : rule.text.test(text);
  if (valid) return;
  return fail('node_text_invalid', { rule: rule, node: node, text: text });
}

function validateFirst(node, rule) {
  if (rule.first == null) return;
  var first = node.nodes.first();
  if (!first) return;
  var error = validateRules(first, rule.first);
  if (!error) return;
  error.rule = rule;
  error.node = node;
  error.child = first;
  error.code = error.code.replace('node_', 'first_child_');
  return error;
}

function validateLast(node, rule) {
  if (rule.last == null) return;
  var last = node.nodes.last();
  if (!last) return;
  var error = validateRules(last, rule.last);
  if (!error) return;
  error.rule = rule;
  error.node = node;
  error.child = last;
  error.code = error.code.replace('node_', 'last_child_');
  return error;
}

function validateNodes(node, rule) {
  var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (node.nodes == null) return;

  var children = node.nodes.toArray();
  var defs = rule.nodes != null ? rule.nodes.slice() : [];
  var offset = void 0;
  var min = void 0;
  var index = void 0;
  var def = void 0;
  var max = void 0;
  var child = void 0;
  var previous = void 0;
  var next = void 0;

  function nextDef() {
    offset = offset == null ? null : 0;
    def = defs.shift();
    min = def && def.min;
    max = def && def.max;
    return !!def;
  }

  function nextChild() {
    index = index == null ? 0 : index + 1;
    offset = offset == null ? 0 : offset + 1;
    previous = child;
    child = children[index];
    next = children[index + 1];
    if (max != null && offset == max) nextDef();
    return !!child;
  }

  function rewind() {
    offset -= 1;
    index -= 1;
  }

  if (rule.nodes != null) {
    nextDef();
  }

  while (nextChild()) {
    var err = validateParent(node, child, rules) || validatePrevious(node, child, previous, index, rules) || validateNext(node, child, next, index, rules);

    if (err) return err;

    if (rule.nodes != null) {
      if (!def) {
        return fail('child_unknown', { rule: rule, node: node, child: child, index: index });
      }

      if (def.match) {
        var error = validateRules(child, def.match);

        if (error && offset >= min && nextDef()) {
          rewind();
          continue;
        }

        if (error) {
          error.rule = rule;
          error.node = node;
          error.child = child;
          error.index = index;
          error.code = error.code.replace('node_', 'child_');
          return error;
        }
      }
    }
  }

  if (rule.nodes != null) {
    while (min != null) {
      if (offset < min) {
        return fail('child_required', { rule: rule, node: node, index: index });
      }

      nextDef();
    }
  }
}

function validateParent(node, child, rules) {
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = rules[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var rule = _step4.value;

      if (rule.parent == null) continue;
      if (!testRules(child, rule.match)) continue;

      var error = validateRules(node, rule.parent);
      if (!error) continue;

      error.rule = rule;
      error.parent = node;
      error.node = child;
      error.code = error.code.replace('node_', 'parent_');
      return error;
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
}

function validatePrevious(node, child, previous, index, rules) {
  if (!previous) return;

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = rules[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var rule = _step5.value;

      if (rule.previous == null) continue;
      if (!testRules(child, rule.match)) continue;

      var error = validateRules(previous, rule.previous);
      if (!error) continue;

      error.rule = rule;
      error.node = node;
      error.child = child;
      error.index = index;
      error.previous = previous;
      error.code = error.code.replace('node_', 'previous_sibling_');
      return error;
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
}

function validateNext(node, child, next, index, rules) {
  if (!next) return;

  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = rules[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var rule = _step6.value;

      if (rule.next == null) continue;
      if (!testRules(child, rule.match)) continue;

      var error = validateRules(next, rule.next);
      if (!error) continue;

      error.rule = rule;
      error.node = node;
      error.child = child;
      error.index = index;
      error.next = next;
      error.code = error.code.replace('node_', 'next_sibling_');
      return error;
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }
}

/**
 * Create an interim failure object with `code` and `attrs`.
 *
 * @param {String} code
 * @param {Object} attrs
 * @return {Object}
 */

function fail(code, attrs) {
  return _extends({ code: code }, attrs);
}

/**
 * Attach a pseudo-symbol for type checking.
 */

Schema.prototype[MODEL_TYPES.SCHEMA] = true;

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$13 = {
  data: immutable.Map(),
  decorations: immutable.List(),
  document: Document.create(),
  history: History.create(),
  schema: Schema.create(),
  selection: Selection.create()

  /**
   * Value.
   *
   * @type {Value}
   */

};
var Value = function (_Record) {
  inherits(Value, _Record);

  function Value() {
    classCallCheck(this, Value);
    return possibleConstructorReturn(this, (Value.__proto__ || Object.getPrototypeOf(Value)).apply(this, arguments));
  }

  createClass(Value, [{
    key: 'change',


    /**
     * Create a new `Change` with the current value as a starting point.
     *
     * @param {Object} attrs
     * @return {Change}
     */

    value: function change() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new Change(_extends({}, attrs, { value: this }));
    }

    /**
     * Add mark to text at `offset` and `length` in node by `path`.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @param {Number} length
     * @param {Mark} mark
     * @return {Value}
     */

  }, {
    key: 'addMark',
    value: function addMark(path, offset, length, mark) {
      var value = this;
      var _value = value,
          document = _value.document;

      document = document.addMark(path, offset, length, mark);
      value = this.set('document', document);
      return value;
    }

    /**
     * Insert a `node`.
     *
     * @param {List|String} path
     * @param {Node} node
     * @return {Value}
     */

  }, {
    key: 'insertNode',
    value: function insertNode(path, node) {
      var value = this;
      var _value2 = value,
          document = _value2.document;

      document = document.insertNode(path, node);
      value = value.set('document', document);

      value = value.mapRanges(function (range) {
        return range.updatePoints(function (point) {
          return point.setPath(null);
        });
      });

      return value;
    }

    /**
     * Insert `text` at `offset` in node by `path`.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @param {String} text
     * @param {Set} marks
     * @return {Value}
     */

  }, {
    key: 'insertText',
    value: function insertText(path, offset, text, marks) {
      var value = this;
      var _value3 = value,
          document = _value3.document,
          schema = _value3.schema;

      document = document.insertText(path, offset, text, marks);
      value = value.set('document', document);

      // Update any ranges that were affected.
      var node = document.assertNode(path);

      value = value.mapRanges(function (range) {
        var _range = range,
            anchor = _range.anchor,
            focus = _range.focus,
            isBackward = _range.isBackward;

        var isAtomic = Decoration.isDecoration(range) && schema.isAtomic(range.mark);

        if (anchor.key === node.key && (anchor.offset > offset || anchor.offset === offset && (!isAtomic || !isBackward))) {
          range = range.moveAnchorForward(text.length);
        }

        if (focus.key === node.key && (focus.offset > offset || focus.offset == offset && (!isAtomic || isBackward))) {
          range = range.moveFocusForward(text.length);
        }

        return range;
      });

      value = value.clearAtomicRanges(node.key, offset);
      return value;
    }

    /**
     * Merge a node backwards its previous sibling.
     *
     * @param {List|Key} path
     * @return {Value}
     */

  }, {
    key: 'mergeNode',
    value: function mergeNode(path) {
      var value = this;
      var _value4 = value,
          document = _value4.document;

      var newDocument = document.mergeNode(path);
      path = document.resolvePath(path);
      var withPath = PathUtils.decrement(path);
      var one = document.getNode(withPath);
      var two = document.getNode(path);
      value = value.set('document', newDocument);

      value = value.mapRanges(function (range) {
        if (two.object === 'text') {
          var max = one.text.length;

          if (range.anchor.key === two.key) {
            range = range.moveAnchorTo(one.key, max + range.anchor.offset);
          }

          if (range.focus.key === two.key) {
            range = range.moveFocusTo(one.key, max + range.focus.offset);
          }
        }

        range = range.updatePoints(function (point) {
          return point.setPath(null);
        });

        return range;
      });

      return value;
    }

    /**
     * Move a node by `path` to `newPath`.
     *
     * A `newIndex` can be provided when move nodes by `key`, to account for not
     * being able to have a key for a location in the tree that doesn't exist yet.
     *
     * @param {List|Key} path
     * @param {List|Key} newPath
     * @param {Number} newIndex
     * @return {Value}
     */

  }, {
    key: 'moveNode',
    value: function moveNode(path, newPath) {
      var newIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var value = this;
      var _value5 = value,
          document = _value5.document;

      document = document.moveNode(path, newPath, newIndex);
      value = value.set('document', document);

      value = value.mapRanges(function (range) {
        return range.updatePoints(function (point) {
          return point.setPath(null);
        });
      });

      return value;
    }

    /**
     * Remove mark from text at `offset` and `length` in node.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @param {Number} length
     * @param {Mark} mark
     * @return {Value}
     */

  }, {
    key: 'removeMark',
    value: function removeMark(path, offset, length, mark) {
      var value = this;
      var _value6 = value,
          document = _value6.document;

      document = document.removeMark(path, offset, length, mark);
      value = this.set('document', document);
      return value;
    }

    /**
     * Remove a node by `path`.
     *
     * @param {List|String} path
     * @return {Value}
     */

  }, {
    key: 'removeNode',
    value: function removeNode(path) {
      var value = this;
      var _value7 = value,
          document = _value7.document;

      var node = document.assertNode(path);
      var first = node.object == 'text' ? node : node.getFirstText() || node;
      var last = node.object == 'text' ? node : node.getLastText() || node;
      var prev = document.getPreviousText(first.key);
      var next = document.getNextText(last.key);

      document = document.removeNode(path);
      value = value.set('document', document);

      value = value.mapRanges(function (range) {
        var _range2 = range,
            start = _range2.start,
            end = _range2.end;


        if (node.hasNode(start.key)) {
          range = prev ? range.moveStartTo(prev.key, prev.text.length) : next ? range.moveStartTo(next.key, 0) : range.unset();
        }

        if (node.hasNode(end.key)) {
          range = prev ? range.moveEndTo(prev.key, prev.text.length) : next ? range.moveEndTo(next.key, 0) : range.unset();
        }

        range = range.updatePoints(function (point) {
          return point.setPath(null);
        });

        return range;
      });

      return value;
    }

    /**
     * Remove `text` at `offset` in node by `path`.
     *
     * @param {List|Key} path
     * @param {Number} offset
     * @param {String} text
     * @return {Value}
     */

  }, {
    key: 'removeText',
    value: function removeText(path, offset, text) {
      var value = this;
      var _value8 = value,
          document = _value8.document;

      document = document.removeText(path, offset, text);
      value = value.set('document', document);

      var node = document.assertNode(path);
      var length = text.length;

      var rangeOffset = offset + length;

      value = value.clearAtomicRanges(node.key, offset, offset + length);

      value = value.mapRanges(function (range) {
        var _range3 = range,
            anchor = _range3.anchor,
            focus = _range3.focus;


        if (anchor.key === node.key) {
          range = anchor.offset >= rangeOffset ? range.moveAnchorBackward(length) : anchor.offset > offset ? range.moveAnchorTo(anchor.key, offset) : range;
        }

        if (focus.key === node.key) {
          range = focus.offset >= rangeOffset ? range.moveFocusBackward(length) : focus.offset > offset ? range.moveFocusTo(focus.key, offset) : range;
        }

        return range;
      });

      return value;
    }

    /**
     * Set `properties` on a node.
     *
     * @param {List|String} path
     * @param {Object} properties
     * @return {Value}
     */

  }, {
    key: 'setNode',
    value: function setNode(path, properties) {
      var value = this;
      var _value9 = value,
          document = _value9.document;

      document = document.setNode(path, properties);
      value = value.set('document', document);
      return value;
    }

    /**
     * Set `properties` on `mark` on text at `offset` and `length` in node.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @param {Number} length
     * @param {Mark} mark
     * @param {Object} properties
     * @return {Value}
     */

  }, {
    key: 'setMark',
    value: function setMark(path, offset, length, mark, properties) {
      var value = this;
      var _value10 = value,
          document = _value10.document;

      document = document.setMark(path, offset, length, mark, properties);
      value = value.set('document', document);
      return value;
    }

    /**
     * Set `properties` on the value.
     *
     * @param {Object} properties
     * @return {Value}
     */

  }, {
    key: 'setProperties',
    value: function setProperties(properties) {
      var value = this;
      var _value11 = value,
          document = _value11.document;
      var data = properties.data,
          decorations = properties.decorations,
          history = properties.history,
          schema = properties.schema;

      var props = {};

      if (data) {
        props.data = data;
      }

      if (history) {
        props.history = history;
      }

      if (schema) {
        props.schema = schema;
      }

      if (decorations) {
        props.decorations = decorations.map(function (d) {
          return d.isSet ? d : document.resolveDecoration(d);
        });
      }

      value = value.merge(props);
      return value;
    }

    /**
     * Set `properties` on the selection.
     *
     * @param {Value} value
     * @param {Operation} operation
     * @return {Value}
     */

  }, {
    key: 'setSelection',
    value: function setSelection(properties) {
      var value = this;
      var _value12 = value,
          document = _value12.document,
          selection = _value12.selection;

      var next = selection.setProperties(properties);
      selection = document.resolveSelection(next);
      value = value.set('selection', selection);
      return value;
    }

    /**
     * Split a node by `path` at `position` with optional `properties` to apply
     * to the newly split node.
     *
     * @param {List|String} path
     * @param {Number} position
     * @param {Object} properties
     * @return {Value}
     */

  }, {
    key: 'splitNode',
    value: function splitNode(path, position, properties) {
      var value = this;
      var _value13 = value,
          document = _value13.document;

      var newDocument = document.splitNode(path, position, properties);
      var node = document.assertNode(path);
      value = value.set('document', newDocument);

      value = value.mapRanges(function (range) {
        var next = newDocument.getNextText(node.key);
        var _range4 = range,
            start = _range4.start,
            end = _range4.end;

        // If the start was after the split, move it to the next node.

        if (node.key === start.key && position <= start.offset) {
          range = range.moveStartTo(next.key, start.offset - position);
        }

        // If the end was after the split, move it to the next node.
        if (node.key === end.key && position <= end.offset) {
          range = range.moveEndTo(next.key, end.offset - position);
        }

        range = range.updatePoints(function (point) {
          return point.setPath(null);
        });

        return range;
      });

      return value;
    }

    /**
     * Map all range objects to apply adjustments with an `iterator`.
     *
     * @param {Function} iterator
     * @return {Value}
     */

  }, {
    key: 'mapRanges',
    value: function mapRanges(iterator) {
      var value = this;
      var _value14 = value,
          document = _value14.document,
          selection = _value14.selection,
          decorations = _value14.decorations;


      var sel = selection.isSet ? iterator(selection) : selection;
      if (!sel) sel = selection.unset();
      if (sel !== selection) sel = document.createSelection(sel);
      value = value.set('selection', sel);

      var decs = decorations.map(function (decoration) {
        var n = decoration.isSet ? iterator(decoration) : decoration;
        if (n && n !== decoration) n = document.createDecoration(n);
        return n;
      });

      decs = decs.filter(function (decoration) {
        return !!decoration;
      });
      value = value.set('decorations', decs);
      return value;
    }

    /**
     * Remove any atomic ranges inside a `key`, `offset` and `length`.
     *
     * @param {String} key
     * @param {Number} from
     * @param {Number?} to
     * @return {Value}
     */

  }, {
    key: 'clearAtomicRanges',
    value: function clearAtomicRanges(key, from) {
      var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var value = this;
      var _value15 = value,
          schema = _value15.schema;


      value = this.mapRanges(function (range) {
        if (!Decoration.isDecoration(range)) return range;
        var start = range.start,
            end = range.end,
            mark = range.mark;

        var isAtomic = schema.isAtomic(mark);
        if (!isAtomic) return range;
        if (start.key !== key) return range;

        if (start.offset < from && (end.key !== key || end.offset > from)) {
          return null;
        }

        if (to != null && start.offset < to && (end.key !== key || end.offset > to)) {
          return null;
        }

        return range;
      });

      return value;
    }

    /**
     * Return a JSON representation of the value.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        document: this.document.toJSON(options)
      };

      if (options.preserveData) {
        object.data = this.data.toJSON(options);
      }

      if (options.preserveDecorations) {
        object.decorations = this.decorations.toArray().map(function (d) {
          return d.toJSON(options);
        });
      }

      if (options.preserveHistory) {
        object.history = this.history.toJSON(options);
      }

      if (options.preserveSelection) {
        object.selection = this.selection.toJSON(options);
      }

      if (options.preserveSchema) {
        object.schema = this.schema.toJSON(options);
      }

      return object;
    }
  }, {
    key: 'object',


    /**
     * Object.
     *
     * @return {String}
     */

    get: function get$$1() {
      return 'value';
    }

    /**
     * Get the current start text node's closest block parent.
     *
     * @return {Block}
     */

  }, {
    key: 'startBlock',
    get: function get$$1() {
      return this.selection.start.key && this.document.getClosestBlock(this.selection.start.key);
    }

    /**
     * Get the current end text node's closest block parent.
     *
     * @return {Block}
     */

  }, {
    key: 'endBlock',
    get: function get$$1() {
      return this.selection.end.key && this.document.getClosestBlock(this.selection.end.key);
    }

    /**
     * Get the current anchor text node's closest block parent.
     *
     * @return {Block}
     */

  }, {
    key: 'anchorBlock',
    get: function get$$1() {
      return this.selection.anchor.key && this.document.getClosestBlock(this.selection.anchor.key);
    }

    /**
     * Get the current focus text node's closest block parent.
     *
     * @return {Block}
     */

  }, {
    key: 'focusBlock',
    get: function get$$1() {
      return this.selection.focus.key && this.document.getClosestBlock(this.selection.focus.key);
    }

    /**
     * Get the current start text node's closest inline parent.
     *
     * @return {Inline}
     */

  }, {
    key: 'startInline',
    get: function get$$1() {
      return this.selection.start.key && this.document.getClosestInline(this.selection.start.key);
    }

    /**
     * Get the current end text node's closest inline parent.
     *
     * @return {Inline}
     */

  }, {
    key: 'endInline',
    get: function get$$1() {
      return this.selection.end.key && this.document.getClosestInline(this.selection.end.key);
    }

    /**
     * Get the current anchor text node's closest inline parent.
     *
     * @return {Inline}
     */

  }, {
    key: 'anchorInline',
    get: function get$$1() {
      return this.selection.anchor.key && this.document.getClosestInline(this.selection.anchor.key);
    }

    /**
     * Get the current focus text node's closest inline parent.
     *
     * @return {Inline}
     */

  }, {
    key: 'focusInline',
    get: function get$$1() {
      return this.selection.focus.key && this.document.getClosestInline(this.selection.focus.key);
    }

    /**
     * Get the current start text node.
     *
     * @return {Text}
     */

  }, {
    key: 'startText',
    get: function get$$1() {
      return this.selection.start.key && this.document.getDescendant(this.selection.start.key);
    }

    /**
     * Get the current end node.
     *
     * @return {Text}
     */

  }, {
    key: 'endText',
    get: function get$$1() {
      return this.selection.end.key && this.document.getDescendant(this.selection.end.key);
    }

    /**
     * Get the current anchor node.
     *
     * @return {Text}
     */

  }, {
    key: 'anchorText',
    get: function get$$1() {
      return this.selection.anchor.key && this.document.getDescendant(this.selection.anchor.key);
    }

    /**
     * Get the current focus node.
     *
     * @return {Text}
     */

  }, {
    key: 'focusText',
    get: function get$$1() {
      return this.selection.focus.key && this.document.getDescendant(this.selection.focus.key);
    }

    /**
     * Get the next block node.
     *
     * @return {Block}
     */

  }, {
    key: 'nextBlock',
    get: function get$$1() {
      return this.selection.end.key && this.document.getNextBlock(this.selection.end.key);
    }

    /**
     * Get the previous block node.
     *
     * @return {Block}
     */

  }, {
    key: 'previousBlock',
    get: function get$$1() {
      return this.selection.start.key && this.document.getPreviousBlock(this.selection.start.key);
    }

    /**
     * Get the next inline node.
     *
     * @return {Inline}
     */

  }, {
    key: 'nextInline',
    get: function get$$1() {
      return this.selection.end.key && this.document.getNextInline(this.selection.end.key);
    }

    /**
     * Get the previous inline node.
     *
     * @return {Inline}
     */

  }, {
    key: 'previousInline',
    get: function get$$1() {
      return this.selection.start.key && this.document.getPreviousInline(this.selection.start.key);
    }

    /**
     * Get the next text node.
     *
     * @return {Text}
     */

  }, {
    key: 'nextText',
    get: function get$$1() {
      return this.selection.end.key && this.document.getNextText(this.selection.end.key);
    }

    /**
     * Get the previous text node.
     *
     * @return {Text}
     */

  }, {
    key: 'previousText',
    get: function get$$1() {
      return this.selection.start.key && this.document.getPreviousText(this.selection.start.key);
    }

    /**
     * Get the marks of the current selection.
     *
     * @return {Set<Mark>}
     */

  }, {
    key: 'marks',
    get: function get$$1() {
      return this.selection.isUnset ? new immutable.Set() : this.selection.marks || this.document.getMarksAtRange(this.selection);
    }

    /**
     * Get the active marks of the current selection.
     *
     * @return {Set<Mark>}
     */

  }, {
    key: 'activeMarks',
    get: function get$$1() {
      return this.selection.isUnset ? new immutable.Set() : this.selection.marks || this.document.getActiveMarksAtRange(this.selection);
    }

    /**
     * Get the block nodes in the current selection.
     *
     * @return {List<Block>}
     */

  }, {
    key: 'blocks',
    get: function get$$1() {
      return this.selection.isUnset ? new immutable.List() : this.document.getBlocksAtRange(this.selection);
    }

    /**
     * Get the fragment of the current selection.
     *
     * @return {Document}
     */

  }, {
    key: 'fragment',
    get: function get$$1() {
      return this.selection.isUnset ? Document.create() : this.document.getFragmentAtRange(this.selection);
    }

    /**
     * Get the inline nodes in the current selection.
     *
     * @return {List<Inline>}
     */

  }, {
    key: 'inlines',
    get: function get$$1() {
      return this.selection.isUnset ? new immutable.List() : this.document.getInlinesAtRange(this.selection);
    }

    /**
     * Get the text nodes in the current selection.
     *
     * @return {List<Text>}
     */

  }, {
    key: 'texts',
    get: function get$$1() {
      return this.selection.isUnset ? new immutable.List() : this.document.getTextsAtRange(this.selection);
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Value` with `attrs`.
     *
     * @param {Object|Value} attrs
     * @param {Object} options
     * @return {Value}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (Value.isValue(attrs)) {
        return attrs;
      }

      if (isPlainObject(attrs)) {
        return Value.fromJSON(attrs, options);
      }

      throw new Error('`Value.create` only accepts objects or values, but you passed it: ' + attrs);
    }

    /**
     * Create a dictionary of settable value properties from `attrs`.
     *
     * @param {Object|Value} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Value.isValue(a)) {
        return {
          data: a.data,
          decorations: a.decorations,
          schema: a.schema
        };
      }

      if (isPlainObject(a)) {
        var p = {};
        if ('data' in a) p.data = Data.create(a.data);
        if ('decorations' in a) p.decorations = Decoration.createList(a.decorations);
        if ('schema' in a) p.schema = Schema.create(a.schema);
        return p;
      }

      throw new Error('`Value.createProperties` only accepts objects or values, but you passed it: ' + a);
    }

    /**
     * Create a `Value` from a JSON `object`.
     *
     * @param {Object} object
     * @param {Object} options
     *   @property {Boolean} normalize
     *   @property {Array} plugins
     * @return {Value}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _object$data = object.data,
          data = _object$data === undefined ? {} : _object$data,
          _object$document = object.document,
          document = _object$document === undefined ? {} : _object$document,
          _object$selection = object.selection,
          selection = _object$selection === undefined ? {} : _object$selection,
          _object$schema = object.schema,
          schema = _object$schema === undefined ? {} : _object$schema,
          _object$history = object.history,
          history = _object$history === undefined ? {} : _object$history;


      data = Data.fromJSON(data);
      schema = Schema.fromJSON(schema);
      history = History.fromJSON(history);
      document = Document.fromJSON(document);
      selection = document.createSelection(selection);

      if (selection.isUnset) {
        var text = document.getFirstText();
        if (text) selection = selection.moveToStartOfNode(text);
        selection = document.createSelection(selection);
      }

      var value = new Value({
        data: data,
        document: document,
        selection: selection,
        schema: schema,
        history: history
      });

      if (options.normalize !== false) {
        var change = value.change();
        change.withoutSaving(function () {
          return change.normalize();
        });
        value = change.value;
      }

      return value;
    }

    /**
     * Check if a `value` is a `Value`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

  }, {
    key: 'isValue',
    value: function isValue(value) {
      return !!(value && value[MODEL_TYPES.VALUE]);
    }
  }]);
  return Value;
}(immutable.Record(DEFAULTS$13));

/**
 * Attach a pseudo-symbol for type checking.
 */

Value.prototype[MODEL_TYPES.VALUE] = true;

/**
 * Changes.
 *
 * @type {Object}
 */

var Changes$5 = {};

/**
 * Set `properties` on the value.
 *
 * @param {Change} change
 * @param {Object|Value} properties
 */

Changes$5.setValue = function (change, properties) {
  properties = Value.createProperties(properties);
  var value = change.value;


  change.applyOperation({
    type: 'set_value',
    properties: properties,
    value: value
  });
};

/**
 * Export.
 *
 * @type {Object}
 */

var Changes$6 = _extends({}, Changes, Changes$1, Changes$2, Changes$3, Changes$4, Changes$5);

/**
 * Debug.
 *
 * @type {Function}
 */

var debug$2 = Debug('slate:operation:apply');

/**
 * Apply an `op` to a `value`.
 *
 * @param {Value} value
 * @param {Object|Operation} op
 * @return {Value} value
 */

function applyOperation(value, op) {
  op = Operation.create(op);
  var _op = op,
      type = _op.type;

  debug$2(type, op);

  switch (type) {
    case 'add_mark':
      {
        var _op2 = op,
            path = _op2.path,
            offset = _op2.offset,
            length = _op2.length,
            mark = _op2.mark;

        var next = value.addMark(path, offset, length, mark);
        return next;
      }

    case 'insert_node':
      {
        var _op3 = op,
            _path = _op3.path,
            node = _op3.node;

        var _next = value.insertNode(_path, node);
        return _next;
      }

    case 'insert_text':
      {
        var _op4 = op,
            _path2 = _op4.path,
            _offset = _op4.offset,
            text = _op4.text,
            marks = _op4.marks;

        var _next2 = value.insertText(_path2, _offset, text, marks);
        return _next2;
      }

    case 'merge_node':
      {
        var _op5 = op,
            _path3 = _op5.path;

        var _next3 = value.mergeNode(_path3);
        return _next3;
      }

    case 'move_node':
      {
        var _op6 = op,
            _path4 = _op6.path,
            newPath = _op6.newPath;

        var _next4 = value.moveNode(_path4, newPath);
        return _next4;
      }

    case 'remove_mark':
      {
        var _op7 = op,
            _path5 = _op7.path,
            _offset2 = _op7.offset,
            _length = _op7.length,
            _mark = _op7.mark;

        var _next5 = value.removeMark(_path5, _offset2, _length, _mark);
        return _next5;
      }

    case 'remove_node':
      {
        var _op8 = op,
            _path6 = _op8.path;

        var _next6 = value.removeNode(_path6);
        return _next6;
      }

    case 'remove_text':
      {
        var _op9 = op,
            _path7 = _op9.path,
            _offset3 = _op9.offset,
            _text = _op9.text;

        var _next7 = value.removeText(_path7, _offset3, _text);
        return _next7;
      }

    case 'set_mark':
      {
        var _op10 = op,
            _path8 = _op10.path,
            _offset4 = _op10.offset,
            _length2 = _op10.length,
            _mark2 = _op10.mark,
            properties = _op10.properties;

        var _next8 = value.setMark(_path8, _offset4, _length2, _mark2, properties);
        return _next8;
      }

    case 'set_node':
      {
        var _op11 = op,
            _path9 = _op11.path,
            _properties = _op11.properties;

        var _next9 = value.setNode(_path9, _properties);
        return _next9;
      }

    case 'set_selection':
      {
        var _op12 = op,
            _properties2 = _op12.properties;

        var _next10 = value.setSelection(_properties2);
        return _next10;
      }

    case 'set_value':
      {
        var _op13 = op,
            _properties3 = _op13.properties;

        var _next11 = value.setProperties(_properties3);
        return _next11;
      }

    case 'split_node':
      {
        var _op14 = op,
            _path10 = _op14.path,
            position = _op14.position,
            _properties4 = _op14.properties;

        var _next12 = value.splitNode(_path10, position, _properties4);
        return _next12;
      }

    default:
      {
        throw new Error('Unknown operation type: "' + type + '".');
      }
  }
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug$3 = Debug('slate:operation:invert');

/**
 * Invert an `op`.
 *
 * @param {Object} op
 * @return {Object}
 */

function invertOperation(op) {
  op = Operation.create(op);
  var _op = op,
      type = _op.type;

  debug$3(type, op);

  switch (type) {
    case 'insert_node':
      {
        var inverse = op.set('type', 'remove_node');
        return inverse;
      }

    case 'remove_node':
      {
        var _inverse = op.set('type', 'insert_node');
        return _inverse;
      }

    case 'move_node':
      {
        var _op2 = op,
            newPath = _op2.newPath,
            path = _op2.path;

        var inversePath = newPath;
        var inverseNewPath = path;

        var pathLast = path.size - 1;
        var newPathLast = newPath.size - 1;

        // If the node's old position was a left sibling of an ancestor of
        // its new position, we need to adjust part of the path by -1.
        if (path.size < inversePath.size && path.slice(0, pathLast).every(function (e, i) {
          return e == inversePath.get(i);
        }) && path.last() < inversePath.get(pathLast)) {
          inversePath = inversePath.slice(0, pathLast).concat(inversePath.get(pathLast) - 1).concat(inversePath.slice(pathLast + 1, inversePath.size));
        }

        // If the node's new position is an ancestor of the old position,
        // or a left sibling of an ancestor of its old position, we need
        // to adjust part of the path by 1.
        if (newPath.size < inverseNewPath.size && newPath.slice(0, newPathLast).every(function (e, i) {
          return e == inverseNewPath.get(i);
        }) && newPath.last() <= inverseNewPath.get(newPathLast)) {
          inverseNewPath = inverseNewPath.slice(0, newPathLast).concat(inverseNewPath.get(newPathLast) + 1).concat(inverseNewPath.slice(newPathLast + 1, inverseNewPath.size));
        }

        var _inverse2 = op.set('path', inversePath).set('newPath', inverseNewPath);
        return _inverse2;
      }

    case 'merge_node':
      {
        var _op3 = op,
            _path = _op3.path;

        var _inversePath = PathUtils.decrement(_path);
        var _inverse3 = op.set('type', 'split_node').set('path', _inversePath);
        return _inverse3;
      }

    case 'split_node':
      {
        var _op4 = op,
            _path2 = _op4.path;

        var _inversePath2 = PathUtils.increment(_path2);
        var _inverse4 = op.set('type', 'merge_node').set('path', _inversePath2);
        return _inverse4;
      }

    case 'set_node':
      {
        var _op5 = op,
            properties = _op5.properties,
            node = _op5.node;

        var inverseNode = node.merge(properties);
        var inverseProperties = pick(node, Object.keys(properties));
        var _inverse5 = op.set('node', inverseNode).set('properties', inverseProperties);
        return _inverse5;
      }

    case 'insert_text':
      {
        var _inverse6 = op.set('type', 'remove_text');
        return _inverse6;
      }

    case 'remove_text':
      {
        var _inverse7 = op.set('type', 'insert_text');
        return _inverse7;
      }

    case 'add_mark':
      {
        var _inverse8 = op.set('type', 'remove_mark');
        return _inverse8;
      }

    case 'remove_mark':
      {
        var _inverse9 = op.set('type', 'add_mark');
        return _inverse9;
      }

    case 'set_mark':
      {
        var _op6 = op,
            _properties = _op6.properties,
            mark = _op6.mark;

        var inverseMark = mark.merge(_properties);
        var _inverseProperties = pick(mark, Object.keys(_properties));
        var _inverse10 = op.set('mark', inverseMark).set('properties', _inverseProperties);
        return _inverse10;
      }

    case 'set_selection':
      {
        var _op7 = op,
            _properties2 = _op7.properties,
            selection = _op7.selection;

        var inverseSelection = selection.merge(_properties2);
        var inverseProps = pick(selection, Object.keys(_properties2));
        var _inverse11 = op.set('selection', inverseSelection).set('properties', inverseProps);
        return _inverse11;
      }

    case 'set_value':
      {
        var _op8 = op,
            _properties3 = _op8.properties,
            value = _op8.value;

        var inverseValue = value.merge(_properties3);
        var _inverseProperties2 = pick(value, Object.keys(_properties3));
        var _inverse12 = op.set('value', inverseValue).set('properties', _inverseProperties2);
        return _inverse12;
      }

    default:
      {
        throw new Error('Unknown operation type: "' + type + '".');
      }
  }
}

/**
 * Operation attributes.
 *
 * @type {Array}
 */

var OPERATION_ATTRIBUTES = {
  add_mark: ['value', 'path', 'offset', 'length', 'mark'],
  insert_node: ['value', 'path', 'node'],
  insert_text: ['value', 'path', 'offset', 'text', 'marks'],
  merge_node: ['value', 'path', 'position', 'properties', 'target'],
  move_node: ['value', 'path', 'newPath'],
  remove_mark: ['value', 'path', 'offset', 'length', 'mark'],
  remove_node: ['value', 'path', 'node'],
  remove_text: ['value', 'path', 'offset', 'text', 'marks'],
  set_mark: ['value', 'path', 'offset', 'length', 'mark', 'properties'],
  set_node: ['value', 'path', 'node', 'properties'],
  set_selection: ['value', 'selection', 'properties'],
  set_value: ['value', 'properties'],
  split_node: ['value', 'path', 'position', 'properties', 'target']

  /**
   * Default properties.
   *
   * @type {Object}
   */

};var DEFAULTS$14 = {
  length: undefined,
  mark: undefined,
  marks: undefined,
  newPath: undefined,
  node: undefined,
  offset: undefined,
  path: undefined,
  position: undefined,
  properties: undefined,
  selection: undefined,
  target: undefined,
  text: undefined,
  type: undefined,
  value: undefined

  /**
   * Operation.
   *
   * @type {Operation}
   */

};
var Operation = function (_Record) {
  inherits(Operation, _Record);

  function Operation() {
    classCallCheck(this, Operation);
    return possibleConstructorReturn(this, (Operation.__proto__ || Object.getPrototypeOf(Operation)).apply(this, arguments));
  }

  createClass(Operation, [{
    key: 'apply',


    /**
     * Apply the operation to a `value`.
     *
     * @param {Value} value
     * @return {Value}
     */

    value: function apply(value) {
      var next = applyOperation(value, this);
      return next;
    }

    /**
     * Invert the operation.
     *
     * @return {Operation}
     */

  }, {
    key: 'invert',
    value: function invert() {
      var inverted = invertOperation(this);
      return inverted;
    }

    /**
     * Return a JSON representation of the operation.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var object = this.object,
          type = this.type;

      var json = { object: object, type: type };
      var ATTRIBUTES = OPERATION_ATTRIBUTES[type];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = ATTRIBUTES[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          var value = this[key];

          // Skip keys for objects that should not be serialized, and are only used
          // for providing the local-only invert behavior for the history stack.
          if (key == 'document') continue;
          if (key == 'selection') continue;
          if (key == 'value') continue;
          if (key == 'node' && type != 'insert_node') continue;

          if (key == 'mark' || key == 'marks' || key == 'node') {
            value = value.toJSON();
          }

          if (key == 'properties' && type == 'merge_node') {
            var v = {};
            if ('data' in value) v.data = value.data.toJS();
            if ('type' in value) v.type = value.type;
            value = v;
          }

          if (key == 'properties' && type == 'set_mark') {
            var _v = {};
            if ('data' in value) _v.data = value.data.toJS();
            if ('type' in value) _v.type = value.type;
            value = _v;
          }

          if (key == 'properties' && type == 'set_node') {
            var _v2 = {};
            if ('data' in value) _v2.data = value.data.toJS();
            if ('type' in value) _v2.type = value.type;
            value = _v2;
          }

          if (key == 'properties' && type == 'set_selection') {
            var _v3 = {};
            if ('anchor' in value) _v3.anchor = value.anchor.toJSON();
            if ('focus' in value) _v3.focus = value.focus.toJSON();
            if ('isFocused' in value) _v3.isFocused = value.isFocused;
            if ('marks' in value) _v3.marks = value.marks && value.marks.toJSON();
            value = _v3;
          }

          if (key == 'properties' && type == 'set_value') {
            var _v4 = {};
            if ('data' in value) _v4.data = value.data.toJS();
            if ('decorations' in value) _v4.decorations = value.decorations.toJS();
            if ('schema' in value) _v4.schema = value.schema.toJS();
            value = _v4;
          }

          if (key == 'properties' && type == 'split_node') {
            var _v5 = {};
            if ('data' in value) _v5.data = value.data.toJS();
            if ('type' in value) _v5.type = value.type;
            value = _v5;
          }

          json[key] = value;
        }
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

      return json;
    }
  }, {
    key: 'object',


    /**
     * Object.
     *
     * @return {String}
     */

    get: function get$$1() {
      return 'operation';
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Operation` with `attrs`.
     *
     * @param {Object|Array|List|String|Operation} attrs
     * @return {Operation}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Operation.isOperation(attrs)) {
        return attrs;
      }

      if (isPlainObject(attrs)) {
        return Operation.fromJSON(attrs);
      }

      throw new Error('`Operation.create` only accepts objects or operations, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Operations` from `elements`.
     *
     * @param {Array<Operation|Object>|List<Operation|Object>} elements
     * @return {List<Operation>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (immutable.List.isList(elements) || Array.isArray(elements)) {
        var list = new immutable.List(elements.map(Operation.create));
        return list;
      }

      throw new Error('`Operation.createList` only accepts arrays or lists, but you passed it: ' + elements);
    }

    /**
     * Create a `Operation` from a JSON `object`.
     *
     * @param {Object|Operation} object
     * @return {Operation}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Operation.isOperation(object)) {
        return object;
      }

      var type = object.type;

      var ATTRIBUTES = OPERATION_ATTRIBUTES[type];
      var attrs = { type: type };

      if (!ATTRIBUTES) {
        throw new Error('`Operation.fromJSON` was passed an unrecognized operation type: "' + type + '"');
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = ATTRIBUTES[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          var v = object[key];

          if (v === undefined) {
            // Skip keys for objects that should not be serialized, and are only used
            // for providing the local-only invert behavior for the history stack.
            if (key == 'document') continue;
            if (key == 'selection') continue;
            if (key == 'value') continue;
            if (key == 'node' && type != 'insert_node') continue;

            throw new Error('`Operation.fromJSON` was passed a "' + type + '" operation without the required "' + key + '" attribute.');
          }

          if (key === 'path' || key === 'newPath') {
            v = PathUtils.create(v);
          }

          if (key === 'mark') {
            v = Mark.create(v);
          }

          if (key === 'marks' && v != null) {
            v = Mark.createSet(v);
          }

          if (key === 'node') {
            v = Node.create(v);
          }

          if (key === 'selection') {
            v = Selection.create(v);
          }

          if (key === 'value') {
            v = Value.create(v);
          }

          if (key === 'properties' && type === 'merge_node') {
            v = Node.createProperties(v);
          }

          if (key === 'properties' && type === 'set_mark') {
            v = Mark.createProperties(v);
          }

          if (key === 'properties' && type === 'set_node') {
            v = Node.createProperties(v);
          }

          if (key === 'properties' && type === 'set_selection') {
            v = Selection.createProperties(v);
          }

          if (key === 'properties' && type === 'set_value') {
            v = Value.createProperties(v);
          }

          if (key === 'properties' && type === 'split_node') {
            v = Node.createProperties(v);
          }

          attrs[key] = v;
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

      var node = new Operation(attrs);
      return node;
    }

    /**
     * Check if `any` is a `Operation`.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isOperation',
    value: function isOperation(any) {
      return !!(any && any[MODEL_TYPES.OPERATION]);
    }

    /**
     * Check if `any` is a list of operations.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isOperationList',
    value: function isOperationList(any) {
      return immutable.List.isList(any) && any.every(function (item) {
        return Operation.isOperation(item);
      });
    }
  }]);
  return Operation;
}(immutable.Record(DEFAULTS$14));

/**
 * Attach a pseudo-symbol for type checking.
 */

Operation.prototype[MODEL_TYPES.OPERATION] = true;

/**
 * Debug.
 *
 * @type {Function}
 */

var debug$4 = Debug('slate:change');

/**
 * Change.
 *
 * @type {Change}
 */

var Change = function () {

  /**
   * Create a new `Change` with `attrs`.
   *
   * @param {Object} attrs
   *   @property {Value} value
   */

  function Change(attrs) {
    classCallCheck(this, Change);
    var value = attrs.value;

    this.value = value;
    this.operations = new immutable.List();

    this.tmp = {
      dirty: [],
      merge: null,
      normalize: true,
      save: true
    };
  }

  /**
   * Object.
   *
   * @return {String}
   */

  /**
   * Check if `any` is a `Change`.
   *
   * @param {Any} any
   * @return {Boolean}
   */

  createClass(Change, [{
    key: 'applyOperation',


    /**
     * Apply an `operation` to the current value, saving the operation to the
     * history if needed.
     *
     * @param {Operation|Object} operation
     * @param {Object} options
     * @return {Change}
     */

    value: function applyOperation(operation) {
      var operations = this.operations;
      var value = this.value;
      var _value = value,
          history = _value.history;

      var oldValue = value;

      // Add in the current `value` in case the operation was serialized.
      if (isPlainObject(operation)) {
        operation = _extends({}, operation, { value: value });
      }

      operation = Operation.create(operation);

      // Default options to the change-level flags, this allows for setting
      // specific options for all of the operations of a given change.
      var _tmp = this.tmp,
          merge = _tmp.merge,
          save = _tmp.save;

      // If `merge` is non-commital, and this is not the first operation in a new change
      // then we should merge.

      if (merge == null && operations.size !== 0) {
        merge = true;
      }

      // Apply the operation to the value.
      debug$4('apply', { operation: operation, save: save, merge: merge });
      value = operation.apply(value);

      // If needed, save the operation to the history.
      if (history && save) {
        history = history.save(operation, { merge: merge });
        value = value.set('history', history);
      }

      // Get the keys of the affected nodes, and mark them as dirty.
      var keys = getDirtyKeys(operation, value, oldValue);
      this.tmp.dirty = this.tmp.dirty.concat(keys);

      // Update the mutable change object.
      this.value = value;
      this.operations = operations.push(operation);
      return this;
    }

    /**
     * Apply a series of `operations` to the current value.
     *
     * @param {Array|List} operations
     * @param {Object} options
     * @return {Change}
     */

  }, {
    key: 'applyOperations',
    value: function applyOperations(operations, options) {
      var _this = this;

      operations.forEach(function (op) {
        return _this.applyOperation(op, options);
      });
      return this;
    }

    /**
     * Call a change `fn` with arguments.
     *
     * @param {Function} fn
     * @param {Mixed} ...args
     * @return {Change}
     */

  }, {
    key: 'call',
    value: function call(fn) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn.apply(undefined, [this].concat(args));
      this.normalizeDirtyOperations();
      return this;
    }

    /**
     * Normalize all of the nodes in the document from scratch.
     *
     * @return {Change}
     */

  }, {
    key: 'normalize',
    value: function normalize() {
      var value = this.value;
      var document = value.document;

      var keys = Object.keys(document.getKeysToPathsTable());
      this.normalizeKeys(keys);
      return this;
    }

    /**
     * Normalize any new "dirty" operations that have been added to the change.
     *
     * @return {Change}
     */

  }, {
    key: 'normalizeDirtyOperations',
    value: function normalizeDirtyOperations() {
      var _tmp2 = this.tmp,
          normalize = _tmp2.normalize,
          dirty = _tmp2.dirty;

      if (!normalize) return this;
      if (!dirty.length) return this;
      this.tmp.dirty = [];
      this.normalizeKeys(dirty);
      return this;
    }

    /**
     * Normalize a set of nodes by their `keys`.
     *
     * @param {Array} keys
     * @return {Change}
     */

  }, {
    key: 'normalizeKeys',
    value: function normalizeKeys(keys) {
      var _this2 = this;

      var value = this.value;
      var document = value.document;

      // TODO: if we had an `Operations.tranform` method, we could optimize this
      // to not use keys, and instead used transformed operation paths.

      var table = document.getKeysToPathsTable();
      var map = immutable.Map();

      // TODO: this could be optimized to not need the nested map, and instead use
      // clever sorting to arrive at the proper depth-first normalizing.
      keys.forEach(function (key) {
        var path = table[key];
        if (!path) return;
        if (!path.length) return;
        if (!map.hasIn(path)) map = map.setIn(path, immutable.Map());
      });

      // To avoid infinite loops, we need to defer normalization until the end.
      this.withoutNormalizing(function () {
        _this2.normalizeMapAndPath(map);
      });

      return this;
    }

    /**
     * Normalize all of the nodes in a normalization `map`, depth-first. An
     * additional `path` argument specifics the current depth/location.
     *
     * @param {Map} map
     * @param {Array} path (optional)
     * @return {Change}
     */

  }, {
    key: 'normalizeMapAndPath',
    value: function normalizeMapAndPath(map) {
      var _this3 = this;

      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      map.forEach(function (m, k) {
        var p = [].concat(toConsumableArray(path), [k]);
        _this3.normalizeMapAndPath(m, p);
      });

      this.normalizePath(path);
      return this;
    }

    /**
     * Normalize the node at a specific `path`, iterating as many times as
     * necessary until it satisfies all of the schema rules.
     *
     * @param {Array} path
     * @return {Change}
     */

  }, {
    key: 'normalizePath',
    value: function normalizePath(path) {
      var _this4 = this;

      var value = this.value;
      var document = value.document,
          schema = value.schema;

      var node = document.assertNode(path);

      var iterations = 0;
      var max = schema.stack.plugins.length + schema.rules.length + (node.object === 'text' ? 1 : node.nodes.size);

      var iterate = function iterate() {
        var fn = node.normalize(schema);
        if (!fn) return;

        // Run the normalize `fn` to fix the node.
        fn(_this4);

        // Attempt to re-find the node by path, or by key if it has changed
        // locations in the tree continue iterating.
        document = _this4.value.document;
        var _node = node,
            key = _node.key;

        var found = document.getDescendant(path);

        if (found && found.key === key) {
          node = found;
        } else {
          found = document.getDescendant(key);

          if (found) {
            node = found;
            path = document.getPath(key);
          } else {
            // If it no longer exists by key, it was removed, so abort.
            return;
          }
        }

        // Increment the iterations counter, and check to make sure that we haven't
        // exceeded the max. Without this check, it's easy for the `normalize`
        // function of a schema rule to be written incorrectly and for an infinite
        // invalid loop to occur.
        iterations++;

        if (iterations > max) {
          throw new Error('A schema rule could not be normalized after sufficient iterations. This is usually due to a `rule.normalize` or `plugin.normalizeNode` function of a schema being incorrectly written, causing an infinite loop.');
        }

        // Otherwise, iterate again.
        iterate();
      };

      iterate();
      return this;
    }

    /**
     * Apply a series of changes inside a synchronous `fn`, deferring
     * normalization until after the function has finished executing.
     *
     * @param {Function} fn
     * @return {Change}
     */

  }, {
    key: 'withoutNormalizing',
    value: function withoutNormalizing(fn) {
      var value = this.tmp.normalize;
      this.tmp.normalize = false;
      fn(this);
      this.tmp.normalize = value;

      if (this.tmp.normalize) {
        this.normalizeDirtyOperations();
      }

      return this;
    }

    /**
     * Apply a series of changes inside a synchronous `fn`, without merging any of
     * the new operations into previous save point in the history.
     *
     * @param {Function} fn
     * @return {Change}
     */

  }, {
    key: 'withoutMerging',
    value: function withoutMerging(fn) {
      var value = this.tmp.merge;
      this.tmp.merge = false;
      fn(this);
      this.tmp.merge = value;
      return this;
    }

    /**
     * Apply a series of changes inside a synchronous `fn`, without saving any of
     * their operations into the history.
     *
     * @param {Function} fn
     * @return {Change}
     */

  }, {
    key: 'withoutSaving',
    value: function withoutSaving(fn) {
      var value = this.tmp.save;
      this.tmp.save = false;
      fn(this);
      this.tmp.save = value;
      return this;
    }

    /**
     * Set an operation flag by `key` to `value`.
     *
     * @param {String} key
     * @param {Any} value
     * @return {Change}
     */

    /**
     * Deprecated.
     */

  }, {
    key: 'setOperationFlag',
    value: function setOperationFlag(key, value) {
      warning(false, 'As of slate@0.41.0 the `change.setOperationFlag` method has been deprecated.');

      this.tmp[key] = value;
      return this;
    }
  }, {
    key: 'getFlag',
    value: function getFlag(key) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      warning(false, 'As of slate@0.41.0 the `change.getFlag` method has been deprecated.');

      return options[key] !== undefined ? options[key] : this.tmp[key];
    }
  }, {
    key: 'unsetOperationFlag',
    value: function unsetOperationFlag(key) {
      warning(false, 'As of slate@0.41.0 the `change.unsetOperationFlag` method has been deprecated.');

      delete this.tmp[key];
      return this;
    }
  }, {
    key: 'withoutNormalization',
    value: function withoutNormalization(fn) {
      warning(false, 'As of slate@0.41.0 the `change.withoutNormalization` helper has been renamed to `change.withoutNormalizing`.');

      return this.withoutNormalizing(fn);
    }
  }, {
    key: 'object',
    get: function get$$1() {
      return 'change';
    }
  }]);
  return Change;
}();

/**
 * Get the "dirty" nodes's keys for a given `operation` and values.
 *
 * @param {Operation} operation
 * @param {Value} newValue
 * @param {Value} oldValue
 * @return {Array}
 */

Change.isChange = isType.bind(null, 'CHANGE');
function getDirtyKeys(operation, newValue, oldValue) {
  var type = operation.type,
      node = operation.node,
      path = operation.path,
      newPath = operation.newPath;

  var newDocument = newValue.document;
  var oldDocument = oldValue.document;

  switch (type) {
    case 'insert_node':
      {
        var table = node.getKeysToPathsTable();
        var parent = newDocument.assertParent(path);
        var keys = [parent.key].concat(toConsumableArray(Object.keys(table)));
        return keys;
      }

    case 'split_node':
      {
        var nextPath = PathUtils.increment(path);
        var _parent = newDocument.assertParent(path);
        var target = newDocument.assertNode(path);
        var split = newDocument.assertNode(nextPath);
        var _keys = [_parent.key, target.key, split.key];
        return _keys;
      }

    case 'merge_node':
      {
        var previousPath = PathUtils.decrement(path);
        var _parent2 = newDocument.assertParent(path);
        var merged = newDocument.assertNode(previousPath);
        var _keys2 = [_parent2.key, merged.key];
        return _keys2;
      }

    case 'move_node':
      {
        var parentPath = PathUtils.lift(path);
        var newParentPath = PathUtils.lift(newPath);
        var oldParent = oldDocument.assertNode(parentPath);
        var newParent = oldDocument.assertNode(newParentPath);
        var _keys3 = [oldParent.key, newParent.key];
        return _keys3;
      }

    case 'remove_node':
      {
        var _parentPath = PathUtils.lift(path);
        var _parent3 = newDocument.assertNode(_parentPath);
        var _keys4 = [_parent3.key];
        return _keys4;
      }

    default:
      {
        return [];
      }
  }
}

/**
 * Attach a pseudo-symbol for type checking.
 */

Change.prototype[MODEL_TYPES.CHANGE] = true;

/**
 * Add a change method for each of the changes.
 */

Object.keys(Changes$6).forEach(function (type) {
  Change.prototype[type] = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    debug$4(type, { args: args });
    this.call.apply(this, [Changes$6[type]].concat(args));
    return this;
  };
});

/**
 * The interface that all Slate models implement.
 *
 * @type {Class}
 */

var CommonInterface = function () {
  function CommonInterface() {
    classCallCheck(this, CommonInterface);
  }

  createClass(CommonInterface, [{
    key: 'toJS',


    /**
     * Alias `toJS`.
     */

    value: function toJS() {
      return this.toJSON.apply(this, arguments);
    }
  }], [{
    key: 'fromJS',

    /**
     * Alias `fromJS`.
     */

    value: function fromJS() {
      return this.fromJSON.apply(this, arguments);
    }
  }]);
  return CommonInterface;
}();

/**
 * Mix in the common interface.
 *
 * @param {Record}
 */

mixin(CommonInterface, [Block, Change, Decoration, Document, History, Inline, Leaf, Mark, Node, Operation, Point, Range, Schema, Selection, Stack, Text, Value]);

/**
 * The interface that `Document`, `Block` and `Inline` all implement, to make
 * working with the recursive node tree easier.
 *
 * @type {Class}
 */

var ElementInterface = function () {
  function ElementInterface() {
    classCallCheck(this, ElementInterface);
  }

  createClass(ElementInterface, [{
    key: 'addMark',

    /**
     * Add mark to text at `offset` and `length` in node by `path`.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @param {Number} length
     * @param {Mark} mark
     * @return {Node}
     */

    value: function addMark(path, offset, length, mark) {
      var node = this.assertDescendant(path);
      path = this.resolvePath(path);
      node = node.addMark(offset, length, mark);
      var ret = this.replaceNode(path, node);
      return ret;
    }

    /**
     * Create a decoration with `properties` relative to the node.
     *
     * @param {Object|Decoration} properties
     * @return {Decoration}
     */

  }, {
    key: 'createDecoration',
    value: function createDecoration(properties) {
      properties = Decoration.createProperties(properties);
      var decoration = this.resolveDecoration(properties);
      return decoration;
    }

    /**
     * Create a point with `properties` relative to the node.
     *
     * @param {Object|Point} properties
     * @return {Range}
     */

  }, {
    key: 'createPoint',
    value: function createPoint(properties) {
      properties = Point.createProperties(properties);
      var point = this.resolvePoint(properties);
      return point;
    }

    /**
     * Create a range with `properties` relative to the node.
     *
     * @param {Object|Range} properties
     * @return {Range}
     */

  }, {
    key: 'createRange',
    value: function createRange(properties) {
      properties = Range.createProperties(properties);
      var range = this.resolveRange(properties);
      return range;
    }

    /**
     * Create a selection with `properties` relative to the node.
     *
     * @param {Object|Selection} properties
     * @return {Selection}
     */

  }, {
    key: 'createSelection',
    value: function createSelection(properties) {
      properties = Selection.createProperties(properties);
      var selection = this.resolveSelection(properties);
      return selection;
    }

    /**
     * Recursively filter all descendant nodes with `iterator`.
     *
     * @param {Function} iterator
     * @return {List<Node>}
     */

  }, {
    key: 'filterDescendants',
    value: function filterDescendants(iterator) {
      var matches = [];

      this.forEachDescendant(function (node, i, nodes) {
        if (iterator(node, i, nodes)) matches.push(node);
      });

      return immutable.List(matches);
    }

    /**
     * Recursively find all descendant nodes by `iterator`.
     *
     * @param {Function} iterator
     * @return {Node|Null}
     */

  }, {
    key: 'findDescendant',
    value: function findDescendant(iterator) {
      var found = null;

      this.forEachDescendant(function (node, i, nodes) {
        if (iterator(node, i, nodes)) {
          found = node;
          return false;
        }
      });

      return found;
    }

    /**
     * Recursively iterate over all descendant nodes with `iterator`. If the
     * iterator returns false it will break the loop.
     *
     * @param {Function} iterator
     */

  }, {
    key: 'forEachDescendant',
    value: function forEachDescendant(iterator) {
      var ret = void 0;

      this.nodes.forEach(function (child, i, nodes) {
        if (iterator(child, i, nodes) === false) {
          ret = false;
          return false;
        }

        if (child.object != 'text') {
          ret = child.forEachDescendant(iterator);
          return ret;
        }
      });

      return ret;
    }

    /**
     * Get a set of the active marks in a `range`.
     *
     * @param {Range} range
     * @return {Set<Mark>}
     */

  }, {
    key: 'getActiveMarksAtRange',
    value: function getActiveMarksAtRange(range) {
      range = this.resolveRange(range);
      if (range.isUnset) return immutable.Set();

      if (range.isCollapsed) {
        var _range = range,
            _start = _range.start;

        return this.getMarksAtPosition(_start.key, _start.offset).toSet();
      }

      var _range2 = range,
          start = _range2.start,
          end = _range2.end;

      var startKey = start.key;
      var startOffset = start.offset;
      var endKey = end.key;
      var endOffset = end.offset;
      var startText = this.getDescendant(startKey);

      if (startKey !== endKey) {
        while (startKey !== endKey && endOffset === 0) {
          var _endText = this.getPreviousText(endKey);
          endKey = _endText.key;
          endOffset = _endText.text.length;
        }

        while (startKey !== endKey && startOffset === startText.text.length) {
          startText = this.getNextText(startKey);
          startKey = startText.key;
          startOffset = 0;
        }
      }

      if (startKey === endKey) {
        return startText.getActiveMarksBetweenOffsets(startOffset, endOffset);
      }

      var startMarks = startText.getActiveMarksBetweenOffsets(startOffset, startText.text.length);
      if (startMarks.size === 0) return immutable.Set();
      var endText = this.getDescendant(endKey);
      var endMarks = endText.getActiveMarksBetweenOffsets(0, endOffset);
      var marks = startMarks.intersect(endMarks);
      // If marks is already empty, the active marks is empty
      if (marks.size === 0) return marks;

      var text = this.getNextText(startKey);

      while (text.key !== endKey) {
        if (text.text.length !== 0) {
          marks = marks.intersect(text.getActiveMarks());
          if (marks.size === 0) return immutable.Set();
        }

        text = this.getNextText(text.key);
      }
      return marks;
    }

    /**
     * Get a list of the ancestors of a descendant.
     *
     * @param {List|String} path
     * @return {List<Node>|Null}
     */

  }, {
    key: 'getAncestors',
    value: function getAncestors(path) {
      var _this = this;

      path = this.resolvePath(path);
      if (!path) return null;

      var ancestors = [];

      path.forEach(function (p, i) {
        var current = path.slice(0, i);
        var parent = _this.getNode(current);
        ancestors.push(parent);
      });

      return immutable.List(ancestors);
    }

    /**
     * Get the leaf block descendants of the node.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getBlocks',
    value: function getBlocks() {
      var array = this.getBlocksAsArray();
      return immutable.List(array);
    }

    /**
     * Get the leaf block descendants of the node.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getBlocksAsArray',
    value: function getBlocksAsArray() {
      return this.nodes.reduce(function (array, child) {
        if (child.object != 'block') return array;
        if (!child.isLeafBlock()) return array.concat(child.getBlocksAsArray());
        array.push(child);
        return array;
      }, []);
    }

    /**
     * Get the leaf block descendants in a `range`.
     *
     * @param {Range} range
     * @return {List<Node>}
     */

  }, {
    key: 'getBlocksAtRange',
    value: function getBlocksAtRange(range) {
      var array = this.getBlocksAtRangeAsArray(range);
      // Eliminate duplicates by converting to an `OrderedSet` first.
      return immutable.List(immutable.OrderedSet(array));
    }

    /**
     * Get the leaf block descendants in a `range` as an array
     *
     * @param {Range} range
     * @return {Array}
     */

  }, {
    key: 'getBlocksAtRangeAsArray',
    value: function getBlocksAtRangeAsArray(range) {
      range = this.resolveRange(range);
      if (range.isUnset) return [];

      var _range3 = range,
          start = _range3.start,
          end = _range3.end;

      var startBlock = this.getClosestBlock(start.key);

      // PERF: the most common case is when the range is in a single block node,
      // where we can avoid a lot of iterating of the tree.
      if (start.key === end.key) return [startBlock];

      var endBlock = this.getClosestBlock(end.key);
      var blocks = this.getBlocksAsArray();
      var startIndex = blocks.indexOf(startBlock);
      var endIndex = blocks.indexOf(endBlock);
      return blocks.slice(startIndex, endIndex + 1);
    }

    /**
     * Get all of the leaf blocks that match a `type`.
     *
     * @param {String} type
     * @return {List<Node>}
     */

  }, {
    key: 'getBlocksByType',
    value: function getBlocksByType(type) {
      var array = this.getBlocksByTypeAsArray(type);
      return immutable.List(array);
    }

    /**
     * Get all of the leaf blocks that match a `type` as an array
     *
     * @param {String} type
     * @return {Array}
     */

  }, {
    key: 'getBlocksByTypeAsArray',
    value: function getBlocksByTypeAsArray(type) {
      return this.nodes.reduce(function (array, node) {
        if (node.object != 'block') {
          return array;
        } else if (node.isLeafBlock() && node.type == type) {
          array.push(node);
          return array;
        } else {
          return array.concat(node.getBlocksByTypeAsArray(type));
        }
      }, []);
    }

    /**
     * Get a child node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getChild',
    value: function getChild(path) {
      path = this.resolvePath(path);
      if (!path) return null;
      var child = path.size === 1 ? this.nodes.get(path.first()) : null;
      return child;
    }

    /**
     * Get closest parent of node that matches an `iterator`.
     *
     * @param {List|String} path
     * @param {Function} iterator
     * @return {Node|Null}
     */

  }, {
    key: 'getClosest',
    value: function getClosest(path, iterator) {
      var _this2 = this;

      var ancestors = this.getAncestors(path);
      if (!ancestors) return null;

      var closest = ancestors.findLast(function (node) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        // We never want to include the top-level node.
        if (node === _this2) return false;
        return iterator.apply(undefined, [node].concat(args));
      });

      return closest || null;
    }

    /**
     * Get the closest block parent of a node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getClosestBlock',
    value: function getClosestBlock(path) {
      var closest = this.getClosest(path, function (n) {
        return n.object === 'block';
      });
      return closest;
    }

    /**
     * Get the closest inline parent of a node by `path`.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getClosestInline',
    value: function getClosestInline(path) {
      var closest = this.getClosest(path, function (n) {
        return n.object === 'inline';
      });
      return closest;
    }

    /**
     * Get the closest void parent of a node by `path`.
     *
     * @param {List|String} path
     * @param {Schema} schema
     * @return {Node|Null}
     */

  }, {
    key: 'getClosestVoid',
    value: function getClosestVoid(path, schema) {
      var ancestors = this.getAncestors(path);
      if (!ancestors) return null;

      var ancestor = ancestors.findLast(function (a) {
        return schema.isVoid(a);
      });
      return ancestor;
    }

    /**
     * Get the common ancestor of nodes `a` and `b`.
     *
     * @param {List} a
     * @param {List} b
     * @return {Node}
     */

  }, {
    key: 'getCommonAncestor',
    value: function getCommonAncestor(a, b) {
      a = this.resolvePath(a);
      b = this.resolvePath(b);
      if (!a || !b) return null;

      var path = PathUtils.relate(a, b);
      var node = this.getNode(path);
      return node;
    }

    /**
     * Get the decorations for the node from a `stack`.
     *
     * @param {Stack} stack
     * @return {List}
     */

  }, {
    key: 'getDecorations',
    value: function getDecorations(stack) {
      var decorations = stack.find('decorateNode', this);
      var list = Decoration.createList(decorations || []);
      return list;
    }

    /**
     * Get the depth of a descendant, with optional `startAt`.
     *
     * @param {List|String} path
     * @param {Number} startAt
     * @return {Number|Null}
     */

  }, {
    key: 'getDepth',
    value: function getDepth(path) {
      var startAt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      path = this.resolvePath(path);
      if (!path) return null;

      var node = this.getNode(path);
      var depth = node ? path.size - 1 + startAt : null;
      return depth;
    }

    /**
     * Get a descendant node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getDescendant',
    value: function getDescendant(path) {
      path = this.resolvePath(path);
      if (!path) return null;

      var deep = path.flatMap(function (x) {
        return ['nodes', x];
      });
      var ret = this.getIn(deep);
      return ret;
    }

    /**
     * Get a fragment of the node at a `range`.
     *
     * @param {Range} range
     * @return {Document}
     */

  }, {
    key: 'getFragmentAtRange',
    value: function getFragmentAtRange(range) {
      range = this.resolveRange(range);

      if (range.isUnset) {
        return Document.create();
      }

      var _range4 = range,
          start = _range4.start,
          end = _range4.end;

      var node = this;
      var targetPath = end.path;
      var targetPosition = end.offset;
      var mode = 'end';

      while (targetPath.size) {
        var index = targetPath.last();
        node = node.splitNode(targetPath, targetPosition);
        targetPosition = index + 1;
        targetPath = PathUtils.lift(targetPath);

        if (!targetPath.size && mode === 'end') {
          targetPath = start.path;
          targetPosition = start.offset;
          mode = 'start';
        }
      }

      var startIndex = start.path.first() + 1;
      var endIndex = end.path.first() + 2;
      var nodes = node.nodes.slice(startIndex, endIndex);
      var fragment = Document.create({ nodes: nodes });
      return fragment;
    }

    /**
     * Get the furthest parent of a node that matches an `iterator`.
     *
     * @param {Path} path
     * @param {Function} iterator
     * @return {Node|Null}
     */

  }, {
    key: 'getFurthest',
    value: function getFurthest(path, iterator) {
      var _this3 = this;

      var ancestors = this.getAncestors(path);
      if (!ancestors) return null;

      var furthest = ancestors.find(function (node) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        // We never want to include the top-level node.
        if (node === _this3) return false;
        return iterator.apply(undefined, [node].concat(args));
      });

      return furthest || null;
    }

    /**
     * Get the furthest ancestor of a node.
     *
     * @param {Path} path
     * @return {Node|Null}
     */

  }, {
    key: 'getFurthestAncestor',
    value: function getFurthestAncestor(path) {
      path = this.resolvePath(path);
      if (!path) return null;
      var furthest = path.size ? this.nodes.get(path.first()) : null;
      return furthest;
    }

    /**
     * Get the furthest block parent of a node.
     *
     * @param {Path} path
     * @return {Node|Null}
     */

  }, {
    key: 'getFurthestBlock',
    value: function getFurthestBlock(path) {
      var furthest = this.getFurthest(path, function (n) {
        return n.object === 'block';
      });
      return furthest;
    }

    /**
     * Get the furthest inline parent of a node.
     *
     * @param {Path} path
     * @return {Node|Null}
     */

  }, {
    key: 'getFurthestInline',
    value: function getFurthestInline(path) {
      var furthest = this.getFurthest(path, function (n) {
        return n.object === 'inline';
      });
      return furthest;
    }

    /**
     * Get the furthest ancestor of a node that has only one child.
     *
     * @param {Path} path
     * @return {Node|Null}
     */

  }, {
    key: 'getFurthestOnlyChildAncestor',
    value: function getFurthestOnlyChildAncestor(path) {
      var ancestors = this.getAncestors(path);
      if (!ancestors) return null;

      var furthest = ancestors.rest().reverse().takeUntil(function (p) {
        return p.nodes.size > 1;
      }).last();

      return furthest || null;
    }

    /**
     * Get the closest inline nodes for each text node in the node.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getInlines',
    value: function getInlines() {
      var array = this.getInlinesAsArray();
      var list = immutable.List(array);
      return list;
    }

    /**
     * Get the closest inline nodes for each text node in the node, as an array.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getInlinesAsArray',
    value: function getInlinesAsArray() {
      var array = [];

      this.nodes.forEach(function (child) {
        if (child.object == 'text') return;

        if (child.isLeafInline()) {
          array.push(child);
        } else {
          array = array.concat(child.getInlinesAsArray());
        }
      });

      return array;
    }

    /**
     * Get the closest inline nodes for each text node in a `range`.
     *
     * @param {Range} range
     * @return {List<Node>}
     */

  }, {
    key: 'getInlinesAtRange',
    value: function getInlinesAtRange(range) {
      var array = this.getInlinesAtRangeAsArray(range);
      // Remove duplicates by converting it to an `OrderedSet` first.
      var list = immutable.List(immutable.OrderedSet(array));
      return list;
    }

    /**
     * Get the closest inline nodes for each text node in a `range` as an array.
     *
     * @param {Range} range
     * @return {Array}
     */

  }, {
    key: 'getInlinesAtRangeAsArray',
    value: function getInlinesAtRangeAsArray(range) {
      var _this4 = this;

      range = this.resolveRange(range);
      if (range.isUnset) return [];

      var array = this.getTextsAtRangeAsArray(range).map(function (text) {
        return _this4.getClosestInline(text.key);
      }).filter(function (exists) {
        return exists;
      });

      return array;
    }

    /**
     * Get all of the leaf inline nodes that match a `type`.
     *
     * @param {String} type
     * @return {List<Node>}
     */

  }, {
    key: 'getInlinesByType',
    value: function getInlinesByType(type) {
      var array = this.getInlinesByTypeAsArray(type);
      var list = immutable.List(array);
      return list;
    }

    /**
     * Get all of the leaf inline nodes that match a `type` as an array.
     *
     * @param {String} type
     * @return {Array}
     */

  }, {
    key: 'getInlinesByTypeAsArray',
    value: function getInlinesByTypeAsArray(type) {
      var array = this.nodes.reduce(function (inlines, node) {
        if (node.object == 'text') {
          return inlines;
        } else if (node.isLeafInline() && node.type == type) {
          inlines.push(node);
          return inlines;
        } else {
          return inlines.concat(node.getInlinesByTypeAsArray(type));
        }
      }, []);

      return array;
    }

    /**
     * Get a set of the marks in a `range`.
     *
     * @param {Range} range
     * @return {Set<Mark>}
     */

  }, {
    key: 'getInsertMarksAtRange',
    value: function getInsertMarksAtRange(range) {
      range = this.resolveRange(range);
      var _range5 = range,
          start = _range5.start;


      if (range.isUnset) {
        return immutable.Set();
      }

      if (range.isCollapsed) {
        // PERF: range is not cachable, use key and offset as proxies for cache
        return this.getMarksAtPosition(start.key, start.offset);
      }

      var text = this.getDescendant(start.key);
      var marks = text.getMarksAtIndex(start.offset + 1);
      return marks;
    }

    /**
     * Get all of the marks for all of the characters of every text node.
     *
     * @return {Set<Mark>}
     */

  }, {
    key: 'getMarks',
    value: function getMarks() {
      var array = this.getMarksAsArray();
      return immutable.Set(array);
    }

    /**
     * Get all of the marks as an array.
     *
     * @return {Array}
     */

  }, {
    key: 'getMarksAsArray',
    value: function getMarksAsArray() {
      var _ref;

      var result = [];

      this.nodes.forEach(function (node) {
        result.push(node.getMarksAsArray());
      });

      // PERF: use only one concat rather than multiple for speed.
      var array = (_ref = []).concat.apply(_ref, result);
      return array;
    }

    /**
     * Get a set of marks in a `position`, the equivalent of a collapsed range
     *
     * @param {string} key
     * @param {number} offset
     * @return {Set}
     */

  }, {
    key: 'getMarksAtPosition',
    value: function getMarksAtPosition(key, offset) {
      var text = this.getDescendant(key);
      var currentMarks = text.getMarksAtIndex(offset);
      if (offset !== 0) return currentMarks;
      var closestBlock = this.getClosestBlock(key);

      if (closestBlock.text === '') {
        // insert mark for empty block; the empty block are often created by split node or add marks in a range including empty blocks
        return currentMarks;
      }

      var previous = this.getPreviousText(key);
      if (!previous) return immutable.Set();

      if (closestBlock.hasDescendant(previous.key)) {
        return previous.getMarksAtIndex(previous.text.length);
      }

      return currentMarks;
    }

    /**
     * Get a set of the marks in a `range`.
     *
     * @param {Range} range
     * @return {Set<Mark>}
     */

  }, {
    key: 'getMarksAtRange',
    value: function getMarksAtRange(range) {
      var marks = immutable.Set(this.getOrderedMarksAtRange(range));
      return marks;
    }

    /**
     * Get all of the marks that match a `type`.
     *
     * @param {String} type
     * @return {Set<Mark>}
     */

  }, {
    key: 'getMarksByType',
    value: function getMarksByType(type) {
      var array = this.getMarksByTypeAsArray(type);
      return immutable.Set(array);
    }

    /**
     * Get all of the marks that match a `type` as an array.
     *
     * @param {String} type
     * @return {Array}
     */

  }, {
    key: 'getMarksByTypeAsArray',
    value: function getMarksByTypeAsArray(type) {
      var array = this.nodes.reduce(function (memo, node) {
        return node.object == 'text' ? memo.concat(node.getMarksAsArray().filter(function (m) {
          return m.type == type;
        })) : memo.concat(node.getMarksByTypeAsArray(type));
      }, []);

      return array;
    }

    /**
     * Get the block node before a descendant text node by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getNextBlock',
    value: function getNextBlock(key) {
      var child = this.assertDescendant(key);
      var last = void 0;

      if (child.object == 'block') {
        last = child.getLastText();
      } else {
        var block = this.getClosestBlock(key);
        last = block.getLastText();
      }

      var next = this.getNextText(last.key);
      if (!next) return null;

      var closest = this.getClosestBlock(next.key);
      return closest;
    }

    /**
     * Get the next node in the tree from a node.
     *
     * This will not only check for siblings but instead move up the tree
     * returning the next ancestor if no sibling is found.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getNextNode',
    value: function getNextNode(path) {
      path = this.resolvePath(path);
      if (!path) return null;
      if (!path.size) return null;

      for (var i = path.size; i > 0; i--) {
        var p = path.slice(0, i);
        var target = PathUtils.increment(p);
        var node = this.getNode(target);
        if (node) return node;
      }

      return null;
    }

    /**
     * Get the next sibling of a node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getNextSibling',
    value: function getNextSibling(path) {
      path = this.resolvePath(path);
      if (!path) return null;
      if (!path.size) return null;
      var p = PathUtils.increment(path);
      var sibling = this.getNode(p);
      return sibling;
    }

    /**
     * Get the text node after a descendant text node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getNextText',
    value: function getNextText(path) {
      path = this.resolvePath(path);
      if (!path) return null;
      if (!path.size) return null;
      var next = this.getNextNode(path);
      if (!next) return null;
      var text = next.getFirstText();
      return text;
    }

    /**
     * Get the offset for a descendant text node by `key`.
     *
     * @param {String} key
     * @return {Number}
     */

  }, {
    key: 'getOffset',
    value: function getOffset(key) {
      this.assertDescendant(key);

      // Calculate the offset of the nodes before the highest child.
      var child = this.getFurthestAncestor(key);
      var offset = this.nodes.takeUntil(function (n) {
        return n == child;
      }).reduce(function (memo, n) {
        return memo + n.text.length;
      }, 0);

      // Recurse if need be.
      var ret = this.hasChild(key) ? offset : offset + child.getOffset(key);
      return ret;
    }

    /**
     * Get the offset from a `range`.
     *
     * @param {Range} range
     * @return {Number}
     */

  }, {
    key: 'getOffsetAtRange',
    value: function getOffsetAtRange(range) {
      range = this.resolveRange(range);

      if (range.isUnset) {
        throw new Error('The range cannot be unset to calculcate its offset.');
      }

      if (range.isExpanded) {
        throw new Error('The range must be collapsed to calculcate its offset.');
      }

      var _range6 = range,
          start = _range6.start;

      var offset = this.getOffset(start.key) + start.offset;
      return offset;
    }

    /**
     * Get all of the marks for all of the characters of every text node.
     *
     * @return {OrderedSet<Mark>}
     */

  }, {
    key: 'getOrderedMarks',
    value: function getOrderedMarks() {
      var array = this.getMarksAsArray();
      return immutable.OrderedSet(array);
    }

    /**
     * Get a set of the marks in a `range`.
     *
     * @param {Range} range
     * @return {OrderedSet<Mark>}
     */

  }, {
    key: 'getOrderedMarksAtRange',
    value: function getOrderedMarksAtRange(range) {
      range = this.resolveRange(range);
      var _range7 = range,
          start = _range7.start,
          end = _range7.end;


      if (range.isUnset) {
        return immutable.OrderedSet();
      }

      if (range.isCollapsed) {
        // PERF: range is not cachable, use key and offset as proxies for cache
        return this.getMarksAtPosition(start.key, start.offset);
      }

      var marks = this.getOrderedMarksBetweenPositions(start.key, start.offset, end.key, end.offset);

      return marks;
    }

    /**
     * Get a set of the marks in a `range`.
     * PERF: arguments use key and offset for utilizing cache
     *
     * @param {string} startKey
     * @param {number} startOffset
     * @param {string} endKey
     * @param {number} endOffset
     * @returns {OrderedSet<Mark>}
     */

  }, {
    key: 'getOrderedMarksBetweenPositions',
    value: function getOrderedMarksBetweenPositions(startKey, startOffset, endKey, endOffset) {
      if (startKey === endKey) {
        var startText = this.getDescendant(startKey);
        return startText.getMarksBetweenOffsets(startOffset, endOffset);
      }

      var texts = this.getTextsBetweenPositionsAsArray(startKey, endKey);

      return immutable.OrderedSet().withMutations(function (result) {
        texts.forEach(function (text) {
          if (text.key === startKey) {
            result.union(text.getMarksBetweenOffsets(startOffset, text.text.length));
          } else if (text.key === endKey) {
            result.union(text.getMarksBetweenOffsets(0, endOffset));
          } else {
            result.union(text.getMarks());
          }
        });
      });
    }

    /**
     * Get all of the marks that match a `type`.
     *
     * @param {String} type
     * @return {OrderedSet<Mark>}
     */

  }, {
    key: 'getOrderedMarksByType',
    value: function getOrderedMarksByType(type) {
      var array = this.getMarksByTypeAsArray(type);
      return immutable.OrderedSet(array);
    }

    /**
     * Get the parent of a descendant node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getParent',
    value: function getParent(path) {
      path = this.resolvePath(path);
      if (!path) return null;
      if (!path.size) return null;
      var parentPath = PathUtils.lift(path);
      var parent = this.getNode(parentPath);
      return parent;
    }

    /**
     * Get the block node before a descendant text node by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getPreviousBlock',
    value: function getPreviousBlock(key) {
      var child = this.assertDescendant(key);
      var first = void 0;

      if (child.object == 'block') {
        first = child.getFirstText();
      } else {
        var block = this.getClosestBlock(key);
        first = block.getFirstText();
      }

      var previous = this.getPreviousText(first.key);
      if (!previous) return null;

      var closest = this.getClosestBlock(previous.key);
      return closest;
    }

    /**
     * Get the previous node from a node in the tree.
     *
     * This will not only check for siblings but instead move up the tree
     * returning the previous ancestor if no sibling is found.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getPreviousNode',
    value: function getPreviousNode(path) {
      path = this.resolvePath(path);
      if (!path) return null;
      if (!path.size) return null;

      for (var i = path.size; i > 0; i--) {
        var p = path.slice(0, i);
        if (p.last() === 0) continue;

        var target = PathUtils.decrement(p);
        var node = this.getNode(target);
        if (node) return node;
      }

      return null;
    }

    /**
     * Get the previous sibling of a node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getPreviousSibling',
    value: function getPreviousSibling(path) {
      path = this.resolvePath(path);
      if (!path) return null;
      if (!path.size) return null;
      if (path.last() === 0) return null;
      var p = PathUtils.decrement(path);
      var sibling = this.getNode(p);
      return sibling;
    }

    /**
     * Get the text node after a descendant text node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getPreviousText',
    value: function getPreviousText(path) {
      path = this.resolvePath(path);
      if (!path) return null;
      if (!path.size) return null;
      var previous = this.getPreviousNode(path);
      if (!previous) return null;
      var text = previous.getLastText();
      return text;
    }

    /**
     * Get the indexes of the selection for a `range`, given an extra flag for
     * whether the node `isSelected`, to determine whether not finding matches
     * means everything is selected or nothing is.
     *
     * @param {Range} range
     * @param {Boolean} isSelected
     * @return {Object|Null}
     */

  }, {
    key: 'getSelectionIndexes',
    value: function getSelectionIndexes(range) {
      var isSelected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var start = range.start,
          end = range.end;

      // PERF: if we're not selected, we can exit early.

      if (!isSelected) {
        return null;
      }

      // if we've been given an invalid selection we can exit early.
      if (range.isUnset) {
        return null;
      }

      // PERF: if the start and end keys are the same, just check for the child
      // that contains that single key.
      if (start.key == end.key) {
        var child = this.getFurthestAncestor(start.key);
        var index = child ? this.nodes.indexOf(child) : null;
        return { start: index, end: index + 1 };
      }

      // Otherwise, check all of the children...
      var startIndex = null;
      var endIndex = null;

      this.nodes.forEach(function (child, i) {
        if (child.object == 'text') {
          if (startIndex == null && child.key == start.key) startIndex = i;
          if (endIndex == null && child.key == end.key) endIndex = i + 1;
        } else {
          if (startIndex == null && child.hasDescendant(start.key)) startIndex = i;
          if (endIndex == null && child.hasDescendant(end.key)) endIndex = i + 1;
        }

        // PERF: exit early if both start and end have been found.
        return startIndex == null || endIndex == null;
      });

      if (isSelected && startIndex == null) startIndex = 0;
      if (isSelected && endIndex == null) endIndex = this.nodes.size;
      return startIndex == null ? null : { start: startIndex, end: endIndex };
    }

    /**
     * Get the descendent text node at an `offset`.
     *
     * @param {String} offset
     * @return {Node|Null}
     */

  }, {
    key: 'getTextAtOffset',
    value: function getTextAtOffset(offset) {
      // PERF: Add a few shortcuts for the obvious cases.
      if (offset === 0) return this.getFirstText();
      if (offset === this.text.length) return this.getLastText();
      if (offset < 0 || offset > this.text.length) return null;

      var length = 0;
      var text = this.getTexts().find(function (node, i, nodes) {
        length += node.text.length;
        return length > offset;
      });

      return text;
    }

    /**
     * Get the direction of the node's text.
     *
     * @return {String}
     */

  }, {
    key: 'getTextDirection',
    value: function getTextDirection() {
      var dir = direction(this.text);
      return dir === 'neutral' ? null : dir;
    }

    /**
     * Recursively get all of the child text nodes in order of appearance.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getTexts',
    value: function getTexts() {
      var array = this.getTextsAsArray();
      return immutable.List(array);
    }

    /**
     * Recursively get all the leaf text nodes in order of appearance, as array.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getTextsAsArray',
    value: function getTextsAsArray() {
      var array = [];

      this.nodes.forEach(function (node) {
        if (node.object == 'text') {
          array.push(node);
        } else {
          array = array.concat(node.getTextsAsArray());
        }
      });

      return array;
    }

    /**
     * Get all of the text nodes in a `range`.
     *
     * @param {Range} range
     * @return {List<Node>}
     */

  }, {
    key: 'getTextsAtRange',
    value: function getTextsAtRange(range) {
      range = this.resolveRange(range);
      if (range.isUnset) return immutable.List();
      var _range8 = range,
          start = _range8.start,
          end = _range8.end;

      var list = immutable.List(this.getTextsBetweenPositionsAsArray(start.key, end.key));

      return list;
    }

    /**
     * Get all of the text nodes in a `range` as an array.
     *
     * @param {Range} range
     * @return {Array}
     */

  }, {
    key: 'getTextsAtRangeAsArray',
    value: function getTextsAtRangeAsArray(range) {
      range = this.resolveRange(range);
      if (range.isUnset) return [];
      var _range9 = range,
          start = _range9.start,
          end = _range9.end;

      var texts = this.getTextsBetweenPositionsAsArray(start.key, end.key);
      return texts;
    }

    /**
     * Get all of the text nodes in a `range` as an array.
     * PERF: use key in arguments for cache
     *
     * @param {string} startKey
     * @param {string} endKey
     * @returns {Array}
     */

  }, {
    key: 'getTextsBetweenPositionsAsArray',
    value: function getTextsBetweenPositionsAsArray(startKey, endKey) {
      var startText = this.getDescendant(startKey);

      // PERF: the most common case is when the range is in a single text node,
      // where we can avoid a lot of iterating of the tree.
      if (startKey == endKey) return [startText];

      var endText = this.getDescendant(endKey);
      var texts = this.getTextsAsArray();
      var start = texts.indexOf(startText);
      var end = texts.indexOf(endText, start);
      var ret = texts.slice(start, end + 1);
      return ret;
    }

    /**
     * Check if the node has block children.
     *
     * @return {Boolean}
     */

  }, {
    key: 'hasBlockChildren',
    value: function hasBlockChildren() {
      return !!(this.nodes && this.nodes.find(function (n) {
        return n.object === 'block';
      }));
    }

    /**
     * Check if a child node exists.
     *
     * @param {List|String} path
     * @return {Boolean}
     */

  }, {
    key: 'hasChild',
    value: function hasChild(path) {
      var child = this.getChild(path);
      return !!child;
    }

    /**
     * Check if a node has inline children.
     *
     * @return {Boolean}
     */

  }, {
    key: 'hasInlineChildren',
    value: function hasInlineChildren() {
      return !!(this.nodes && this.nodes.find(function (n) {
        return n.object === 'inline' || n.object === 'text';
      }));
    }

    /**
     * Recursively check if a child node exists.
     *
     * @param {List|String} path
     * @return {Boolean}
     */

  }, {
    key: 'hasDescendant',
    value: function hasDescendant(path) {
      var descendant = this.getDescendant(path);
      return !!descendant;
    }

    /**
     * Check if a node has a void parent.
     *
     * @param {List|String} path
     * @param {Schema} schema
     * @return {Boolean}
     */

  }, {
    key: 'hasVoidParent',
    value: function hasVoidParent(path, schema) {
      var closest = this.getClosestVoid(path, schema);
      return !!closest;
    }

    /**
     * Insert a `node`.
     *
     * @param {List|String} path
     * @param {Node} node
     * @return {Node}
     */

  }, {
    key: 'insertNode',
    value: function insertNode(path, node) {
      path = this.resolvePath(path);
      var index = path.last();
      var parentPath = PathUtils.lift(path);
      var parent = this.assertNode(parentPath);
      var nodes = parent.nodes.splice(index, 0, node);
      parent = parent.set('nodes', nodes);
      var ret = this.replaceNode(parentPath, parent);
      return ret;
    }

    /**
     * Insert `text` at `offset` in node by `path`.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @param {String} text
     * @param {Set} marks
     * @return {Node}
     */

  }, {
    key: 'insertText',
    value: function insertText(path, offset, text, marks) {
      var node = this.assertDescendant(path);
      path = this.resolvePath(path);
      node = node.insertText(offset, text, marks);
      var ret = this.replaceNode(path, node);
      return ret;
    }

    /**
     * Check whether the node is a leaf block.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isLeafBlock',
    value: function isLeafBlock() {
      var object = this.object,
          nodes = this.nodes;

      var first = nodes.first();
      return object === 'block' && first.object !== 'block';
    }

    /**
     * Check whether the node is a leaf inline.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isLeafInline',
    value: function isLeafInline() {
      var object = this.object,
          nodes = this.nodes;

      var first = nodes.first();
      return object === 'inline' && first.object !== 'inline';
    }

    /**
     * Map all child nodes, updating them in their parents. This method is
     * optimized to not return a new node if no changes are made.
     *
     * @param {Function} iterator
     * @return {Node}
     */

  }, {
    key: 'mapChildren',
    value: function mapChildren(iterator) {
      var _this5 = this;

      var nodes = this.nodes;


      nodes.forEach(function (node, i) {
        var ret = iterator(node, i, _this5.nodes);
        if (ret !== node) nodes = nodes.set(ret.key, ret);
      });

      var ret = this.set('nodes', nodes);
      return ret;
    }

    /**
     * Map all descendant nodes, updating them in their parents. This method is
     * optimized to not return a new node if no changes are made.
     *
     * @param {Function} iterator
     * @return {Node}
     */

  }, {
    key: 'mapDescendants',
    value: function mapDescendants(iterator) {
      var _this6 = this;

      var nodes = this.nodes;


      nodes.forEach(function (node, index) {
        var ret = node;
        if (ret.object !== 'text') ret = ret.mapDescendants(iterator);
        ret = iterator(ret, index, _this6.nodes);
        if (ret === node) return;

        nodes = nodes.set(index, ret);
      });

      var ret = this.set('nodes', nodes);
      return ret;
    }

    /**
     * Merge a node backwards its previous sibling.
     *
     * @param {List|Key} path
     * @return {Node}
     */

  }, {
    key: 'mergeNode',
    value: function mergeNode(path) {
      var b = this.assertNode(path);
      path = this.resolvePath(path);

      if (path.last() === 0) {
        throw new Error('Unable to merge node because it has no previous sibling: ' + b);
      }

      var withPath = PathUtils.decrement(path);
      var a = this.assertNode(withPath);

      if (a.object !== b.object) {
        throw new Error('Unable to merge two different kinds of nodes: ' + a + ' and ' + b);
      }

      var newNode = a.object === 'text' ? a.mergeText(b) : a.set('nodes', a.nodes.concat(b.nodes));

      var ret = this;
      ret = ret.removeNode(path);
      ret = ret.removeNode(withPath);
      ret = ret.insertNode(withPath, newNode);
      return ret;
    }

    /**
     * Move a node by `path` to `newPath`.
     *
     * A `newIndex` can be provided when move nodes by `key`, to account for not
     * being able to have a key for a location in the tree that doesn't exist yet.
     *
     * @param {List|Key} path
     * @param {List|Key} newPath
     * @param {Number} newIndex
     * @return {Node}
     */

  }, {
    key: 'moveNode',
    value: function moveNode(path, newPath) {
      var newIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var node = this.assertNode(path);
      path = this.resolvePath(path);
      newPath = this.resolvePath(newPath, newIndex);

      var newParentPath = PathUtils.lift(newPath);
      this.assertNode(newParentPath);

      var _PathUtils$crop = PathUtils.crop(path, newPath),
          _PathUtils$crop2 = slicedToArray(_PathUtils$crop, 2),
          p = _PathUtils$crop2[0],
          np = _PathUtils$crop2[1];

      var position = PathUtils.compare(p, np);

      // If the old path ends above and before a node in the new path, then
      // removing it will alter the target, so we need to adjust the new path.
      if (path.size < newPath.size && position === -1) {
        newPath = PathUtils.decrement(newPath, 1, p.size - 1);
      }

      var ret = this;
      ret = ret.removeNode(path);
      ret = ret.insertNode(newPath, node);
      return ret;
    }

    /**
     * Remove mark from text at `offset` and `length` in node.
     *
     * @param {List} path
     * @param {Number} offset
     * @param {Number} length
     * @param {Mark} mark
     * @return {Node}
     */

  }, {
    key: 'removeMark',
    value: function removeMark(path, offset, length, mark) {
      var node = this.assertDescendant(path);
      path = this.resolvePath(path);
      node = node.removeMark(offset, length, mark);
      var ret = this.replaceNode(path, node);
      return ret;
    }

    /**
     * Remove a node.
     *
     * @param {List|String} path
     * @return {Node}
     */

  }, {
    key: 'removeNode',
    value: function removeNode(path) {
      this.assertDescendant(path);
      path = this.resolvePath(path);
      var deep = path.flatMap(function (x) {
        return ['nodes', x];
      });
      var ret = this.deleteIn(deep);
      return ret;
    }

    /**
     * Remove `text` at `offset` in node.
     *
     * @param {List|Key} path
     * @param {Number} offset
     * @param {String} text
     * @return {Node}
     */

  }, {
    key: 'removeText',
    value: function removeText(path, offset, text) {
      var node = this.assertDescendant(path);
      node = node.removeText(offset, text.length);
      var ret = this.replaceNode(path, node);
      return ret;
    }

    /**
     * Replace a `node` in the tree.
     *
     * @param {List|Key} path
     * @param {Node} node
     * @return {Node}
     */

  }, {
    key: 'replaceNode',
    value: function replaceNode(path, node) {
      path = this.resolvePath(path);

      if (!path) {
        throw new Error('Unable to replace a node because it could not be found in the first place: ' + path);
      }

      if (!path.size) return node;
      this.assertNode(path);
      var deep = path.flatMap(function (x) {
        return ['nodes', x];
      });
      var ret = this.setIn(deep, node);
      return ret;
    }

    /**
     * Resolve a `decoration`, relative to the node, ensuring that the keys and
     * offsets in the decoration exist and that they are synced with the paths.
     *
     * @param {Decoration|Object} decoration
     * @return {Decoration}
     */

  }, {
    key: 'resolveDecoration',
    value: function resolveDecoration(decoration) {
      decoration = Decoration.create(decoration);
      decoration = decoration.normalize(this);
      return decoration;
    }

    /**
     * Resolve a `point`, relative to the node, ensuring that the keys and
     * offsets in the point exist and that they are synced with the paths.
     *
     * @param {Point|Object} point
     * @return {Point}
     */

  }, {
    key: 'resolvePoint',
    value: function resolvePoint(point) {
      point = Point.create(point);
      point = point.normalize(this);
      return point;
    }

    /**
     * Resolve a `range`, relative to the node, ensuring that the keys and
     * offsets in the range exist and that they are synced with the paths.
     *
     * @param {Range|Object} range
     * @return {Range}
     */

  }, {
    key: 'resolveRange',
    value: function resolveRange(range) {
      range = Range.create(range);
      range = range.normalize(this);
      return range;
    }

    /**
     * Resolve a `selection`, relative to the node, ensuring that the keys and
     * offsets in the selection exist and that they are synced with the paths.
     *
     * @param {Selection|Object} selection
     * @return {Selection}
     */

  }, {
    key: 'resolveSelection',
    value: function resolveSelection(selection) {
      selection = Selection.create(selection);
      selection = selection.normalize(this);
      return selection;
    }

    /**
     * Set `properties` on a node.
     *
     * @param {List|String} path
     * @param {Object} properties
     * @return {Node}
     */

  }, {
    key: 'setNode',
    value: function setNode(path, properties) {
      var node = this.assertNode(path);
      node = node.merge(properties);
      var ret = this.replaceNode(path, node);
      return ret;
    }

    /**
     * Set `properties` on `mark` on text at `offset` and `length` in node.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @param {Number} length
     * @param {Mark} mark
     * @param {Object} properties
     * @return {Node}
     */

  }, {
    key: 'setMark',
    value: function setMark(path, offset, length, mark, properties) {
      var node = this.assertNode(path);
      node = node.updateMark(offset, length, mark, properties);
      var ret = this.replaceNode(path, node);
      return ret;
    }

    /**
     * Split a node by `path` at `position` with optional `properties` to apply
     * to the newly split node.
     *
     * @param {List|String} path
     * @param {Number} position
     * @param {Object} properties
     * @return {Node}
     */

  }, {
    key: 'splitNode',
    value: function splitNode(path, position, properties) {
      var child = this.assertNode(path);
      path = this.resolvePath(path);
      var a = void 0;
      var b = void 0;

      if (child.object === 'text') {
        
        var _child$splitText = child.splitText(position);

        var _child$splitText2 = slicedToArray(_child$splitText, 2);

        a = _child$splitText2[0];
        b = _child$splitText2[1];
      } else {
        var befores = child.nodes.take(position);
        var afters = child.nodes.skip(position);
        a = child.set('nodes', befores);
        b = child.set('nodes', afters).regenerateKey();
      }

      if (properties && child.object !== 'text') {
        b = b.merge(properties);
      }

      var ret = this;
      ret = ret.removeNode(path);
      ret = ret.insertNode(path, b);
      ret = ret.insertNode(path, a);
      return ret;
    }
  }]);
  return ElementInterface;
}();

/**
 * Mix in assertion variants.
 */

var ASSERTS = ['Child', 'Depth', 'Descendant', 'Node', 'Parent', 'Path'];

var _loop$1 = function _loop(method) {
  ElementInterface.prototype['assert' + method] = function (path) {
    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    var ret = this['get' + method].apply(this, [path].concat(args));

    if (ret == null) {
      throw new Error('`Node.assert' + method + '` could not find node with path or key: ' + path);
    }

    return ret;
  };
};

var _iteratorNormalCompletion$1 = true;
var _didIteratorError$1 = false;
var _iteratorError$1 = undefined;

try {
  for (var _iterator$1 = ASSERTS[Symbol.iterator](), _step$1; !(_iteratorNormalCompletion$1 = (_step$1 = _iterator$1.next()).done); _iteratorNormalCompletion$1 = true) {
    var method$1 = _step$1.value;

    _loop$1(method$1);
  }

  /**
   * Memoize read methods.
   */
} catch (err) {
  _didIteratorError$1 = true;
  _iteratorError$1 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion$1 && _iterator$1.return) {
      _iterator$1.return();
    }
  } finally {
    if (_didIteratorError$1) {
      throw _iteratorError$1;
    }
  }
}

memoize(ElementInterface.prototype, ['getBlocksAsArray', 'getBlocksAtRangeAsArray', 'getBlocksByTypeAsArray', 'getDecorations', 'getFragmentAtRange', 'getInlinesAsArray', 'getInlinesAtRangeAsArray', 'getInlinesByTypeAsArray', 'getMarksAsArray', 'getMarksAtPosition', 'getOrderedMarksBetweenPositions', 'getInsertMarksAtRange', 'getMarksByTypeAsArray', 'getNextBlock', 'getOffset', 'getOffsetAtRange', 'getPreviousBlock', 'getTextAtOffset', 'getTextDirection', 'getTextsAsArray', 'getTextsBetweenPositionsAsArray']);

/**
 * Mix in the element interface.
 */

mixin(ElementInterface, [Block, Document, Inline]);

/**
 * The interface that `Document`, `Block` and `Inline` all implement, to make
 * working with the recursive node tree easier.
 *
 * @type {Class}
 */

var NodeInterface = function () {
  function NodeInterface() {
    classCallCheck(this, NodeInterface);
  }

  createClass(NodeInterface, [{
    key: 'getFirstInvalidNode',


    /**
     * Check whether the node is a leaf inline.
     *
     * @return {Boolean}
     */

    value: function getFirstInvalidNode(schema) {
      if (this.object === 'text') {
        var _invalid = this.validate(schema) ? this : null;
        return _invalid;
      }

      var invalid = null;

      this.nodes.find(function (n) {
        invalid = n.validate(schema) ? n : n.getFirstInvalidNode(schema);
        return invalid;
      });

      return invalid;
    }

    /**
     * Get the first text node of a node, or the node itself.
     *
     * @return {Node|Null}
     */

  }, {
    key: 'getFirstText',
    value: function getFirstText() {
      if (this.object === 'text') {
        return this;
      }

      var descendant = null;

      var found = this.nodes.find(function (node) {
        if (node.object === 'text') return true;
        descendant = node.getFirstText();
        return !!descendant;
      });

      return descendant || found;
    }

    /**
     * Get an object mapping all the keys in the node to their paths.
     *
     * @return {Object}
     */

  }, {
    key: 'getKeysToPathsTable',
    value: function getKeysToPathsTable() {
      var ret = defineProperty({}, this.key, []);

      if (this.nodes) {
        this.nodes.forEach(function (node, i) {
          var nested = node.getKeysToPathsTable();

          for (var key in nested) {
            var path = nested[key];

            warning(!(key in ret), 'A node with a duplicate key of "' + key + '" was found! Duplicate keys are not allowed, you should use `node.regenerateKey` before inserting if you are reusing an existing node.');

            ret[key] = [i].concat(toConsumableArray(path));
          }
        });
      }

      return ret;
    }

    /**
     * Get the last text node of a node, or the node itself.
     *
     * @return {Node|Null}
     */

  }, {
    key: 'getLastText',
    value: function getLastText() {
      if (this.object === 'text') {
        return this;
      }

      var descendant = null;

      var found = this.nodes.findLast(function (node) {
        if (node.object == 'text') return true;
        descendant = node.getLastText();
        return descendant;
      });

      return descendant || found;
    }

    /**
     * Get a node in the tree, or the node itself.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getNode',
    value: function getNode(path) {
      path = this.resolvePath(path);
      if (!path) return null;
      if (this.object === 'text' && path.size) return null;
      var node = path.size ? this.getDescendant(path) : this;
      return node;
    }

    /**
     * Find the path to a node.
     *
     * @param {String|List} key
     * @return {List}
     */

  }, {
    key: 'getPath',
    value: function getPath(key) {
      // Handle the case of passing in a path directly, to match other methods.
      if (immutable.List.isList(key)) return key;

      var dict = this.getKeysToPathsTable();
      var path = dict[key];
      return path ? immutable.List(path) : null;
    }

    /**
     * Get the concatenated text string of a node.
     *
     * @return {String}
     */

  }, {
    key: 'getText',
    value: function getText() {
      var children = this.object === 'text' ? this.leaves : this.nodes;
      var text = children.reduce(function (memo, c) {
        return memo + c.text;
      }, '');
      return text;
    }

    /**
     * Check if a node exists.
     *
     * @param {List|String} path
     * @return {Boolean}
     */

  }, {
    key: 'hasNode',
    value: function hasNode(path) {
      var node = this.getNode(path);
      return !!node;
    }

    /**
     * Normalize the text node with a `schema`.
     *
     * @param {Schema} schema
     * @return {Function|Void}
     */

  }, {
    key: 'normalize',
    value: function normalize(schema) {
      var normalizer = schema.normalizeNode(this);
      return normalizer;
    }

    /**
     * Regenerate the node's key.
     *
     * @return {Node}
     */

  }, {
    key: 'regenerateKey',
    value: function regenerateKey() {
      var key = KeyUtils.create();
      var node = this.set('key', key);
      return node;
    }

    /**
     * Resolve a path from a path list or key string.
     *
     * An `index` can be provided, in which case paths created from a key string
     * will have the index pushed onto them. This is helpful in cases where you
     * want to accept either a `path` or a `key, index` combination for targeting
     * a location in the tree that doesn't exist yet, like when inserting.
     *
     * @param {List|String} value
     * @param {Number} index
     * @return {List}
     */

  }, {
    key: 'resolvePath',
    value: function resolvePath(path, index) {
      if (typeof path === 'string') {
        path = this.getPath(path);

        if (index != null) {
          path = path.concat(index);
        }
      } else {
        path = PathUtils.create(path);
      }

      return path;
    }

    /**
     * Validate the node against a `schema`.
     *
     * @param {Schema} schema
     * @return {Error|Void}
     */

  }, {
    key: 'validate',
    value: function validate(schema) {
      var error = schema.validateNode(this);
      return error;
    }
  }, {
    key: 'text',

    /**
     * Get the concatenated text of the node.
     *
     * @return {String}
     */

    get: function get$$1() {
      return this.getText();
    }
  }]);
  return NodeInterface;
}();

/**
 * Memoize read methods.
 */

memoize(NodeInterface.prototype, ['getFirstInvalidNode', 'getFirstText', 'getKeysToPathsTable', 'getLastText', 'getText', 'normalize', 'validate']);

/**
 * Mix in the node interface.
 */

mixin(NodeInterface, [Block, Document, Inline, Text]);

/**
 * The interface that `Decoration`, `Range` and `Selection` all implement, to make
 * working anchor and focus points easier.
 *
 * @type {Class}
 */

var RangeInterface = function () {
  function RangeInterface() {
    classCallCheck(this, RangeInterface);
  }

  createClass(RangeInterface, [{
    key: 'flip',


    /**
     * Flip the range.
     *
     * @return {Range}
     */

    value: function flip() {
      var range = this.setPoints([this.focus, this.anchor]);
      return range;
    }

    /**
     * Move the anchor and focus offsets forward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveForward',
    value: function moveForward(n) {
      return this.updatePoints(function (point) {
        return point.moveForward(n);
      });
    }

    /**
     * Move the anchor and focus offsets backward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveBackward',
    value: function moveBackward(n) {
      return this.updatePoints(function (point) {
        return point.moveBackward(n);
      });
    }

    /**
     * Move the anchor offset backward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveAnchorBackward',
    value: function moveAnchorBackward(n) {
      var range = this.setAnchor(this.anchor.moveBackward(n));
      return range;
    }

    /**
     * Move the anchor offset forward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveAnchorForward',
    value: function moveAnchorForward(n) {
      var range = this.setAnchor(this.anchor.moveForward(n));
      return range;
    }

    /**
     * Move the range's anchor point to a new `path` and `offset`.
     *
     * Optionally, the `path` can be a key string, or omitted entirely in which
     * case it would be the offset number.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @return {Range}
     */

  }, {
    key: 'moveAnchorTo',
    value: function moveAnchorTo(path, offset) {
      var range = this.setAnchor(this.anchor.moveTo(path, offset));
      return range;
    }

    /**
     * Move the range's anchor point to the start of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveAnchorToStartOfNode',
    value: function moveAnchorToStartOfNode(node) {
      var range = this.setAnchor(this.anchor.moveToStartOfNode(node));
      return range;
    }

    /**
     * Move the range's anchor point to the end of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveAnchorToEndOfNode',
    value: function moveAnchorToEndOfNode(node) {
      var range = this.setAnchor(this.anchor.moveToEndOfNode(node));
      return range;
    }

    /**
     * Move the end offset backward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveEndBackward',
    value: function moveEndBackward(n) {
      var range = this.setEnd(this.end.moveBackward(n));
      return range;
    }

    /**
     * Move the end offset forward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveEndForward',
    value: function moveEndForward(n) {
      var range = this.setEnd(this.end.moveForward(n));
      return range;
    }

    /**
     * Move the range's end point to a new `path` and `offset`.
     *
     * Optionally, the `path` can be a key string, or omitted entirely in which
     * case it would be the offset number.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @return {Range}
     */

  }, {
    key: 'moveEndTo',
    value: function moveEndTo(path, offset) {
      var range = this.setEnd(this.end.moveTo(path, offset));
      return range;
    }

    /**
     * Move the range's end point to the start of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveEndToStartOfNode',
    value: function moveEndToStartOfNode(node) {
      var range = this.setEnd(this.end.moveToStartOfNode(node));
      return range;
    }

    /**
     * Move the range's end point to the end of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveEndToEndOfNode',
    value: function moveEndToEndOfNode(node) {
      var range = this.setEnd(this.end.moveToEndOfNode(node));
      return range;
    }

    /**
     * Move the focus offset backward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveFocusBackward',
    value: function moveFocusBackward(n) {
      var range = this.setFocus(this.focus.moveBackward(n));
      return range;
    }

    /**
     * Move the focus offset forward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveFocusForward',
    value: function moveFocusForward(n) {
      var range = this.setFocus(this.focus.moveForward(n));
      return range;
    }

    /**
     * Move the range's focus point to a new `path` and `offset`.
     *
     * Optionally, the `path` can be a key string, or omitted entirely in which
     * case it would be the offset number.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @return {Range}
     */

  }, {
    key: 'moveFocusTo',
    value: function moveFocusTo(path, offset) {
      var range = this.setFocus(this.focus.moveTo(path, offset));
      return range;
    }

    /**
     * Move the range's focus point to the start of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveFocusToStartOfNode',
    value: function moveFocusToStartOfNode(node) {
      var range = this.setFocus(this.focus.moveToStartOfNode(node));
      return range;
    }

    /**
     * Move the range's focus point to the end of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveFocusToEndOfNode',
    value: function moveFocusToEndOfNode(node) {
      var range = this.setFocus(this.focus.moveToEndOfNode(node));
      return range;
    }

    /**
     * Move the start offset backward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveStartBackward',
    value: function moveStartBackward(n) {
      var range = this.setStart(this.start.moveBackward(n));
      return range;
    }

    /**
     * Move the start offset forward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveStartForward',
    value: function moveStartForward(n) {
      var range = this.setStart(this.start.moveForward(n));
      return range;
    }

    /**
     * Move the range's start point to a new `path` and `offset`.
     *
     * Optionally, the `path` can be a key string, or omitted entirely in which
     * case it would be the offset number.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @return {Range}
     */

  }, {
    key: 'moveStartTo',
    value: function moveStartTo(path, offset) {
      var range = this.setStart(this.start.moveTo(path, offset));
      return range;
    }

    /**
     * Move the range's start point to the start of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveStartToStartOfNode',
    value: function moveStartToStartOfNode(node) {
      var range = this.setStart(this.start.moveToStartOfNode(node));
      return range;
    }

    /**
     * Move the range's start point to the end of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveStartToEndOfNode',
    value: function moveStartToEndOfNode(node) {
      var range = this.setStart(this.start.moveToEndOfNode(node));
      return range;
    }

    /**
     * Move range's points to a new `path` and `offset`.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveTo',
    value: function moveTo(path, offset) {
      return this.updatePoints(function (point) {
        return point.moveTo(path, offset);
      });
    }

    /**
     * Move the focus point to the anchor point.
     *
     * @return {Range}
     */

  }, {
    key: 'moveToAnchor',
    value: function moveToAnchor() {
      var range = this.setFocus(this.anchor);
      return range;
    }

    /**
     * Move the start point to the end point.
     *
     * @return {Range}
     */

  }, {
    key: 'moveToEnd',
    value: function moveToEnd() {
      var range = this.setStart(this.end);
      return range;
    }

    /**
     * Move the range's points to the end of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveToEndOfNode',
    value: function moveToEndOfNode(node) {
      return this.updatePoints(function (point) {
        return point.moveToEndOfNode(node);
      });
    }

    /**
     * Move the anchor point to the focus point.
     *
     * @return {Range}
     */

  }, {
    key: 'moveToFocus',
    value: function moveToFocus() {
      var range = this.setAnchor(this.focus);
      return range;
    }

    /**
     * Move to the entire range of `start` and `end` nodes.
     *
     * @param {Node} start
     * @param {Node} end (optional)
     * @return {Range}
     */

  }, {
    key: 'moveToRangeOfNode',
    value: function moveToRangeOfNode(start) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : start;

      var range = this.setPoints([this.anchor.moveToStartOfNode(start), this.focus.moveToEndOfNode(end)]);

      return range;
    }

    /**
     * Move the end point to the start point.
     *
     * @return {Range}
     */

  }, {
    key: 'moveToStart',
    value: function moveToStart() {
      var range = this.setEnd(this.start);
      return range;
    }

    /**
     * Move the range's points to the start of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveToStartOfNode',
    value: function moveToStartOfNode(node) {
      return this.updatePoints(function (point) {
        return point.moveToStartOfNode(node);
      });
    }

    /**
     * Normalize the range, relative to a `node`, ensuring that the anchor
     * and focus nodes of the range always refer to leaf text nodes.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'normalize',
    value: function normalize(node) {
      return this.updatePoints(function (point) {
        return point.normalize(node);
      });
    }

    /**
     * Set the anchor point to a new `anchor`.
     *
     * @param {Point} anchor
     * @return {Range}
     */

  }, {
    key: 'setAnchor',
    value: function setAnchor(anchor) {
      var range = this.set('anchor', anchor);
      return range;
    }

    /**
     * Set the end point to a new `point`.
     *
     * @param {Point} point
     * @return {Range}
     */

  }, {
    key: 'setEnd',
    value: function setEnd(point) {
      var range = this.isBackward ? this.setAnchor(point) : this.setFocus(point);
      return range;
    }

    /**
     * Set the focus point to a new `focus`.
     *
     * @param {Point} focus
     * @return {Range}
     */

  }, {
    key: 'setFocus',
    value: function setFocus(focus) {
      var range = this.set('focus', focus);
      return range;
    }

    /**
     * Set the anchor and focus points to new `values`.
     *
     * @param {Array<Point>} values
     * @return {Range}
     */

  }, {
    key: 'setPoints',
    value: function setPoints(values) {
      var _values = slicedToArray(values, 2),
          anchor = _values[0],
          focus = _values[1];

      var range = this.set('anchor', anchor).set('focus', focus);
      return range;
    }

    /**
     * Set the anchor and focus points with `updater` callback
     *
     * @param {Function} updater
     * @return {Range}
     */

  }, {
    key: 'updatePoints',
    value: function updatePoints(updater) {
      var anchor = this.anchor,
          focus = this.focus;

      anchor = updater(anchor);
      focus = updater(focus);
      return this.merge({ anchor: anchor, focus: focus });
    }

    /**
     * Set the start point to a new `point`.
     *
     * @param {Point} point
     * @return {Range}
     */

  }, {
    key: 'setStart',
    value: function setStart(point) {
      var range = this.isBackward ? this.setFocus(point) : this.setAnchor(point);
      return range;
    }

    /**
     * Set new `properties` on the range.
     *
     * @param {Object|Range} properties
     * @return {Range}
     */

  }, {
    key: 'setProperties',
    value: function setProperties(properties) {
      properties = Range.createProperties(properties);
      var _properties = properties,
          anchor = _properties.anchor,
          focus = _properties.focus,
          props = objectWithoutProperties(_properties, ['anchor', 'focus']);


      if (anchor) {
        props.anchor = Point.create(anchor);
      }

      if (focus) {
        props.focus = Point.create(focus);
      }

      var range = this.merge(props);
      return range;
    }

    /**
     * Return a JSON representation of the range.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        anchor: this.anchor.toJSON(options),
        focus: this.focus.toJSON(options)
      };

      return object;
    }

    /**
     * Return a `Range` instance from any range-like instance.
     *
     * @return {Range}
     */

  }, {
    key: 'toRange',
    value: function toRange() {
      var properties = Range.createProperties(this);
      var range = Range.create(properties);
      return range;
    }

    /**
     * Unset the range.
     *
     * @return {Range}
     */

  }, {
    key: 'unset',
    value: function unset() {
      var range = this.updatePoints(function (p) {
        return p.unset();
      });
      return range;
    }
  }, {
    key: 'isCollapsed',

    /**
     * Check whether the range is collapsed.
     *
     * @return {Boolean}
     */

    get: function get$$1() {
      return this.anchor === this.focus || this.anchor.key === this.focus.key && this.anchor.offset === this.focus.offset;
    }

    /**
     * Check whether the range is expanded.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isExpanded',
    get: function get$$1() {
      return !this.isCollapsed;
    }

    /**
     * Check whether the range is backward.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isBackward',
    get: function get$$1() {
      var isUnset = this.isUnset,
          anchor = this.anchor,
          focus = this.focus;


      if (isUnset) {
        return null;
      }

      if (anchor.key === focus.key) {
        return anchor.offset > focus.offset;
      }

      var isBackward = PathUtils.isBefore(focus.path, anchor.path);
      return isBackward;
    }

    /**
     * Check whether the range is forward.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isForward',
    get: function get$$1() {
      var isBackward = this.isBackward;

      var isForward = isBackward == null ? null : !isBackward;
      return isForward;
    }

    /**
     * Check whether the range isn't set.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isUnset',
    get: function get$$1() {
      var anchor = this.anchor,
          focus = this.focus;

      var isUnset = anchor.isUnset || focus.isUnset;
      return isUnset;
    }

    /**
     * Check whether the range is set.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isSet',
    get: function get$$1() {
      return !this.isUnset;
    }

    /**
     * Get the start point.
     *
     * @return {String}
     */

  }, {
    key: 'start',
    get: function get$$1() {
      return this.isBackward ? this.focus : this.anchor;
    }

    /**
     * Get the end point.
     *
     * @return {String}
     */

  }, {
    key: 'end',
    get: function get$$1() {
      return this.isBackward ? this.anchor : this.focus;
    }
  }]);
  return RangeInterface;
}();

/**
 * Mix in the range interface.
 *
 * @param {Record}
 */

mixin(RangeInterface, [Decoration, Range, Selection]);

/**
 * Export.
 *
 * @type {Object}
 */

var Operations = {
  apply: applyOperation,
  invert: invertOperation
};

var index = {
  Block: Block,
  Changes: Changes$6,
  Data: Data,
  Decoration: Decoration,
  Document: Document,
  History: History,
  Inline: Inline,
  KeyUtils: KeyUtils,
  Leaf: Leaf,
  Mark: Mark,
  Node: Node,
  Operation: Operation,
  Operations: Operations,
  PathUtils: PathUtils,
  Point: Point,
  Range: Range,
  resetMemoization: resetMemoization,
  Schema: Schema,
  Selection: Selection,
  Stack: Stack,
  Text: Text,
  TextUtils: TextUtils,
  useMemoization: useMemoization,
  Value: Value
};

exports.Block = Block;
exports.Change = Change;
exports.Changes = Changes$6;
exports.Data = Data;
exports.Decoration = Decoration;
exports.Document = Document;
exports.History = History;
exports.Inline = Inline;
exports.KeyUtils = KeyUtils;
exports.Leaf = Leaf;
exports.Mark = Mark;
exports.Node = Node;
exports.Operation = Operation;
exports.Operations = Operations;
exports.PathUtils = PathUtils;
exports.Point = Point;
exports.Range = Range;
exports.resetMemoization = resetMemoization;
exports.Schema = Schema;
exports.Selection = Selection;
exports.Stack = Stack;
exports.Text = Text;
exports.TextUtils = TextUtils;
exports.useMemoization = useMemoization;
exports.Value = Value;
exports.default = index;
//# sourceMappingURL=slate.js.map
