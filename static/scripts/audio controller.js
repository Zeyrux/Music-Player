loop_aktiv = false

function setCurrentSongTime(time, setAudio=false) {
    secondsCurrent = Math.round(time % 60)
    if (secondsCurrent < 10) {
        secondsCurrent = "0" + secondsCurrent
    }
    paragraphTime.innerHTML = Math.floor(time / 60) + ":" + secondsCurrent + " / " + time_minutes_max + ":" + time_seconds_max
    inputRangeSongProgress.value = Math.round(time)
    if (setAudio) {
        audio.currentTime = time
        audio.play()
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
    for (let i = 0; i < inputTextVolumes.length; i++) {
        inputTextVolumes[i].setAttribute("value", this.value)
    }
});

inputRangeSongProgress.addEventListener("input", function() {
    setCurrentSongTime(this.value, true)
});

setInterval(function() {
    setCurrentSongTime(audio.currentTime)
    if (audio.currentTime >= audio.duration - 1) {
        if (loop_aktiv) {
            setCurrentSongTime(0, true)
        } else {
            formSkipVolume.submit()
        }
    }
}, 500)