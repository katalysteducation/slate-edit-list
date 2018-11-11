// @flow
import type { Node } from 'slate';
import { Record } from 'immutable';

export type OptionsFormat = {
    types?: string[],
    typeItem?: string,
    typeDefault?: string,
    canMerge?: (listA: Node, listB: Node) => boolean
};

/**
 * The plugin options
 */
class Options extends Record({
    types: ['ul_list', 'ol_list'],
    typeItem: 'list_item',
    typeDefault: 'paragraph',
    canMerge: (a: Node, b: Node) => a.type === b.type
}) {
    /* XXX: type annotations here must be in comments, as otherwise in Babel 7
     * they will be transformed into _defineProperty(this, name, void 0), which
     * will always overwrite any value passed to the constructor.
     */
    // The possibles types for list containers
    /*:: types: string[]; */
    // The type of list items
    /*:: typeItem: string; */
    // The type of default block in items
    /*:: typeDefault: string; */
    // You can control here the automatic merging of adjacent lists
    /*:: canMerge: (listA: Node, listB: Node) => boolean; */
}

export default Options;
