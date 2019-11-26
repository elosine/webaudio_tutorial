(
~ebs = SoundFile.collectIntoBuffers("/Users/jyang/Documents/github/webaudio_tutorial/grainenv/public/grainEnv/*");
~ebs.do({|it ix|
	it.loadToFloatArray(action:{|arr|
		~arr2Str = "";
		arr.do{|it2 ix2|
			if(ix2 != (arr.size - 1), {
				~arr2Str = ~arr2Str ++ it2 ++ ",";
			}, {
				~arr2Str = ~arr2Str ++ it2;
			});
		};
	});
	~ns = "0" ++ ix.asString ++ "_gEnv" ;
	~path = it.path.replace(".aif", replace: ".txt").replace("/grainEnv", replace: "/grainEnv_csv").replace("gEnv", replace: ~ns);
	~toFile = File(~path, "w");
	~toFile.write(~arr2Str);
	~toFile.close;
})
)