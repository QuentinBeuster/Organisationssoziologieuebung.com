var timers = [null, null, null, null];
var passwords = ["KKLSAD", "REDKNB", "1231000000", "GAOMCKIQE"];
var totalTimer = null;
var currentTimerIndex = 0;

function startTimers() {
  var startButton = document.getElementById("startButton");
  startButton.disabled = true; // Deaktiviere den Start-Button

  var inputElements = document.querySelectorAll("#timerContainer input");
  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].disabled = false; // Aktiviere die Inputfelder
  }

  startTimer(1);
}

function startTimer(index) {
  if (index > 1) {
    var previousInputValue = document
      .getElementById("input" + (index - 1))
      .value.trim();
    if (
      previousInputValue.toLowerCase() !== passwords[index - 2].toLowerCase()
    ) {
      // Falsches Passwort, Timer nicht starten
      return;
    }
  }

  if (timers[index - 1] === null) {
    timers[index - 1] = setInterval(updateTimer, 1000, index);
    currentTimerIndex = index;
  }
}

function updateTimer(index) {
  var timerElement = document.getElementById("timer" + index);
  var time = timerElement.innerHTML.split(":");
  var hours = parseInt(time[0], 10);
  var minutes = parseInt(time[1], 10);
  var seconds = parseInt(time[2], 10);

  seconds++;

  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }

  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }

  timerElement.innerHTML =
    leadingZero(hours) +
    ":" +
    leadingZero(minutes) +
    ":" +
    leadingZero(seconds);

  if (index < timers.length && timers[index] === null) {
    startTimer(index + 1);
  }

  updateTotalTime(); // Aktualisiere die Gesamtzeit
}

function leadingZero(number) {
  return number < 10 ? "0" + number : number;
}

function stopTimer(index) {
  if (timers[index - 1] !== null) {
    clearInterval(timers[index - 1]);
    timers[index - 1] = null;
  }

  if (index < timers.length) {
    startTimer(index + 1);
  }

  updateTotalTime(); // Aktualisiere die Gesamtzeit

  if (index === timers.length) {
    var totalTimeElement = document.getElementById("totalTime");
    totalTimeElement.classList.add("green");
    totalTimeElement.innerHTML = "" + totalTimeElement.innerHTML;
  }
}

function TimersStopped() {
  var startButton = document.getElementById("startButton");
  startButton.disabled = false; // Aktiviere den Start-Button
}

function checkAllTimersStopped() {
  for (var i = 0; i < timers.length; i++) {
    if (timers[i] !== null) {
      return;
    }
  }

  if (totalTimer !== null) {
    clearInterval(totalTimer);
  }

  updateTotalTime(); // Aktualisiere die Gesamtzeit

  TimersStopped();
}

function updateTotalTime() {
  var totalTime = document.getElementById("totalTime");
  var totalSeconds = 0;

  for (var j = 1; j <= timers.length; j++) {
    var timerElement = document.getElementById("timer" + j);
    var time = timerElement.innerHTML.split(":");
    var hours = parseInt(time[0], 10);
    var minutes = parseInt(time[1], 10);
    var seconds = parseInt(time[2], 10);

    totalSeconds += hours * 3600 + minutes * 60 + seconds;
  }

  var totalHours = Math.floor(totalSeconds / 3600);
  var remainingSeconds = totalSeconds % 3600;
  var totalMinutes = Math.floor(remainingSeconds / 60);
  var totalFinalSeconds = remainingSeconds % 60;

  totalTime.innerHTML =
    leadingZero(totalHours) +
    ":" +
    leadingZero(totalMinutes) +
    ":" +
    leadingZero(totalFinalSeconds);
}

for (var k = 1; k <= timers.length; k++) {
  var inputElement = document.getElementById("input" + k);
  inputElement.addEventListener(
    "input",
    (function (index) {
      return function () {
        checkInput(index);
      };
    })(k)
  );
}

function checkInput(index) {
  var inputElement = document.getElementById("input" + index);
  var inputValue = inputElement.value.trim();

  if (inputValue.toLowerCase() === passwords[index - 1].toLowerCase()) {
    stopTimer(index);
    inputElement.classList.add("green");
    inputElement.disabled = true; // Deaktiviere das Inputfeld
  } else {
    inputElement.classList.remove("green");
  }
}

totalTimer = setInterval(checkAllTimersStopped, 1000);
