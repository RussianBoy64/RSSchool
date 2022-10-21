import { backdropToggle } from './backdrop'
import { results } from './results'

const settingsBtn = document.querySelector('.settings__btn')
const settings = document.querySelector('.settings')

function settingsMenuToggle() {
  settingsBtn.classList.toggle('active')
  settings.classList.toggle('show')
  if (results.classList.contains('show')) {
    results.classList.remove('show')
  } else {
    backdropToggle()
  }
}

function settingsMenuHide() {
  settingsBtn.classList.remove('active')
  settings.classList.remove('show')
}

settingsBtn.addEventListener('click', settingsMenuToggle)

export { settingsBtn, settings, settingsMenuToggle, settingsMenuHide }
