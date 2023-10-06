import React from "react";
import Sidebar from "./sidebar.jsx";

export default class Buttons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styleDialog: false
    };
  }

  deleteBlock = async() => {
    const data = {
      index: this.props.index,
      page: this.props.page
    }
    const s3Data = await this.props.postData(data, 'delete-block');
    this.props.refreshPage();
  }

  openStyleDialog = () => {
    this.setState({
      styleDialog: true
    });
  }

  orderBlock = async(delta) => {
    const data = {
      index: this.props.index,
      delta: delta,
      page: this.props.page
    }
    const s3Data = await this.props.postData(data, 'order-block');
    this.props.refreshPage();
  }

  render() {
    return (
      <div className="block-buttons">
        <div className="block-buttons-set block-buttons-side">
          <button className="block-buttons-button" onClick={() => {this.orderBlock(-1)}}>
            <object type="image/svg+xml" data="/assets/icon-arrow-up.svg" className="button-icon-large"></object>
            <div className="tooltip">Move up</div>
          </button>
          <button className="block-buttons-button" onClick={() => {this.orderBlock(1)}}>
            <object type="image/svg+xml" data="/assets/icon-arrow-down.svg" className="button-icon-large"></object>
            <div className="tooltip">Move down</div>
          </button>
        </div>
        <div className={`${this.state.styleDialog ? "open" : ""} block-buttons-set block-buttons-bottom`}>
          <button className="block-buttons-button">
            <object type="image/svg+xml" data="/assets/icon-edit.svg"></object>
            <div className="tooltip">Edit Content</div>
          </button>
          <button className="block-buttons-button" onClick={() => {this.openStyleDialog()}}>
            <object type="image/svg+xml" data="/assets/icon-palette.svg"></object>
            <div className="tooltip">Styles</div>
            <Sidebar {...this.props} open={this.state.styleDialog} dialog="style"/>
          </button>
          <button className="block-buttons-button" onClick={() => {this.deleteBlock()}}>
            <object type="image/svg+xml" data="/assets/icon-archive.svg" className="button-filter-none"></object>
            <div className="tooltip">Delete</div>
          </button>
        </div>
      </div>
    );
  }
}