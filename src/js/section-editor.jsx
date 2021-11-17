import React from "react";
import Modal from "./modal.jsx";
import SectionFooter from "./triggers/section-footer.jsx";
import SectionSidebar from "./triggers/section-sidebar.jsx";

export default class SectionEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      view: this.props.view,
    };
  }

  // addBlock = (data) => {
  //   const blockData = {
  //     page: this.pageId,
  //     blockType: data,
  //   }

  //   this.postData(blockData, 'add')
  // }

  addSection = () => {
    const data = {
      page: this.props.pageId,
    }

    this.props.postData(data, 'add-section')
  }

  // addPage = (title) => {
  //   const slug = this.cleanUrlSlug(title);

  //   // Post page.
  //   const pageData = {
  //     id: slug,
  //     title: escape(title),
  //   }

  //   this.postData(pageData, 'addPage')

  //   // Redirect to new page.
  //   setTimeout(() => {
  //     window.location.assign('/' + slug + '/');
  //   }, 1000);
  // }

  // cleanUrlSlug = (input) => {
  //   const reservedChars = [':', '/', '#', '?', '&', '@', '%', '+', '~', '"', '\''];
  //   let slug = input.toLowerCase().replaceAll(' ', '-');

  //   reservedChars.forEach((char) => {
  //     slug.replaceAll(char, '');
  //   });

  //   return slug;
  // }

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

  orderBlock = (value) => {
    console.log(value);
  }

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

  showModal= () => {
    this.setState({modalOpen: true});
  }

  test = (e) => {
    e.stopPropagation();
    console.log('test');
  }

  render() {
    const props = {
      addSection: this.addSection,
      closeModal: this.closeModal,
      showModal: this.showModal,
    }

    let triggers;
    switch (this.state.view) {
      case 'footer':
        triggers = <SectionFooter {...props} />
        break;
      case 'sidebar':
        triggers = <SectionSidebar {...props} />
        break;
    }

    return (
      <React.Fragment>
        {triggers}
        <Modal 
            {...props}
            modalOpen={this.state.modalOpen}
            operation="add-section" />
      </React.Fragment>
    );
  }
}