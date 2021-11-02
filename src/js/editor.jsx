import React from "react";
import Dialog from "./dialog.jsx";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.endpoint = 'http://localhost:4000/blocks';
    this.page = document.getElementById('page');
    this.pageId = page.dataset.page;

    this.state = {
      modalOpen: false
    };
  }

  showDialog = () => {
    this.setState({modalOpen: true});
  }

  closeDialog = () => {
    this.setState({modalOpen: false});
  }

  prepareData = (data) => {
    const blockData = {
      page: this.pageId,
      blockId: this.props.blockId,
      blockType: this.props.blockType,
      fieldId: this.props.fieldId,
      fieldType: this.props.fieldType,
      fieldInput: data,
    }

    this.postData(blockData)
  }

  postData(data) {
    fetch(this.endpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then((res) => {
      setTimeout(() => {
        window.location.reload();
      }, 400);
    })
    .catch((res) => {
      console.log(res)
    })
  }


  render() {
    return (
      <React.Fragment>
        <div class="editor-trigger" onClick={this.showDialog}></div>
        <Dialog {...this.props}
            modalOpen={this.state.modalOpen}
            closeDialog={this.closeDialog} 
            prepareData={this.prepareData} />
      </React.Fragment>
    );
  }
}