export default function(plugin, change) {
    const data = { style: { listStyleType: 'disc' } };
    return change.wrapInList(false, data);
}
