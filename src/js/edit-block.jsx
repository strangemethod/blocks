import React from "react";
import EditHero from "./dialogs/edit-hero.jsx";
import EditImage from "./dialogs/edit-image.jsx";
import EditText from "./dialogs/edit-text.jsx";

export default class EditBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let form;
    if (this.props.fieldType === 'image') {
      form = <EditImage {...this.props} />;
    } else if (this.props.fieldType === 'hero') {
      form = <EditHero {...this.props} />;
    } else {
      form = <EditText {...this.props} />;
    }

    return (
      <React.Fragment>
        {form}
      </React.Fragment>
    );
  }
}