/**
 * Represents a Snake entity in a grid-based Snake game.
 *
 * This class handles:
 *  - Maintaining the snake's body segments
 *  - Movement and direction changes
 *  - Collision detection (walls + self)
 *  - Eating fruit and growing
 *  - Scoring
 *  - Requesting fruit generation from the Grid
 *  - Rendering its initial state onto the Grid
 *
 * The Snake operates on a provided Grid instance, which must expose:
 *  - rows, cols
 *  - reset()
 *  - setCell(r, c, value)
 *  - getCellValue(r, c)
 *  - a 2D array at Grid.grid (string values)
 *
 * Public Methods:
 *  - move() → Moves the snake one step forward.
 *  - changeDirection(dir) → Updates movement direction, unless reversing.
 *  - reset() → Resets snake position, score, direction, and re-renders.
 *
 * Private Methods (internal use only):
 *  - _renderInitial() → Draws starting body + fruit onto grid.
 *  - _checkFruit(newHead) → Returns true if snake eats fruit.
 *  - _generateFruit(n) → Places n fruits in random empty cells.
 *  - _checkDeath(newHead) → Returns true if new head collides or exits bounds.
 *
 * @class
 */
export default class Snake {
    constructor(grid) {
        this.Grid = grid;
        this.score = 0;
        this.direction = { r: 1, c: 0 };
        this.fruitCount = 5
        this.body = [{
            r: 2,
            c: 1
        }, {
            r: 2,
            c: 2
        }, {
            r: 2,
            c: 3
            }];
        
        this.wrapAround = true;
        
        this._renderInitial();
    }

    _renderInitial() {
        this.Grid.reset();
        this._generateFruit(this.fruitCount);
        this.body.forEach(cell => {
            this.Grid.setCell(cell.r, cell.c, "snake");
        })
    }

    move() {
        const head = this.body[0]
        let newHead = {
                r: (head.r + this.direction.r),
                c: (head.c + this.direction.c)
        };
        
        if (this.wrapAround) {
                newHead = {
                r: (newHead.r + this.Grid.rows) % this.Grid.rows,
                c: (newHead.c + this.Grid.cols) % this.Grid.cols
            }
        }
        

        const dead = this._checkDeath(newHead);
        if (dead) {
            this.reset()
            return
        }

        const ateFruit = this._checkFruit(newHead);
        this.body.unshift(newHead);

        if (!ateFruit) {
            const tail = this.body.pop();
            this.Grid.setCell(tail.r, tail.c, 0);
        }

        this.Grid.setCell(newHead.r, newHead.c, 'snake');
    }

    changeDirection(direction) {
        if (
            this.direction.r + direction.r != 0 &&
            this.direction.c + direction.c != 0
        ) {
            this.direction = direction;
        }
    }

    reset() {
        this.score = 0
        this.direction = { r: 1, c: 0 }
        this.body = [{
            r: 2,
            c: 1
        }, {
            r: 2,
            c: 2
        }, {
            r: 2,
            c: 3
            }]

        this._renderInitial();
    }

    _checkFruit(newHead) {
        const headCell = this.Grid.getCellValue(newHead.r, newHead.c);
        if (headCell == "fruit") {
            this.score++;
            this._generateFruit(1);
            return true;
        }
        return false;
    }

    _generateFruit(n) {
        // generate new fruit somewhere
        let emptyCells = []
        for (let r = 0; r < this.Grid.rows; r++) {
            for (let c = 0; c < this.Grid.cols; c++) {
                if (this.Grid.grid[r][c] == "0") {
                    emptyCells.push({ r, c });
                }
            }
        }
        for (let i = 0; i < n; i++) {
            if (emptyCells.length != 0) {
                const randomIndex = Math.floor(Math.random() * emptyCells.length);
                const { r, c } = emptyCells[randomIndex];
                this.Grid.setCell(r, c, 'fruit');

                emptyCells.splice(randomIndex, 1);
            } else {
                break
            }
        }
    }

    _checkDeath(newHead) {
        return (
            newHead.r < 0 || newHead.r >= this.Grid.rows ||
            newHead.c < 0 || newHead.c >= this.Grid.cols ||
            this.Grid.getCellValue(newHead.r, newHead.c) == "snake"
        )
    }
}