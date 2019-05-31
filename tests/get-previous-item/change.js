import expect from 'expect';

export default function(plugin, change) {
    const previousItem = change.getPreviousItem(change.value);
    expect(previousItem.key).toBe('previous_item');
}
