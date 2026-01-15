import Grid from './components/grid.js';
import Snake from './components/snake.js';
import delay from './components/delay.js';

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

function createSelection(spanId, selector, selectedIdx = 0) {
    const buttons = document.querySelectorAll(selector);
    const span = document.getElementById(spanId);
    
    buttons.forEach((btn, i) => {
        if (i == selectedIdx) {
            btn.classList.add('selected');
            span.textContent = btn.textContent;
        }
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('selected'));

            btn.classList.add('selected');
            span.textContent = btn.textContent;
        })
    })
}

let active = false;
function startGame() {
    active = true;
}

//function pauseGame() { }

function stopGame() { 
    active = false;
}
function resetGame() {
    snake.reset()
    active = false;
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
const reset = document.getElementById("reset");

start.addEventListener("click", startGame);
//pause.addEventListener("click", pauseGame);
stop.addEventListener("click", stopGame);
reset.addEventListener("click", resetGame);

/*
posStandard.addEventListener("click", setPosition("standard"));
posRandom.addEventListener("click", setPosition("random"));
posCustom.addEventListener("click", setPosition("custom"));
*/

// Selections
createSelection('starting-position', '.pos-selection', 0);
createSelection('border-mode', '.bm-selection', 1);

// Sliders
createSlider('fruit-count', 'fruit-count-label');
createSlider('sim-speed', 'sim-speed-label');
createSlider('alpha', 'alpha-label', true);
createSlider('gamma', 'gamma-label', true);
createSlider('epsilon', 'epsilon-label', true);

// Game logic
const fruitCount = document.getElementById('fruit-count');

let snake_container = document.getElementById("snake_game");
let grid = new Grid(10, 10, snake_container);
let snake = new Snake(grid, fruitCount.value);

fruitCount.addEventListener("input", () => {
    snake.fruitCount = fruitCount.value;
});


let directions = {
    1: { r: 1, c: 0 },
    2: { r: 0, c: 1 },
    3: { r: -1, c: 0 },
    4: { r: 0, c: -1},
}

// Main loop
let simSpeed = document.getElementById('sim-speed');
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