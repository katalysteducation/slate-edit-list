"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutable = require("immutable");

var _utils = require("../utils");

/**
 * Return the list of items at the given range. The returned items are
 * the highest list item blocks that cover the range.
 *
 * Returns an empty list if no list of items can cover the range
 */
function getItemsAtRange(opts, editor, value, range) {
  range = range || value.selection;

  if (!range.start.key) {
    return (0, _immutable.List)();
  }

  var document = value.document;
  var startBlock = document.getClosestBlock(range.start.key);
  var endBlock = document.getClosestBlock(range.end.key);

  if (startBlock === endBlock) {
    var item = editor.query('getCurrentItem', value, startBlock);
    return item ? (0, _immutable.List)([item]) : (0, _immutable.List)();
  }

  var ancestor = document.getCommonAncestor(startBlock.key, endBlock.key);

  if ((0, _utils.isList)(opts, ancestor)) {
    var startPath = ancestor.getPath(startBlock.key);
    var endPath = ancestor.getPath(endBlock.key);
    return ancestor.nodes.slice(startPath.first(), endPath.first() + 1);
  } else if (ancestor.type === opts.typeItem) {
    // The ancestor is the highest list item that covers the range
    return (0, _immutable.List)([ancestor]);
  } // No list of items can cover the range


  return (0, _immutable.List)();
}

var _default = getItemsAtRange;
exports.default = _default;