import React from "react";

export default class EditImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      caption: unescape(this.props.caption),
      captionKey: this.getCaptionKey(),
      error: false,
      image: this.props.imageSrc,
    };
  }

  getCaptionKey = () => {
    const fieldIndex = this.props.fieldId.split('-')[1];
    const captionKey = fieldIndex ? `caption-${fieldIndex}` : 'caption';
    return captionKey;
  }

  setCaption = () => {
    this.setState({caption: event.target.value});
  }

  setImage = () => {
    const fieldInput = event.target.value;
    const pathedInput = fieldInput.replace("C:\\fakepath\\", "/assets/");
    this.setState({image: pathedInput});
  }  

  submitData = () => {
    if (this.state.image) {
      this.props.editBlock(this.state.image, this.props.fieldId);
      this.props.editBlock(this.state.caption, this.state.captionKey);
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
        <input type="text" 
            value={this.state.caption}
            onChange={this.setCaption} />
        <button onClick={this.submitData}>Submit</button>
      </React.Fragment>
    );
  }
}