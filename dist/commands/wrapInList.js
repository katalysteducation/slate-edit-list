"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slate = require("slate");

var _immutable = require("immutable");

var _utils = require("../utils");

/**
 * Wrap the blocks in the current selection in a new list. Selected
 * lists are merged together.
 */
function wrapInList(opts, change, type, data) {
  var selectedBlocks = getHighestSelectedBlocks(change.value);
  type = type || opts.types[0]; // eslint-disable-next-line no-shadow

  change.withoutNormalizing(function (change) {
    // Wrap in container
    change.wrapBlock({
      type: type,
      data: _slate.Data.create(data)
    }); // Wrap in list items

    selectedBlocks.forEach(function (node) {
      if ((0, _utils.isList)(opts, node)) {
        // Merge its items with the created list
        node.nodes.forEach(function (_ref) {
          var key = _ref.key;
          return change.unwrapNodeByKey(key);
        });
      } else {
        change.wrapBlockByKey(node.key, opts.typeItem);
      }
    });
  });
  return change.normalize();
}
/**
 * Returns the highest list of blocks that cover the current selection
 */


function getHighestSelectedBlocks(value) {
  var range = value.selection;
  var document = value.document;
  var startBlock = document.getClosestBlock(range.start.key);
  var endBlock = document.getClosestBlock(range.end.key);

  if (startBlock === endBlock) {
    return (0, _immutable.List)([startBlock]);
  }

  var ancestor = document.getCommonAncestor(startBlock.key, endBlock.key);
  var startPath = ancestor.getPath(startBlock.key);
  var endPath = ancestor.getPath(endBlock.key);
  return ancestor.nodes.slice(startPath.first(), endPath.first() + 1);
}

var _default = wrapInList;
exports.default = _default;