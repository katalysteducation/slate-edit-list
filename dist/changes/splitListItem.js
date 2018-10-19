'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

/**
 * Split a list item at the start of the current range.
 */
function splitListItem(opts, change) {
    var value = change.value;

    var currentItem = (0, _utils.getCurrentItem)(opts, value);
    if (!currentItem) {
        return false;
    }

    var splitOffset = value.selection.start.offset;

    return change.splitDescendantsByKey(currentItem.key, value.selection.start.key, splitOffset);
}

exports.default = splitListItem;