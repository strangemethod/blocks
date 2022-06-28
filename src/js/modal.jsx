import React from "react";
import AddPage from "./dialogs/dialog-page.jsx";
import EditBlock from "./dialogs/dialog-block.jsx";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.modalOpen) {
      return null;
    }

    let dialog;
    switch (this.props.operation) {
      case 'add-page':
        dialog = <AddPage {...this.props} />;
        break;
      case 'edit-block':
        dialog = <EditBlock {...this.props} />;
        break;
    }

    return (
      <section class="modal">
        <div class="modal__form grid container">
          <div class="close" onClick={this.props.closeModal}>
            <img src="/assets/icon-cancel.svg" />
          </div>
          {dialog}
        </div>
      </section>
    );
  }
}