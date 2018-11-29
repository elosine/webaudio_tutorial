var aCtx = new(window.AudioContext || window.webkitAudioContext)();

var frequency = 200;
var impulse = 0.001 * aCtx.sampleRate;

var node = aCtx.createScriptProcessor(4096, 0, 1);
var N = Math.round(aCtx.sampleRate / frequency);
var y = new Float32Array(N);
var n = 0;
node.onaudioprocess = function (e) {
  var output = e.outputBuffer.getChannelData(0);
  for (var i = 0; i < e.outputBuffer.length; ++i) {
    var xn = (--impulse >= 0) ? Math.random()-0.5 : 0;
    output[i] = y[n] = xn + (y[n] + y[(n + 1) % N]) / 2;
    if (++n >= N) n = 0;
  }
}

node.connect(aCtx.destination);
