let timer;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let laps = [];
let lapCounter = 1;

const minuteDisplay = document.querySelector('.minute');
const secondDisplay = document.querySelector('.second');
const msecDisplay = document.querySelector('.msec');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsContainer = document.querySelector('.laps');
const clearLapsButton = document.getElementById('clearLapsButton');

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    startStopButton.textContent = 'Start';
    updateDisplay(0, 0, 0);
    laps = [];
    lapCounter = 1;
    lapsContainer.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = elapsedTime;
        laps.push(lapTime);
        displayLap(lapTime);
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    updateDisplay(minutes, seconds, milliseconds);
}

function updateDisplay(minutes, seconds, milliseconds) {
    minuteDisplay.textContent = pad(minutes) + ' :';
    secondDisplay.textContent = pad(seconds) + ' :';
    msecDisplay.textContent = pad(milliseconds);
}

function displayLap(lapTime) {
    const minutes = Math.floor((lapTime / (1000 * 60)) % 60);
    const seconds = Math.floor((lapTime / 1000) % 60);
    const milliseconds = Math.floor((lapTime % 1000) / 10);

    const lapItem = document.createElement('li');
    lapItem.classList.add('lap-item');
    lapItem.innerHTML = `
        <span class="number">#${lapCounter++}</span>
        <span class="time-stamp">${pad(minutes)} : ${pad(seconds)} : ${pad(milliseconds)}</span>
    `;
    lapsContainer.insertBefore(lapItem, clearLapsButton);
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}
