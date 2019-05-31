/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import expect from 'expect';
import fs from 'fs';
import path from 'path';
import Slate from 'slate';

import EditList from '../lib';

describe('slate-edit-list', () => {
    const tests = fs.readdirSync(__dirname);

    tests.forEach((test, index) => {
        if (test[0] === '.' || path.extname(test).length > 0) return;
        it(test, () => {
            const plugin = EditList();

            const dir = path.resolve(__dirname, test);
            const input = require(path.resolve(dir, 'input.js')).default;
            const expectedPath = path.resolve(dir, 'expected.js');
            const expected =
                fs.existsSync(expectedPath) && require(expectedPath).default;

            // eslint-disable-next-line
            const runChange = require(path.resolve(dir, 'change.js')).default;

            const editor = new Slate.Editor({
                value: input,
                plugins: [plugin]
            });

            runChange(plugin, editor);

            if (expected) {
                const newDocJSon = editor.value.toJSON();
                expect(newDocJSon).toEqual(expected.toJSON());
            }
        });
    });
});
