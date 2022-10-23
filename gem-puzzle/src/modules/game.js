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

  shuffle = (event) => {
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

  boardClickHandler = (event) => {
    if (this.isGameStarted === false) {
      const startBtn = document.querySelector('.start__btn')
      const saveBtn = document.querySelector('.save__btn')

      this.isGameStarted = true
      startBtn.disabled = true
      saveBtn.disabled = false
    }

    const clickedTile = event.target
    const gameBoard = event.currentTarget
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
      gameBoard.children[nullIdx + Number(this.currentGameState.frameSize)] ===
      clickedTile

    // move Tile
    if (isNullOnRightSide && isClickedAfterNull) {
      clickedTile.classList.add('moveLeft')

      gameBoard.removeEventListener('click', this.boardClickHandler)
      gameBoard.addEventListener('animationend', this.changeGameState)
    } else if (isNullOnLeftSide && isClickedBeforeNull) {
      clickedTile.classList.add('moveRight')

      gameBoard.removeEventListener('click', this.boardClickHandler)
      gameBoard.addEventListener('animationend', this.changeGameState)
    } else if (isClickedOverNull) {
      clickedTile.classList.add('moveDown')

      gameBoard.removeEventListener('click', this.boardClickHandler)
      gameBoard.addEventListener('animationend', this.changeGameState)
    } else if (isClickedUnderNull) {
      clickedTile.classList.add('moveTop')

      gameBoard.removeEventListener('click', this.boardClickHandler)
      gameBoard.addEventListener('animationend', this.changeGameState)
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

    // reset classname
    tile.className = 'gamefield__tile'
    gameBoard.addEventListener('click', this.boardClickHandler)

    const isSolved = this.isSolved()
    if (isSolved) {
      gameBoard.classList.remove('show')
      alert('you solved it')
    }
  }

  isSolved = () => {
    const solvedStr = this.currentGameState.solvedState.join(' ')
    const currentStr = this.currentGameState.currentState.join(' ')

    return solvedStr === currentStr
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
