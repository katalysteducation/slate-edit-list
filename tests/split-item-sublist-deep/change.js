import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');

    change.collapseToStartOf(selectedBlock).move(2); // It|em 1

    plugin.changes.splitListItem(change);

    expect(change.value.selection.toJS()).toEqual({
        anchorPath: [0, 0, 1, 1, 0, 0],
        anchorOffset: 0,
        focusPath: [0, 0, 1, 1, 0, 0],
        focusOffset: 0,
        isAtomic: false,
        isBackward: false,
        isFocused: false,
        marks: null,
        object: 'range'
    });

    return change;
}
