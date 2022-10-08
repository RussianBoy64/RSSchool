import changeSlides from './changeSlides'

const [btnLeft, btnRight] = document.querySelectorAll('.arrow-btn')
const slider = document.querySelector('.pets .slider')
let direction = ''

const moveLeft = function (event) {
  removeListenners()
  slider.classList.add('moveLeft')
  direction = 'left'
}

const moveRight = function (event) {
  removeListenners()
  slider.classList.add('moveRight')
  direction = 'right'
}

function moveSlides(event) {
  if (event.target === slider) {
    changeSlides(direction)
    addListenners()
  }
}

function removeListenners() {
  btnLeft.removeEventListener('click', moveLeft)
  btnRight.removeEventListener('click', moveRight)
}

function addListenners() {
  slider.classList.remove('moveLeft')
  slider.classList.remove('moveRight')
  btnLeft.addEventListener('click', moveLeft)
  btnRight.addEventListener('click', moveRight)
}

btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
slider.addEventListener('transitionend', moveSlides)

export { btnLeft, btnRight }
