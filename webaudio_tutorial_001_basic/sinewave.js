// create our AudioContext and Oscillator Nodes
var aCtx, sin1;

// Initialize both
aCtx = new (window.AudioContext || window.webkitAudioContext) ();
sin1 = aCtx.createOscillator();

// Configure sine Wave
sin1.frequency.value = 440;
sin1.type = 'sine';
sin1.start();

// Add sinewave to audio AudioContext
sin1.connect(aCtx.destination);
