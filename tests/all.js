import expect from 'expect';
import fs from 'fs';
import path from 'path';
import Slate from 'slate';
import readMetadata from 'read-metadata';

import EditList from '../lib';

function deserializeValue(json) {
    return Slate.Value.fromJSON(json);
}

describe('slate-edit-list', () => {
    const tests = fs.readdirSync(__dirname);

    tests.forEach((test, index) => {
        if (test[0] === '.' || path.extname(test).length > 0) return;
        it(test, () => {
            const plugin = EditList();

            const dir = path.resolve(__dirname, test);
            const input = readMetadata.sync(path.resolve(dir, 'input.yaml'));
            const expectedPath = path.resolve(dir, 'expected.yaml');
            const expected =
                fs.existsSync(expectedPath) && readMetadata.sync(expectedPath);

            // eslint-disable-next-line
            const runChange = require(path.resolve(dir, 'change.js')).default;

            const inputValue = deserializeValue(input);

            const editor = new Slate.Editor({
                value: inputValue,
                plugins: [plugin]
            });

            editor.change(change => runChange(plugin, change, editor));

            if (expected) {
                const newDocJSon = editor.value.toJSON();
                expect(newDocJSon).toEqual(deserializeValue(expected).toJSON());
            }
        });
    });
});
