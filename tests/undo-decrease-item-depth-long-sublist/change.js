import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');

    // eslint-disable-next-line no-shadow
    change.withoutSaving(change => {
        change.moveToRangeOfNode(selectedBlock);
    });

    change.call(plugin.changes.decreaseItemDepth).undo();

    // Back to previous cursor position
    expect(change.value.startBlock.text).toEqual('Item 1.1');

    return change;
}
