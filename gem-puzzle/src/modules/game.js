import getSolvableArr from './helpers/getSolvableArr'

class Game {
  constructor() {
    this.currentGameState = {
      solvedState: null,
      currentState: null,
      moves: 0,
      seconds: 0,
      frameSize: 4,
      isChanged: false,
    }
    this.savedGameState = null
    this.isGameStarted = false
    this.isSound = true
    this.results = [
      { position: 1, name: 'Vladimir', moves: 15, seconds: 123 },
      { position: 2, name: 'Semen', moves: 19, seconds: 131 },
      { position: 3, name: 'Arkadiy', moves: 21, seconds: 142 },
      { position: 4, name: 'Vika', moves: 23, seconds: 145 },
      { position: 5, name: 'Vitaliy', moves: 29, seconds: 232 },
      { position: 6, name: null, moves: null, seconds: null },
      { position: 7, name: null, moves: null, seconds: null },
      { position: 8, name: null, moves: null, seconds: null },
      { position: 9, name: null, moves: null, seconds: null },
      { position: 10, name: null, moves: null, seconds: null },
    ]
  }

  setFrameSize() {
    const frameSize = document.querySelector(
      '.settings__input[name="frame-size"]:checked'
    ).value

    this.currentGameState.frameSize = frameSize
  }

  shuffle(event) {
    event.preventDefault()

    this.isGameStarted = false

    this.setFrameSize()

    // hide backdrop and settings bar if open
    const backdrop = document.querySelector('.backdrop')
    const settings = document.querySelector('.settings')
    const settingsBtn = document.querySelector('.settings__btn')

    if (settingsBtn.classList.contains('active')) {
      settingsBtn.classList.remove('active')
      settings.classList.remove('show')
      backdrop.classList.remove('show')
    }

    // create solvedState
    const solvedArr = []
    const tilesCount = this.currentGameState.frameSize ** 2

    for (let tileNum = 1; tileNum <= tilesCount; tileNum++) {
      if (tileNum === tilesCount) {
        solvedArr.push(null)
      } else {
        solvedArr.push(tileNum)
      }
    }

    // create shuffledArr
    const shuffledArr = getSolvableArr(solvedArr)

    this.currentGameState.solvedState = solvedArr
    this.currentGameState.currentState = shuffledArr

    // render gameBoard
    const startBtn = document.querySelector('.start__btn')

    this.renderGameBoard()

    if (startBtn.disabled) startBtn.removeAttribute('disabled')
  }

  renderGameBoard() {
    const gameField = document.querySelector('.gameboard__gamefield')

    if (this.isGameStarted === false && gameField.classList.contains('show')) {
      gameField.classList.remove('show')
    }

    gameField.innerHTML = ''

    this.currentGameState.currentState.forEach((tileNumber) => {
      const tile = document.createElement('div')
      const tileSize = `${100 / this.currentGameState.frameSize}%`

      tile.classList.add('gamefield__tile')
      if (tileNumber === null) {
        tile.classList.add('empty')
        tile.textContent = ''
      } else {
        tile.textContent = tileNumber
      }

      tile.style.width = tileSize
      tile.style.height = tileSize

      gameField.append(tile)
    })

    if (this.isGameStarted === false) {
      setTimeout(() => {
        gameField.classList.add('show')
      }, 0)
    }
  }

  startGame() {
    this.isGameStarted = true
    console.log(this)
  }
}

export default async function createGame() {
  const newGame = new Game()
  const savedGame = JSON.parse(localStorage.getItem('savedGame'))

  if (savedGame) {
    newGame.savedGameState = savedGame.savedGameState
    newGame.isSound = savedGame.isSound
    newGame.results = savedGame.results
  }

  return newGame
}
