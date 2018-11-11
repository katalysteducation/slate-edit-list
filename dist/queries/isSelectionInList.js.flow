// @flow
import { type Editor, type Value } from 'slate';

import type Options from '../options';

/**
 * True if selection is inside a list (and can be unwrapped)
 */
function isSelectionInList(
    opts: Options,
    editor: Editor,
    value: Value
): boolean {
    return !editor.query('getItemsAtRange', value).isEmpty();
}

export default isSelectionInList;
