import React from "react";

export default class DialogText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // data for text fields.
      text: unescape(this.props.text),
    };
  }

  setText = () => {
    this.setState({text: event.target.value});
  }  

  submitData = () => {
    if (this.state.text) {
      console.log(this.props);
      //this.props.postBlock('edit', this.props.sectionIndex, this.props.blockIndex, 'text')
    } else {
      this.setState({error: true});
    }
  }

  render() {
    return (
    	<React.Fragment>
        <h2>Text Block</h2>
        <textarea
            className={`${this.state.error ? "error" : ""}`}
            onChange={() => {this.setText()}}>
          {this.state.text}
        </textarea>
        <button class="submit-button"
            onClick={() => {this.submitData()}}>
          Submit</button>
      </React.Fragment>
    );
  }
}