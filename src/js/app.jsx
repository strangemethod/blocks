import React from "react";
import ReactDOM from "react-dom";
import Editor from "./editor/editor.jsx";
import PostData from "./functions/post-data.jsx";
import {ResizeGrid} from "./functions/resize-grid.jsx";


// ES6 module to resize grids.
const grids = document.querySelectorAll('.grid.block');
grids.forEach((grid) => {
	new ResizeGrid(grid);
});

// Global props.
const props = {
	pageId: document.getElementById('page').dataset.page,
	postData: PostData,
}

// DOM hooks for React components.
const Selectors = [
	'add-page',
	'add-section',
	'edit-block',
	'edit-section',
];

const EditorHooks = {}; 
Selectors.forEach((selector) => {
	EditorHooks[selector] = document.querySelectorAll(`.${selector}`);
});

// Loop through hooks and create react Editor components. 
Object.keys(EditorHooks).forEach((key) => {
	EditorHooks[key].forEach((editorHook) => {
		ReactDOM.render(
			<Editor
					buttonSet={key}
					{...editorHook.dataset}
					{...props} />, 
				editorHook);
	});
});

/*
 * Drag and drop hooks.
 */
const draggables = document.querySelectorAll(`.draggable`);
