// @flow
import { type Change } from 'slate';

import type Options from '../options';

/**
 * Split a list item at the start of the current range.
 */
function splitListItem(opts: Options, change: Change): Change {
    const { value } = change;
    const currentItem = change.getCurrentItem(change.value);
    if (!currentItem) {
        return false;
    }

    const splitOffset = value.selection.start.offset;

    return change.splitDescendantsByKey(
        currentItem.key,
        value.selection.start.key,
        splitOffset
    );
}

export default splitListItem;
