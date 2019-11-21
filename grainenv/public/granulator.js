
var actx, sampsource, grainEnvSource, grGain, samprate, testosc, grRate;

var numgrainsbox = document.getElementById("numgrains");
var testbtn = document.getElementById('testbtn');
testbtn.addEventListener("click", function() {
  console.log(numgrainsbox.value);
}, false);



function initAudio() {
  actx = new(window.AudioContext || window.webkitAudioContext)();
  samprate = actx.sampleRate;
  grGain = actx.createGain();
  grGain.gain.value = 0;
  grGain.connect(actx.destination);
}

async function getFile(filepath) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await actx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}
async function setupSample(filePath) {
  const sample = await getFile(filePath);
  var temparr = [];
  temparr.push(filePath);
  temparr.push(sample);
  return temparr;
}

var sampPaths = [
  'FullmanFluctuations3_edit.wav'
];
var grEnvPaths = [
  '/grainEnv/00_gEnv_blackman.wav',
  '/grainEnv/01_gEnv_expodec.wav',
  '/grainEnv/02_gEnv_gauss.wav',
  '/grainEnv/03_gEnv_hamming.wav',
  '/grainEnv/04_gEnv_hanning.wav',
  '/grainEnv/05_gEnv_pulse.wav',
  '/grainEnv/06_gEnv_quasiGauss.wav',
  '/grainEnv/07_gEnv_rexpodec.wav',
  '/grainEnv/08_gEnv_threeStageLinear.wav',
  '/grainEnv/09_gEnv_tri.wav'
];
var sampsPathBufArr = [];
var grEnvsPathBufArr = [];

//next make duplicate function to load grain envelopes
function loadTOsampsPathBufArr(sfPathsArray) {
  for (var i = 0; i < sfPathsArray.length; i++) {
    setupSample(sfPathsArray[i])
      .then((pathSampArr) => {
        sampsPathBufArr.push(pathSampArr);
      });
  }
}

function loadTOgrEnvsPathBufArr(sfPathsArray) {
  for (var i = 0; i < sfPathsArray.length; i++) {
    setupSample(sfPathsArray[i])
      .then((pathSampArr) => {
        grEnvsPathBufArr.push(pathSampArr);
        console.log(grEnvsPathBufArr);
      });
  }
}
var loadSampBtn = document.getElementById('loadSampBtn');

loadSampBtn.addEventListener("click", function() {
  loadTOsampsPathBufArr(sampPaths);
  loadTOgrEnvsPathBufArr(grEnvPaths);
}, false);

function playSamp(audiobuf, playtime, sampleindextime, duration, rate, dest, loop) {

  var grDurSec = 2.2;
  grRate = (512 / samprate) * grDurSec;
  var bufsource = actx.createBufferSource();
  bufsource.buffer = audiobuf;
  bufsource.playbackRate.value = rate;
  bufsource.loop = loop;
  bufsource.connect(dest);
  bufsource.start(actx.currentTime + playtime, sampleindextime, duration);
  return bufsource;
}

var sampbufsrc, grEnvSrc;

var initAudioBtn = document.getElementById('initAudioBtn');
var playSampBtn = document.getElementById('playSampBtn');
var playGrainBtn = document.getElementById('playGrainBtn');
initAudioBtn.addEventListener("click", function() {
  initAudio()
}, false);
playSampBtn.addEventListener("click", function() {
  sampbufsrc = playSamp(sampsPathBufArr[0][1], 0, 120, 24, 1, grGain, 0);
}, false);
playGrainBtn.addEventListener("click", function() {
  grEnvSrc = playSamp(grEnvsPathBufArr[5][1], 0, 0, 9999, grRate, grGain.gain, 0);
}, false);








//
