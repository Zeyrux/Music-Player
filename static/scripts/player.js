// Initialize the MP3 player after the page loads all of its HTML into the window

//inputButtonPlayPause.addEventListener("click", initMp3Player);

let frame = true;

let bar_width = 1;

let analyser, ctxBars, ctxCircle, gradientBars, gradientCircleAll, gradientCircleBass;

function average(ar) {
	let sum = 0;
	for (let i = 0; i < ar.length; i++) {
		sum += ar[i];
	}
	return sum / ar.length
}

initMp3Player();

function initMp3Player(){
	inputButtonPlayPause.removeEventListener("load", initMp3Player)
	inputButtonPlayPause.removeEventListener("click", initMp3Player)
	let context = new AudioContext();
	// AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	let source = context.createMediaElementSource(audio); 
	source.connect(analyser);
	analyser.connect(context.destination);
	ctx = canvas.getContext('2d');
	// Re-route audio playback into the processing graph of the AudioContext
	gradientBars = ctx.createLinearGradient(canvas.width, canvas.height, canvas.width, -canvas.height);
	gradientBars.addColorStop(0, "green");
	gradientBars.addColorStop(0.2, "blue");
	gradientBars.addColorStop(0.4, "red");
	gradientCircleAll = ctx.createLinearGradient(canvas.width, 0, canvas.width, canvas.height);
	gradientCircleAll.addColorStop(0, "rgba(0, 0, 0, 0.2)");
	gradientCircleAll.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
	gradientCircleBass = ctx.createLinearGradient(canvas.width, 0, canvas.width, canvas.height);
	gradientCircleBass.addColorStop(0, "rgba(0, 0, 255, 0.2)");
	gradientCircleBass.addColorStop(0.5, "rgba(0, 255, 0, 0.2");
	frameLooper();
}

function frameLooper(){
	window.requestAnimationFrame(frameLooper);
	if (frame){
		frame = false
	} else {
		frame = true
		return
	}
	//fbc_array max: 255
	let fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = gradientBars;
	for (let i = 0; i < bars; i+=1) {
		let bar_x = i * 2;
		let bar_height = -(fbc_array[i] * canvas.height / 275);
		for (let j = 1; j > -2; j -= 2)
		{
			ctx.fillRect(canvas.width / 2 + bar_x * j, canvas.height, bar_width, bar_height);
		}
	}
	ctx.fillStyle = gradientCircleAll;
	ctx.beginPath();
	let radius = Math.round(average(fbc_array.slice(0, bars)) * canvas.height / 275);
	ctx.arc(canvas.width / 2, 0, radius, 2 * Math.PI, false);
	ctx.fill();

	ctx.fillStyle = gradientCircleBass;
	ctx.beginPath();
	radius = Math.round(average(fbc_array.slice(0, 6)) * canvas.height / 275);
	ctx.arc(canvas.width / 2, 0, radius, 2 * Math.PI, false);
	ctx.fill();

	radius = radius / 4;
	ctx.font = radius + "px serif";
	ctx.textBaseline = "middle";
	let text = song;
	ctx.strokeText(text, canvas.width / 2 - Math.round(ctx.measureText(text).width) / 2, canvas.height * 0.35);
}