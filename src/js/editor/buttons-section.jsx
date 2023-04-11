import React from "react";

export default class ButtonsSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstSection: this.props.index === "0",
      view: this.props.view,
    };
  }

  render() {
    let moveDownButton;
    if (!this.props.lastSection) {
      moveDownButton = (
        <button
            className="editor__icon editor__icon--down"
            onClick={
              () => {this.props.postSection('order', this.props.index, 1)}
            }>
          <object type="image/svg+xml" data="/assets/icon-arrow-down.svg"></object>
          <div className="tooltip">Move down</div>
        </button>
      )
    }

    let moveUpButton;
    if (!this.state.firstSection) {
      moveUpButton = (
        <button 
            className="editor__icon editor__icon--up"
            onClick={
                () => {this.props.postSection('order', this.props.index, -1)}
            }>
          <object type="image/svg+xml" data="/assets/icon-arrow-up.svg"></object>
          <div className="tooltip">Move up {this.state.firstSection}x</div>
        </button>
      )
    }

    let addButtons;
    if (!this.props.complete) {
      addButtons = (
        <div className="editor__icons--add-menu">
          <button className="editor__icon editor__icon--text"
            onClick={
                () => {this.props.postBlock('add', this.props.index, null, 'text')}
              }>
            <object type="image/svg+xml" data="/assets/icon-textarea.svg"></object>
            <div className="tooltip">Add text block</div>
          </button>
          <button className="editor__icon editor__icon--image"
            onClick={
                () => {this.props.postBlock('add', this.props.index, null, 'image')}
            }>
            <object type="image/svg+xml" data="/assets/icon-image.svg"></object>
            <div className="tooltip">Add image block</div>
          </button>
          <button 
              className="editor__icon editor__icon--add">
            <object type="image/svg+xml" data="/assets/icon-plus.svg"></object>
          </button>
        </div>
      )
    }

    return (
      <React.Fragment>
        {moveUpButton}
        {addButtons}
        <button className="editor__icon editor__icon--delete"
            onClick={
                () => {this.props.postSection('delete', this.props.index)}
            }>
          <object type="image/svg+xml" data="/assets/icon-archive.svg"></object>
          <div className="tooltip">Delete section</div>
        </button>
        {moveDownButton}
      </React.Fragment>
    );
  }
}