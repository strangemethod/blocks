import React from "react";
import ReactDOM from "react-dom";
import Editor from "./editor.jsx";

const editors = document.querySelectorAll('.editor');

editors.forEach((editor) => {
	const props = {
		afterBlock: editor.dataset.afterBlock,
		blockId: editor.dataset.blockId,
		blockType: editor.dataset.blockType,
		fieldId: editor.dataset.fieldId,
		fieldType: editor.dataset.fieldType,
		operation: editor.dataset.operation,
		value: editor.dataset.value,
	}

	ReactDOM.render(<Editor {...props} />, editor);
});