'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

var _changes = require('../changes');

var _utils = require('../utils');

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

    var currentItem = (0, _utils.getCurrentItem)(opts, value);

    // Not in a list
    if (!currentItem) {
        return next();
    }

    event.preventDefault();

    // If expanded, delete first.
    if (value.selection.isExpanded) {
        change.delete();
    }

    var isEmpty = currentItem.findDescendant(function (n) {
        return _slate.Text.isText(n) && n.text.length > 0;
    }) == null;

    if (isEmpty) {
        // Block is empty, we exit the list
        if ((0, _utils.getItemDepth)(opts, value) > 1) {
            return (0, _changes.decreaseItemDepth)(opts, change) || next();
        }
        // Exit list
        return (0, _changes.unwrapList)(opts, change) || next();
    }
    // Split list item
    return (0, _changes.splitListItem)(opts, change) || next();
}
exports.default = onEnter;