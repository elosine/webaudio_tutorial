//https://developer.mozilla.org/en-US/docs/Web/API/DelayNode

var actx = new(window.AudioContext || window.webkitAudioContext)();
var gain = actx.createGain();
var osc = actx.createOscillator();
osc.type = 'square';
osc.frequency.value = 80;
osc.start(0);

gain.gain.setValueAtTime(0, actx.currentTime);
osc.connect(gain);

var playbut = document.getElementById('play');
playbut.addEventListener('click', play);

function play() {
  getImpulse();
  gain.gain.setValueAtTime(0, actx.currentTime);
  gain.gain.linearRampToValueAtTime(0.5, actx.currentTime + 0.015);
  gain.gain.linearRampToValueAtTime(0.0, actx.currentTime + 0.015 + 0.01);

}

function getImpulse() {
  convolver = actx.createConvolver();
  ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open('GET', '002_R1_Nuclear_Reactor_Hall_s_L.wav', true);
  //ajaxRequest.open('GET', '006_SquareVictoriaDome_s_L.wav', true);
  //ajaxRequest.open('GET', '005_abernyte_grain_silo_s_L.wav', true);
  ajaxRequest.responseType = 'arraybuffer';

  ajaxRequest.onload = function() {
    var impulseData = ajaxRequest.response;

    actx.decodeAudioData(impulseData, function(buffer) {
        myImpulseBuffer = buffer;
        convolver.buffer = myImpulseBuffer;
        convolver.loop = true;
        convolver.normalize = true;
        gain.connect(convolver);
        convolver.connect(actx.destination);
      },

      function(e) {
        "Error with decoding audio data" + e.err
      });

  }

  ajaxRequest.send();
}
