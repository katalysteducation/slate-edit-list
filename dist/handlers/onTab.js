"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * User pressed Tab in an editor.
 * Tab       -> Increase item depth if inside a list item
 * Shift+Tab -> Decrease item depth if inside a list item
 */
function onTab(event, change, next, opts) {
  var value = change.value;
  var selection = value.selection;

  if (!selection.isCollapsed || !change.getCurrentItem(change.value)) {
    return next();
  } // Shift+tab reduce depth


  if (event.shiftKey) {
    event.preventDefault();
    return change.decreaseItemDepth(change) || next();
  } // Tab increases depth


  event.preventDefault();
  return change.increaseItemDepth(change) || next();
}

var _default = onTab;
exports.default = _default;