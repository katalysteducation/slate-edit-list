"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slate = require("slate");

var _utils = require("../utils");

/**
 * Increase the depth of the current item by putting it in a sub-list
 * of previous item.
 * For first items in a list, does nothing.
 */
function increaseItemDepth(opts, change) {
  var previousItem = change.getPreviousItem(change.value);
  var currentItem = change.getCurrentItem(change.value);

  if (!previousItem) {
    return false;
  }

  if (!currentItem) {
    return false;
  } // Move the item in the sublist of previous item


  return moveAsSubItem(opts, change, currentItem, previousItem.key);
}
/**
 * Move the given item to the sublist at the end of destination item,
 * creating a sublist if needed.
 */


function moveAsSubItem(opts, change, // The list item to add
item, // The key of the destination node
destKey) {
  var destination = change.value.document.getDescendant(destKey);
  var lastIndex = destination.nodes.size;
  var lastChild = destination.nodes.last(); // The potential existing last child list

  var existingList = (0, _utils.isList)(opts, lastChild) ? lastChild : null;

  if (existingList) {
    return change.moveNodeByKey(item.key, existingList.key, existingList.nodes.size // as last item
    );
  }

  var currentList = change.getListForItem(change.value, destination);

  if (!currentList) {
    throw new Error('Destination is not in a list');
  }

  var newSublist = _slate.Block.create({
    object: 'block',
    type: currentList.type,
    data: currentList.data
  }); // eslint-disable-next-line no-shadow


  return change.withoutNormalizing(function (change) {
    change.insertNodeByKey(destKey, lastIndex, newSublist);
    change.moveNodeByKey(item.key, newSublist.key, 0);
  });
}

var _default = increaseItemDepth;
exports.default = _default;