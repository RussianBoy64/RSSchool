import getSolvableArr from './helpers/getSolvableArr'
import timeFormatter from './helpers/timeFormatter'
import { PopUp, Backdrop } from './app'

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
    this.dragData = {
      isDragged: false,
      startPageX: 0,
      startPageY: 0,
      gameBoard: null,
      tile: null,
      tileWidth: 0,
      tileHeight: 0,
      tileTransition: '',
      nullIdx: 0,
      isNullOnRightSide: false,
      isNullOnLeftSide: false,
      isClickedAfterNull: false,
      isClickedBeforeNull: false,
      isClickedOverNull: false,
      isClickedUnderNull: false,
    }
    this.results = [
      { name: 'Vladimir', moves: 15, seconds: 123 },
      { name: 'Semen', moves: 19, seconds: 131 },
      { name: 'Arkadiy', moves: 21, seconds: 142 },
      { name: 'Vika', moves: 23, seconds: 145 },
      { name: 'Vitaliy', moves: 29, seconds: 232 },
      { name: null, moves: null, seconds: null },
      { name: null, moves: null, seconds: null },
      { name: null, moves: null, seconds: null },
      { name: null, moves: null, seconds: null },
      { name: null, moves: null, seconds: null },
    ]
  }

  setFrameSize() {
    const frameSize = document.querySelector(
      '.settings__input[name="frame-size"]:checked'
    ).value

    this.currentGameState.frameSize = frameSize
  }

  shuffle = (event) => {
    if (event) event.preventDefault()

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

  addResults = (event) => {
    event.preventDefault()
    const winInput = document.querySelector('.win__input')
    const playerName = winInput.value
    const moves = this.currentGameState.moves
    const seconds = this.currentGameState.seconds
    const result = {
      position: null,
      name: playerName,
      moves: moves,
      seconds: seconds,
    }
    const resultsLength = this.results.length

    for (let i = 0; i < resultsLength; i++) {
      if (this.results[i].moves === null) {
        result.position = i
        this.results[i] = result
        break
      } else if (
        moves < this.results[i].moves ||
        (moves === this.results[i].moves && seconds < this.results[i].seconds)
      ) {
        result.position = i - 1
        this.results.splice(i, 0, result)
        this.results.pop()
        break
      }
    }

    Backdrop.backdropHide()
    this.shuffle()
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

    document.removeEventListener('mousemove', this.mouseMoveHandler)

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
        this.removeEventListeners()
        gameBoard.addEventListener('animationend', this.changeGameState)
      } else if (isNullOnLeftSide && isClickedBeforeNull) {
        clickedTile.classList.add('moveRight')

        if (this.isSound) moveSound.play()
        this.removeEventListeners()
        gameBoard.addEventListener('animationend', this.changeGameState)
      } else if (isClickedOverNull) {
        clickedTile.classList.add('moveDown')

        if (this.isSound) moveSound.play()
        this.removeEventListeners()
        gameBoard.addEventListener('animationend', this.changeGameState)
      } else if (isClickedUnderNull) {
        clickedTile.classList.add('moveTop')

        if (this.isSound) moveSound.play()
        this.removeEventListeners()
        gameBoard.addEventListener('animationend', this.changeGameState)
      }
    }
  }

  mouseDownHandler = (event) => {
    const gameBoard = event.currentTarget
    const tile = event.target

    const tileWidth = tile.offsetWidth
    const tileHeight = tile.offsetHeight
    const tileTransition = window.getComputedStyle(tile).transition
    const startPageX = event.pageX
    const startPageY = event.pageY
    const nullIdx = this.currentGameState.currentState.indexOf(null)
    const isNullOnRightSide =
      nullIdx % this.currentGameState.frameSize !==
      this.currentGameState.frameSize - 1
    const isNullOnLeftSide = nullIdx % this.currentGameState.frameSize !== 0
    const isClickedAfterNull = gameBoard.children[nullIdx].nextSibling === tile
    const isClickedBeforeNull =
      gameBoard.children[nullIdx].previousSibling === tile
    const isClickedOverNull =
      gameBoard.children[nullIdx - this.currentGameState.frameSize] === tile
    const isClickedUnderNull =
      gameBoard.children[nullIdx + Number(this.currentGameState.frameSize)] ===
      tile

    //save mouseDown data
    this.dragData.gameBoard = gameBoard
    this.dragData.tile = tile
    this.dragData.tileWidth = tileWidth
    this.dragData.tileHeight = tileHeight
    this.dragData.tileTransition = tileTransition
    this.dragData.startPageX = startPageX
    this.dragData.startPageY = startPageY
    this.dragData.nullIdx = nullIdx
    this.dragData.isNullOnRightSide = isNullOnRightSide
    this.dragData.isNullOnLeftSide = isNullOnLeftSide
    this.dragData.isClickedAfterNull = isClickedAfterNull
    this.dragData.isClickedBeforeNull = isClickedBeforeNull
    this.dragData.isClickedOverNull = isClickedOverNull
    this.dragData.isClickedUnderNull = isClickedUnderNull

    // if clicked correct tile continue
    if (
      (isNullOnRightSide && isClickedAfterNull) ||
      (isNullOnLeftSide && isClickedBeforeNull) ||
      isClickedOverNull ||
      isClickedUnderNull
    ) {
      tile.style.cursor = 'grabbing'
      tile.style.transition = 'none'
      document.addEventListener('mousemove', this.mouseMoveHandler)
      gameBoard.removeEventListener('mousedown', this.mouseDownHandler)
    }
  }

  mouseMoveHandler = (event) => {
    if (event.buttons === 1) {
      // track current curcos coordinates
      const currentPageX = event.pageX
      const currentPageY = event.pageY
      // track gorizontal moves
      const moveX = this.dragData.startPageX - currentPageX
      const isMovedToLeft = this.dragData.startPageX - currentPageX > 0
      const isMovedToRight = this.dragData.startPageX - currentPageX < 0
      const isMovedByOneWidth = Math.abs(moveX) <= this.dragData.tileWidth
      // track vertical moves
      const moveY = this.dragData.startPageY - currentPageY
      const isMovedToTop = this.dragData.startPageY - currentPageY > 0
      const isMovedToBottom = this.dragData.startPageY - currentPageY < 0
      const isMovedByOneHeight = Math.abs(moveY) <= this.dragData.tileHeight

      if (this.dragData.isDragged === false) {
        this.dragData.isDragged === true
        this.dragData.gameBoard.removeEventListener(
          'click',
          this.boardClickHandler
        )
        document.addEventListener('mouseup', this.mouseUpHandler)
      }

      this.startGame()

      if (this.dragData.isNullOnRightSide && this.dragData.isClickedAfterNull) {
        if (isMovedToLeft && isMovedByOneWidth) {
          this.dragData.tile.style.transform = `translate(${-moveX}px, 0px)`
        }
      } else if (
        this.dragData.isNullOnLeftSide &&
        this.dragData.isClickedBeforeNull
      ) {
        if (isMovedByOneWidth && isMovedToRight) {
          this.dragData.tile.style.transform = `translate(${-moveX}px, 0px)`
        }
      } else if (this.dragData.isClickedOverNull) {
        if (isMovedToBottom && isMovedByOneHeight) {
          this.dragData.tile.style.transform = `translate(0px, ${-moveY}px)`
        }
      } else if (this.dragData.isClickedUnderNull) {
        if (isMovedToTop && isMovedByOneHeight) {
          this.dragData.tile.style.transform = `translate(0px, ${-moveY}px)`
        }
      }
    }
  }

  mouseUpHandler = (event) => {
    const endPageX = event.pageX
    const endPageY = event.pageY
    const isMovedToLeft = this.dragData.startPageX - endPageX > 0
    const isMovedToRight = this.dragData.startPageX - endPageX < 0
    const isMovedByHalfWidth =
      Math.abs(this.dragData.startPageX - endPageX) >
      this.dragData.tileWidth / 2
    const isMovedToTop = this.dragData.startPageY - endPageY > 0
    const isMovedToBottom = this.dragData.startPageY - endPageY < 0
    const isMovedByHalfHeight =
      Math.abs(this.dragData.startPageY - endPageY) >
      this.dragData.tileHeight / 2
    const moveSound = document.querySelector('.moveSound')

    this.dragData.isDragged === false
    document.removeEventListener('mousemove', this.mouseMoveHandler)
    document.removeEventListener('mouseup', this.mouseUpHandler)

    this.dragData.tile.style.cursor = 'grab'
    this.dragData.tile.style.transition = this.dragData.tileTransition

    // move Tile
    if (this.dragData.isNullOnRightSide && this.dragData.isClickedAfterNull) {
      // clickedTile.classList.add('moveLeft')

      if (isMovedToLeft && isMovedByHalfWidth) {
        this.dragData.tile.classList.add('moveLeft')
        if (this.isSound) moveSound.play()

        this.removeEventListeners()
        this.dragData.gameBoard.addEventListener(
          'animationend',
          this.changeGameState
        )
      } else {
        this.moveBack()
      }
    } else if (
      this.dragData.isNullOnLeftSide &&
      this.dragData.isClickedBeforeNull
    ) {
      if (isMovedToRight && isMovedByHalfWidth) {
        this.dragData.tile.classList.add('moveRight')
        if (this.isSound) moveSound.play()

        this.removeEventListeners()
        this.dragData.gameBoard.addEventListener(
          'animationend',
          this.changeGameState
        )
      } else {
        this.moveBack()
      }
    } else if (this.dragData.isClickedOverNull) {
      if (isMovedToBottom && isMovedByHalfHeight) {
        this.dragData.tile.classList.add('moveDown')
        if (this.isSound) moveSound.play()

        this.removeEventListeners()
        this.dragData.gameBoard.addEventListener(
          'animationend',
          this.changeGameState
        )
      } else {
        this.moveBack()
      }
    } else if (this.dragData.isClickedUnderNull) {
      if (isMovedToTop && isMovedByHalfHeight) {
        this.dragData.tile.classList.add('moveTop')
        if (this.isSound) moveSound.play()

        this.removeEventListeners()
        this.dragData.gameBoard.addEventListener(
          'animationend',
          this.changeGameState
        )
      } else {
        this.moveBack()
      }
    }
  }

  moveBack = () => {
    const moveSound = document.querySelector('.moveSound')

    this.dragData.tile.style.transform = `translate(0px, 0px)`
    if (this.isSound) moveSound.play()
    setTimeout(() => {
      this.dragData.gameBoard.addEventListener('click', this.boardClickHandler)
      this.dragData.gameBoard.addEventListener(
        'mousedown',
        this.mouseDownHandler
      )
    }, 0)
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

    this.addEventListeners()

    // check for solved
    const isSolved = this.isSolved()
    if (isSolved) {
      gameBoard.classList.remove('show')
      PopUp.renderWin()
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

  removeEventListeners = () => {
    const gameBoard = document.querySelector('.gameboard__gamefield')
    const shuffleBtn = document.querySelector('.shuffle__btn')
    const loadBtn = document.querySelector('.load__btn')

    gameBoard.removeEventListener('click', this.boardClickHandler)
    shuffleBtn.removeEventListener('click', this.shuffle)
    loadBtn.removeEventListener('click', this.loadGame)
  }

  addEventListeners = () => {
    const gameBoard = document.querySelector('.gameboard__gamefield')
    const shuffleBtn = document.querySelector('.shuffle__btn')
    const loadBtn = document.querySelector('.load__btn')

    gameBoard.addEventListener('click', this.boardClickHandler)
    gameBoard.addEventListener('mousedown', this.mouseDownHandler)
    shuffleBtn.addEventListener('click', this.shuffle)
    loadBtn.addEventListener('click', this.loadGame)
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
