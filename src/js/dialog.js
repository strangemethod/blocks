import React from "react";

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.modalOpen) {
      return null;
    }

    return (
      <section class="dialog">
        <div class="dialog__grid grid container">
          <div class="close" onClick={this.props.closeDialog}>X</div>

          operation: {this.props.operation}<br/>
          after: {this.props.afterBlock}<br/>

          <button class="submit" onClick={this.props.closeDialog}>Submit</button>
        </div>
      </section>
    );
  }
}