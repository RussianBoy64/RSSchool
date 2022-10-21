import { settingsMenuHide } from './settings'
import { resultsHide } from './results'

const backdrop = document.querySelector('.backdrop')

function backdropToggle() {
  backdrop.classList.toggle('show')
}

function backdropShow() {
  backdrop.classList.add('show')
}

function backdropHide() {
  backdrop.classList.remove('show')
  settingsMenuHide()
  resultsHide()
}

backdrop.addEventListener('click', backdropHide)

export { backdrop, backdropToggle, backdropShow, backdropHide }
