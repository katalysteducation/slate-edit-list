import expect from 'expect';

export default function(plugin, change, editor) {
    let nextCalled = false;

    plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {},
            key: 'Enter',
            shiftKey: true
        },
        change,
        () => {
            nextCalled = true;
        }
    );

    expect(nextCalled).toBe(true);
}
