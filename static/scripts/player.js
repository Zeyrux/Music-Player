// Initialize the MP3 player after the page loads all of its HTML into the window

let frame = true

let bar_width = 1

let analyser
let ctxBars
let ctxCircle

function average(ar) {
	let sum = 0;
	for (let i = 0; i < ar.length; i++) {
		sum += ar[i]
	}
	return sum / ar.length
}

initMp3Player();

function initMp3Player(){
	buttonPlayPause.removeEventListener("load", initMp3Player)
	buttonPlayPause.removeEventListener("click", initMp3Player)
	let context = new AudioContext()
	// AudioContext object instance
	analyser = context.createAnalyser()
	let source = context.createMediaElementSource(audio);
	source.connect(analyser)
	analyser.connect(context.destination)
	ctx = canvas.getContext('2d')
	// Re-route audio playback into the processing graph of the AudioContext
	frameLooper()
}

function frameLooper(){
	window.requestAnimationFrame(frameLooper)
	if (frame){
		frame = false
	} else {
		frame = true
		return
	}
	//fbc_array max: 255
	let fbc_array = new Uint8Array(analyser.frequencyBinCount)
	analyser.getByteFrequencyData(fbc_array)
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = gradientBars
	for (let i = 0; i < bars; i+=1) {
		let bar_x = i * 2;
		let bar_height = -(fbc_array[i] * canvas.height / 275)
		for (let j = 1; j > -2; j -= 2)
		{
			ctx.fillRect(canvas.width / 2 + bar_x * j, canvas.height, bar_width, bar_height)
		}
	}
	ctx.fillStyle = gradientCircleAll
	ctx.beginPath()
	let radius = Math.round(average(fbc_array.slice(0, bars)) * canvas.height / 275)
	ctx.arc(canvas.width / 2, 0, radius, 2 * Math.PI, false)
	ctx.fill()

	ctx.fillStyle = gradientCircleBass
	ctx.beginPath()
	radius = Math.round(average(fbc_array.slice(0, 5)) * canvas.height / 275)
	ctx.arc(canvas.width / 2, 0, radius, 2 * Math.PI, false)
	ctx.fill()

	ctx.font = radius / 4+ "px serif"
	ctx.textBaseline = "middle"
	ctx.strokeText(song, canvas.width / 2 - Math.round(ctx.measureText(song).width) / 2, canvas.height * 0.35)
}