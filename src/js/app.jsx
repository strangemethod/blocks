import React from "react";
import ReactDOM from "react-dom";
import Editor from "./editor/editor.jsx";
import EditMode from "./editor/edit-mode.jsx";
import GridResize from "./editor/grid-resize.jsx";
import PostData from "./functions/post-data.js";
import {CLASSES, EDITOR_SELECTORS, SELECTORS} from "./constants.js"


const blocks = document.querySelectorAll(CLASSES.block);
const editModeHook = document.getElementById(SELECTORS.edit_mode_toggle);
const gridResizeHooks = document.querySelectorAll(`.${SELECTORS.resize_hook}`);
const pageElement = document.getElementById(SELECTORS.page);


function Store(initialState = {}) {
  this.state = initialState;
}

Store.prototype.getState = function() {
  return this.state;
};

Store.prototype.mergeState = function(partialState) {
  Object.assign(this.state, partialState);
};

let editorStore = new Store();

// Global props.
const props = {
  getState: editorStore.getState.bind(editorStore),
  mergeState: editorStore.mergeState.bind(editorStore),
  pageElement: pageElement,
	pageId: pageElement.dataset.page,
	postData: PostData,
}

ReactDOM.render(
	<EditMode {...props} />, 
	editModeHook
);

gridResizeHooks.forEach((resizeHook) => {
  ReactDOM.render(
    <GridResize {...props} />, 
    resizeHook
  );
});


// Loop through editor hooks and create react components. 
// EDITOR_SELECTORS.forEach((selector) => {
// 	const editorHooks = document.querySelectorAll(`.${selector}`);
// 	editorHooks.forEach((editorHook) => {
// 		ReactDOM.render(
// 			<Editor
// 					buttonSet={selector}
// 					{...editorHook.dataset}
// 					{...props} />, 
// 			editorHook
// 		);
// 	});
// });
