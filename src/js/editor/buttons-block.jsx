import React from "react";

export default class ButtonsBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="editor__icons editor__icons--bottom">
        <button 
            class="editor__icon editor__icon--edit"
            onClick={() => {
                this.props.openDialog('edit-block')
            }}>
          <object type="image/svg+xml" data="/assets/icon-edit.svg"></object>
        <div class="tooltip">Edit block</div>
        </button>
        <button
            class="editor__icon editor__icon--delete"
            onClick={() => {
                this.props.deleteBlock(this.props.sectionIndex, this.props.blockIndex)
            }}>
          <object type="image/svg+xml" data="/assets/icon-archive.svg"></object>
          <div class="tooltip">Delete block</div>
        </button>   
      </div>
    );
  }
}

