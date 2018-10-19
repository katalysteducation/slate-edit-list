'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _changes = require('../changes');

var _utils = require('../utils');

/**
 * User pressed Delete in an editor
 */
function onBackspace(event, change, next, opts) {
    var value = change.value;
    var selection = value.selection;

    // Only unwrap...
    // ... with a collapsed selection

    if (selection.isExpanded) {
        return next();
    }

    // ... when at the beginning of nodes
    if (selection.start.offset > 0) {
        return next();
    }
    // ... in a list
    var currentItem = (0, _utils.getCurrentItem)(opts, value);
    if (!currentItem) {
        return next();
    }
    // ... more precisely at the beginning of the current item
    if (!(selection.isCollapsed && selection.anchor.isAtStartOfNode(currentItem))) {
        return next();
    }

    event.preventDefault();
    return (0, _changes.unwrapList)(opts, change) || next();
}
exports.default = onBackspace;