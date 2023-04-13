import React from "react";
import * as ReactDOM from 'react-dom';
import {SELECTORS} from "../constants.js"

export default class GridResize extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      col: null,
      colCount: 12,
      colPercent: (1 / 12) * 100,
      colWidth: null,
      dragging: false,
      dragStartPos: null,
      grid: null,
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
    // todo: recalc on resize
    const gridWidth = grid.offsetWidth;
    const nextCol = col.nextElementSibling;

    this.setState({
      col,
      grid,
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
    const newColWidth = this.getNearestCol(this.state.newColWidth) * this.state.colPercent;
    const newNextColWidth = this.getNearestCol(this.state.newNextColWidth) * this.state.colPercent;

    // Update column widths with inline style.
    this.state.col.style.flexBasis = `${newColWidth}%`;
    this.state.nextCol.style.flexBasis = `${newNextColWidth}%`;
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