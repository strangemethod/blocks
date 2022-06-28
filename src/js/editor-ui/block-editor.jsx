import React from "react";
import Modal from "../modal.jsx";

export default class BlockEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blockType: null,
      modalOpen: false,
      operation: null
    };
  }

  // cleanUrlSlug = (input) => {
  //   const reservedChars = [':', '/', '#', '?', '&', '@', '%', '+', '~', '"', '\''];
  //   let slug = input.toLowerCase().replaceAll(' ', '-');

  //   reservedChars.forEach((char) => {
  //     slug.replaceAll(char, '');
  //   });

  //   return slug;
  // }

  closeModal = () => {
    this.setState({modalOpen: false});
  }

  deleteBlock = (sectionIndex, blockIndex) => {
    const data = {
      blockIndex: blockIndex,
      operation: 'delete',
      page: this.props.pageId,
      sectionIndex: sectionIndex,
    }

    this.props.postData(data, 'block')
  }

  editBlock = () => {
    this.setState({
      modalOpen: true,
      operation: 'edit-block',
    });
  }

  render() {
    const props = {
      closeModal: this.closeModal,
      // deleteBlock: this.deleteBlock,
      blockType: this.state.blockType,
      modalOpen: this.state.modalOpen,
      operation: this.state.operation,
      ...this.props
    }

    return (
      <React.Fragment>
        <div class="editor__icons editor__icons--bottom">
          <button 
              class="editor__icon editor__icon--edit"
              onClick={() => {this.editBlock()}}>
            <object type="image/svg+xml" data="/assets/icon-edit.svg"></object>
          <div class="tooltip">Edit block</div>
          </button>
          <button 
              class="editor__icon editor__icon--delete"
              onClick={() => {this.deleteBlock(this.props.sectionIndex, this.props.blockIndex)}}>
            <object type="image/svg+xml" data="/assets/icon-archive.svg"></object>
            <div class="tooltip">Delete block</div>
          </button>   
        </div>
        <Modal {...props} />
      </React.Fragment>
    );
  }
}