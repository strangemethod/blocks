import React from "react";
import ReactDOM from "react-dom";
import BlockEditor from "./editor-ui/block-editor.jsx";
import EditorHooks from "./constants.js"
import SectionEditor from "./editor-ui/section-editor.jsx";
import PostData from "./functions/post-data.jsx";


// Global props.
const props = {
	pageId: document.getElementById('page').dataset.page,
	postData: PostData,
}

// Create section editors.
EditorHooks['add-section'].forEach((editor) => {
	ReactDOM.render(
		<SectionEditor
				{...editor.dataset}
				{...props}
				view="footer" />, 
		editor);
});

// Create section editors.
EditorHooks['edit-section'].forEach((editor, index) => {
	let firstSection = index === 0;
	let lastSection = index === EditorHooks['edit-section'].length - 1;

	ReactDOM.render(
		<SectionEditor
				{...editor.dataset}
				{...props}
				firstSection={firstSection}
				lastSection={lastSection}
				view="sidebar" />, 
		editor);
});

// Create block editors.
EditorHooks['edit-block'].forEach((editor) => {
	ReactDOM.render(
		<BlockEditor
				{...editor.dataset}
				{...props} />, 
			editor);
});
