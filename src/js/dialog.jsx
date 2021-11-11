import React from "react";
import AddBlock from "./add-block.jsx";
import EditBlock from "./edit-block.jsx";

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteBlock = () => {
    this.props.deleteData(this.props.blockId);
  }

  render() {
    if (!this.props.modalOpen) {
      return null;
    }

    let form;
    if (this.props.operation === 'add') {
      form = <AddBlock {...this.props} />;
    } else if (this.props.operation === 'edit') {
      form = <EditBlock {...this.props} />;
    }

    return (
      <section class="dialog">
        <div class="dialog__banner">
          <div class="container">
            <button class="alert-button"
                onClick={this.deleteBlock}>Delete Block</button>
            <button class="add-page" onClick={this.props.closeDialog}>Add Page</button>
          </div>
        </div>
        <div class="dialog__form grid container">
          <div class="close" onClick={this.props.closeDialog}>
            <img src="/img/icon-cancel.svg" />
          </div>
          {form}
        </div>
      </section>
    );
  }
}