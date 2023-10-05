import React from "react";
import DialogContent from "./dialog-content.jsx";
import DialogStyle from "./dialog-style.jsx";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open
    };
  }

  toggleSidebar = () => {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    let dialog;
    switch (this.props.dialog) {
      case 'content':
        dialog = <DialogContent {...this.props} toggleSidebar={this.toggleSidebar} open={this.state.open} />;
      break;
      case 'style':
        dialog = <DialogStyle {...this.props} toggleSidebar={this.toggleSidebar} open={this.props.open} />;
      break;
    }

    return (
      <React.Fragment>
        {dialog}
      </React.Fragment>
    );
  }
}