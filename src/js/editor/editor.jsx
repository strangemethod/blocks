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

  openDialog = (dialog) => {
    this.setState({
      dialog: dialog,
      field: this.props.field,
    });
  }

  postBlock = (operation, sectionIndex, blockIndex=null, type=null, text=null, image=null) => {
    const data = {
      blockIndex: blockIndex,
      blockType: type,
      image: image,
      operation: operation,
      page: this.props.pageId,
      sectionIndex: sectionIndex,
      text: text,
    }

    // this.props.postData(data, 'block')
  }

  postSection = (operation, index=null, order=null) => {
    const data = {
      operation: operation,
      order: order,
      page: this.props.pageId,
      sectionIndex: index,
    }

    // this.props.postData(data, 'section')
  }

  render() {
    const props = {
      closeDialog: this.closeDialog,
      dialog: this.state.dialog,
      field: this.state.field,
      openDialog: this.openDialog,
      postBlock: this.postBlock,
      postSection: this.postSection,
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
          dialog = <DialogImage {...props} />;
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