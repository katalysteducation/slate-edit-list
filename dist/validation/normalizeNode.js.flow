// @flow
import { type Change, type Editor, type Node } from 'slate';

import { isList } from '../utils';
import type Options from '../options';

type Normalizer = Change => any;

/**
 * Create a schema definition with rules to normalize lists
 */
function normalizeNode(opts: Options): (Node, () => Normalizer) => Normalizer {
    return (node, editor, next) => joinAdjacentLists(opts, node, editor, next);
}

/**
 * A rule that joins adjacent lists of the same type
 */
function joinAdjacentLists(
    opts: Options,
    node: Node,
    editor: Editor,
    next: () => Normalizer
): Normalizer {
    if (node.object !== 'document' && node.object !== 'block') {
        return next();
    }

    const invalids = node.nodes
        .map((child, i) => {
            if (!isList(opts, child)) return null;
            const nextNode = node.nodes.get(i + 1);
            if (
                !nextNode ||
                !isList(opts, nextNode) ||
                !opts.canMerge(child, nextNode)
            ) {
                return null;
            }

            return [child, nextNode];
        })
        .filter(Boolean);

    if (invalids.isEmpty()) {
        return next();
    }

    /**
     * Join the list pairs
     */
    // We join in reverse order, so that multiple lists folds onto the first one
    return change => {
        invalids.reverse().forEach(pair => {
            const [first, second] = pair;
            const updatedSecond = change.value.document.getDescendant(
                second.key
            );

            // eslint-disable-next-line no-shadow
            change.withoutNormalizing(change => {
                updatedSecond.nodes.forEach((secondNode, index) => {
                    change.moveNodeByKey(
                        secondNode.key,
                        first.key,
                        first.nodes.size + index
                    );
                });

                change.removeNodeByKey(second.key);
            });
        });
    };
}

export default normalizeNode;
