"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * User pressed Delete in an editor
 */
function onBackspace(event, change, next, opts) {
  var value = change.value;
  var selection = value.selection; // Only unwrap...
  // ... with a collapsed selection

  if (selection.isExpanded) {
    return next();
  } // ... when at the beginning of nodes


  if (selection.start.offset > 0) {
    return next();
  } // ... in a list


  var currentItem = change.getCurrentItem(change.value);

  if (!currentItem) {
    return next();
  } // ... more precisely at the beginning of the current item


  if (!(selection.isCollapsed && selection.anchor.isAtStartOfNode(currentItem))) {
    return next();
  }

  event.preventDefault();
  return change.unwrapList(change) || next();
}

var _default = onBackspace;
exports.default = _default;