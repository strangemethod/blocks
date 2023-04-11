import React from "react";

export default class DialogPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      title: null,
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
        <h2>Add a new page</h2>
        <h3>Page Title</h3>
        <input className={`${this.state.error ? "error" : ""}`} onChange={() => {this.setTitle()}} />
        <p>Note: page title must match an image directory under /content/img.</p>
        <button onClick={() => {this.addPage()}}>Add page</button>
      </React.Fragment>
    );
  }
}