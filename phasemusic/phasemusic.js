var aCtx, gain, pan, src1, src2;

aCtx = new(window.AudioContext || window.webkitAudioContext)();

gain = aCtx.createGain();

pan1 = aCtx.createStereoPanner();
pan2 = aCtx.createStereoPanner();
pan1.connect(gain);
pan2.connect(gain);
pan1.pan.value = 1;
pan2.pan.value = -1;

//get gui elements from html doc
var stbut = document.getElementById('start');
var stpbut = document.getElementById('stop');

//Add event listeners to respond to buttons
stbut.addEventListener('click', play);
stpbut.addEventListener('click', stop);

//SAMPLE PLAYBACK
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
