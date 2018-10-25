// @flow
import { type Change } from 'slate';

import type Options from '../options';

/**
 * User pressed Delete in an editor
 */
function onBackspace(
    event: *,
    change: Change,
    next: any => any,
    opts: Options
): void | any {
    const { value } = change;
    const { selection } = value;

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
    const currentItem = change.getCurrentItem(change.value);
    if (!currentItem) {
        return next();
    }
    // ... more precisely at the beginning of the current item
    if (
        !(
            selection.isCollapsed &&
            selection.anchor.isAtStartOfNode(currentItem)
        )
    ) {
        return next();
    }

    event.preventDefault();
    return change.unwrapList(change) || next();
}

export default onBackspace;
