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

  addSection = () => {
    const data = {
      page: this.props.pageId,
    }

    this.props.postData(data, 'add-section')
  }

  deleteSection = (index, order) => {
    const data = {
      index: index,
      page: this.props.pageId,
    }

    this.props.postData(data, 'delete-section')
  }

  orderBlock = (index, order) => {
    const data = {
      index: index,
      order: order,
      page: this.props.pageId,
    }

    this.props.postData(data, 'order-section')
  }

  render() {
    const props = {
      addSection: this.addSection,
      closeModal: this.closeModal,
      deleteSection: this.deleteSection,
      orderBlock: this.orderBlock,
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