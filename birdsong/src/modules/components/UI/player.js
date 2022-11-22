import quizData from '../../../data/quizData'
import getTime from '../helpers/timeFormatter'

export default async function createPlayer(
  lang,
  currentQuestion,
  currentBirdData
) {
  const playerWrapper = document.createElement('div')
  const playPauseBtn = document.createElement('button')
  const volumeWrapper = document.createElement('div')
  const volumeBtn = document.createElement('button')
  const volumeLevelBar = document.createElement('div')
  const volumeLevel = document.createElement('div')
  const songProgressWrapper = document.createElement('div')
  const songProgressBar = document.createElement('div')
  const songProgress = document.createElement('div')
  const songInfo = document.createElement('span')
  const song = new Audio()
  let volume = 0.75
  let volumeLevelWidth = volume * 100

  song.src = quizData[lang]['birds'][currentQuestion][currentBirdData].audio

  playerWrapper.classList.add('player')
  playPauseBtn.classList.add('player__play-btn')
  volumeWrapper.classList.add('player__volume')
  volumeBtn.classList.add('volume__btn')
  volumeLevelBar.classList.add('volume__levelbar')
  volumeLevel.classList.add('volume__level')
  songProgressWrapper.classList.add('player__song')
  songProgressBar.classList.add('song__progressbar')
  songProgress.classList.add('song__progress')
  songInfo.classList.add('song__info')
  song.classList.add('question__song')

  playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
  volumeBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>'
  // songInfo.textContent =

  playerWrapper.append(playPauseBtn)
  playerWrapper.append(volumeWrapper)
  playerWrapper.append(songProgressWrapper)
  playerWrapper.append(song)

  volumeWrapper.append(volumeBtn)
  volumeWrapper.append(volumeLevelBar)

  volumeLevelBar.append(volumeLevel)

  songProgressWrapper.append(songProgressBar)
  songProgressWrapper.append(songInfo)

  songProgressBar.append(songProgress)

  song.addEventListener('canplay', initPlayer)

  return playerWrapper

  // functions for player

  function initPlayer() {
    songPlayingHandler()

    playPauseBtn.addEventListener('click', playPauseHandler)
    volumeBtn.addEventListener('click', volumeToggle)
    volumeLevelBar.addEventListener('click', volumeLevelHandler)
    songProgressBar.addEventListener('click', progressBarClickHandler)

    song.addEventListener('timeupdate', songPlayingHandler)
    song.addEventListener('ended', audioEndHandler)
  }

  // play/pause handlers
  function playPauseHandler() {
    if (song.paused) {
      song.play()
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
    } else {
      song.pause()
      playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
    }
  }

  // volume handlers
  function volumeToggle() {
    if (song.muted) {
      setVolume()
    } else {
      volumeMute()
    }
  }

  function volumeMute() {
    song.muted = true
    song.volume = 0
    volumeBtn.innerHTML = '<i class="fa-solid fa-volume-off"></i>'
    volumeLevel.style.width = '0%'
  }

  function setVolume() {
    song.muted = false
    song.volume = volume
    volumeBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>'
    volumeLevel.style.width = `${volumeLevelWidth}%`
  }

  function volumeLevelHandler(event) {
    const offsetX = event.offsetX
    const volumeSliderWidth = this.offsetWidth
    if (0 < offsetX && offsetX < volumeSliderWidth) {
      volume = +(offsetX / volumeSliderWidth).toFixed(2)
      volumeLevelWidth = volume * 100
    }

    if (volumeLevelWidth < 5) {
      volume = 0
      volumeMute()
    } else {
      setVolume()
    }
  }

  // progress handlers
  function audioEndHandler() {
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
  }

  function songPlayingHandler() {
    const currentTime = getTime(song.currentTime)
    const duration = getTime(song.duration)
    const songProgressWidth = Math.round(
      (song.currentTime / song.duration) * 100
    )

    songInfo.innerText = `${currentTime} / ${duration}`
    songProgress.style.width = `${songProgressWidth}%`
  }

  function progressBarClickHandler(event) {
    const sliderWidth = songProgressBar.offsetWidth
    const newTime = (event.offsetX / sliderWidth) * song.duration

    song.currentTime = newTime
  }
}
