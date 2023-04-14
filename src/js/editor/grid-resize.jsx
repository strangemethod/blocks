import React from "react";
import * as ReactDOM from 'react-dom';
import {CLASSES, SELECTORS} from "../constants.js"

export default class GridResize extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      col: null,
      cols: null,
      colCount: 12,
      colPercent: (1 / 12) * 100,
      colWidth: null,
      dragging: false,
      dragStartPos: null,
      grid: null,
      gridData: [],
      gridIndex: null,
      gridWidth: null,
      newNextCol: null,
      newNextColWidth: null,
      nextCol: null,
      nextColWidth: null,
    };
  }

 componentDidMount() {
    const col = ReactDOM.findDOMNode(this).parentNode.parentNode;
    const grid = col.parentNode;
    const gridIndex = grid.dataset.index;
    // todo: recalc on resize
    const gridWidth = grid.offsetWidth;
    const nextCol = col.nextElementSibling;

    this.updateGridData(grid);
    this.setState({
      col,
      grid,
      gridIndex,
      gridWidth,
      nextCol,
    });

    // Events that require delegation from window.
    window.addEventListener("mouseup", () => {
      if (this.state.dragging) this.handleMouseUp();
    });

    window.addEventListener("mousemove", (e) => {
      if (this.state.dragging) this.handleMouseMove(e);
    });
  }

  /* 
   * Get Nearest column number to current percentage-based position.
   */
  getNearestCol(width) {
    let col = Math.round(width / this.state.colPercent);

    if (col < 1) {
      col = 1;
    // @todo update to consider all columns
    } else if (col > this.state.colCount) {
      col = this.state.colCount;
    }

    return col;
  }

  handleMouseDown(e) {
    if (!this.state.dragging) {
      const dragging = true;
      const dragStartPos = e.clientX;
      const colFlexBasis = window.getComputedStyle(this.state.col).flexBasis;
      const colWidth = parseFloat(colFlexBasis) / 100.0;
      const nextColFlexBasis = window.getComputedStyle(this.state.nextCol).flexBasis;
      const nextColWidth = parseFloat(nextColFlexBasis) / 100.0;

      this.setState({
        dragging,
        dragStartPos,
        colWidth,
        nextColWidth,
      });
    }
  }

  handleMouseMove(e) {
    const positionDelta = e.clientX - this.state.dragStartPos;
    const percentDelta = (positionDelta / this.state.gridWidth);
    const newColWidth = (this.state.colWidth + percentDelta) * 100;
    const newNextColWidth = (this.state.nextColWidth - percentDelta) * 100;

    // Update column widths with inline style.
    this.state.col.style.flexBasis = `${newColWidth}%`;
    this.state.nextCol.style.flexBasis = `${newNextColWidth}%`;

    this.setState({
      newColWidth,
      newNextColWidth,
    });
  }

  handleMouseUp() {
   this.setState({dragging: false});

    // Snap to nearest column.
    const nearestCol = this.getNearestCol(this.state.newColWidth);
    const nearestNextCol = this.getNearestCol(this.state.newNextColWidth);
    const newColWidth = nearestCol * this.state.colPercent; 
    const newNextColWidth = nearestNextCol * this.state.colPercent;

    // Update column widths and data attributes.
    this.state.col.style.flexBasis = `${newColWidth}%`;
    this.state.nextCol.style.flexBasis = `${newNextColWidth}%`;
    this.state.col.dataset.cols = `${nearestCol}`;
    this.state.nextCol.dataset.cols = `${nearestNextCol}`;

    this.updateGridData();
    this.updateAppState();
  }

  /* 
   * Send grid edits to the app state.
   */
  updateAppState(){
    const blocksData = {};
    if (!blocksData[this.state.gridIndex]) blocksData[this.state.gridIndex] = {};
    blocksData[this.state.gridIndex].cols = this.state.gridData;
    this.props.mergeState(blocksData);
  }

  /* 
   * Get data attributes from grid columns.
   */
  updateGridData(grid=this.state.grid){
    const cols = grid.querySelectorAll(CLASSES.grid_col);
    const gridData = [...cols].map(col => col.dataset.cols);

    this.setState({
      cols,
      gridData,
    });
  }


  render() {
    var gridCols = [];
    for (let i = 0; i < 12; i++) {
      gridCols.push(<div className="grid-col grid-col--1" key={i}></div>);
    }

    return (
      <span
          className="grid-resize"
          onMouseDown={(e) => {this.handleMouseDown(e)}}>
      </span>
    );
  }
}