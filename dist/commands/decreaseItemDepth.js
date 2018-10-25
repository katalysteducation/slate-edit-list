"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slate = require("slate");

/**
 * Decreases the depth of the current item. The following items will
 * be moved as sublist of the decreased item.
 *
 * No-op for root items.
 */
function decreaseItemDepth(opts, change) {
  var value = change.value;
  var document = value.document; // Cannot decrease item depth of root items

  var depth = change.getItemDepth(change.value);

  if (depth == 1) {
    return false;
  }

  var currentItem = change.getCurrentItem(change.value);

  if (!currentItem) {
    return false;
  }

  var currentList = document.getParent(currentItem.key);
  var parentItem = document.getParent(currentList.key);
  var parentList = document.getParent(parentItem.key); // The items following the item will be moved to a sublist of currentItem

  var followingItems = currentList.nodes.skipUntil(function (i) {
    return i === currentItem;
  }).rest(); // True if the currentItem and the followingItems make the whole
  // currentList, and hence the currentList will be emptied

  var willEmptyCurrentList = currentList.nodes.size === followingItems.size + 1;

  if (!followingItems.isEmpty()) {
    // Add them as sublist of currentItem
    var sublist = _slate.Block.create({
      object: 'block',
      type: currentList.type,
      data: currentList.data
    }); // eslint-disable-next-line no-shadow


    change.withoutNormalizing(function (change) {
      // Add the sublist
      change.insertNodeByKey(currentItem.key, currentItem.nodes.size, sublist);
      change.moveNodeByKey(currentItem.key, parentList.key, parentList.nodes.indexOf(parentItem) + 1); // Move the followingItems to the sublist

      followingItems.forEach(function (item, index) {
        return change.moveNodeByKey(item.key, sublist.key, sublist.nodes.size + index);
      });
    });
  } else {
    change.moveNodeByKey(currentItem.key, parentList.key, parentList.nodes.indexOf(parentItem) + 1);
  } // Remove the currentList completely if needed


  if (willEmptyCurrentList) {
    change.removeNodeByKey(currentList.key);
  }

  return true;
}

var _default = decreaseItemDepth;
exports.default = _default;