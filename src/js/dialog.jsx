import React from "react";
import AddBlock from "./add-block.jsx";
import AddPage from "./add-page.jsx";
import EditBlock from "./edit-block.jsx";

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      operation: this.props.operation
    };
  }

  deleteBlock = () => {
    this.props.deleteData(this.props.blockId);
  }

  openPageDialog = () => {
    this.setState({'operation': 'add-page'});
  }

  render() {
    if (!this.props.modalOpen) {
      return null;
    }

    let form;
    if (this.state.operation === 'add') {
      form = <AddBlock {...this.props} />;
    } else if (this.state.operation === 'edit') {
      form = <EditBlock {...this.props} />;
    } else if (this.state.operation === 'add-page') {
      form = <AddPage {...this.props} />;
    }

    return (
      <section class="dialog">
        <div class="dialog__banner">
          <div class="container">
            <button class="alert-button"
                onClick={this.deleteBlock}>Delete Block</button>
            <button class="add-page" onClick={this.openPageDialog}>Add Page</button>
          </div>
        </div>
        <div class="dialog__form grid container">
          <div class="close" onClick={this.props.closeDialog}>
            <img src="/assets/icon-cancel.svg" />
          </div>
          {form}
        </div>
      </section>
    );
  }
}