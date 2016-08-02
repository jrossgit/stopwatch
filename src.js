// Timer logic ////////////////////////////
function zeroPad(number) {
	if (number < 10) {
  	return '0' + number.toString();
  }
  else return number.toString();
}

function splitToTimer(totalSeconds) {
	var seconds = totalSeconds % 60;
  var minutes = Math.floor(totalSeconds / 60) % 60;
  var hours = Math.floor(totalSeconds / 3600);
  return {seconds: seconds, minutes: minutes, hours: hours};
}

// DOM Interaction ////////////////////////////
startStopButton = document.getElementById('start_stop');
timerInterval = null;
console.log(timerInterval);

function updatePageTime(seconds) {
  timer = splitToTimer(seconds);
	['hours', 'minutes', 'seconds'].forEach(function(id) {
  	document.getElementById(id).textContent = zeroPad(timer[id]);
  })
}

startStopButton.onclick = function() {
  if (!timerInterval) {
  timerInterval = setInterval(function() {
    seconds += 1;
    updatePageTime(seconds);
    }, 1000)
  console.log(timerInterval);
  }
  else {
	clearInterval(timerInterval);
    timerInterval = null;    
  }
  
};

// Testing /////////
var seconds = 0;
updatePageTime(seconds);