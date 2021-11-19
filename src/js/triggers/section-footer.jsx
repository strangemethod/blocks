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
            onClick={this.props.addSection}>
          <object type="image/svg+xml" data="/assets/icon-plus-circle.svg"></object>
          <div class="tooltip">Add new section</div>
       </button>
      </React.Fragment>
    );
  }
}

