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

export { toggleBackdrop, hideBackdrop }
