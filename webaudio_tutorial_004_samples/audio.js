// create our AudioContext and Oscillator Nodes
var aCtx, sin1, gain;

// Initialize both
aCtx = new(window.AudioContext || window.webkitAudioContext)();
sin1 = aCtx.createOscillator();
gain = aCtx.createGain();

//get gui elements from html doc
var stbut1 = document.getElementById('st1');
var stpbut1 = document.getElementById('stp1');
var gainslider1 = document.getElementById('sld1');
var kickbut = document.getElementById('kick');
var snarebut = document.getElementById('snare');

// Configure sine Wave
sin1.frequency.value = 440;
sin1.type = 'sine';
sin1.start();
sin1.connect(gain);

//Create functions to start and stop sine waves
function startsin1() {
  gain.connect(aCtx.destination);
}

function stopsin1() {
  gain.disconnect(aCtx.destination);
}

//Add event listeners to respond to buttons
stbut1.addEventListener('click', startsin1);
stpbut1.addEventListener('click', stopsin1);

kickbut.addEventListener('click', playkick);
snarebut.addEventListener('click', playsnare);

//event listeners for sliders
gainslider1.oninput = function() {
  gain.gain.value = gainslider1.value;
}



//SAMPLE PLAYBACK
function playsnare() {
  // Create a buffer for the incoming sound content
  var snaresource = aCtx.createBufferSource();
  // Create the XHR which will grab the audio contents
  var snarerequest = new XMLHttpRequest();
  // Set the audio file src here
  snarerequest.open('GET', 'cleanSnare.wav', true);
  // Setting the responseType to arraybuffer sets up the audio decoding
  snarerequest.responseType = 'arraybuffer';
  snarerequest.onload = function() {
    // Decode the audio once the require is complete
    aCtx.decodeAudioData(snarerequest.response, function(buffer) {
      snaresource.buffer = buffer;
      // Connect the audio to source (multiple audio buffers can be connected!)
      snaresource.connect(aCtx.destination);
      // Simple setting for the buffer
      snaresource.loop = false;
      snaresource.playbackRate.value = 2;
      snaresource.start(1);

    }, function(e) {
      console.log('Audio error! ', e);
    });
  }
  // Send the request which kicks off
  snarerequest.send();
}

function playkick() {
  var kicksource = aCtx.createBufferSource();
  var kickrequest = new XMLHttpRequest();
  kickrequest.open('GET', 'technoKick.wav', true);
  kickrequest.responseType = 'arraybuffer';
  kickrequest.onload = function() {
    // Decode the audio once the require is complete
    aCtx.decodeAudioData(kickrequest.response, function(buffer) {
      kicksource.buffer = buffer;
      // Connect the audio to source (multiple audio buffers can be connected!)
      kicksource.connect(aCtx.destination);
      // Simple setting for the buffer
      kicksource.loop = false;
      kicksource.start(1);

    }, function(e) {
      console.log('Audio error! ', e);
    });
  }
  kickrequest.send();
}
