import React from "react";

export default class AddPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      text: unescape(this.props.value),
    };
  }

  addPage = () => {
    this.props.addPage(this.state.text);
  }  

  setText = () => {
    this.setState({text: event.target.value});
  }  

  deleteBlock = () => {
    this.props.deleteData(this.props.blockId);
  }  

  render() {
    return (
      <React.Fragment>
        <h3>Add a new page</h3>
        <p>Page Title</p>
        <input type="text" 
            className={`${this.state.error ? "error" : ""}`}
            onChange={this.setText}
            />
        <button onClick={this.addPage}>Add Page</button>
      </React.Fragment>
    );
  }
}