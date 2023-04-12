import {SELECTORS} from "../constants.js"

export default class ResizeGrid {
	constructor(grid) {
		this.dragging = false;
		this.dragStartPos;
		this.col;
		this.colCount = 12;
		this.colPercent = (1 / this.colCount) * 100;
		this.colWidth;
		this.grid = grid;
		// todo: recalc on window resize.
		this.gridWidth = grid.offsetWidth;
		this.newNextCol;
		this.newNextColWidth;
		this.nextCol;
		this.nextColWidth;
		this.resizeHandles = grid.querySelectorAll(SELECTORS.grid_resize);

		this.bindEventListeners();
	}


	/*
	 * Bind mouse events
	 */
	bindEventListeners() {
		this.grid.addEventListener("mousedown", (e) => {
			this.handleMouseDown(e);
		});

		this.grid.addEventListener("mouseup", () => {
			this.handleMouseUp();
		});

		this.grid.addEventListener("mousemove", (e) => {
			this.handleMouseMove(e);
		});
	}

	/* 
	 * Get Nearest column number to current percentage-based position.
	 */
	getNearestCol(width) {
		return Math.round(width / this.colPercent);
	}

	/*
	 * Mouse down handler.
	 */
	handleMouseDown(e) {
		if (e.target.classList.contains(SELECTORS.grid_resize)) {
			this.dragging = true;    
			this.dragStartPos = e.clientX;
			
			this.col = e.target.parentElement;
			const colFlexBasis = window.getComputedStyle(this.col).flexBasis;
			this.colWidth = parseFloat(colFlexBasis) / 100.0;

			this.nextCol = this.col.nextElementSibling;
			const nextColFlexBasis = window.getComputedStyle(this.nextCol).flexBasis;
			this.nextColWidth = parseFloat(nextColFlexBasis) / 100.0;
		}
	}

	/*
	 * Mouse up handler.
	 */
	handleMouseUp() {
		if (this.dragging) this.dragging = false;
		// Snap to nearest column;
		this.newColWidth = this.getNearestCol(this.newColWidth) * this.colPercent;
		this.newNextColWidth = this.getNearestCol(this.newNextColWidth) * this.colPercent;
		
		// Update column widths with inline style.
		this.col.style.flexBasis = `${this.newColWidth}%`;
		this.nextCol.style.flexBasis = `${this.newNextColWidth}%`;
	}

	/*
	 * Mouse move handler.
	 */
	handleMouseMove(e) {
		if (this.dragging) {
			const positionDelta = e.clientX - this.dragStartPos;
			const percentDelta = (positionDelta / this.gridWidth);
			this.newColWidth = (this.colWidth + percentDelta) * 100;
			this.newNextColWidth = (this.nextColWidth - percentDelta) * 100;

			// Update column widths with inline style.
			this.col.style.flexBasis = `${this.newColWidth}%`;
			this.nextCol.style.flexBasis = `${this.newNextColWidth}%`;
		}
	}
};
