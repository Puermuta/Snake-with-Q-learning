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