import React from "react";

export default class ButtonsBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="editor__icons editor__icons--bottom">
        <button 
            className="editor__icon editor__icon--edit"
            onClick={() => {
                this.props.openDialog('edit-block')
            }}>
          <object type="image/svg+xml" data="/assets/icon-edit.svg"></object>
        <div className="tooltip">Edit block</div>
        </button>
        <button
            className="editor__icon editor__icon--delete"
            onClick={() => {
                this.props.postBlock('delete', this.props.sectionIndex, this.props.blockIndex)
            }}>
          <object type="image/svg+xml" data="/assets/icon-archive.svg"></object>
          <div className="tooltip">Delete block</div>
        </button>   
      </div>
    );
  }
}

