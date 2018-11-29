/* *********************************************
 *
 * Source Code Listing
 * Karplus-Strong String Synthesis
 * =============================================
 */
// Global Variables
var audioContext,
  jsNode,
  freq = 440, // 440Hz
  delayLine = [], // array used creating delay line
  delayLineLen,
  noise_samples = 0, // number of noise sample to play
  alpha = 0.5,
  delayLinePos = 0; // marks the position at which the sample will be stored in delay line.

var audioContext = new(window.AudioContext || window.webkitAudioContext)();
jsNode = audioContext.createScriptProcessor(4096, 1, 1);

jsNode.onaudioprocess = function(evt) {
  var buffer = evt.outputBuffer.getChannelData(0);
  var n = buffer.length;
  for (var i = 0; i < n; i++) {
    // write next sample to output
    buffer[i] = getNextSample();
  }
}

jsNode.connect(audioContext.destination);

delayLineLen = Math.round(audioContext.sampleRate / freq); // number of sample has to be an integer, round out

function getNextSample() {
  var nextSample;
  if (noise_samples > 0) {
    nextSample = 2 * Math.random() - 1;
    noise_samples--;
  } else {
    var x_i = delayLine[delayLinePos];

    // last sample in delayLine is yi minus 1
    // because it was created in previous call to this function
    var y_i_1 = delayLine[(delayLinePos - 1 + delayLineLen) % delayLineLen];
    nextSample = y_i_1 + alpha * (x_i - y_i_1); // here nextSample is the y[i]
  }
  delayLine[delayLinePos] = nextSample;
  delayLinePos = (delayLinePos + 1) % delayLineLen;
  return nextSample;
}
// this function should be called on some
// event, like onclick of a button
function activate(afreq) {
  delayLineLen = Math.round(audioContext.sampleRate / afreq);
  noise_samples = delayLineLen; // fill entire delayLine and the stop.
}


var startbut = document.getElementById("play");
startbut.addEventListener("click", function(){ activate( Math.round( (Math.random()*900)+100 ) ) } );

/*************************************************************/
