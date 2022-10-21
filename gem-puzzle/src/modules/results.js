import { backdrop, backdropShow } from './backdrop'

const resultsBtn = document.querySelector('.results__btn')
const results = document.querySelector('.results')

function resultsShow() {
  results.classList.add('show')
  backdropShow()
}

function resultsHide() {
  results.classList.remove('show')
}

resultsBtn.addEventListener('click', resultsShow)

export { resultsBtn, results, resultsShow, resultsHide }
