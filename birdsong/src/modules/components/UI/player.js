import quizData from "../../../data/quizData"

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
  const song = new Audio(quizData[lang]['birds'][currentQuestion][answers[currentQuestion] - 1].audio)

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
  volumeBtn.innerHTML = '<i class="fa-solid fa-volume"></i>'
  // songInfo.textContent = 
  console.log(song.duration)

  playerWrapper.append(playPauseBtn)
  playerWrapper.append(volumeWrapper)
  playerWrapper.append(songProgressWrapper)

  volumeWrapper.append(volumeBtn)
  volumeWrapper.append(volumeLevelBar)

  volumeLevelBar.append(volumeLevel)

  songProgressWrapper.append(songProgressBar)
  songProgressWrapper.append(songInfo)

  songProgressBar.append(songProgress)

  playPauseBtn.addEventListener('click', () => {
    song.play()
  })

  return playerWrapper
}