"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Get depth of current block in a document list
 */
function getItemDepth(opts, editor, value, block) {
  var document = value.document,
      startBlock = value.startBlock;
  block = block || startBlock;
  var currentItem = editor.query('getCurrentItem', value, block);

  if (!currentItem) {
    return 0;
  }

  var list = document.getParent(currentItem.key);
  return 1 + getItemDepth(opts, editor, value, list);
}

var _default = getItemDepth;
exports.default = _default;