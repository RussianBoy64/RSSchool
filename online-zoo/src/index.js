import styles from './scss/index.scss'
import { menuToggle, menuClose } from './modules/burgerMenu'
import { hideBackdrop } from './modules/backdrop'
import { btnLeft, btnRight } from './modules/petsSlider'
import {
  sliderInput,
  testimonialsSlider,
  testimonialsMove,
  showPopUp,
} from './modules/testimonialsSlider'

if (window.innerWidth < 998) {
  testimonialsSlider.addEventListener('click', showPopUp)
}

if (window.innerWidth < 1201) {
  sliderInput.max = 8
} else {
  sliderInput.max = 7
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 640) {
    menuClose()
    hideBackdrop()
  }

  testimonialsSlider.style.transform = 'translateX(0px)'
  sliderInput.value = 0

  if (window.innerWidth < 1201) {
    sliderInput.max = 8
  } else {
    sliderInput.max = 7
  }

  if (window.innerWidth < 998) {
    testimonialsSlider.addEventListener('click', showPopUp)
  } else {
    testimonialsSlider.removeEventListener('click', showPopUp)
  }
})
