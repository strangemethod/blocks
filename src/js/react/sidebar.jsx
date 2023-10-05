import React from "react";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selects: new Set(),
      type: 'image',
      text: null,
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

  setBlockType = (type) => {
    this.setState({type: type});
  }

  setText = () => {
    this.setState({text: event.target.value});
  }

  submitContent = async() => {
    const data = {
      images: null,
      text: null,
      title: this.props.page,
      type: this.state.type
    }

    if (this.state.type === 'image') {
      data.images = [...this.state.selects];
    } else {
      data.text = this.state.text;
    }

    const s3Data = await this.props.postData(data, 'add-block');
    this.props.refreshPage();
  }

  render() {
    const imageForm = JSON.parse(this.props.images).map((image, idx) => {
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
            <h3>Block Content</h3>
            <div className="button button-low" onClick={() => (this.toggleSidebar())}>Back</div>
            <div className="button button-primary" onClick={() => (this.submitContent())}>Submit</div>
          </div>
          <div className="sidebar-options">
            <div className={`${this.state.type === "image" ? "button-primary" : "button-secondary"} button`} 
                onClick={() => (this.setBlockType('image'))}>
              Image
            </div>
            <div className={`${this.state.type === "text" ? "button-primary" : "button-secondary"} button`}
                onClick={() => (this.setBlockType('text'))}>
              Text
            </div>
          </div>
          {this.state.type === 'image' &&
            <div>{imageForm}</div>
          }
          {this.state.type === 'text' &&
            <div className="container">
              <textarea placeholder="Enter block text" onChange={() => {this.setText()}} ></textarea>
            </div>
          }
        </div>
      </React.Fragment>
    );
  }
}