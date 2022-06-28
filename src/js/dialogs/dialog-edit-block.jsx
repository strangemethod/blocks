import React from "react";
import DialogImage from "./dialog-image.jsx";
import DialogText from "./dialog-text.jsx";

export default class DialogEditBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let form;
    if (this.props.field=== 'image') {
      form = <DialogImage {...this.props} />;
    } else if (this.props.field=== 'text') {
      form = <DialogText {...this.props} />;
    }

    return (
      <React.Fragment>
        {form}
      </React.Fragment>
    );
  }
}