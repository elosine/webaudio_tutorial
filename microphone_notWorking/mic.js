
// success callback when requesting audio input stream
function gotStream(stream) {
  var audioContext = new(window.AudioContext || window.webkitAudioContext)();


    // Create an AudioNode from the stream.
    var mediaStreamSource = audioContext.createMediaStreamSource( stream );

    // Connect it to the destination to hear yourself (or any other node for processing!)
    mediaStreamSource.connect( audioContext.destination );
}

navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia;
navigator.mediaDevices.getUserMedia( {audio:true}, gotStream );
