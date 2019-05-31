import expect from 'expect';

export default function(plugin, change) {
    change.decreaseItemDepth().undo();

    // Back to previous cursor position
    expect(change.value.startBlock.text).toEqual('Item 1.1');

    return change;
}
