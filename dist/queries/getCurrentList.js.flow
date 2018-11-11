// @flow
import { type Editor, type Value, type Block } from 'slate';

import type Options from '../options';

/**
 * Return the parent list block, from current selection or from a node (paragraph in a list item).
 */
function getCurrentList(
    opts: Options,
    editor: Editor,
    value: Value,
    block?: Block
): ?Block {
    const item = editor.query('getCurrentItem', value, block);

    if (!item) {
        return null;
    }

    return editor.query('getListForItem', value, item);
}

export default getCurrentList;
