window.addEventListener("load", function() {
    let attributeMax = document.createAttribute("max")
    attributeMax.value = Math.round(audio.duration)
    inputRangeSongProgress.setAttributeNode(attributeMax)
});

window.addEventListener("resize", function() {
    resize()
})

inputButtonPlayPause.addEventListener("click", function() {
    if (audio.paused) {
        audio.play()
        inputButtonPlayPause.innerHTML = "Pause"
    } else {
        audio.pause()
        inputButtonPlayPause.innerHTML = "Play"
    }
});

inputRangeVolume.addEventListener("input", function() {
    audio.volume = this.value / 100
    inputTextVolume.setAttribute("value", this.value)
});

inputRangeSongProgress.addEventListener("input", function() {
    audio.currentTime = this.value
    paragraphTime.innerHTML = this.value + " / " + Math.round(audio.duration)
});

setInterval(function() {
    inputRangeSongProgress.value = Math.round(audio.currentTime)
    paragraphTime.innerHTML = Math.round(audio.currentTime) + " / " + Math.round(audio.duration)
    if (audio.currentTime >= audio.duration - 1) {
        formSkipVolume.submit()
    }
}, 1000)