import React from "react";

export default class DialogImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      caption: unescape(this.props.caption),
      // captionKey: this.getCaptionKey(),
      // error: false,
      image: this.props.imageSrc,
    };
  }

  // getCaptionKey = () => {
  //   const fieldIndex = this.props.fieldId.split('-')[1];
  //   const captionKey = fieldIndex ? `caption-${fieldIndex}` : 'caption';
  //   return captionKey;
  // }

  setCaption = () => {
    this.setState({caption: event.target.value});
  }

  setImage = () => {
    const fieldInput = event.target.value;
    const pathedInput = fieldInput.replace("C:\\fakepath\\", "/assets/");
    this.setState({image: pathedInput});
  }  

  submitData = () => {
    if (this.state.text) {
      this.props.postBlock('edit', this.props.sectionIndex, null, 'image')
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
      	<h2>Image</h2>
        <h3>Select an image</h3>
				<input
            accept="image/png, image/jpeg"
            className={`${this.state.error ? "error" : ""}`}
            onChange={() => {this.setImage()}}
            type="file" />
        <p>{currentImg}</p>
        <h3>Image caption</h3>
        <input type="text" 
            value={this.state.caption}
            onChange={this.setCaption} />
        <button
            class="submit-button"
            onClick={() => {this.submitData()}}>
          Submit
        </button>
      </React.Fragment>
    );
  }
}