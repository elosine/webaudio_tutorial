// create our AudioContext and Oscillator Nodes
var aCtx, sin1;

// Initialize both
aCtx = new (window.AudioContext || window.webkitAudioContext) ();
sin1 = aCtx.createOscillator();

//get buttons from html doc
var stbut1 = document.getElementById('st1');
var stpbut1 = document.getElementById('stp1');

// Configure sine Wave
sin1.frequency.value = 440;
sin1.type = 'sine';
sin1.start();

//Create functions to start and stop sine waves
function startsin1(){
  sin1.connect(aCtx.destination);
}
function stopsin1(){
  sin1.disconnect(aCtx.destination);
}

//Add event listeners to respond to buttons
stbut1.addEventListener('click', startsin1);
stpbut1.addEventListener('click', stopsin1);
