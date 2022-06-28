import React from "react";
import Modal from "../modal.jsx";
import BlockOverlay from "../triggers/block-overlay.jsx";

export default class BlockEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
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
    // this.props.postData(data, 'edit-block')
  }

  showModal = () => {
    this.setState({modalOpen: true});
  }

  render() {
    const props = {
      closeModal: this.closeModal,
      deleteBlock: this.deleteBlock,
      editBlock: this.editBlock,
      showModal: this.showModal,
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