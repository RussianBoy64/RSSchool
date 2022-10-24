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
    Game.results.forEach((result) => {
      const row = document.createElement('div')
      row.classList.add('row')

      const pos = document.createElement('span')
      pos.classList.add('position')
      pos.textContent = `${result.position}.`

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
    // this.wrapper.classList.add('show')
  }

  popUpHide = () => {
    this.wrapper.classList.remove('show')
  }
}

// export default async function createResultsNode() {
//   const results = document.createElement('div')
//   const resultsTitle = document.createElement('h3')

//   results.classList.add('results')
//   resultsTitle.classList.add('results__title')
//   resultsTitle.textContent = 'Top 10'

//   results.append(resultsTitle)

//   // add results
//   Game.results.forEach((result) => {
//     const row = document.createElement('div')
//     row.classList.add('row')

//     const pos = document.createElement('span')
//     pos.classList.add('position')
//     pos.textContent = `${result.position}.`

//     const name = document.createElement('span')
//     name.classList.add('name')
//     name.textContent = `${result.name || '...'}`

//     const moves = document.createElement('span')
//     moves.classList.add('moves')
//     moves.textContent = `M: ${result.moves || '00'}`

//     const time = document.createElement('span')
//     time.classList.add('time')
//     time.textContent = `T: ${timeFormatter(result.seconds) || '00:00'}`

//     row.append(pos)
//     row.append(name)
//     row.append(moves)
//     row.append(time)

//     results.append(row)
//   })

//   return results
// }

export default function createPopUp() {
  const popUp = new PopUp()

  return popUp
}
