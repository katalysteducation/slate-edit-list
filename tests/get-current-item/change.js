import expect from 'expect';

export default function(plugin, change) {
    const currentItem = change.getCurrentItem(change.value);
    expect(currentItem.key).toBe('current_item');
}
