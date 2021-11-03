import React from "react";
import Dialog from "./dialog.jsx";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.endpoints = {
      add: 'http://localhost:4000/add-block',
      edit: 'http://localhost:4000/edit-block',
    }

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

  prepareAddData = (data) => {
    const blockData = {
      page: this.pageId,
      blockType: data,
    }

    this.postData(blockData, 'add')
  }


  prepareEditData = (data) => {
    const blockData = {
      page: this.pageId,
      blockId: this.props.blockId,
      blockType: this.props.blockType,
      fieldId: this.props.fieldId,
      fieldType: this.props.fieldType,
      fieldInput: data,
    }

    this.postData(blockData, 'edit')
  }

  postData = (data, operation) => {
    fetch(this.endpoints[operation], {
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
            closeDialog={this.closeDialog} 
            modalOpen={this.state.modalOpen}
            prepareAddData={this.prepareAddData}
            prepareEditData={this.prepareEditData}
            postData={this.postData} />
      </React.Fragment>
    );
  }
}