import styles from '../../scss/index.scss'
import { menuToggle, menuClose } from '../../modules/burgerMenu'
import { hideBackdrop } from '../../modules/backdrop'
import {
  sliderInput,
  testimonialsSlider,
  testimonialsMove,
  showPopUp,
} from '../../modules/testimonialsSlider'

const amountInput = document.querySelector('.diet__form__amount-input')
const amountRadio = document.querySelectorAll('input.amount')

function setAmout() {
  amountInput.value = this.value
}

function setInput(event) {
  let value = event.target.value
  if (value == '' || value == '-') {
    event.target.value = value.slice(0, 0)
  }

  if (value.length > 4) {
    event.target.value = value.slice(0, 4)
  } else {
    amountRadio.forEach((input) => {
      if (value === input.id) {
        input.checked = true
      } else {
        input.checked = false
      }
    })
  }
}

amountInput.addEventListener('input', setInput)

amountRadio.forEach((input) => input.addEventListener('input', setAmout))
