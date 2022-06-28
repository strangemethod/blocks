import React from "react";
import DialogBlock from "./dialog-block.jsx";
import DialogImage from "./dialog-image.jsx";
import DialogText from "./dialog-text.jsx";

export default class DialogAddBlock extends React.Component {
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
      form = <DialogImage {...this.props} setFieldType={this.setFieldType} />;
    } else if (this.state.fieldType === 'text'){
      form = <DialogText {...this.props} setFieldType={this.setFieldType} />;
    } else {
      menu =  <DialogAddBlock setFieldType={this.setFieldType} />;
    }

    return (
      <React.Fragment>
      {menu}
      {form}
      </React.Fragment>
    );
  }
}