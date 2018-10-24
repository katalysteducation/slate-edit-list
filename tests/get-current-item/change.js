import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('cursor');

    change.moveToRangeOfNode(selectedBlock);

    const currentItem = change.getCurrentItem(change.value);
    expect(currentItem.key).toBe('current_item');
}
