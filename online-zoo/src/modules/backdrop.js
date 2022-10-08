import { menuClose } from './burgerMenu'

const backDrop = document.querySelector('.backdrop')
const body = document.querySelector('body')

function toggleBackdrop() {
  backDrop.classList.toggle('show')
  body.classList.toggle('block')
}

function hideBackdrop() {
  backDrop.classList.remove('show')
  body.classList.remove('block')
}

backDrop.addEventListener('click', menuClose)

export { toggleBackdrop, hideBackdrop }
