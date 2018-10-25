"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Return the parent list block, from current selection or from a node (paragraph in a list item).
 */
function getCurrentList(opts, editor, value, block) {
  var item = editor.query('getCurrentItem', value, block);

  if (!item) {
    return null;
  }

  return editor.query('getListForItem', value, item);
}

var _default = getCurrentList;
exports.default = _default;