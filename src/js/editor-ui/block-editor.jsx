import React from "react";
import Modal from "../modal.jsx";
import BlockOverlay from "./block-overlay.jsx";

export default class BlockEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

  editBlock = (section, block) => {
    this.setState({
      modalOpen: true,
      operation: 'edit-block',
    });
  }

  render() {
    const props = {
      closeModal: this.closeModal,
      deleteBlock: this.deleteBlock,
      editBlock: this.editBlock,
      modalOpen: this.state.modalOpen,
      operation: this.state.operation,
      ...this.props
    }

    return (
      <React.Fragment>
        <BlockOverlay {...props} />
        <Modal {...props} />
      </React.Fragment>
    );
  }
}