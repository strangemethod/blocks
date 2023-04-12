import {SELECTORS} from "../constants.js"

export default class ResizeGrid {
	constructor(grid) {
		this.grid = grid;
		this.resizeHandles = grid.querySelectorAll(SELECTORS.grid_resize);
		// todo: recalc on window resize.
		this.gridWidth = grid.offsetWidth;
		this.gridCol;
		this.nextCol;
		this.gridColWidth;
		this.nextColWidth;
		this.dragging = false;
		this.dragStartPos;

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
	 * Mouse down handler.
	 */
	handleMouseDown(e) {
		if (e.target.classList.contains(SELECTORS.grid_resize)) {
			this.dragging = true;    
			this.dragStartPos = e.clientX;
			
			this.gridCol = e.target.parentElement;
			const gridColFlexBasis = window.getComputedStyle(this.gridCol).flexBasis;
			this.gridColWidth = parseFloat(gridColFlexBasis) / 100.0;

			this.nextCol = this.gridCol.nextElementSibling;
			const nextColFlexBasis = window.getComputedStyle(this.nextCol).flexBasis;
			this.nextColWidth = parseFloat(nextColFlexBasis) / 100.0;
		}
	}

	/*
	 * Mouse up handler.
	 */
	handleMouseUp() {
		if (this.dragging) this.dragging = false;
	}

	/*
	 * Mouse move handler.
	 */
	handleMouseMove(e) {
		if (this.dragging) {
			const positionDelta = e.clientX - this.dragStartPos;
			const percentDelta = (positionDelta / this.gridWidth);
			const gridColWidthNew = (this.gridColWidth + percentDelta) * 100 + '%';
			const nextColWidthNew = (this.nextColWidth - percentDelta) * 100 + '%';

			this.gridCol.style.flexBasis = gridColWidthNew;
			this.nextCol.style.flexBasis = nextColWidthNew;
		}
	}
};
