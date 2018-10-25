"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

/**
 * Return the parent list block for an item block.
 */
function getListForItem(opts, editor, value, item) {
  var document = value.document;
  var parent = document.getParent(item.key);
  return parent && (0, _utils.isList)(opts, parent) ? parent : null;
}

var _default = getListForItem;
exports.default = _default;