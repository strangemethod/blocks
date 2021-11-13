import React from "react";

export default class EditHero extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: this.props.imageSrc,
      text: unescape(this.props.value),
    };
  }

  setImage = () => {
    const fieldInput = event.target.value;
    const pathedInput = fieldInput.replace("C:\\fakepath\\", "/img/");
    this.setState({image: pathedInput});
  }  

  setText = () => {
    this.setState({text: event.target.value});
  }  

  submitData = () => {
    this.props.editBlock(this.state.text);
    this.props.editBlock(this.state.image, "image");
    this.props.closeDialog();
  }  

  deleteBlock = () => {
    this.props.deleteData(this.props.blockId);
  }  

  render() {
    let currentImg = '';
    if (this.state.image) {
      currentImg = `Selected image: ${this.state.image}`;
    }

    return (
      <React.Fragment>
        <h3>Edit Hero</h3>
        <input type="text" 
            value={this.state.text}
            onChange={this.setText}
            />
        <input
            accept="image/png, image/jpeg"
            onChange={this.setImage}
            type="file" />
        <p>{currentImg}</p>
        <button onClick={this.submitData}>Submit</button>
      </React.Fragment>
    );
  }
}