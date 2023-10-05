import React from "react";


export default class DialogStyle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  setText = () => {
    this.setState({text: event.target.value});
  }

  render() {
    return (
      <React.Fragment>
        <div className={`${this.props.open ? "open" : ""} sidebar`} >
          <div className="sidebar-header">
            <h3>Block Style</h3>
            <div className="button button-low" onClick={() => (this.props.toggleSidebar())}>Back</div>
            <div className="button button-primary" onClick={() => (this.submitContent())}>Submit</div>
          </div>
          <div className="sidebar-options">
            Edit styles here.
            - Grid width
            - Vertical Spacing
            - Text hierarchy
          </div>
        </div>
      </React.Fragment>
    );
  }
}