var audiocontext = new(window.AudioContext || window.webkitAudioContext)();


function playSound(sfName, time) {


  var source = audiocontext.createBufferSource();
  source.loop = false;
  source.playbackRate.value = 1;

  var sfrequest = new XMLHttpRequest();
  sfrequest.open('GET', sfName, true);
  sfrequest.responseType = 'arraybuffer';
  sfrequest.onload = function() {
    audiocontext.decodeAudioData(sfrequest.response, function(buffer) {
        source.buffer = buffer;
        source.connect(audiocontext.destination);
        source.start(time);
      },
      function(e) {
        console.log('Audio error! ', e);
      });
  }
  sfrequest.send();


}

var st = audiocontext.currentTime + 0.5; //start in 1/2 second
var tempo = 80; // BPM (beats per minute)
var t_w = (60 / tempo) * 4;
var t_h = (60 / tempo) * 2;
var t_hd = (60 / tempo) * 3;
var t_q = (60 / tempo);
var t_qd = (60 / tempo) * 1.5;
var t_8 = (60 / tempo) / 2;
var t_16 = (60 / tempo) / 4;

/*
//Kick on 1 & 3
playSound('kick.wav', st);
playSound('kick.wav', (st + t_h));

//Snare on 2 & 4
playSound('snare.wav', st + t_q);
playSound('snare.wav', st + t_hd);

for (var i = 0; i < 16; i++){
  playSound( 'hihat.wav', st + (t_16*i) );
}
*/



// Play 4 bars of 4_4
for (var i = 0; i < 4; i++) {
  var bartime = i * t_w;
  //Kick on 1 & 3
  playSound('kick.wav', st + bartime);
  playSound('kick.wav', (st + t_h) + bartime);

  //Snare on 2 & 4
  playSound('snare.wav', (st + t_q) + bartime);
  playSound('snare.wav', (st + t_hd) + bartime);

  for (var j = 0; j < 16; j++){
    playSound( 'hihat.wav', st + (t_16*j) + bartime);
  }

}
