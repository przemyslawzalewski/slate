'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isHotkey = require('is-hotkey');
var slateDevEnvironment = require('slate-dev-environment');

/**
 * Hotkey mappings for each platform.
 *
 * @type {Object}
 */

var HOTKEYS = {
  bold: 'mod+b',
  compose: ['down', 'left', 'right', 'up', 'backspace', 'enter'],
  moveBackward: 'mod?+ctrl?+alt?+left',
  moveForward: 'mod?+ctrl?+alt?+right',
  deleteBackward: 'shift?+backspace',
  deleteForward: 'shift?+delete',
  extendBackward: 'shift+left',
  extendForward: 'shift+right',
  italic: 'mod+i',
  splitBlock: 'shift?+enter',
  undo: 'mod+z'
};

var APPLE_HOTKEYS = {
  moveLineBackward: 'opt+up',
  moveLineForward: 'opt+down',
  deleteBackward: ['ctrl+backspace', 'ctrl+h'],
  deleteForward: ['ctrl+delete', 'ctrl+d'],
  deleteLineBackward: 'cmd+shift?+backspace',
  deleteLineForward: ['cmd+shift?+delete', 'ctrl+k'],
  deleteWordBackward: 'opt+shift?+backspace',
  deleteWordForward: 'opt+shift?+delete',
  extendLineBackward: 'opt+shift+up',
  extendLineForward: 'opt+shift+down',
  redo: 'cmd+shift+z',
  transposeCharacter: 'ctrl+t'
};

var WINDOWS_HOTKEYS = {
  deleteWordBackward: 'ctrl+shift?+backspace',
  deleteWordForward: 'ctrl+shift?+delete',
  redo: 'ctrl+y'

  /**
   * Hotkeys.
   *
   * @type {Object}
   */

};var Hotkeys = {};

var IS_APPLE = slateDevEnvironment.IS_IOS || slateDevEnvironment.IS_MAC;
var IS_WINDOWS = !IS_APPLE;
var KEYS = [].concat(Object.keys(HOTKEYS)).concat(Object.keys(APPLE_HOTKEYS)).concat(Object.keys(WINDOWS_HOTKEYS));

KEYS.forEach(function (key) {
  var method = 'is' + key[0].toUpperCase() + key.slice(1);
  if (Hotkeys[method]) return;

  var generic = HOTKEYS[key];
  var apple = APPLE_HOTKEYS[key];
  var windows = WINDOWS_HOTKEYS[key];

  var isGeneric = generic && isHotkey.isKeyHotkey(generic);
  var isApple = apple && isHotkey.isKeyHotkey(apple);
  var isWindows = windows && isHotkey.isKeyHotkey(windows);

  Hotkeys[method] = function (event) {
    if (isGeneric && isGeneric(event)) return true;
    if (IS_APPLE && isApple && isApple(event)) return true;
    if (IS_WINDOWS && isWindows && isWindows(event)) return true;
    return false;
  };
});

exports.default = Hotkeys;
//# sourceMappingURL=slate-hotkeys.js.map
