import { menuClose } from './burgerMenu'
import { popUp, header } from './testimonialsSlider'

const backDrop = document.querySelector('.backdrop')
const body = document.querySelector('body')

function toggleBackdrop() {
  backDrop.classList.toggle('show')
  body.classList.toggle('block')
}

function hideBackdrop() {
  backDrop.classList.remove('show')
  body.classList.remove('block')
  popUp.classList.remove('show')
  header.classList.remove('hide')
}

backDrop.addEventListener('click', menuClose)

export { toggleBackdrop, hideBackdrop }
