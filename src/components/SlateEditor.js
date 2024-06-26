import React, { useCallback, useMemo, useState } from 'react';
import { Global, css } from '@emotion/react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import { Transforms, createEditor, Range } from 'slate';
import { withHistory } from 'slate-history';

// import Leaf from './Common/Leaf';
import Toolbar from './ToolBar/Toolbar';
import { MarkButton, toggleMark } from './ToolBar/MarkButton';
import { BlockButton } from './ToolBar/BlockButton';
import Elements from './Common/Elements';
import Leaf from './Common/Leaf';

//import { withImages, InsertImageButton } from './Image/InsertImageButton';
import { withLinks } from './Link/linkUtilFunctions';
//import AddLinkButton from './Link/AddLinkButton';
//import RemoveLinkButton from './Link/RemoveLinkButton';
import OpenFile from "./ToolBar/OpenFile";
import SaveFile from "./ToolBar/SaveFile";
import { Dropdown} from './ToolBar/ParagraphStyle';
import {withDocx} from "../docx/withdocx";
import { withTables } from './Common/Table';
import '../styles/editor.css';
import TagContainer from './Highlight/TagContainer';

// for all rich editor hot keys
const HOTKEYS = {
	'mod+b': 'bold',
	'mod+i': 'italic',
	'mod+u': 'underline'
};

const SlateEditor = () => {
	// to store the styled text as html
	const [value, setValue] = useState(initialValue);

	// renderElement is used to render custom elements
	const renderElement = useCallback((props) => {
		return <Elements {...props} />;
	}, []);

	// to handle rendering leaves
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

	// the slate editor object
	const editor = useMemo(
		() => withDocx(withTables(withLinks(withHistory(withReact(createEditor()))))),
		[]
	);
	let editorClass = 'rich-editor';
	let pageStyle = {
		width: '97%',
		fontFamily: 'Calibri',
		backgroundColor: 'lightsteelblue',
		padding: '27pt',
	//}

	//let editableStyle = {
		display: 'flex',
		flexFlow: 'column',
		alignItems: 'center',
	}

	return (
		<div className='editor-container'>
			<Global styles={css(editor.getGlobalStyleObj(editorClass))}/>
			<Slate
				className={editorClass}
				editor={editor}
				value={value}
				onChange={(value) => setValue(value)}>
				<Toolbar style={{ width: '95%' }}>
					{/* add all toolbar options */}
					<Dropdown/>
					<MarkButton
						format='b'
						icon='format_bold'
						title='bold'
					/>
					<MarkButton
						format='i'
						icon='format_italic'
						title='italic'
					/>
					<MarkButton
						format='underline'
						icon='format_underlined'
						title='underline'
					/>
					<BlockButton
						format='Heading 1'
						icon='looks_one'
						title='heading 1'
					/>
					<BlockButton
						format='Heading 2'
						icon='looks_two'
						title='heading 2'
					/>
					<BlockButton
						format='Intense Quote'
						icon='format_quote'
						title='quote'
					/>
					<BlockButton
						format='List Number'
						icon='format_list_numbered'
						title='numbered list'
					/>
					<BlockButton
						format='List Bullet'
						icon='format_list_bulleted'
						title='bulleted list'
					/>
					<BlockButton
						format='left'
						icon='format_align_left'
						title='left align'
					/>
					<BlockButton
						format='center'
						icon='format_align_center'
						title='center align'
					/>
					<BlockButton
						format='right'
						icon='format_align_right'
						title='right align'
					/>
					<BlockButton
						format='justify'
						icon='format_align_justify'
						title='justify'
					/>
					<OpenFile/>
					<SaveFile/>
				</Toolbar>
				{/* the slate editor */}
				{/**/}
				<div className={editorClass} >
					<Editable style={pageStyle}
						renderElement={renderElement}
						renderLeaf={renderLeaf}
						placeholder='Enter some rich text…'
						spellCheck
						autoFocus
					/>
				</div>
			</Slate>
		</div>
	);
};

// to display some initial text
let paragraphs = [
	{
		type: 'paragraph',
		children: [
			{ text: 'This is editable ' },
			{ text: 'rich', b: true },
			{ text: ' text, ' },
			{ text: 'much', i: true },
			{ text: ' better than a ' },
			{ text: '<textarea>', code: true },
			{ text: '!' },
		],
	},
	{
		type: 'paragraph',
		children: [
			{
				text: "Since it's rich text, you can do things like turn a selection of text ",
			},
			{ text: 'bold', b: true },
			{
				text: ', or add a semantically rendered block quote in the middle of the page, like this:',
			},
		],
	},
	{
		type: 'paragraph',
		style: 'Intense Quote',
		children: [{ text: 'A wise quote.' }],
	},
	{
		type: 'paragraph',
		align: 'left',
		children: [{ text: 'Try it out for yourself!' }],
	},
];

let initialValue = [
	{
		type: 'section',
		children: [
			{
				type: 'column',
				children: paragraphs
			}
			]
	}
	]

export default SlateEditor;
