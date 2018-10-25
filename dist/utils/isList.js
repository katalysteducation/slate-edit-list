"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * True if the node is a list container
 */
function isList(opts, node) {
  return opts.types.includes(node.type);
}

var _default = isList;
exports.default = _default;