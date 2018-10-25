"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slate = require("slate");

/**
 * User pressed Enter in an editor
 *
 * Enter in a list item should split the list item
 * Enter in an empty list item should remove it
 * Shift+Enter in a list item should make a new line
 */
function onEnter(event, change, next, opts) {
  // Pressing Shift+Enter
  // should split block normally
  if (event.shiftKey) {
    return next();
  }

  var value = change.value;
  var currentItem = change.getCurrentItem(change.value); // Not in a list

  if (!currentItem) {
    return next();
  }

  event.preventDefault(); // If expanded, delete first.

  if (value.selection.isExpanded) {
    change.delete();
  }

  var isEmpty = currentItem.findDescendant(function (n) {
    return _slate.Text.isText(n) && n.text.length > 0;
  }) == null;

  if (isEmpty) {
    // Block is empty, we exit the list
    if (change.getItemDepth(change.value) > 1) {
      return change.decreaseItemDepth(change) || next();
    } // Exit list


    return change.unwrapList(change) || next();
  } // Split list item


  return change.splitListItem(change) || next();
}

var _default = onEnter;
exports.default = _default;