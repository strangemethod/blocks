import React from "react";

// Button sets.
import ButtonsBlock from "./buttons-block.jsx";
import ButtonsFooter from "./buttons-footer.jsx";
import ButtonsSection from "./buttons-section.jsx";

// Dialogs.
import DialogImage from "../dialogs/dialog-image.jsx";
import DialogText from "../dialogs/dialog-text.jsx";


export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // {string || nulll} dialog to display.
      dialog: null,
      // {boolean} error state of dialog.
      error: false,
      // {string || nulll}ield (eg. image, text).
      field: null,
    };
  }

  addSection = () => {
    console.log('add section');
    // const data = {
    //   operation: 'add',
    //   page: this.props.pageId,
    // }

    // this.props.postData(data, 'section')
  }


  // cleanUrlSlug = (input) => {
  //   const reservedChars = [':', '/', '#', '?', '&', '@', '%', '+', '~', '"', '\''];
  //   let slug = input.toLowerCase().replaceAll(' ', '-');
  //   reservedChars.forEach((char) => {
  //     slug.replaceAll(char, '');
  //   });
  //   return slug;
  // }

  closeDialog = (dialog) => {
    this.setState({
      dialog: null,
      error: false,
      field: null,
    });
  }

  deleteBlock = (sectionIndex, blockIndex) => {
    console.log('delete block');
    // const data = {
    //   blockIndex: blockIndex,
    //   operation: 'delete',
    //   page: this.props.pageId,
    //   sectionIndex: sectionIndex,
    // }
    // this.props.postData(data, 'block')
  }

  deleteSection = (index, order) => {
    console.log('delete section');
    // const data = {
    //   sectionIndex: index,
    //   operation: 'delete',
    //   page: this.props.pageId,
    // }

    // this.props.postData(data, 'section')
  }

  orderSection = (index, order) => {
    console.log('order section');
    // const data = {
    //   sectionIndex: index,
    //   order: order,
    //   operation: 'order',
    //   page: this.props.pageId,
    // }

    // this.props.postData(data, 'section')
  }

  submitBlock = () => {
    console.log('submit block data');
    // const data = {
    //   sectionIndex: index,
    //   operation: 'add',
    //   page: this.props.pageId,
    //   blockType: type,
    // }

    // this.props.postData(data, 'block')
    this.closeDialog();

  }

   openDialog = (dialog) => {
    this.setState({
      dialog: dialog,
      field: this.props.field,
    });
  }

  render() {
    const props = {
      addSection: this.addSection,
      closeDialog: this.closeDialog,
      deleteBlock: this.deleteBlock,
      deleteSection: this.deleteSection,
      dialog: this.state.dialog,
      field: this.state.field,
      openDialog: this.openDialog,
      orderSection: this.orderSection,
      submitBlock: this.submitBlock,
      ...this.props
    }

    let buttonSet;
    switch (this.props.buttonSet) {
      case 'add-section':
        buttonSet = <ButtonsFooter {...props} />;
        break;
      case 'edit-block':
        buttonSet = <ButtonsBlock {...props} />;
        break;
      case 'edit-section':
        buttonSet = <ButtonsSection {...props} />;
        break;
    }

    let dialog;
    switch (this.state.dialog) {
      case 'edit-block':
        if (this.state.field=== 'image') {
          dialog = <DialogImage {...this.props} />;
        } else if (this.state.field=== 'text') {
          dialog = <DialogText {...props} />;
        }
        break;
    }

    return (
      <React.Fragment>
        {buttonSet}
        {this.state.dialog &&
          <section class="modal">
            <div class="modal__form grid container">
              <div class="close" onClick={() => (this.openDialog(null, null))}>
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