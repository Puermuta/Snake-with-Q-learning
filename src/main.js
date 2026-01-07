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
    4: { r: 0, c: -1},
}

// Functions
function createSlider(sliderId, labelId, percentage = false) {
    const slider = document.getElementById(sliderId);
    const label = document.getElementById(labelId);

    if (!percentage) {
        label.textContent = slider.value;
        slider.addEventListener("input", () => {
            label.textContent = slider.value;
        });
    } else {
        label.textContent = (slider.value / slider.max).toFixed(2);
        slider.addEventListener('input', () => {
            label.textContent = (slider.value / slider.max).toFixed(2);
        });
    }
}

let active = false;
function startGame() {
    active = true;
}

//function pauseGame() { }

function stopGame() { 
    active = false;
}
function restartGame() {
    snake.reset()
    active = true;
}
 
function setPosition(position) {
    //switch (position) {
//        case "standard":
            
    //}
}

// Buttons

const start = document.getElementById("start");
//const pause = document.getElementById("pause");
const stop = document.getElementById("stop");
const restart = document.getElementById("restart");

start.addEventListener("click", startGame);
//pause.addEventListener("click", pauseGame);
stop.addEventListener("click", stopGame);
restart.addEventListener("click", restartGame);

const posStandard = document.getElementById("pos-standard");
const posRandom = document.getElementById("pos-random");
const posCustom = document.getElementById("pos-custom");

posStandard.addEventListener("click", setPosition("standard"));
posRandom.addEventListener("click", setPosition("random"));
posCustom.addEventListener("click", setPosition("custom"));

const fruitCount = document.getElementById("fruit-count");
const fruitCountLabel = document.getElementById("fruit-count-label")
fruitCount.addEventListener("input", () => {
    fruitCountLabel.textContent = fruitCount.value;
    snake.fruitCount = fruitCount.value;
});

createSlider('sim-speed', 'sim-speed-label');
createSlider('alpha', 'alpha-label', true);
createSlider('gamma', 'gamma-label', true);
createSlider('epsilon', 'epsilon-label', true);

// Main loop
while (true) {
    if (active) {
        snake.move();
        await delay(1000 / simSpeed.value);

        // Temporary code for demonstration purposes. Will connect to backend later.
        let choice = directions[Math.floor(Math.random() * 4 + 1)]
        if (Math.random() < 0.75) {snake.changeDirection(choice)}
    } else {
        await delay(100);
    }
}