import React from "react";

export default class EditText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      text: unescape(this.props.value),
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
        <button onClick={() => {this.props.setFieldType(null)}}>Back</button>
        <h2>Text Block</h2>
        <input type="text" 
            value={this.state.text}
            className={`${this.state.error ? "error" : ""}`}
            onChange={this.setText}
            />
        <button class="submit-button" onClick={this.submitData}>Submit</button>
      </React.Fragment>
    );
  }
}