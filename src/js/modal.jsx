import React from "react";
import AddBlock from "./dialogs/add-block.jsx";
import AddPage from "./dialogs/add-page.jsx";
import EditBlock from "./edit-block.jsx";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      operation: this.props.operation
    };
  }

  deleteBlock = () => {
    this.props.deleteData(this.props.blockId);
  }

  render() {
    if (!this.props.modalOpen) {
      return null;
    }

    let form;
    if (this.state.operation === 'add') {
      form = <AddBlock {...this.props} />;
    } else if (this.state.operation === 'add-section') {
      form = <AddBlock {...this.props} />;
    } else if (this.state.operation === 'edit') {
      form = <EditBlock {...this.props} />;
    } else if (this.state.operation === 'add-page') {
      form = <AddPage {...this.props} />;
    }

    return (
      <section class="modal">
        <div class="modal__form grid container">
          <div class="close" onClick={this.props.closeModal}>
            <img src="/assets/icon-cancel.svg" />
          </div>
          {form}
        </div>
      </section>
    );
  }
}