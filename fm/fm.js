//https://flypaper.soundfly.com/produce/an-introduction-to-fm-synthesis/
//http://sites.music.columbia.edu/cmc/MusicAndComputers/chapter4/04_07.php
//https://www.adsrsounds.com/fm8-tutorials/theory-behind-fm-synthesis/
//Turenas - John Chowning
//https://www.youtube.com/watch?v=kSbTOB5ft5c


var AudioContext = window.AudioContext || window.webkitAudioContext;

var audioCtx = new AudioContext();

var r1 = 14;
var r2 = 5;
var index = 500;
var freq = 100.0;
var lfofreq = (freq*r1)/r2;


// create an normal oscillator to make sound
var oscillator = audioCtx.createOscillator();
oscillator.frequency.value = freq;

// create a second oscillator that will be used as an LFO (Low-frequency
// oscillator), and will control a parameter
var lfo = audioCtx.createOscillator();

// set the frequency of the second oscillator to a low number
lfo.frequency.value = lfofreq; // 2Hz: two oscillations par second

// create a gain whose gain AudioParam will be controlled by the LFO
var lfogain = audioCtx.createGain();
lfo.connect(lfogain);
lfogain.gain.value = index;

// connect the LFO to the gain AudioParam. This means the value of the LFO
// will not produce any audio, but will change the value of the gain instead
lfogain.connect(oscillator.frequency);

// connect the gain to the destination so we hear sound
oscillator.connect(audioCtx.destination);

// start the oscillator that will produce audio
oscillator.start();

// start the oscillator that will modify the gain value
lfo.start();
