var aCtx, gain, pan, src1, src2;

aCtx = new(window.AudioContext || window.webkitAudioContext)();

gain = aCtx.createGain();

pan1 = aCtx.createStereoPanner();
pan2 = aCtx.createStereoPanner();
pan1.connect(gain);
pan2.connect(gain);
pan1.pan.value = 1;
pan2.pan.value = -1;

var analyser1 = aCtx.createAnalyser();
analyser1.fftSize = 512;
var analyser2 = aCtx.createAnalyser();
analyser2.fftSize = 512;
var bufferLength = analyser1.frequencyBinCount;
var dataArray1 = new Uint8Array(bufferLength);
var dataArray2 = new Uint8Array(bufferLength);
pan1.connect(analyser1);
pan2.connect(analyser2);

//get gui elements from html doc
var stbut = document.getElementById('start');
var stpbut = document.getElementById('stop');
var canvas = document.getElementById('canvas');
var canvasCtx = canvas.getContext('2d');

//Add event listeners to respond to buttons
stbut.addEventListener('click', play);
stpbut.addEventListener('click', stop);

//visualization
canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

function draw() {
  var drawVisual = requestAnimationFrame(draw);
  analyser1.getByteFrequencyData(dataArray1);
  analyser2.getByteFrequencyData(dataArray2);
  canvasCtx.fillStyle = 'rgb(0, 0, 0)';
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  //var barWidth = (canvas.width / bufferLength) * 2.5;
  var barWidth = (canvas.width / bufferLength) * 5;
  var barHeight1, barHeight2;
  var x = 0;

  for (var i = 0; i < bufferLength; i++) {
    var coef1 = Math.pow((dataArray1[i] / 170), 3.3);
    var coef2 = Math.pow((dataArray2[i] / 170), 3.3);
    barHeight1 = coef1 * canvas.height; //max amp per bin 255
    barHeight2 = coef2 * canvas.height;


    canvasCtx.fillStyle = 'rgba(255, 0, 255, 1)';
    //canvasCtx.fillStyle = 'rgba(255, 0, ' + (coef1*255) + ', 1)';
    canvasCtx.fillRect(x, canvas.height - barHeight1 / 2, barWidth, barHeight1);

    canvasCtx.fillStyle = 'rgba( 153, 255, 0, 1)';
    //canvasCtx.fillStyle = 'rgba( 153, ' + (coef1 * 255) + ', 0, 1)';
    canvasCtx.fillRect(x, canvas.height - barHeight2 / 2, barWidth, barHeight2);

    x += barWidth + 1;
  }
};
draw();

function play() {
  src1 = aCtx.createBufferSource();
  src2 = aCtx.createBufferSource();
  src1.connect(pan1);
  src2.connect(pan2);
  src1.loop = true;
  src2.loop = true;
  src1.playbackRate.value = 1;
  src2.playbackRate.value = 1.002;

  var sfrequest = new XMLHttpRequest();
  sfrequest.open('GET', 'ifItoldhim.wav', true);
  sfrequest.responseType = 'arraybuffer';
  sfrequest.onload = function() {
    aCtx.decodeAudioData(sfrequest.response, function(buffer) {
      src1.buffer = buffer;
      src2.buffer = buffer;
      src1.start(1);
      src2.start(1);
    }, function(e) {
      console.log('Audio error! ', e);
    });
  }
  sfrequest.send();
  gain.connect(aCtx.destination);
}

function stop() {
  src1.stop();
  src2.stop();
  gain.disconnect(aCtx.destination);
}
