//https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode

var actx = new(window.AudioContext || window.webkitAudioContext)();
var gain = actx.createGain();
var osc = actx.createOscillator();
osc.type = 'sawtooth';
osc.frequency.value = 65.406;

var osc2 = actx.createOscillator();
osc2.type = 'sawtooth';
osc2.frequency.value = 65.406;
osc2.detune.value = 13;

osc.start(0);
osc2.start(0);

gain.gain.setValueAtTime(0, actx.currentTime);


var biquadFilter = actx.createBiquadFilter();
biquadFilter.type = "lowpass";
biquadFilter.frequency.setValueAtTime(300, actx.currentTime);


osc.connect(gain);
osc2.connect(gain);


gain.connect(biquadFilter);
biquadFilter.connect(actx.destination);

var env1but = document.getElementById('env1');
var env2but = document.getElementById('env2');
var env3but = document.getElementById('env3');
var env4atkbut = document.getElementById('env4atk');
var env4relbut = document.getElementById('env4rel');

env1but.addEventListener('click', env1);
env2but.addEventListener('click', env2);
env3but.addEventListener('click', env3);
env4atkbut.addEventListener('click', env4a);
env4relbut.addEventListener('click', env4r);

function env1() {
  osc.frequency.value = 65.406;
  osc2.frequency.value = 65.406;


  biquadFilter.type = "lowpass";
  biquadFilter.Q.setValueAtTime(1, actx.currentTime);
  biquadFilter.gain.setValueAtTime(1, actx.currentTime);
  biquadFilter.frequency.setValueAtTime(300, actx.currentTime);

  gain.gain.setValueAtTime(0, actx.currentTime);
  gain.gain.linearRampToValueAtTime(1.0, actx.currentTime + 0.015);
  gain.gain.linearRampToValueAtTime(0.0, actx.currentTime + 0.015 + 1.1);
}

function env2() {
  osc.frequency.value = 97.999;
  osc2.frequency.value = 97.999;


  biquadFilter.type = "lowpass";
  biquadFilter.Q.setValueAtTime(1, actx.currentTime);
  biquadFilter.gain.setValueAtTime(1, actx.currentTime);
  biquadFilter.frequency.setValueAtTime(100, actx.currentTime);
  biquadFilter.frequency.exponentialRampToValueAtTime(10000, actx.currentTime + 4.1);

  gain.gain.setValueAtTime(0, actx.currentTime);
  gain.gain.linearRampToValueAtTime(1.0, actx.currentTime + 4.1);
  gain.gain.linearRampToValueAtTime(0.0, actx.currentTime + 4.1 + 0.015);
}

function env3() {
  osc.frequency.value = 130.81;
  osc2.frequency.value = 130.81;
  gain.gain.setValueAtTime(0, actx.currentTime);
  gain.gain.linearRampToValueAtTime(1.0, actx.currentTime + 0.1);
  gain.gain.linearRampToValueAtTime(1.0, actx.currentTime + 0.1 + 2);
  gain.gain.linearRampToValueAtTime(0.0, actx.currentTime + 1.1 + 2 + 0.5);

  biquadFilter.type = "peaking";
  biquadFilter.frequency.setValueAtTime(523.24, actx.currentTime);
  //biquadFilter.frequency.setValueAtTime(915.67, actx.currentTime);
  biquadFilter.Q.setValueAtTime(2, actx.currentTime);
  biquadFilter.gain.setValueAtTime(30, actx.currentTime);

}

function env4a() {
  osc.frequency.value = 185;
  osc2.frequency.value = 185;
  gain.gain.setValueAtTime(0, actx.currentTime);
  gain.gain.linearRampToValueAtTime(1.0, actx.currentTime + 0.05);
}

function env4r() {
  osc.frequency.value = 185;
  osc2.frequency.value = 185;
  gain.gain.setValueAtTime(0, actx.currentTime);
  gain.gain.linearRampToValueAtTime(0.0, actx.currentTime + 0.75);
}
