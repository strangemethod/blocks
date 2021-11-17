import React from "react";

export default class AddMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <h2>Add a Block</h2>
        <button
            onClick={() => {this.props.setFieldType('image')}}>Add Image Block</button>
        <button 
            onClick={() => {this.props.setFieldType('text')}}>Add Text Block</button>
      </React.Fragment>
    );
  }
}

