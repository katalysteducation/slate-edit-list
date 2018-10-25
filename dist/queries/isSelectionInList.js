"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * True if selection is inside a list (and can be unwrapped)
 */
function isSelectionInList(opts, editor, value) {
  return !editor.query('getItemsAtRange', value).isEmpty();
}

var _default = isSelectionInList;
exports.default = _default;