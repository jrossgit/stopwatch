////// NEW TIMER LOGIC
var Timer = (function () {
    function Timer() {
        this.startTime = new Date();
        this.stopTime = this.startTime;
        this.running = false;
    }
    Timer.prototype.start_stop = function() {
        this.running ? this.stop() : this.start();
    };
    Timer.prototype.start = function () {
        this.startTime = new Date();
        this.running = true;
    };
    Timer.prototype.split = function () {
        return timeSubdivisions(this.getTimeMs(), 1000);
    };
    Timer.prototype.stop = function () {
        this.stoppedElapsed = this.getTimeMs();
        this.stopTime = new Date();
        this.running = false;
        return this.stoppedElapsed;
    };
    Timer.prototype.reset = function () {
        this.running = false;
    };
    Timer.prototype.getTimeMs = function () {
        if (this.running) {
            var timeNow = new Date();
        }
        else {
            var timeNow = this.stopTime;
        }
        return timeNow - this.startTime;
    };
    return Timer;
}());

/////// LOGIC UTILS
var timeSubdivisions = function (milliseconds, subdivision) {
    return Math.floor(milliseconds / subdivision);
};

var msToSeconds = function (milliseconds) { return Math.floor(milliseconds); };

var durationToObject = function (milliseconds) {
    var output = [1000 * 60 * 60, 1000 * 60, 1000].map(function (time) { return (timeSubdivisions(milliseconds, time)); });
    return {hours: output[0], minutes: output[1], seconds: output[2]};
};

function zeroPad2dp(number) {
	if (number < 10) {
  	return '0' + number.toString();
  }
  else return number.toString();
}


// DOM Interaction ////////////////////////////
var startStopButton = document.getElementById('timer__start_stop');
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
  mainTimer.start_stop();
};

// Testing /////////
var seconds = 0;
updatePageTime(mainTimer);