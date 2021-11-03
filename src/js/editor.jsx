import React from "react";
import Dialog from "./dialog.jsx";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.endpoints = {
      'add': 'http://localhost:4000/add-block',
      'delete': 'http://localhost:4000/delete-block',
      'edit': 'http://localhost:4000/edit-block',
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

  addData = (data) => {
    const blockData = {
      page: this.pageId,
      blockType: data,
    }

    this.postData(blockData, 'add')
  }

  deleteData = (data) => {
    const blockData = {
      page: this.pageId,
      blockId: data,
    }

    this.postData(blockData, 'delete')
  }

  editData = (data) => {
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

  deletBlock = (blockId) => {
    console.log(blockId);
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
            addData={this.addData}
            deleteData={this.deleteData}
            editData={this.editData}
            postData={this.postData} />
      </React.Fragment>
    );
  }
}