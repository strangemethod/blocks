import React from "react";

export default class SectionFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <button 
            class="editor__icon editor__icon--bg editor__icon--add"
            onClick={this.props.addSection}
            title="Add new section">
          <object type="image/svg+xml" data="/assets/icon-plus-circle.svg"></object>
        </button>
      </React.Fragment>
    );
  }
}

