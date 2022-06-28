import React from "react";

export default class ButtonsFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <button 
            class="editor__icon editor__icon--bg editor__icon--add"
            onClick={
                () => {this.props.addSection()}
            }>
          <object type="image/svg+xml" data="/assets/icon-plus-circle.svg"></object>
          <div class="tooltip">Add new section</div>
       </button>
    );
  }
}

