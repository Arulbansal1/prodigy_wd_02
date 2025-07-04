let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
	const date = new Date(ms);
	const minutes = String(date.getUTCMinutes()).padStart(2, '0');
	const seconds = String(date.getUTCSeconds()).padStart(2, '0');
	const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
	return `${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
	startTime = Date.now() - elapsedTime;
	timerInterval = setInterval(() => {
		elapsedTime = Date.now() - startTime;
		display.textContent = formatTime(elapsedTime);
	}, 10);
}

function stopTimer() {
	clearInterval(timerInterval);
}

startStopBtn.addEventListener("click", () => {
	if (!isRunning) {
		startTimer();
		startStopBtn.textContent = "Pause";
		isRunning = true;
	} else {
		stopTimer();
		startStopBtn.textContent = "Start";
		isRunning = false;
	}
});

resetBtn.addEventListener("click", () => {
	stopTimer();
	elapsedTime = 0;
	display.textContent = "00:00:00";
	startStopBtn.textContent = "Start";
	isRunning = false;
	lapsList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
	if (!isRunning) return;
	const li = document.createElement("li");
	li.textContent = `Lap ${lapsList.children.length + 1}: ${formatTime(elapsedTime)}`;
	lapsList.appendChild(li);
});