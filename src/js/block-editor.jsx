import React from "react";
import Modal from "./modal.jsx";

export default class BlockEditor extends React.Component {
  constructor(props) {
    super(props);

    this.endpoints = {
      'add': 'http://localhost:4000/add-block',
      'addPage': 'http://localhost:4000/add-page',
      'delete': 'http://localhost:4000/delete-block',
      'edit': 'http://localhost:4000/edit-block',
    }

    this.page = document.getElementById('page');
    this.pageId = page.dataset.page;

    this.state = {
      modalOpen: false
    };
  }

  // addBlock = (data) => {
  //   const blockData = {
  //     page: this.pageId,
  //     blockType: data,
  //   }

  //   this.postData(blockData, 'add')
  // }

  addPage = (title) => {
    const slug = this.cleanUrlSlug(title);

    // Post page.
    const pageData = {
      id: slug,
      title: escape(title),
    }

    this.postData(pageData, 'addPage')

    // Redirect to new page.
    setTimeout(() => {
      window.location.assign('/' + slug + '/');
    }, 1000);
  }

  cleanUrlSlug = (input) => {
    const reservedChars = [':', '/', '#', '?', '&', '@', '%', '+', '~', '"', '\''];
    let slug = input.toLowerCase().replaceAll(' ', '-');

    reservedChars.forEach((char) => {
      slug.replaceAll(char, '');
    });

    return slug;
  }

  closeModal = () => {
    this.setState({modalOpen: false});
  }

  // deleteData = (data) => {
  //   const blockData = {
  //     page: this.pageId,
  //     blockId: data,
  //   }

  //   this.postData(blockData, 'delete')
  // }

  // editBlock = (input, fieldId) => {
  //   const blockData = {
  //     page: this.pageId,
  //     blockId: this.props.blockId,
  //     fieldId: fieldId || this.props.fieldId,
  //     fieldInput: input,
  //   }

  //   this.postData(blockData, 'edit')
  // }

  // postData = (data, operation) => {
  //   fetch(this.endpoints[operation], {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     method: 'POST',
  //     body: JSON.stringify(data)
  //   })
  //   .then((res) => {
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 400);
  //   })
  //   .catch((res) => {
  //     console.log(res)
  //   })
  // }  

  showModal = () => {
    this.setState({modalOpen: true});
  }

  test = (e) => {
    e.stopPropagation();
    console.log('test');
  }

  render() {
    return (
      <React.Fragment>
        <div class="editor__icons editor__icons--bottom">
          <button class="editor__icon editor__icon--edit" onClick={this.showModal}>
            <img src="/assets/icon-edit.svg" />
          </button>
          <button class="editor__icon editor__icon--delete" onClick={this.test}>
            <img src="/assets/icon-archive.svg" />
          </button>
        </div>
        <Modal {...this.props}
            closeModal={this.closeModal} 
            modalOpen={this.state.modalOpen}
            addBlock={this.addBlock}
            addPage={this.addPage}
            deleteData={this.deleteData}
            editBlock={this.editBlock}
            postData={this.postData} />
      </React.Fragment>
    );
  }
}