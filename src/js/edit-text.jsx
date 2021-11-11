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
      this.props.editData(this.state.text);
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
      	<p>Edit Text</p>
        <input type="text" 
            value={this.state.text}
            className={`${this.state.error ? "error" : ""}`}
            onChange={this.setText}
            />
        <button onClick={this.submitData}>Submit</button>
      </React.Fragment>
    );
  }
}