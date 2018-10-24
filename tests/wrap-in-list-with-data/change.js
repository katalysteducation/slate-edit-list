export default function(plugin, change) {
    const data = { style: { listStyleType: 'decimal' } };
    return change.wrapInList('ol_list', data);
}
