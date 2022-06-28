import React from "react";
import DialogEditBlock from "./dialogs/dialog-edit-block.jsx";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // dialog to display.
      dialog: null,
      // field (eg. image, text).
      field: null,
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

  // deleteBlock = (sectionIndex, blockIndex) => {
    // const data = {
    //   blockIndex: blockIndex,
    //   operation: 'delete',
    //   page: this.props.pageId,
    //   sectionIndex: sectionIndex,
    // }
    // this.props.postData(data, 'block')
  // }

   toggleDialog = (dialog, field) => {
    this.setState({
      dialog: dialog,
      field: field,
    });
  }


  render() {
    const props = {
      closeModal: this.closeModal,
      // deleteBlock: this.deleteBlock,
      dialog: this.state.dialog,
      field: this.state.field,
      ...this.props
    }

    let dialog;
    switch (this.state.dialog) {
      case 'edit-block':
        dialog = <DialogEditBlock {...props} />;
        break;
    }

    return (
      <React.Fragment>
        <div class="editor__icons editor__icons--bottom">
          <button 
              class="editor__icon editor__icon--edit"
              onClick={() => {this.toggleDialog('edit-block', this.props.field)}}>
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
        {this.state.dialog &&
          <section class="modal">
            <div class="modal__form grid container">
              <div class="close" onClick={() => (this.toggleDialog(null, null))}>
                <img src="/assets/icon-cancel.svg" />
              </div>
              {dialog}
            </div>
          </section>
        }
      </React.Fragment>
    );
  }
}