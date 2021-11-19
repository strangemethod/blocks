import React from "react";
import AddMenu from "./dialogs/add-menu.jsx";
import EditImage from "./dialogs/edit-image.jsx";
import EditText from "./dialogs/edit-text.jsx";

export default class AddBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blockType: null,
    };
  }

  setFieldType = (type) => {
    this.setState({fieldType: type});
  }

  submitData = () => {
    if (this.state.blockType) {
      this.props.addBlock(this.state.blockType);
      this.props.closeModal();
    } else {
      this.setState({error: true});
    }
  }

  render() {
    let form;
    let menu;
    if (this.state.fieldType === 'image') {
      form = <EditImage {...this.props} setFieldType={this.setFieldType} />;
    } else if (this.state.fieldType === 'text'){
      form = <EditText {...this.props} setFieldType={this.setFieldType} />;
    } else {
      menu =  <AddMenu setFieldType={this.setFieldType} />;
    }

    return (
      <React.Fragment>
      {menu}
      {form}
      </React.Fragment>
    );
  }
}