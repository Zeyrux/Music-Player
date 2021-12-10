var audio = document.getElementById("audio")
var paragraphSongName = document.getElementById("paragraphSongName")
var inputButtonPlayPause = document.getElementById("inputButtonPlayPause")
var inputCheckboxLoop = document.getElementById("inputCheckboxLoop")
var formSkipVolume = document.getElementById("formSkipVolume")
var inputTextVolume = document.getElementById("inputTextVolume")
var inputButtonSkip = document.getElementById("inputButtonSkip")
var paragraphTime = document.getElementById("paragraphTime")
var inputRangeSongProgress = document.getElementById("inputRangeSongProgress")
var inputRangeVolume = document.getElementById("inputRangeVolume")
var canvas = document.getElementById('analyser_render')

function resize() {
    canvas.width = screen.width - 40
    canvas.height = screen.height - 20
    bars = (screen.width - 50) / 4
}

var bars

var song = document.currentScript.getAttribute("song")
song = song.replaceAll("#SPACE#", " ")
song = song.slice(0, song.length - 1)
paragraphSongName.innerHTML = song

let volume = document.currentScript.getAttribute("volume")
audio.volume = volume / 100
inputRangeVolume.value = volume

paragraphTime.innerHTML = "0 / " + Math.round(audio.duration)

resize();