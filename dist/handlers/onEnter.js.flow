// @flow
import { type Change, Text } from 'slate';

import type Options from '../options';

/**
 * User pressed Enter in an editor
 *
 * Enter in a list item should split the list item
 * Enter in an empty list item should remove it
 * Shift+Enter in a list item should make a new line
 */
function onEnter(event: *, change: Change, next: *, opts: Options): void | any {
    // Pressing Shift+Enter
    // should split block normally
    if (event.shiftKey) {
        return next();
    }

    const { value } = change;
    const currentItem = change.getCurrentItem(change.value);

    // Not in a list
    if (!currentItem) {
        return next();
    }

    event.preventDefault();

    // If expanded, delete first.
    if (value.selection.isExpanded) {
        change.delete();
    }

    const isEmpty =
        currentItem.findDescendant(n => Text.isText(n) && n.text.length > 0) ==
        null;

    if (isEmpty) {
        // Block is empty, we exit the list
        if (change.getItemDepth(change.value) > 1) {
            return change.decreaseItemDepth(change) || next();
        }
        // Exit list
        return change.unwrapList(change) || next();
    }
    // Split list item
    return change.splitListItem(change) || next();
}

export default onEnter;
