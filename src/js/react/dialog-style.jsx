import React from "react";


export default class DialogStyle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: {
        margin: this.props.margin,
        width: this.props.width
      }
    };
  }

  setMargin = (event) => {
    const styles = this.state.styles;
    styles.margin = event.target.value;

    this.setState(styles);
  }

  setWidth = (event) => {
    const styles = this.state.styles;
    styles.width = event.target.value;

    this.setState(styles);
  }

  submitStyles = async() => {
    const data = {
      index: this.props.index,
      page: this.props.page,
      styles: this.state.styles
    }

    const s3Data = await this.props.postData(data, 'edit-block');
    this.props.refreshPage();
  }

  render() {
    return (
      <React.Fragment>
        <div className={`${this.props.open ? "open" : ""} sidebar`} >
          <div className="sidebar-header">
            <h3>{this.props.type} Block Style</h3>
            <div className="button button-low" onClick={() => (this.props.toggleSidebar())}>Back</div>
            <div className="button button-primary" onClick={() => (this.submitStyles())}>Submit</div>
          </div>
          <div className="sidebar-form">
            {this.props.type === 'image' &&
              <React.Fragment>
                <h3>Grid Width</h3>
                 <select value={this.state.styles.width} onChange={this.setWidth}>
                    <option value="8">8 columns</option>
                    <option value="10">10 columns</option>
                    <option value="12">12 columns</option>
                    <option value="full">Full bleed</option>
                  </select>
                <h3>Vertical Spacing</h3>
                 <select value={this.state.styles.margin} onChange={this.setMargin}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
              </React.Fragment>
            }
            {this.props.type === 'text' &&
              <div>
                Edit image styles here.
                - Grid width
                - Text hierarchy
              </div>
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}