var actx = new(window.AudioContext || window.webkitAudioContext)();
var gain = actx.createGain();
var osc = actx.createOscillator();
osc.type = 'square';
osc.frequency.value = 65.406;

var osc2 = actx.createOscillator();
osc2.type = 'square';
osc2.frequency.value = 65.406;
osc2.detune.value = 13;

osc.start(0);
osc2.start(0);

gain.gain.setValueAtTime(0, actx.currentTime);

osc.connect(gain);
osc2.connect(gain);
gain.connect(actx.destination);

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
  gain.gain.setValueAtTime(0, actx.currentTime);
  gain.gain.linearRampToValueAtTime(1.0, actx.currentTime + 0.015);
  gain.gain.linearRampToValueAtTime(0.0, actx.currentTime + 0.015 + 0.5);
}

function env2() {
  osc.frequency.value = 97.999;
  osc2.frequency.value = 97.999;
  gain.gain.setValueAtTime(0, actx.currentTime);
  gain.gain.linearRampToValueAtTime(1.0, actx.currentTime + 0.015);
  gain.gain.linearRampToValueAtTime(0.0, actx.currentTime + 0.015 + 1.5);
}

function env3() {
  osc.frequency.value = 130.81;
  osc2.frequency.value = 130.81;
  gain.gain.setValueAtTime(0, actx.currentTime);
  gain.gain.linearRampToValueAtTime(1.0, actx.currentTime + 1.1);
  gain.gain.linearRampToValueAtTime(0.0, actx.currentTime + 1.1 + 0.015);
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
