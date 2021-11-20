import React from "react";
import Modal from "./modal.jsx";
import SectionFooter from "./triggers/section-footer.jsx";
import SectionSidebar from "./triggers/section-sidebar.jsx";

export default class SectionEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: this.props.view,
    };
  }

  addBlock = (type, index) => {
    const data = {
      sectionIndex: index,
      operation: 'add',
      page: this.props.pageId,
      blockType: type,
    }

    this.props.postData(data, 'block')
  }

  addSection = () => {
    const data = {
      operation: 'add',
      page: this.props.pageId,
    }

    this.props.postData(data, 'section')
  }

  deleteSection = (index, order) => {
    const data = {
      sectionIndex: index,
      operation: 'delete',
      page: this.props.pageId,
    }

    this.props.postData(data, 'section')
  }

  orderSection = (index, order) => {
    const data = {
      sectionIndex: index,
      order: order,
      operation: 'order',
      page: this.props.pageId,
    }

    this.props.postData(data, 'section')
  }

  render() {
    const props = {
      addBlock: this.addBlock,
      addSection: this.addSection,
      closeModal: this.closeModal,
      deleteSection: this.deleteSection,
      orderSection: this.orderSection,
      showModal: this.showModal,
      ...this.props
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
      </React.Fragment>
    );
  }
}