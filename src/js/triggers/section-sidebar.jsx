import React from "react";

export default class SectionSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <button 
            class="editor__icon editor__icon--bg editor__icon--up"
            onClick={() => {this.props.orderBlock(this.props.index, '-1')}}
            title="Move up">
          <object type="image/svg+xml" data="/assets/icon-up.svg"></object>
        </button>
        <button class="editor__icon editor__icon--bg editor__icon--add"
            title="Add block">
          <object type="image/svg+xml" data="/assets/icon-plus-circle.svg"></object>
        </button>
        <button class="editor__icon editor__icon--delete"
            onClick={() => {this.props.deleteSection(this.props.index)}}
            title="Delete section">
          <object type="image/svg+xml" data="/assets/icon-archive.svg"></object>
        </button>
        <button
            class="editor__icon editor__icon--bg editor__icon--down"
            onClick={() => {this.props.orderBlock(this.props.index, '1')}}
            title="Move down">
          <object type="image/svg+xml" data="/assets/icon-down.svg"></object>
        </button>
      </React.Fragment>
    );
  }
}

