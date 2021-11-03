import React from "react";

export default class EditText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      text: null,
    };
  }


  setText = () => {
    this.setState({text: event.target.value});
  }  

  submitData = () => {
    if (this.state.text) {
      this.props.prepareEditData(this.state.text);
      this.props.closeDialog();
    } else {
      this.setState({error: true});
    }
  }  


  render() {
    return (
    	<React.Fragment>
      	<p>Edit Text</p>
        <input type="text" 
            className={`${this.state.error ? "error" : ""}`}
            onChange={this.setText}
            />
        <button class="submit" onClick={this.submitData}>Submit</button>
      </React.Fragment>
    );
  }
}