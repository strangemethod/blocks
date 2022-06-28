import React from "react";
import ReactDOM from "react-dom";
import BlockEditor from "./editor-ui/block-editor.jsx";
import SectionEditor from "./editor-ui/section-editor.jsx";
import PostData from "./functions/post-data.jsx";

// Trigger elements.
const triggers = {
	'block_edit': document.querySelectorAll('.edit-block'),
	'section_add': document.querySelectorAll('.add-section'),
	'section_edit': document.querySelectorAll('.edit-section'),
}

// Global props.
const props = {
	pageId: document.getElementById('page').dataset.page,
	postData: PostData,
}

// Add sections.
triggers.section_add.forEach((editor) => {
	ReactDOM.render(
		<SectionEditor
				{...editor.dataset}
				{...props}
				view="footer" />, 
		editor);
});

// Edit Sections.
triggers.section_edit.forEach((editor, index) => {
	let firstSection = index === 0;
	let lastSection = index === triggers.section_edit.length - 1;

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
triggers.block_edit.forEach((editor) => {
	ReactDOM.render(
		<BlockEditor
				{...editor.dataset}
				{...props} />, 
			editor);
});
