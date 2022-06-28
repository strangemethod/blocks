import React from "react";
import DialogImage from "./dialog-image.jsx";
import DialogText from "./dialog-text.jsx";

export default class DialogBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let form;
    if (this.props.blockType === 'image') {
      form = <DialogImage {...this.props} />;
    } else {
      form = <DialogText {...this.props} />;
    }

    return (
      <React.Fragment>
        {form}
      </React.Fragment>
    );
  }
}