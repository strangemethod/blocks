import React from "react";
import {SELECTORS} from "../constants.js"

export default class EditMode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      foo: 0,
    };
  }

  toggleEditMode() {
    this.setState({editMode: !this.state.editMode});
    this.setState({foo: this.state.foo + 1});

    this.props.mergeState({'foo': this.state.foo});

    // Class toggle needed to show non-react UI elements.
    this.props.pageElement.classList.toggle(SELECTORS.edit_mode);
  }

  render() {
    var gridCols = [];
    for (let i = 0; i < 12; i++) {
      gridCols.push(<div className="grid-col grid-col--1" key={i}></div>);
    }

    return (
      <React.Fragment>
        <button 
            className="editor__icon editor__icon--edit editor__icon--large"
            onClick={() => {this.toggleEditMode()}}>
          <object type="image/svg+xml" data="/assets/icon-edit.svg"></object>
          <div className="editor__tooltip">Toggle Edit Mode</div>
        </button>
        {this.state.editMode && 
          <div className="editor__grid">
            {gridCols}
          </div>
        }
      </React.Fragment>
    );
  }
}