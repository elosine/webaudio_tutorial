(
~envbufs = SoundFile.collectIntoBuffers("/Users/jyang/Documents/github/webaudio_tutorial/grainenv/public/grainEnv2/*");
~envbufs.do({|it ix|
	it.loadToFloatArray(action: { arg array; a = array; {
		c = a.resamp1(44100);
		d = Buffer.alloc(s, 44100);
		d.loadCollection(c, action: {|buf|
			buf.write(it.path);
		});
	}.defer; "done".postln });
});
)
