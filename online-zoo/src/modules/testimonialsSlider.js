import { toggleBackdrop, hideBackdrop } from './backdrop'

const testimonialsSlider = document.querySelector('.testimonials__slider')
const testimonials = document.querySelectorAll(
  '.testimonials__slider .slider__item'
)
const sliderInput = document.querySelector('.testimonials__input')
const popUp = document.querySelector('.pop-up')
const cross = document.querySelector('.cross')
const header = document.querySelector('.header')

function testimonialsMove() {
  const position = sliderInput.value
  const sliderItemWidth = testimonials[0].clientWidth
  const gap = Math.round(
    (testimonialsSlider.scrollWidth - testimonials.length * sliderItemWidth) /
      (testimonials.length - 1)
  )
  testimonialsSlider.style.transform = `translateX(-${
    position * sliderItemWidth + position * gap
  }px)`
}

function showPopUp(event) {
  const testimonial = event.target.closest('.slider__item')
  if (testimonial) {
    const node = popUp.querySelector('.slider__item')
    const newNode = document.createElement('div')
    newNode.classList.add('slider__item')
    newNode.innerHTML = testimonial.innerHTML
    node.replaceWith(newNode)
    popUp.classList.add('show')
    toggleBackdrop()
    header.classList.add('hide')
  }
}

function hidePopUp() {
  header.classList.remove('hide')
  popUp.classList.remove('show')
  toggleBackdrop()
}

sliderInput.addEventListener('input', testimonialsMove)
testimonialsSlider.addEventListener('click', showPopUp)
cross.addEventListener('click', hidePopUp)

export { sliderInput, testimonialsSlider, testimonialsMove, popUp, header }
