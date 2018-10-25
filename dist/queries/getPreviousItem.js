"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Return the previous item, from current selection or from a node.
 */
function getPreviousItem(opts, editor, value, block) {
  var document = value.document,
      startBlock = value.startBlock;
  block = block || startBlock;
  var currentItem = editor.query('getCurrentItem', value, block);

  if (!currentItem) {
    return null;
  }

  var previousSibling = document.getPreviousSibling(currentItem.key);

  if (!previousSibling) {
    return null;
  } else if (previousSibling.type === opts.typeItem) {
    return previousSibling;
  }

  return null;
}

var _default = getPreviousItem;
exports.default = _default;