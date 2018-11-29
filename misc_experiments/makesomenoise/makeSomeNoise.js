var audioContext = new(window.AudioContext || window.webkitAudioContext)();

//To Make Noise: Fill a buffer with random values (-1 to 1) and loop through buffer
var bufferSize = 2 * audioContext.sampleRate; //2 second buffer
//baseAudioContext.createBuffer(numOfchannels, length, sampleRate);
var noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
//convert to float32array
/*(The getChannelData() method of the AudioBuffer Interface
returns a Float32Array containing the PCM data associated with the channel,
defined by the channel parameter (with 0 representing the first channel). */
var output = noiseBuffer.getChannelData(0);
//fill the float32Array with random values between -1 & 1
//Math.random() generates a value between 0-1,
//multiply this by 2, and then -1, gives you values between -1 & 1
for (var i = 0; i < bufferSize; i++) {
  output[i] = Math.random() * 2 - 1;
}

//Create a new audio buffer from noiseBuffer that you loaded
//with random values, loop it and start it
var whiteNoise = audioContext.createBufferSource();
whiteNoise.buffer = noiseBuffer;
whiteNoise.loop = true;
whiteNoise.start(0);


var startbut = document.getElementById("play");
startbut.addEventListener("click", play);
var stopbut = document.getElementById("stop");
stopbut.addEventListener("click", stop);

function play() {
  console.log("im here");
  whiteNoise.connect(audioContext.destination);
}

function stop() {
  whiteNoise.disconnect(audioContext.destination);
}
