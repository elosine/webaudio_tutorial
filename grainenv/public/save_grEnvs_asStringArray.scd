d = Array.newClear(0);


~envbufs = SoundFile.collectIntoBuffers("/Users/jyang/Documents/github/webaudio_tutorial/grainenv/public/grainEnv_512/*");
~envbufs.do({|it ix|
	it.loadToFloatArray(action: { arg array; a = array; {
		a.postln;
		// c = a.asString;
		/*a.asString.postln;
		d = d.add(c);*/
	}});
	});

(
~envbufs[0].loadToFloatArray(action:{|arr|
	arr.do{|it|
		d = d.add(it.asString);
	};
});
)
e="";
d.size
d.do{|it|
	e = e ++ it++
};

(
var f, g;
f = File("~/test.txt".standardizePath,"w");
f.write(d);
f.close;
)

// read it again:
(
g = File("~/test.txt".standardizePath,"r");
g.readAllString.postln;
g.close;
)