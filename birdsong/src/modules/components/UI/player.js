import quizData from "../../../data/quizData"
import getTime from '../helpers/timeFormatter'

export default async function createPlayer(lang, currentQuestion, answers) {
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

  song.src = quizData[lang]['birds'][currentQuestion][answers[currentQuestion] - 1].audio
  
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

  playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
  volumeBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>'
  // songInfo.textContent = 
  

  playerWrapper.append(playPauseBtn)
  playerWrapper.append(volumeWrapper)
  playerWrapper.append(songProgressWrapper)

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
    showSongTime()
    
    playPauseBtn.addEventListener('click', playPauseHandler)
    volumeBtn.addEventListener('click', volumeToggle)
    volumeLevelBar.addEventListener('click', volumeLevelHandler)
  
    song.addEventListener('timeupdate', showSongTime)
    song.addEventListener('ended', audioEndHandler)
  }
  
  function showSongTime() {
    const currentTime = getTime(song.currentTime)
    const duration = getTime(song.duration)
  
    songInfo.innerText = `${currentTime} / ${duration}`
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
}
