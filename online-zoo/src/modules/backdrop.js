const backDrop = document.querySelector('.backdrop')
const body = document.querySelector('body')
console.log(body.scrollHeight)

function toggleBackdrop() {
  backDrop.classList.toggle('show')
  body.classList.toggle('block')
  backDrop.style.height = body.scrollHeight + 'px'
}

function hideBackdrop() {
  backDrop.classList.remove('show')
  body.classList.remove('block')
  backDropody.style.height = 0
}

export { toggleBackdrop, hideBackdrop }
