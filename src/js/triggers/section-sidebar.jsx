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
            onClick={() => {this.props.orderBlock('-1')}}>
          <img src="/assets/icon-up.svg" />
        </button>
        <button class="editor__icon editor__icon--bg editor__icon--add">
          <img src="/assets/icon-plus-circle.svg" />
        </button>
        <button class="editor__icon editor__icon--delete"
            onClick={() => {this.props.deleteSection(this.props.index, 'delete-section')}}>
          <img src="/assets/icon-archive.svg" />
        </button>
        <button
            class="editor__icon editor__icon--bg editor__icon--down"
            onClick={() => {this.props.orderBlock('1')}}>
          <img src="/assets/icon-down.svg" />
        </button>
      </React.Fragment>
    );
  }
}

