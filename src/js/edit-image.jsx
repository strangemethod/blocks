import React from "react";

export default class EditImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      image: null
    };
  }

  setImage = () => {
    const fieldInput = event.target.value;
    const pathedInput = fieldInput.replace("C:\\fakepath\\", "/img/");
    this.setState({image: pathedInput});
  }  

  submitData = () => {
    if (this.state.image) {
      this.props.editData(this.state.image);
      this.props.closeDialog();
    } else {
      this.setState({error: true});
    }
  }  

  deleteBlock = () => {
    this.props.deleteData(this.props.blockId);
  }  

  render() {
    return (
    	<React.Fragment>
      	<p>Edit Image</p>
				<input
            accept="image/png, image/jpeg"
            className={`${this.state.error ? "error" : ""}`}
            onChange={this.setImage}
            type="file" />
        <button onClick={this.submitData}>Submit</button>
        <button class="alert-button"
            onClick={this.deleteBlock}>Delete Block</button>
      </React.Fragment>
    );
  }
}