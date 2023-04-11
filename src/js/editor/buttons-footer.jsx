import React from "react";

export default class ButtonsFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <button 
            className="editor__icon editor__icon--bg editor__icon--add"
            onClick={() => {this.props.postSection('add')}}>
          <object type="image/svg+xml" data="/assets/icon-plus-circle.svg"></object>
          <div className="tooltip">Add new section</div>
       </button>
    );
  }
}

