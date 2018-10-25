"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _options = _interopRequireDefault(require("./options"));

var _validation = require("./validation");

var _commands = require("./commands");

var _queries = require("./queries");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Returns the core of the plugin, limited to the validation and normalization
 * part of `slate-edit-list`, and utils.
 *
 * Import this directly: `import EditListCore from 'slate-edit-table/lib/core'`
 * if you don't care about behavior/rendering and you
 * are only manipulating `Slate.Values` without rendering them.
 * That way you do not depend on importing `slate-react`.
 */
function core() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  opts = new _options.default(opts);
  return {
    schema: (0, _validation.schema)(opts),
    normalizeNode: (0, _validation.normalizeNode)(opts),
    utils: {
      isList: _utils.isList.bind(null, opts)
    },
    queries: {
      getCurrentItem: _queries.getCurrentItem.bind(null, opts),
      getCurrentList: _queries.getCurrentList.bind(null, opts),
      getItemDepth: _queries.getItemDepth.bind(null, opts),
      getItemsAtRange: _queries.getItemsAtRange.bind(null, opts),
      getListForItem: _queries.getListForItem.bind(null, opts),
      getPreviousItem: _queries.getPreviousItem.bind(null, opts),
      isSelectionInList: _queries.isSelectionInList.bind(null, opts)
    },
    commands: {
      decreaseItemDepth: bindAndScopeChange(opts, _commands.decreaseItemDepth),
      increaseItemDepth: bindAndScopeChange(opts, _commands.increaseItemDepth),
      splitListItem: bindAndScopeChange(opts, _commands.splitListItem),
      unwrapList: bindAndScopeChange(opts, _commands.unwrapList),
      wrapInList: _commands.wrapInList.bind(null, opts)
    }
  };
}
/**
 * Bind a change to given options, and scope it to act only inside a list
 */


function bindAndScopeChange(opts, fn) {
  return function (change) {
    var value = change.value;

    if (!change.isSelectionInList(value)) {
      return change;
    } // $FlowFixMe


    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return fn.apply(void 0, _toConsumableArray([opts, change].concat(args)));
  };
}

var _default = core;
exports.default = _default;