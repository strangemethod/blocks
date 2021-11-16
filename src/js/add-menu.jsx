import React from "react";

export default class AddMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <h2>Add a New Block</h2>
        <ul class="button-list">
          <li>
            <button class="block-button" onClick={() => {this.props.setFieldType('image')}}>Add Image Block</button>
          </li>
          <li>
            <button class="block-button" onClick={() => {this.props.setFieldType('text')}}>Add Text Block</button>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

