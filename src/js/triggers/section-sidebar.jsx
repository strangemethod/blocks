import React from "react";

export default class SectionSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let moveDownButton;
    if (!this.props.lastSection) {
      moveDownButton = (
        <button
            class="editor__icon editor__icon--down"
            onClick={() => {this.props.orderBlock(this.props.index, '1')}}>
          <object type="image/svg+xml" data="/assets/icon-arrow-down.svg"></object>
          <div class="tooltip">Move down</div>
        </button>
      )
    }

    let moveUpButton;
    if (!this.props.firstSection) {
      moveUpButton = (
        <button 
            class="editor__icon editor__icon--up"
            onClick={() => {this.props.orderBlock(this.props.index, '-1')}}>
          <object type="image/svg+xml" data="/assets/icon-arrow-up.svg"></object>
          <div class="tooltip">Move up</div>
        </button>
      )
    }

    let addButtons;
    if (!this.props.complete) {
      addButtons = (
        <div class="editor__icons--add-menu">
          <button 
              class="editor__icon editor__icon--text">
            <object type="image/svg+xml" data="/assets/icon-textarea.svg"></object>
            <div class="tooltip">Add text block</div>
          </button>
          <button 
              class="editor__icon editor__icon--image">
            <object type="image/svg+xml" data="/assets/icon-image.svg"></object>
            <div class="tooltip">Add image block</div>
          </button>
          <button 
              class="editor__icon editor__icon--add">
            <object type="image/svg+xml" data="/assets/icon-plus.svg"></object>
          </button>
        </div>
      )
    }

    return (
      <React.Fragment>
        {moveUpButton}
        {addButtons}
        <button class="editor__icon editor__icon--delete"
            onClick={() => {this.props.deleteSection(this.props.index)}}>
          <object type="image/svg+xml" data="/assets/icon-archive.svg"></object>
          <div class="tooltip">Delete section</div>
        </button>
        {moveDownButton}
      </React.Fragment>
    );
  }
}

