import React from "react";
import AddBlock from "./add-block.jsx";
import EditBlock from "./edit-block.jsx";

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
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
        <div class="dialog__grid grid container">
          <div class="close" onClick={this.props.closeDialog}>
            <img src="/editor/icon-cancel.svg" />
          </div>
          {form}
        </div>
      </section>
    );
  }
}