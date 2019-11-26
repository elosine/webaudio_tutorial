// Initialize Audio ---------------------------------------------- //
var actx, mastergain;

function initAudio() {
  actx = new(window.AudioContext || window.webkitAudioContext)();
  mastergain = actx.createGain();
  mastergain.gain = 1;
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
var grPath = '/grainEnv_csv/';
var grEnvPaths = [
  grPath + '00_gEnv_blackman.txt',
  grPath + '01_gEnv_blackmanHarris.txt',
  grPath + '02_gEnv_expodec.txt',
  grPath + '03_gEnv_gauss.txt',
  grPath + '04_gEnv_hamming.txt',
  grPath + '05_gEnv_hanning.txt',
  grPath + '06_gEnv_pulse.txt',
  grPath + '07_gEnv_quasiGauss.txt',
  grPath + '08_gEnv_rexpodec.txt',
  grPath + '09_gEnv_threeStageLinear.txt',
  grPath + '10_gEnv_tri.txt'
];
var grEnvArrays = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  []
];
var loadSampsBtn = document.getElementById('loadSampsBtn');
loadSampsBtn.addEventListener("click", function() {
  loadTOsampsPathBufArr(sampPaths);
  loadTOgrEnvsPathBufArr(grEnvPaths, grEnvArrays);
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

function loadTOgrEnvsPathBufArr(sfPathsArray, destArrayArray) {
  for (var i = 0; i < sfPathsArray.length; i++) {
    getGrEnvAsArray(sfPathsArray[i], destArrayArray[i])
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
  // var envSetStr = grainenvs.value.split(',');
  // var envSet = [];
  // for (var i = 0; i < envSetStr.length; i++) {
  //   var trmvspace = envSetStr[i].replace(/\s/g, '');
  //   var tasint = parseInt(trmvspace);
  //   envSet.push(tasint);
  // }
  // var env = choose(envSet);
  var tnumgrains = parseFloat(numgrainsbox.value);
  var tgrdurmin = parseFloat(grdurmin.value);
  var tgrdurmax = parseFloat(grdurmax.value);
  var tgapdurmin = parseFloat(gapdurmin.value);
  var tgapdurmax = parseFloat(gapdurmax.value);
  var grainenvsNum = parseInt(grainenvs.value);
  grainCloud(tnumgrains, tgrdurmin, tgrdurmax, tgapdurmin, tgapdurmax,
    sampsPathBufArr[0][1], 1, 1, 60, grainenvsNum)
}

function grainCloud(numgrains, grdurmin, grdurmax, grgapmin, grgapmax,
  sampAudioBuf, sampPlaybackRate, sampPlaybackSpd, iSampIndexTime, grEnvNum) {
  var now = actx.currentTime;
  var tgotime = 0;
  var sampIdxTime = iSampIndexTime;
  for (var i = 0; i < numgrains; i++) {
    var tgrdur = rrand(grdurmin, grdurmax);
    var tgrgap = rrand(grgapmin, grgapmax);
    //buf, gain, envbuf for each grain
    var tgrgain = actx.createGain();
    tgrgain.gain.setValueAtTime(0, now);
    tgrgain.connect(mastergain);
    var tsampsource = actx.createBufferSource();
    tsampsource.buffer = sampAudioBuf;
    tsampsource.playbackRate.value = sampPlaybackSpd;
    tsampsource.loop = 0;
    tsampsource.connect(tgrgain);
    tsampsource.start(now + tgotime - 0.1, sampIdxTime, tgrdur + 0.2);
    tgrgain.gain.setValueCurveAtTime(grEnvArrays[grEnvNum], (now + tgotime), tgrdur);
    tgotime = tgotime + tgrgap;
    sampIdxTime = sampIdxTime + (tgrdur * sampPlaybackRate);
  }
}

var test = document.getElementById('test');
test.addEventListener("click", function() {
  console.log(grEnvArrays);
}, false);

function getGrEnvAsArray(path, destArray) {
  fetch(path)
    .then(response => response.text())
    .then(text => {
      var t1 = text.split(",");
      for (var i = 0; i < t1.length; i++) {
        destArray.push(parseFloat(t1[i]));
      }
    });
}

//double check that the csv arrays you made with supercollider are unique and represent the actual
//grain Envelopes
// convert with supercollider and convert back from the text files then plot






//
