////// NEW TIMER LOGIC
var Timer = (function () {
    function Timer() {
        this.startTime = new Date();
        this.splitStartTime = new Date();
        this.stoppedElapsed = 0;
        this.running = false;
    };
    Timer.prototype.startStop = function() {
        this.running ? this.stop() : this.start();
    };
    Timer.prototype.start = function () {
        this.startTime = new Date();
        this.splitStartTime = this.startTime;
        this.running = true;
    };
    Timer.prototype.splitReset = function () {
        if (!this.running) {
          this.reset();
        }
        var preState = this.state();
        this.splitStartTime = new Date();
        return preState;
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
    Timer.prototype.getSplitTimeMs = function () {
      var timeNow = new Date();
      return timeNow - this.splitStartTime + this.stoppedElapsed;
    };
    Timer.prototype.state = function () {
      return {
        running: this.running,
        time: this.getTimeMs(),
        splitTime: this.getSplitTimeMs()
      }
    }
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

var durationToString = function (milliseconds) {
  var time = durationToObject(milliseconds);
  return zeroPad2dp(time.hours) + ":" + zeroPad2dp(time.minutes) + ":" + zeroPad2dp(time.seconds);
}

function zeroPad2dp(number) {
	if (number < 10) {
  	return '0' + number.toString();
  }
  else return number.toString();
}

// DOM Interaction ////////////////////////////
var startStopButton = document.querySelector('#timer__start_stop');
var splitResetButton = document.querySelector('#timer__split_reset');
var mainTimer = new Timer;

timerInterval = setInterval(function() {
    updatePageTime(mainTimer.state());
  }, 100);

function constructTableRow(tag, cells) {
  var row = document.createElement('tr');
  cells.forEach( function(i) {
    var cell = document.createElement(tag);
    cell.textContent = i;
    row.appendChild(cell);
  });
  return row;
}

/// DOM UPDATING FUNCTIONS /////////
function clearNode(node) {
  while (node.firstChild) {
      node.removeChild(node.firstChild);
  }
}

function updatePageTime(timerState) {
  var timerDisplay = durationToObject(timerState.time);
	['hours', 'minutes', 'seconds'].forEach(function(id) {
  	document.getElementById('timer__' + id).textContent = zeroPad2dp(timerDisplay[id]);
  })
}

function addTimerSplit(timerState, node) {
  var rowContent = [durationToString(timerState.time), durationToString(timerState.splitTime)];

  var split = constructTableRow('td', rowContent);
  node.appendChild(split);
}

startStopButton.onclick = function() {
  mainTimer.startStop();
};

splitResetButton.onclick = function() {
  var state = mainTimer.splitReset();
  if (state.running) {
    addTimerSplit(state, document.querySelector('#splits'));
  } else {
    clearNode(document.querySelector('#splits'));
  }
};

// Initialize page /////////
var seconds = 0;
updatePageTime(mainTimer);
