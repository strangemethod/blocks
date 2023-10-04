import React from "react";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selects: new Set()
    };
  }

  toggleSidebar = () => {
    this.setState({
      open: !this.state.open
    });
  }

  selectImage = () => {
    const selects = this.state.selects;

    if (selects.has(event.target.src)) {
      selects.delete(event.target.src);
    } else {
      selects.add(event.target.src);
    }

    this.setState({selects: selects});
  }

  submitImageSelection = async() => {
    const data = {
      images: [...this.state.selects],
      title: this.props.page
    }

    const s3Data = await this.props.postData(data, 'add-block');
    this.props.refreshPage();
  }

  render() {
    const images = JSON.parse(this.props.images).map((image, idx) => {
      const selectedClass = this.state.selects.has(image) ? 'selected' : '';
      return (
        <div className={`${selectedClass} image-select`} key={idx}>
          <img src={image} onClick={() => {this.selectImage()}} />
        </div>
      )
    });

    return (
      <React.Fragment>
        <h2 className="sidebar-cta" onClick={() => (this.toggleSidebar())}>
          Add new block
        </h2>
        <div className={`${this.state.open ? "open" : ""} sidebar`} >
          <div className="sidebar-header">
            <h3>Select Images</h3>
            <div className="button button-low" onClick={() => (this.toggleSidebar())}>Back</div>
            <div className="button button-primary" onClick={() => (this.submitImageSelection())}>Select</div>
          </div>
          {images}
        </div>
      </React.Fragment>
    );
  }
}