import React from "react";
import {ENDPOINTS, SELECTORS} from "../constants.js"

export default class EditMode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };
  }

  /*
   * Post changes in state store to API.
   */
  saveChanges() {
    const data = {
      page: this.props.pageId,
      data: this.props.getState(),
    }

    this.props.postData(data, ENDPOINTS.edit_block);
    this.toggleEditMode();
  }

  toggleEditMode() {
    this.setState({editMode: !this.state.editMode});

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
        {!this.state.editMode && 
          <button 
              className="editor__icon editor__icon--edit editor__icon--large"
              onClick={() => {this.toggleEditMode()}}>
            <object type="image/svg+xml" data="/assets/icon-edit.svg"></object>
            <div className="editor__tooltip">Enable Edit Mode</div>
          </button>
        }
        {this.state.editMode &&
          <React.Fragment>
            <button 
                className="editor__icon editor__icon--close editor__icon--large"
                onClick={() => {this.toggleEditMode()}}>
              <object type="image/svg+xml" data="/assets/icon-close.svg"></object>
              <div className="editor__tooltip">Leave Edit Mode</div>
            </button>
            <button 
                className="editor__icon editor__icon--save editor__icon--large"
                onClick={() => {this.saveChanges()}}>
              <object type="image/svg+xml" data="/assets/icon-save.svg"></object>
              <div className="editor__tooltip">Save Changes</div>
            </button>
            <div className="editor__grid">
              {gridCols}
            </div>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}