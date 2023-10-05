import React from "react";
import ReactDOM from "react-dom";

import PostData from "./functions/post-data.js";
import {SELECTORS} from "./constants.js"

// React classes
import Buttons from "./react/buttons.jsx";
import Modal from "./react/modal.jsx";
import Sidebar from "./react/sidebar.jsx";

// ES6 functions
import AutoGrid from "./functions/auto-grid.js";


const refreshPage = () => {
  setTimeout(() => {
    window.location.reload(true);
  }, 1000);
}

// Global props
const globalProps = {
  postData: PostData,
  refreshPage: refreshPage,
}


/* 
 * React Hooks
 * For editor layer only.
 */
const pageAddHook = document.getElementById(SELECTORS.page_add);
if (pageAddHook) {
  ReactDOM.render(
     <Modal 
        dialog="page-add"
        {...globalProps} />, 
     pageAddHook
  );
}

const blockAddHook = document.getElementById(SELECTORS.block_add);
if (blockAddHook) {
  ReactDOM.render(
    <Sidebar 
        {...globalProps}
        images={blockAddHook.dataset.images}
        page={blockAddHook.dataset.page} />, 
    blockAddHook
  );
}

const blockEditHook = document.getElementById(SELECTORS.block_add);
if (blockAddHook) {
  ReactDOM.render(
    <Sidebar 
        {...globalProps}
        images={blockAddHook.dataset.images}
        page={blockAddHook.dataset.page} />, 
    blockAddHook
  );
}

const blockButtonsHooks = document.querySelectorAll(SELECTORS.block_buttons);
blockButtonsHooks.forEach((buttonsHook) => {
  ReactDOM.render(
    <Buttons 
        {...globalProps} 
        index={buttonsHook.dataset.index}
        page={buttonsHook.dataset.page} />, 
    buttonsHook
  );
});


/* 
 * ES6 hooks.
 * For static front-end only.
 */

const grids = document.querySelectorAll(SELECTORS.auto_grid);

grids.forEach((grid) => {
  AutoGrid(grid);
});

