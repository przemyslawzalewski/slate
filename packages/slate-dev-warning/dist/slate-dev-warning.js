(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.SlateDevWarning = {})));
}(this, (function (exports) { 'use strict';

/**
 * A `warning` helper, modeled after Facebook's and the `tiny-invariant` library.
 *
 * @param {Mixed} condition
 * @param {String} message
 */

function warning(condition) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (condition) return;

  var isProduction = "development" === 'production';
  var log = console.warn || console.log; // eslint-disable-line no-console

  if (isProduction) {
    log('Warning');
  } else {
    log('Warning: ' + message);
  }
}

exports.default = warning;

Object.defineProperty(exports, '__esModule', { value: true });

})));
