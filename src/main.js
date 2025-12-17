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

const simSpeed = document.getElementById("sim-speed");
const simSpeedLabel = document.getElementById("sim-speed-label")
simSpeed.addEventListener("input", () => { simSpeedLabel.textContent = simSpeed.value; });

const fruitCount = document.getElementById("fruit-count");
const fruitCountLabel = document.getElementById("fruit-count-label")
fruitCount.addEventListener("input", () => {
    fruitCountLabel.textContent = fruitCount.value;
    snake.fruitCount = fruitCount.value;
    console.log(snake.fruitCount);
});

const alpha = document.getElementById("alpha");
const alphaLabel = document.getElementById("alpha-label")
alpha.addEventListener("input", () => { alphaLabel.textContent = alpha.value / alpha.max; });

const gamma = document.getElementById("gamma");
const gammaLabel = document.getElementById("gamma-label")
gamma.addEventListener("input", () => { gammaLabel.textContent = gamma.value / gamma.max; });

const epsilon = document.getElementById("epsilon");
const epsilonLabel = document.getElementById("epsilon-label")
epsilon.addEventListener("input", () => { epsilonLabel.textContent = epsilon.value / epsilon.max; });



while (true) {
    if (active) {
        snake.move();
        await delay(1000 / simSpeed.value);
        let choice = directions[Math.floor(Math.random() * 4 + 1)]
        if (Math.random() < 0.75) {
            snake.changeDirection(choice)
        }
    } else {
        await delay(100);
    }
}