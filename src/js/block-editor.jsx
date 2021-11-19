import React from "react";
import Modal from "./modal.jsx";
import BlockOverlay from "./triggers/block-overlay.jsx";

export default class BlockEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  addBlock = (section, block) => {
    console.log(this.props);
    // this.props.postData(data, 'add-block')
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

  deleteBlock = (section, block) => {
    console.log(this.props);
    // this.props.postData(data, 'delete-block')
  }

  editBlock = (section, block) => {
  
    // this.props.postData(data, 'edit-block')
  }

  showModal = () => {
    this.setState({modalOpen: true});
  }

  render() {
    const props = {
      addBlock: this.addBlock,
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