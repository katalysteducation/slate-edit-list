// @flow
import { type Change } from 'slate';

import type Options from '../options';

/**
 * User pressed Tab in an editor.
 * Tab       -> Increase item depth if inside a list item
 * Shift+Tab -> Decrease item depth if inside a list item
 */
function onTab(event: *, change: Change, next: *, opts: Options): void | any {
    const { value } = change;
    const { selection } = value;

    if (!selection.isCollapsed || !change.getCurrentItem(change.value)) {
        return next();
    }

    // Shift+tab reduce depth
    if (event.shiftKey) {
        event.preventDefault();

        return change.decreaseItemDepth(change) || next();
    }

    // Tab increases depth
    event.preventDefault();

    return change.increaseItemDepth(change) || next();
}

export default onTab;
