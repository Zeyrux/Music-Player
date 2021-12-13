loop_aktiv = false

function setCurrentSongTime(time, setParagraph=true, setProgressbar=true) {
    audio.currentTime = time
    audio.play()
    if (setParagraph) {
        paragraphTime.innerHTML = Math.floor(time / 60) + ":" + Math.round(time % 60) + " / "
        + time_minutes_max + ":" + time_seconds_max
    }
    if (setProgressbar) {
        inputRangeSongProgress.value = Math.round(time)
    }
}

window.addEventListener("resize", function() {
    resize()
})

buttonLoop.addEventListener("click", function() {
    if (loop_aktiv) {
        loop_aktiv = false
        buttonLoop.style.background = "rgb(211, 102, 102)"
    } else {
        loop_aktiv = true
        buttonLoop.style.background = "rgb(42, 252, 0)"
    }
})

buttonPlayPause.addEventListener("click", function() {
    if (audio.paused) {
        audio.play()
        buttonPlayPause.innerHTML = "Pause"
    } else {
        audio.pause()
        buttonPlayPause.innerHTML = "Play"
    }
});

inputRangeVolume.addEventListener("input", function() {
    audio.volume = this.value / 100
    inputTextVolume.setAttribute("value", this.value)
});

inputRangeSongProgress.addEventListener("input", function() {
    setCurrentSongTime(this.value, true, false)
});

setInterval(function() {
    setCurrentSongTime(audio.currentTime)
    if (audio.currentTime >= audio.duration - 1) {
        if (loop_aktiv) {
            setCurrentSongTime(0)
        } else {
            formSkipVolume.submit()
        }
    }
}, 1000)