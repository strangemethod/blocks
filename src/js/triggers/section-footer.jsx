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
          <img src="/assets/icon-plus-circle.svg" />
        </button>
      </React.Fragment>
    );
  }
}

