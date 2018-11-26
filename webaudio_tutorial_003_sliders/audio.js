// create our AudioContext and Oscillator Nodes
var aCtx, sin1, gain;

// Initialize both
aCtx = new (window.AudioContext || window.webkitAudioContext) ();
sin1 = aCtx.createOscillator();
gain = aCtx.createGain();

//get gui elements from html doc
var stbut1 = document.getElementById('st1');
var stpbut1 = document.getElementById('stp1');
var gainslider1 = document.getElementById('sld1');

// Configure sine Wave
sin1.frequency.value = 440;
sin1.type = 'sine';
sin1.start();
sin1.connect(gain);

//Create functions to start and stop sine waves
function startsin1(){
  gain.connect(aCtx.destination);
}
function stopsin1(){
  gain.disconnect(aCtx.destination);
}

//Add event listeners to respond to buttons
stbut1.addEventListener('click', startsin1);
stpbut1.addEventListener('click', stopsin1);

//event listeners for sliders
gainslider1.oninput = function(){
  gain.gain.value = gainslider1.value;
}
