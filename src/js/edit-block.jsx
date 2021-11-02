import React from "react";
import EditImage from "./edit-image.jsx";

export default class EditBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let form;
    if (this.props.fieldType === 'image') {
      form = <EditImage {...this.props} />;
    } else {
      form = 'Edit text';
    }

    return (
      <div>
        {form}
      </div>
    );
  }
}