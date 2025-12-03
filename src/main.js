import Grid from './components/grid.js';
import Snake from './components/snake.js';
import delay from './components/delay.js';

let snake_container = document.getElementById("snake_game");
let grid = new Grid(10, 10, snake_container);

let snake = new Snake(grid);

let directions = {
    1: { r: 1, c: 0 },
    2: { r: 0, c: 1 },
    3: { r: -1, c: 0 },
    4: {r: 0, c: -1},
}

while (true) {
    snake.move();
    await delay(200);
    let choice = directions[Math.floor(Math.random() * 4 + 1)]
    if (Math.random() < 0.75) {
        snake.changeDirection(choice)
    }
}