import React from "react";

export default class ButtonsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <button 
              class="editor__icon editor__icon--bg editor__icon--add"
              onClick={
                  () => {this.props.openDialog('add-page')}
              }>
            <object type="image/svg+xml" data="/assets/icon-plus-circle.svg"></object>
          </button>
          Add new page
        </div>
    );
  }
}

