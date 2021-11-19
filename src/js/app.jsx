import React from "react";
import ReactDOM from "react-dom";
import BlockEditor from "./block-editor.jsx";
import SectionEditor from "./section-editor.jsx";
import PostData from "./functions/post-data.jsx";

// DOM hooks.
const addSections = document.querySelectorAll('.add-section');
const blockEditors = document.querySelectorAll('.edit-block');
const sectionEditors = document.querySelectorAll('.edit-section');

// Global props.
const props = {
	pageId: document.getElementById('page').dataset.page,
	postData: PostData,
}

// Add sections.
addSections.forEach((editor) => {
	ReactDOM.render(
		<SectionEditor
				{...editor.dataset}
				{...props}
				view="footer" />, 
		editor);
});

// Edit Sections.
sectionEditors.forEach((editor, index) => {
	let firstSection = index === 0;
	let lastSection = index === sectionEditors.length - 1;

	ReactDOM.render(
		<SectionEditor
				{...editor.dataset}
				{...props}
				firstSection={firstSection}
				lastSection={lastSection}
				view="sidebar" />, 
		editor);
});

// Edit Blocks.
// blockEditors.forEach((editor) => {
// 	ReactDOM.render(
//		<BlockEditor {...editor.dataset} pageId={pageId} />, 
//			editor);
// });
