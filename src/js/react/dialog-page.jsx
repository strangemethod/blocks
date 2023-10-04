import React from "react";


export default class DialogPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bucket: null,
      error: false,
      folder: null,
      images: [],
      selects: new Set(),
      step: 1,
      title: null,
    };
  }

  changeStep = (delta) => {
    if (this.state.step === 1 && !this.state.title) {
      this.setState({error: true});
    } else {
      this.setState({
        step: this.state.step + delta,
        error: false
      });
    }
  }

  deselectAll = () => {
    this.setState({selects: new Set()});
  }

  getS3Data = async() => {
    const requestData = {
      'bucket': this.state.bucket,
      'folder': this.state.folder,
    }
    const s3Data = await this.props.postData(requestData, 'get-s3-bucket');
    const bucketPath = `https://${this.state.bucket}.s3-us-west-1.amazonaws.com/`;

    const images = s3Data.filter(file => {
      return file.Key && file.Key.endsWith('jpg');
    }).map(file => {
      return bucketPath + file.Key;
    })

    this.setState({images: images});
  }

  selectAll = () => {
    const selects = new Set();
    this.state.images.forEach(image => selects.add(image));
    this.setState({selects: selects});
  }

  setBucket = () => {
    this.setState({bucket: event.target.value});
  }

  setFolder = () => {
    this.setState({folder: event.target.value});
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
      title: this.state.title,
    }

    await this.props.postData(data, 'add-page');
    // this.props.refreshPage();
  }

  setTitle = () => {
    this.setState({title: event.target.value});
  }

  render() {
    const headline = this.state.images.length ? 'Select Images' : 'Import Images';
    const images = this.state.images.map((image, idx) => {
      const selectedClass = this.state.selects.has(image) ? 'selected' : '';
      return (
        <div key={idx} className="grid-col grid-col--3">
          <div className={`${selectedClass} image-select`}>
            <img src={image} onClick={() => {this.selectImage()}} />
          </div>
        </div>
      )
    });

    return (
      <React.Fragment>
        {this.state.step === 1 &&
          <div>
            <h2>Add a new page</h2>
            <input className={`${this.state.error ? "error" : ""}`} onChange={() => {this.setTitle()}} placeholder="Page Title" />
            <button className="button button-primary" onClick={() => {this.changeStep(1)}}>Next</button>
          </div>
        }
        {this.state.step === 2 &&
          <div>
            <h2>{headline}</h2>
            {!this.state.images.length &&
              <div>
                <input className={`${this.state.error ? "error" : ""}`} onChange={() => {this.setBucket()}} placeholder="S3 Bucket Name" />
                <input className={`${this.state.error ? "error" : ""}`} onChange={() => {this.setFolder()}} placeholder="S3 Folder Name" />
                <a className="button button-low" onClick={() => {this.changeStep(-1)}}>Back</a>
                <button className="button button-primary" onClick={() => {this.getS3Data()}}>Get images</button>
              </div>
            }
            {this.state.images.length > 0 &&
              <div>
                <button className="button button-primary" onClick={() => {this.selectAll()}}>Select All</button>
                <button className="button button-primary" onClick={() => {this.deselectAll()}}>Deselect All</button>
                <div className="grid justify-start">
                  {images}
                </div>
                <button className="button button-primary" onClick={() => {this.submitImageSelection()}}>Next</button>
              </div>
            }
          </div>
        }
      </React.Fragment>
    );
  }
}