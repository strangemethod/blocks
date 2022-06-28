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
      this.props.editBlock(this.state.text);
      this.props.closeModal();
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
        <h2>Text Block</h2>
        <textarea
            className={`${this.state.error ? "error" : ""}`}
            onChange={() => {this.setText()}}
        >
          {this.state.text}
        </textarea>
        <button class="submit-button"
            onClick={() => {this.props.submitBlock()}} >
          Submit</button>
      </React.Fragment>
    );
  }
}