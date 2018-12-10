//https://developer.mozilla.org/en-US/docs/Web/API/DelayNode

var actx = new(window.AudioContext || window.webkitAudioContext)();
var gain = actx.createGain();
var osc = actx.createOscillator();
osc.type = 'square';
osc.frequency.value = 80;

osc.start(0);

gain.gain.setValueAtTime(0, actx.currentTime);

var del1 = actx.createDelay(2.0);
var del2 = actx.createDelay(2.0);
var del3 = actx.createDelay(2.0);
var del4 = actx.createDelay(2.0);

osc.connect(gain);

gain.connect(actx.destination);
gain.connect(del1);
del1.connect(actx.destination);
gain.connect(del2);
del2.connect(actx.destination);
gain.connect(del3);
del3.connect(actx.destination);
gain.connect(del4);
del4.connect(actx.destination);

var delbut = document.getElementById('del');
delbut.addEventListener('click', del);

function del() {

  gain.gain.setValueAtTime(0, actx.currentTime);
  gain.gain.linearRampToValueAtTime(0.5, actx.currentTime + 0.015);
  gain.gain.linearRampToValueAtTime(0.0, actx.currentTime + 0.015 + 0.3);

  del1.delayTime.setValueAtTime(0.4, actx.currentTime);
  del2.delayTime.setValueAtTime(0.8, actx.currentTime);
  del3.delayTime.setValueAtTime(1.1, actx.currentTime);
  del4.delayTime.setValueAtTime(1.3, actx.currentTime);
}
