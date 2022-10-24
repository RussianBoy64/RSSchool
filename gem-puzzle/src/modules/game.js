import getSolvableArr from './helpers/getSolvableArr'
import timeFormatter from './helpers/timeFormatter'

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
    this.timer = null
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

  shuffle = (event) => {
    event.preventDefault()

    this.stopGame()

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

  renderGameBoard = () => {
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

  startGame = () => {
    if (this.isGameStarted === false) {
      const startBtn = document.querySelector('.start__btn')
      const saveBtn = document.querySelector('.save__btn')

      this.isGameStarted = true
      startBtn.disabled = true
      saveBtn.disabled = false

      this.timer = setInterval(this.updateTime, 1000)
    }
  }

  stopGame = () => {
    if (this.isGameStarted === true) {
      const moves = document.querySelector('.stats__moves')
      const timeDisplay = document.querySelector('.stats__time')

      this.isGameStarted = false
      this.currentGameState.moves = 0
      moves.innerHTML = '00'
      clearInterval(this.timer)
      this.currentGameState.seconds = 0
      timeDisplay.textContent = timeFormatter(this.currentGameState.seconds)
    }
  }

  saveGame = () => {
    const loadBtn = document.querySelector('.load__btn')
    const saveGame = JSON.stringify(this.currentGameState)

    this.savedGameState = JSON.parse(saveGame)
    loadBtn.disabled = false
    localStorage.setItem('savedGameState', saveGame)
  }

  saveGameData = () => {
    localStorage.setItem('isSound', JSON.stringify(this.isSound))
    localStorage.setItem('results', JSON.stringify(this.results))
  }

  loadGame = async () => {
    const startBtn = document.querySelector('.start__btn')
    const moves = document.querySelector('.stats__moves')
    const timeDisplay = document.querySelector('.stats__time')
    const savedGame = JSON.parse(localStorage.getItem('savedGameState'))

    startBtn.disabled = false
    this.isGameStarted = false
    this.currentGameState = savedGame

    this.renderGameBoard()
    clearInterval(this.timer)
    moves.innerHTML = String(this.currentGameState.moves).padStart(2, 0)
    timeDisplay.innerHTML = timeFormatter(this.currentGameState.seconds)
  }

  updateTime = () => {
    const timeDisplay = document.querySelector('.stats__time')

    this.currentGameState.seconds++
    timeDisplay.innerHTML = timeFormatter(this.currentGameState.seconds)
  }

  updateMoves = () => {
    const moves = document.querySelector('.stats__moves')
    this.currentGameState.moves++
    moves.innerHTML = String(this.currentGameState.moves).padStart(2, 0)
  }

  boardClickHandler = (event) => {
    const gameBoard = event.currentTarget
    if (gameBoard.classList.contains('show')) {
      const clickedTile = event.target

      const nullIdx = this.currentGameState.currentState.indexOf(null)
      const isNullOnRightSide =
        nullIdx % this.currentGameState.frameSize !==
        this.currentGameState.frameSize - 1
      const isNullOnLeftSide = nullIdx % this.currentGameState.frameSize !== 0
      const isClickedAfterNull =
        gameBoard.children[nullIdx].nextSibling === clickedTile
      const isClickedBeforeNull =
        gameBoard.children[nullIdx].previousSibling === clickedTile
      const isClickedOverNull =
        gameBoard.children[nullIdx - this.currentGameState.frameSize] ===
        clickedTile
      const isClickedUnderNull =
        gameBoard.children[
          nullIdx + Number(this.currentGameState.frameSize)
        ] === clickedTile
      const moveSound = document.querySelector('.moveSound')

      this.startGame()

      // move Tile
      if (isNullOnRightSide && isClickedAfterNull) {
        clickedTile.classList.add('moveLeft')

        if (this.isSound) moveSound.play()
        gameBoard.removeEventListener('click', this.boardClickHandler)
        gameBoard.addEventListener('animationend', this.changeGameState)
      } else if (isNullOnLeftSide && isClickedBeforeNull) {
        clickedTile.classList.add('moveRight')

        if (this.isSound) moveSound.play()
        gameBoard.removeEventListener('click', this.boardClickHandler)
        gameBoard.addEventListener('animationend', this.changeGameState)
      } else if (isClickedOverNull) {
        clickedTile.classList.add('moveDown')

        if (this.isSound) moveSound.play()
        gameBoard.removeEventListener('click', this.boardClickHandler)
        gameBoard.addEventListener('animationend', this.changeGameState)
      } else if (isClickedUnderNull) {
        clickedTile.classList.add('moveTop')

        if (this.isSound) moveSound.play()
        gameBoard.removeEventListener('click', this.boardClickHandler)
        gameBoard.addEventListener('animationend', this.changeGameState)
      }
    }
  }

  changeGameState = (event) => {
    const tile = event.target
    const gameBoard = event.currentTarget
    const tileIdx = this.currentGameState.currentState.indexOf(+tile.innerText)
    const nullIdx = this.currentGameState.currentState.indexOf(null)
    const temp = this.currentGameState.currentState[tileIdx]

    this.currentGameState.currentState[tileIdx] =
      this.currentGameState.currentState[nullIdx]
    this.currentGameState.currentState[nullIdx] = temp

    this.renderGameBoard()

    //update stats
    this.updateMoves()

    // reset classname
    tile.className = 'gamefield__tile'
    gameBoard.addEventListener('click', this.boardClickHandler)

    // check for solved
    const isSolved = this.isSolved()
    if (isSolved) {
      gameBoard.classList.remove('show')
      alert('you solved it')
    }
  }

  soundHandler = (event) => {
    const soundInput = event.target
    this.isSound = soundInput.checked
  }

  isSolved = () => {
    const solvedStr = this.currentGameState.solvedState.join(' ')
    const currentStr = this.currentGameState.currentState.join(' ')
    const isSolved = solvedStr === currentStr

    if (isSolved && this.isSound) {
      const victorySound = document.querySelector('.victorySound')
      victorySound.play()
    }

    return isSolved
  }
}

export default async function createGame() {
  const newGame = new Game()

  const savedGameState = JSON.parse(localStorage.getItem('savedGameState'))
  const isSound = localStorage.getItem('isSound')
  const results = JSON.parse(localStorage.getItem('results'))

  if (savedGameState) newGame.savedGameState = savedGameState
  if (isSound) newGame.isSound = JSON.parse(isSound)
  if (results) newGame.results = results

  return newGame
}
