var audio = document.getElementById("audio")
var buttonPlayPause = document.getElementById("buttonPlayPause")
var buttonLoop = document.getElementById("buttonLoop")
var formSkipVolume = document.getElementById("formSkipVolume")
var inputTextVolumes = document.getElementsByClassName("inputTextVolume")
var inputButtonSkip = document.getElementById("inputButtonSkip")
var paragraphTime = document.getElementById("paragraphTime")
var inputRangeSongProgress = document.getElementById("inputRangeSongProgress")
var inputRangeVolume = document.getElementById("inputRangeVolume")
var canvas = document.getElementById('analyser_render')

var time_minutes_max
var time_seconds_max
var bars
var song = document.currentScript.getAttribute("song")

let isSetMaxTime = false

var gradientBars
var gradientCircleAll
var gradientCircleBass

function setMaxTime() {
    if (audio.duration > 0)
        attributeMax = document.createAttribute("max")
        attributeMax.value = Math.round(audio.duration)
        inputRangeSongProgress.setAttributeNode(attributeMax)
        isSetMaxTime = true
}

function resize() {
    canvas.width = window.innerWidth - 20
    canvas.height = window.innerHeight - 20
    bars = Math.ceil(canvas.width / 4) + 1
    setGradients()
}

function setGradients() {
	let ctx = canvas.getContext('2d')
    gradientBars = ctx.createLinearGradient(canvas.width, canvas.height, canvas.width, -canvas.height)
	gradientBars.addColorStop(0.0, "blue")
	gradientBars.addColorStop(0.4, "red")
	gradientCircleAll = ctx.createLinearGradient(canvas.width, 0, canvas.width, canvas.height)
	gradientCircleAll.addColorStop(0, "rgba(0, 0, 0, 0.2)")
	gradientCircleAll.addColorStop(0.5, "rgba(255, 255, 255, 0.2)")
	gradientCircleBass = ctx.createLinearGradient(canvas.width, 0, canvas.width, canvas.height)
	gradientCircleBass.addColorStop(0, "rgba(0, 0, 255, 0.2)")
	gradientCircleBass.addColorStop(0.5, "rgba(0, 255, 0, 0.2")
}

window.addEventListener("load", function() {
    time_minutes_max = Math.floor(audio.duration / 60)
    time_seconds_max = Math.round(audio.duration % 60)
    if (time_seconds_max < 10) {
        time_seconds_max = "0" + time_seconds_max
    }
});

song = song.replaceAll("#SPACE#", " ")
song = song.slice(0, song.length - 1)

let volume = document.currentScript.getAttribute("volume")
audio.volume = volume / 100
inputRangeVolume.value = volume

buttonLoop.style.background = "rgb(211, 102, 102)"

paragraphTime.innerHTML = "0:00 / load..."

resize();