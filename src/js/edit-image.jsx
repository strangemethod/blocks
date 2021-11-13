import React from "react";

export default class EditImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      image: this.props.imageSrc,
    };
  }

  setImage = () => {
    const fieldInput = event.target.value;
    const pathedInput = fieldInput.replace("C:\\fakepath\\", "/img/");
    this.setState({image: pathedInput});
  }  

  submitData = () => {
    if (this.state.image) {
      this.props.editBlock(this.state.image);
      this.props.closeDialog();
    } else {
      this.setState({error: true});
    }
  }

  render() {
    let currentImg = '';
    if (this.state.image) {
      currentImg = `Selected image: ${this.state.image}`;
    }

    return (
    	<React.Fragment>
      	<h3>Edit Image</h3>
				<input
            accept="image/png, image/jpeg"
            className={`${this.state.error ? "error" : ""}`}
            onChange={this.setImage}
            type="file" />
        <p>{currentImg}</p>
        <button onClick={this.submitData}>Submit</button>
      </React.Fragment>
    );
  }
}