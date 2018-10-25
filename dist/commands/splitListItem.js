"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Split a list item at the start of the current range.
 */
function splitListItem(opts, change) {
  var value = change.value;
  var currentItem = change.getCurrentItem(change.value);

  if (!currentItem) {
    return false;
  }

  var splitOffset = value.selection.start.offset;
  return change.splitDescendantsByKey(currentItem.key, value.selection.start.key, splitOffset);
}

var _default = splitListItem;
exports.default = _default;