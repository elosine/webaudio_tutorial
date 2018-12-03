var actx, src1;

actx = new(window.AudioContext || window.webkitAudioContext)();




var xPos = Math.floor(document.body.clientWidth / 2);
var yPos = Math.floor(document.body.clientHeight / 2);
var zPos = 290;

var panner = actx.createPanner();
panner.panningModel = 'HRTF';
panner.distanceModel = 'inverse';
panner.refDistance = 1;
panner.maxDistance = 10000;
panner.rolloffFactor = 1;
panner.coneInnerAngle = 360;
panner.coneOuterAngle = 0;
panner.coneOuterGain = 0;

panner.setOrientation(1, 0, 0);
panner.setPosition(xPos, yPos, zPos);

var listener = actx.listener;
listener.setOrientation(0, 0, -1, 0, 1, 0);
listener.setPosition(xPos, yPos, 295);



//get gui elements from html doc
var stbut = document.getElementById('start');
var stpbut = document.getElementById('stop');
var forwardbut = document.getElementById('forward');
var backbut = document.getElementById('back');
var leftbut = document.getElementById('left');
var rightbut = document.getElementById('right');
var upbut = document.getElementById('up');
var downbut = document.getElementById('down');

//Add event listeners to respond to buttons
stbut.addEventListener('click', play);
stpbut.addEventListener('click', stop);
forwardbut.addEventListener('click', forward);
backbut.addEventListener('click', back);
leftbut.addEventListener('click', left);
rightbut.addEventListener('click', right);
upbut.addEventListener('click', up);
downbut.addEventListener('click', down);

function forward() {
  //zPos += 0.066;
  zPos += 0.15;
  zPos = Math.min(zPos, 295);
  panner.setPosition(xPos, yPos, zPos);
}

function back() {
  //zPos -= 0.066;
  zPos += -0.15;
  panner.setPosition(xPos, yPos, zPos);
}

function right() {
  //zPos += 0.066;
  xPos += 0.15;
  xPos = Math.max(xPos, 0);
  panner.setPosition(xPos, yPos, zPos);
}

function left() {
  //zPos -= 0.066;
  xPos += -0.15;
  xPos = Math.min( xPos, Math.floor(document.body.clientWidth) );
  panner.setPosition(xPos, yPos, zPos);
}

function up() {
  //zPos += 0.066;
  yPos += 0.15;
  yPos = Math.max(yPos, 0);
  panner.setPosition(xPos, yPos, zPos);
}

function down() {
  //zPos -= 0.066;
  yPos += -0.15;
  yPos = Math.min( yPos, Math.floor(document.body.clientHeight) );
  panner.setPosition(xPos, yPos, zPos);
}


//SAMPLE PLAYBACK
function play() {
  src1 = actx.createBufferSource();
  src1.loop = true;
  var sfrequest = new XMLHttpRequest();
  sfrequest.open('GET', 'footsteps.wav', true);
  sfrequest.responseType = 'arraybuffer';
  sfrequest.onload = function() {
    actx.decodeAudioData(sfrequest.response, function(buffer) {
      src1.buffer = buffer;
      src1.start(1);
      src1.connect(panner);
      panner.connect(actx.destination);
      //  src1.connect(actx.destination);
    }, function(e) {
      console.log('Audio error! ', e);
    });
  }
  sfrequest.send();
}

function stop() {
  src1.stop();
}
