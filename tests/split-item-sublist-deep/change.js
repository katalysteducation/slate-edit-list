import expect from 'expect';

export default function(plugin, change) {
    change.splitListItem();

    expect(change.value.selection.toJS()).toEqual({
        anchor: {
            object: 'point',
            path: [0, 0, 1, 1, 0, 0],
            offset: 0
        },
        focus: {
            object: 'point',
            path: [0, 0, 1, 1, 0, 0],
            offset: 0
        },
        isFocused: true,
        marks: null,
        object: 'selection'
    });

    return change;
}
