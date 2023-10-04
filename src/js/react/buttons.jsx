import React from "react";

export default class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteBlock = async() => {
    const data = {
      index: this.props.index,
      page: this.props.page
    }
    const s3Data = await this.props.postData(data, 'delete-block');
    this.props.refreshPage();
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
          <button className="block-buttons-button" onClick={() => {this.deleteBlock()}}>
            <object type="image/svg+xml" data="/assets/icon-archive.svg" className="button-filter-none"></object>
            <div className="tooltip">Delete</div>
          </button>
          <button className="block-buttons-button" onClick={() => {this.orderBlock(1)}}>
            <object type="image/svg+xml" data="/assets/icon-arrow-down.svg" className="button-icon-large"></object>
            <div className="tooltip">Move down</div>
          </button>
        </div>
        <div className="block-buttons-set block-buttons-bottom">
          <button className="block-buttons-button">
            <object type="image/svg+xml" data="/assets/icon-edit.svg"></object>
            <div className="tooltip">Edit Content</div>
          </button>
          <button className="block-buttons-button">
            <object type="image/svg+xml" data="/assets/icon-palette.svg"></object>
            <div className="tooltip">Styles</div>
          </button>
        </div>
      </div>
    );
  }
}