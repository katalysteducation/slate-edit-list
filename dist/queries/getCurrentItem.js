"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Return the current list item, from current selection or from a node.
 */
function getCurrentItem(opts, editor, value, block) {
  var document = value.document;

  if (!block) {
    if (!value.selection.start.key) return null;
    block = value.startBlock;
  }

  var parent = document.getParent(block.key);
  return parent && parent.type === opts.typeItem ? parent : null;
}

var _default = getCurrentItem;
exports.default = _default;