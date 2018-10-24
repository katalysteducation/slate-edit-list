// const expect = require('expect');

export default function(plugin, change) {
    const { value } = change;
    const { selection } = value;

    const range = selection
        .moveAnchorTo('_selection_key', 2)
        .moveFocusTo('_selection_key', 2);

    change
        .select(range)
        .splitListItem()
        .undo();

    // TODO fix undo, and test selection
    // Back to previous cursor position
    // expect(value.startBlock.text).toEqual(initialText);
    // expect(value.selection.toJS()).toEqual(initialSelection.toJS());

    return change;
}
