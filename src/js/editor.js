import React from "react";
import Dialog from "./dialog.js";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  showDialog = () => {
    this.setState({modalOpen: true});
  }

  closeDialog = () => {
    this.setState({modalOpen: false});
  }

  render() {
    return (
      <div>
        <div class="editor-overlay"
            onClick={this.showDialog}>
        </div>
        <Dialog modalOpen={this.state.modalOpen}
            closeDialog={this.closeDialog} 
            afterBlock={this.props.afterBlock}
            operation={this.props.operation} />
      </div>
    );
  }
}