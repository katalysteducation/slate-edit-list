"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _options = _interopRequireDefault(require("./options"));

var _handlers = require("./handlers");

var _core = _interopRequireDefault(require("./core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEY_ENTER = 'Enter';
var KEY_TAB = 'Tab';
var KEY_BACKSPACE = 'Backspace';
/**
 * A Slate plugin to handle keyboard events in lists.
 */

function EditList() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  opts = new _options.default(opts);
  var corePlugin = (0, _core.default)(opts);
  return _objectSpread({}, corePlugin, {
    onKeyDown: onKeyDown.bind(null, opts)
  });
}
/**
 * User is pressing a key in the editor
 */


function onKeyDown(opts, event, change, next) {
  var args = [event, change, next, opts];

  switch (event.key) {
    case KEY_ENTER:
      return _handlers.onEnter.apply(void 0, args);

    case KEY_TAB:
      return _handlers.onTab.apply(void 0, args);

    case KEY_BACKSPACE:
      return _handlers.onBackspace.apply(void 0, args);

    default:
      return next();
  }
}

var _default = EditList;
exports.default = _default;