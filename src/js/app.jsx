import React from "react";
import ReactDOM from "react-dom";
import Editor from "./editor/editor.jsx";
import PostData from "./functions/post-data.js";
import ResizeGrid from "./functions/resize-grid.js"

import {CLASSES, EDITOR_SELECTORS, SELECTORS} from "./constants.js"


/*
 * ES6 modules.
 * Used for Editor functions that work with the existing UI.
 * eg. drag and drop grid resizing.
 */ 
const blocks = document.querySelectorAll(CLASSES.block);
blocks.forEach((block) => {
	new ResizeGrid(block);
});


/*
 * React components.
 * Only use when new markup needs to be injected for the Editor UI.
 * eg. modals and dialogs.
 */
// Global props.
const props = {
	pageId: document.getElementById(SELECTORS.page).dataset.page,
	postData: PostData,
}

// Loop through editor hooks and create react components. 
EDITOR_SELECTORS.forEach((selector) => {
	const editorHooks = document.querySelectorAll(`.${selector}`);
	editorHooks.forEach((editorHook) => {
		ReactDOM.render(
			<Editor
					buttonSet={selector}
					{...editorHook.dataset}
					{...props} />, 
			editorHook
		);
	});
});
