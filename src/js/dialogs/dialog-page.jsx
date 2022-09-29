import React from "react";

export default class DialogPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      text: unescape(this.props.value),
    };
  }

  addPage = () => {
    if (this.state.title) {
      this.props.postData({'title': this.state.title}, 'add-page');
      this.props.closeDialog();
    } else {
      this.setState({error: true});
    }
  }  

  setTitle = () => {
    this.setState({title: event.target.value});
  }  

  render() {
    return (
      <React.Fragment>
        <h3>Add a new page</h3>
        <p>Page Title</p>
        <input type="text" 
            className={`${this.state.error ? "error" : ""}`}
            onChange={this.setTitle}
            />
        <button onClick={this.addPage}>Add Page</button>
      </React.Fragment>
    );
  }
}