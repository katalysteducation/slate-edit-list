// @flow
import { type Editor, type Value, type Block } from 'slate';

import type Options from '../options';

/**
 * Get depth of current block in a document list
 */
function getItemDepth(
    opts: Options,
    editor: Editor,
    value: Value,
    block?: Block
): number {
    const { document, startBlock } = value;
    block = block || startBlock;

    const currentItem = editor.query('getCurrentItem', value, block);
    if (!currentItem) {
        return 0;
    }

    const list = document.getParent(currentItem.key);

    return 1 + getItemDepth(opts, editor, value, list);
}

export default getItemDepth;
