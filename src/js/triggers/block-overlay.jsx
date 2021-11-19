import React from "react";

export default class BlockOverlay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let addButton;
    if (!this.props.complete) {
      addButton = (
        <button 
            class="editor__icon  editor__icon--bg editor__icon--add"
            onClick={() => {this.props.addBlock(this.props.sectionIndex, this.props.blockIndex)}}
            title="Add new block">
          <object type="image/svg+xml" data="/assets/icon-plus-circle.svg"></object>
        </button>
      )
    }

    return (
      <React.Fragment>
        <div class="editor__icons editor__icons--bottom">
          {addButton}
          <button 
              class="editor__icon editor__icon--edit"
              onClick={this.props.editBlock(this.props.sectionIndex, this.props.blockIndex)}
              title="Edit block">
            <object type="image/svg+xml" data="/assets/icon-edit.svg"></object>
          </button>
          <button 
              class="editor__icon editor__icon--delete"
              onClick={() => {this.props.deleteBlock(this.props.sectionIndex, this.props.blockIndex)}}
              title="Delete block">
            <object type="image/svg+xml" data="/assets/icon-archive.svg"></object>
          </button>   
        </div>
      </React.Fragment>
    );
  }
}