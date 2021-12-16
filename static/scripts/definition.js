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

function setMaxTime() {
    if (audio.duration > 0)
        attributeMax = document.createAttribute("max")
        attributeMax.value = Math.round(audio.duration)
        inputRangeSongProgress.setAttributeNode(attributeMax)
        isSetMaxTime = true
}

function resize() {
    canvas.width = screen.width - 20
    canvas.height = screen.height - 20
    bars = Math.ceil(canvas.width / 4) + 1
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