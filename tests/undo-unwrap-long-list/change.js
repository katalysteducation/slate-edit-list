import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');

    let initialText;
    let initialSelection;

    // eslint-disable-next-line no-shadow
    change.withoutSaving(change => {
        change.moveToRangeOfNode(selectedBlock);
        initialText = change.value.startBlock.text;
        initialSelection = change.value.selection;
    });

    change.unwrapList().undo();

    // Back to previous cursor position
    expect(change.value.startBlock.text).toEqual(initialText);
    expect(change.value.selection.toJS()).toEqual(initialSelection.toJS());

    return change;
}
