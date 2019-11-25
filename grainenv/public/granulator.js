// Initialize Audio ---------------------------------------------- //
var actx, mastergain;

function initAudio() {
  actx = new(window.AudioContext || window.webkitAudioContext)();
  mastergain = actx.createGain();
  mastergain.gain = 12;
  mastergain.connect(actx.destination);
}
var initAudioBtn = document.getElementById('initAudioBtn');
initAudioBtn.addEventListener("click", function() {
  initAudio();
}, false);
// Load Samples ------------------------------------------------- //
// take london concert recording and remove silence
var sampsPathBufArr = [];
var grEnvsPathBufArr = [];
var sampPaths = [
  'FullmanFluctuations3_edit.wav'
];
var grPath = '/grainEnv_44100/';
var grEnvPaths = [
  grPath + '00_gEnv_blackman.wav',
  grPath + '01_gEnv_blackmanHarris.wav',
  grPath + '02_gEnv_expodec.wav',
  grPath + '03_gEnv_gauss.wav',
  grPath + '04_gEnv_hamming.wav',
  grPath + '05_gEnv_hanning.wav',
  grPath + '06_gEnv_pulse.wav',
  grPath + '07_gEnv_quasiGauss.wav',
  grPath + '08_gEnv_rexpodec.wav',
  grPath + '09_gEnv_threeStageLinear.wav',
  grPath + '10_gEnv_tri.wav'
];
var loadSampsBtn = document.getElementById('loadSampsBtn');
loadSampsBtn.addEventListener("click", function() {
  loadTOsampsPathBufArr(sampPaths);
  loadTOgrEnvsPathBufArr(grEnvPaths);
}, false);
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
      });
  }
}
// Create Grain Cloud from form inputs ---------------------------- //
var playGrainCloudBtn = document.getElementById('playGrainCloudBtn');
playGrainCloudBtn.addEventListener("click", function() {
  playGrainCloud(sampPaths);
}, false);
//grain amps
//sample playback stratiges - direction arg and random toggle, how to restart at end of sample
//upload samples from your hard drive
function playGrainCloud() {
  var numgrainsbox = document.getElementById("numgrains");
  var grdurminbox = document.getElementById("grdurmin");
  var grdurmaxbox = document.getElementById("grdurmax");
  var gapdurminbox = document.getElementById("gapdurmin");
  var gapdurmaxbox = document.getElementById("gapdurmax");
  var grainenvs = document.getElementById("grenvs");
  var envSetStr = grainenvs.value.split(',');
  var envSet = [];
  for (var i = 0; i < envSetStr.length; i++) {
    var trmvspace = envSetStr[i].replace(/\s/g, '');
    var tasint = parseInt(trmvspace);
    envSet.push(tasint);
  }
  var env = choose(envSet);
  var tnumgrains = parseFloat(numgrainsbox.value);
  var tgrdurmin = parseFloat(grdurmin.value);
  var tgrdurmax = parseFloat(grdurmax.value);
  var tgapdurmin = parseFloat(gapdurmin.value);
  var tgapdurmax = parseFloat(gapdurmax.value);
  console.log(tnumgrains + " " + tgrdurmin + " " + tgrdurmax + " " + tgapdurmin + " " + tgapdurmax);
  grainCloud(tnumgrains, tgrdurmin, tgrdurmax, tgapdurmin, tgapdurmax,
    sampsPathBufArr[0][1], grEnvsPathBufArr[env][1], 1, 1, 60)
}
// grainCloud(numgrains, grdurmin, grdurmax, grgapmin, grgapmax,
// sampAudioBuf, grEnvAudioBuf, sampPlaybackRate, sampPlaybackSpd, iSampIndexTime)
/*
[0] Blackman
[1] Expodec
[2] Gauss
[3] Hamming
[4] Hanning
[5] Pulse
[6] QuasiGauss
[7] Rexpodec
[8] ThreeStageLinear
[9] Tri
*/
function grainCloud(numgrains, grdurmin, grdurmax, grgapmin, grgapmax,
  sampAudioBuf, grEnvAudioBuf, sampPlaybackRate, sampPlaybackSpd, iSampIndexTime) {
  var tgotime = 0;
  var sampIdxTime = iSampIndexTime;
  for (var i = 0; i < numgrains; i++) {
    var tgrdur = rrand(grdurmin, grdurmax);
    var tgrgap = rrand(grgapmin, grgapmax);
    //buf, gain, envbuf for each grain
    var tgrgain = actx.createGain();
    tgrgain.gain.value = 0;
    tgrgain.connect(mastergain);
    var tsampsource = actx.createBufferSource();
    tsampsource.buffer = sampAudioBuf;
    tsampsource.playbackRate.value = sampPlaybackSpd;
    tsampsource.loop = 0;
    tsampsource.connect(tgrgain);
    // var tgrEnvRate = (512 / actx.sampleRate) * tgrdur;
    var tgrEnvRate = (44100 / actx.sampleRate) * tgrdur;
    var tgrEnvSource = actx.createBufferSource();
    tgrEnvSource.buffer = grEnvAudioBuf;
    tgrEnvSource.playbackRate.value = tgrEnvRate;
    tgrEnvSource.loop = 0;
    tgrEnvSource.connect(tgrgain.gain);
    tsampsource.start(actx.currentTime + tgotime - 0.1, sampIdxTime, tgrdur + 0.2);
    tgrEnvSource.start(actx.currentTime + tgotime, 0, tgrdur);
    tgotime = tgotime + tgrgap;
    sampIdxTime = sampIdxTime + (tgrdur * sampPlaybackRate);
  }
}









//
