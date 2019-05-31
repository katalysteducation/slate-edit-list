// @flow
/* global document */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'slate-react';

import PluginEditList from '../lib';

import INITIAL_VALUE from './value';

const plugin = PluginEditList();
const plugins = [plugin];

function renderNode(props: *) {
    const { node, attributes, children, editor } = props;
    const isCurrentItem = editor.getItemsAtRange(editor.value).contains(node);

    switch (node.type) {
        case 'ul_list':
            return <ul {...attributes}>{children}</ul>;
        case 'ol_list':
            return <ol {...attributes}>{children}</ol>;

        case 'list_item':
            return (
                <li
                    className={isCurrentItem ? 'current-item' : ''}
                    title={isCurrentItem ? 'Current Item' : ''}
                    {...props.attributes}
                >
                    {props.children}
                </li>
            );

        case 'paragraph':
            return <p {...attributes}>{children}</p>;
        case 'heading':
            return <h1 {...attributes}>{children}</h1>;
        default:
            return <p {...attributes}>{children}</p>;
    }
}

class Example extends React.Component<*, *> {
    state = {
        value: INITIAL_VALUE
    };

    renderToolbar() {
        const { value } = this.state;
        const inList = this.editor && this.editor.isSelectionInList(value);

        return (
            <div>
                <button
                    type="button"
                    className={inList ? 'active' : ''}
                    onClick={() =>
                        inList
                            ? this.editor.unwrapList()
                            : this.editor.wrapInList()
                    }
                >
                    <i className="fa fa-list-ul fa-lg" />
                </button>

                <button
                    type="button"
                    className={inList ? '' : 'disabled'}
                    onClick={() => this.editor.decreaseItemDepth()}
                >
                    <i className="fa fa-outdent fa-lg" />
                </button>

                <button
                    type="button"
                    className={inList ? '' : 'disabled'}
                    onClick={() => this.editor.increaseItemDepth()}
                >
                    <i className="fa fa-indent fa-lg" />
                </button>

                <span className="sep">·</span>

                <button type="button" onClick={() => this.editor.wrapInList()}>
                    Wrap in list
                </button>
                <button type="button" onClick={() => this.editor.unwrapList()}>
                    Unwrap from list
                </button>
            </div>
        );
    }

    onChange = ({ value }) => {
        this.setState({
            value
        });
    };

    render() {
        const { value } = this.state;

        return (
            <div>
                {this.renderToolbar()}
                <Editor
                    placeholder="Enter some text..."
                    plugins={plugins}
                    value={value}
                    onChange={this.onChange}
                    renderNode={renderNode}
                    shouldNodeComponentUpdate={props =>
                        // To update the highlighting of nodes inside the selection
                        props.node.type === 'list_item'
                    }
                    ref={editor => {
                        this.editor = editor;
                    }}
                />
            </div>
        );
    }
}

// $FlowFixMe
ReactDOM.render(<Example />, document.getElementById('example'));
