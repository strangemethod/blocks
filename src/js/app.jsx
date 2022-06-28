import React from "react";
import ReactDOM from "react-dom";
import Editor from "./editor/editor.jsx";
import PostData from "./functions/post-data.jsx";

// Global props.
const props = {
	pageId: document.getElementById('page').dataset.page,
	postData: PostData,
}

// DOM hooks for React components.
const Selectors = [
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
