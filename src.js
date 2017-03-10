////// NEW TIMER LOGIC
var Timer = (function () {
    function Timer() {
        this.startTime = new Date();
        this.stoppedElapsed = 0;
        this.running = false;
    };
    Timer.prototype.startStop = function() {
        this.running ? this.stop() : this.start();
    };
    Timer.prototype.start = function () {
        this.startTime = new Date();
        this.running = true;
    };
    Timer.prototype.splitReset = function () {
        if (this.running) {return getTimeMs()}
        else {
            this.reset();
            return 0;
        }
    };
    Timer.prototype.reset = function () {
        this.running = false;
        this.stoppedElapsed = 0;
    };
    Timer.prototype.stop = function () {
        this.stoppedElapsed = this.getTimeMs();
        this.running = false;
    };
    Timer.prototype.getTimeMs = function () {
        if (this.running) {
            var timeNow = new Date();
            return timeNow - this.startTime + this.stoppedElapsed;
        }
        else {
            return this.stoppedElapsed;
        }
    };
    return Timer;
}());

/////// LOGIC UTILS
var timeSubdivisions = function (milliseconds, subdivision) {
    return Math.floor(milliseconds / subdivision);
};

var durationToObject = function (milliseconds) {
    var output = [1000 * 60 * 60, 1000 * 60, 1000].map(function (time) { return (timeSubdivisions(milliseconds, time)); });
    return {hours: output[0], minutes: output[1] % 60, seconds: output[2] % 60};
};

function zeroPad2dp(number) {
	if (number < 10) {
  	return '0' + number.toString();
  }
  else return number.toString();
}


// DOM Interaction ////////////////////////////
var startStopButton = document.getElementById('timer__start_stop');
var splitResetButton = document.getElementById('timer__split_reset');
var mainTimer = new Timer;
console.log(mainTimer);
timerInterval = setInterval(function() {
    updatePageTime(mainTimer);
  }, 100);

function updatePageTime(timer) {
  var timerDisplay = durationToObject(timer.getTimeMs());
	['hours', 'minutes', 'seconds'].forEach(function(id) {
  	document.getElementById('timer__' + id).textContent = zeroPad2dp(timerDisplay[id]);
  })
}

startStopButton.onclick = function() {
  mainTimer.startStop();
};

splitResetButton.onclick = function() {
  mainTimer.splitReset();
};

// Testing /////////
var seconds = 0;
updatePageTime(mainTimer);