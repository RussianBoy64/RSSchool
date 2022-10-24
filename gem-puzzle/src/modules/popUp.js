import { Game, Backdrop } from './app'
import timeFormatter from './helpers/timeFormatter'

class PopUp {
  constructor() {
    this.wrapper = null
  }

  createPopUpWrapper = async () => {
    const popUpWrapper = document.createElement('div')

    popUpWrapper.classList.add('popUp')
    this.wrapper = popUpWrapper

    return popUpWrapper
  }

  renderResults = async () => {
    const results = document.createElement('div')
    const resultsTitle = document.createElement('h3')

    // clear popUp
    this.wrapper.innerHTML = ''

    results.classList.add('results')

    resultsTitle.classList.add('results__title')
    resultsTitle.textContent = 'Top 10'

    results.append(resultsTitle)

    // add results
    Game.results.forEach((result, idx) => {
      const row = document.createElement('div')
      row.classList.add('row')

      const pos = document.createElement('span')
      pos.classList.add('position')
      pos.textContent = `${idx + 1}.`

      const name = document.createElement('span')
      name.classList.add('name')
      name.textContent = `${result.name || '...'}`

      const moves = document.createElement('span')
      moves.classList.add('moves')
      moves.textContent = `M: ${result.moves || '00'}`

      const time = document.createElement('span')
      time.classList.add('time')
      time.textContent = `T: ${timeFormatter(result.seconds) || '00:00'}`

      row.append(pos)
      row.append(name)
      row.append(moves)
      row.append(time)

      results.append(row)
    })

    this.wrapper.append(results)
    Backdrop.backdropShow()
    setTimeout(() => {
      this.wrapper.classList.add('show')
    }, 0)
  }

  renderWin = async () => {
    const winWrapper = document.createElement('div')
    const winTitle = document.createElement('h3')
    const winText = document.createElement('p')
    const winForm = document.createElement('form')
    const winInput = document.createElement('input')
    const winBtn = document.createElement('button')

    winWrapper.classList.add('win')

    // create Title
    winTitle.classList.add('win__title')
    winTitle.textContent = 'Hooray!'

    // create Text
    winText.classList.add('win__text')
    winText.textContent = `You solved the puzzle in ${timeFormatter(
      Game.currentGameState.seconds
    )} and ${Game.currentGameState.moves} moves!`

    // create form
    winForm.classList.add('win__form')
    winForm.action = '/'

    // create input
    winInput.classList.add('win__input')
    winInput.placeholder = 'Your name'
    winInput.required = true
    winInput.maxLength = 10

    // create btn
    winBtn.classList.add('btn')
    winBtn.classList.add('win__btn')
    winBtn.textContent = 'Save results'
    winBtn.type = 'submit'

    // Game.stopGame()
    clearInterval(Game.timer)

    // clear popUp
    this.wrapper.innerHTML = ''

    winWrapper.append(winTitle)
    winWrapper.append(winText)
    winForm.append(winInput)
    winForm.append(winBtn)
    winWrapper.append(winForm)
    this.wrapper.append(winWrapper)

    Backdrop.backdropShow()
    this.wrapper.classList.add('show')

    winForm.addEventListener('submit', Game.addResults)
  }

  popUpHide = () => {
    this.wrapper.classList.remove('show')
  }
}

export default function createPopUp() {
  const popUp = new PopUp()

  return popUp
}
