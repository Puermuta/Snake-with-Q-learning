/**
 * Represents a 2D grid of cells rendered into a DOM container.
 *
 * The Grid class manages:
 *  - A 2D matrix of cell values (this.grid)
 *  - A flat array of DOM cell elements (this.cells)
 *  - Rendering the grid structure inside a container element
 *  - Updating visual cells based on logical values
 *  - Bulk updates through setCells()
 *  - Grid reset functionality
 *
 * Each cell can store an arbitrary string or number, which is used
 * both for internal game logic and for applying CSS classes to the DOM.
 *
 * Required usage:
 *  1. Pass row count, column count, and a DOM container to constructor.
 *  2. Call setCell(r, c, value) to update grid state and DOM.
 *  3. Use getCellValue() for logic lookup (e.g., snake, fruit, empty).
 *  4. Use reset() to clear the entire board.
 *
 * Public Methods:
 *  - getCell(r, c) → Returns the DOM element for a specific cell.
 *  - getCellValue(r, c) → Returns the logical value at (r, c).
 *  - setCell(r, c, type) → Updates the value and DOM class for a cell.
 *  - setCells(matrix) → Replaces entire grid with a 2D matrix.
 *  - reset() → Clears all cells to value 0.
 *
 * Internal Methods:
 *  - createDOM() → Builds all DOM cell elements and grid layout.
 *
 * @class
 * @param {number} rows - Number of rows in the grid.
 * @param {number} cols - Number of columns in the grid.
 * @param {HTMLElement} container - The DOM element that will contain the grid.
 */
export default class Grid {
    constructor(rows, cols, container) {
        this.rows = rows;
        this.cols = cols;
        this.container = container;
        this.grid = Array.from({ length: rows }, () => Array(cols).fill(0));
        this.cells = [];

        this.createDOM();
    }

    createDOM() {
        this.container.style.display = "grid";
        this.container.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                this.container.appendChild(cell);
                this.cells.push(cell);
            }
        }
    }

    getCell(r, c) {
        return this.cells[r * this.cols + c];
    }

    getCellValue(r, c) {
        return this.grid[r][c];
    }

    setCell(r, c, type) {
        this.grid[r][c] = type;

        const cell = this.getCell(r, c);
        cell.className = "cell";
        cell.classList.add(type);
    }

    setCells(matrix) {
        if (matrix.length != this.grid.length || matrix[0].length != this.grid[0].length) {
            throw new RangeError("Matrix is not the right dimensions.");
        } 

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.setCell(r, c, matrix[r][c]);
            }
        }
    }
    

    reset() {
        this.grid.forEach((row, r) => {
        row.forEach((_, c) => this.setCell(r, c, 0));
        });
    }
}