import { PopUp, Settings } from './app'

class Backdrop {
  constructor() {
    this.backdrop = null
  }

  createBackdrop = async () => {
    const backdrop = document.createElement('div')
    backdrop.classList.add('backdrop')

    backdrop.addEventListener('click', this.backdropHide)

    this.backdrop = backdrop

    return backdrop
  }

  backdropToggle = () => {
    this.backdrop.classList.toggle('show')
  }

  backdropShow = () => {
    this.backdrop.classList.add('show')
  }

  backdropHide = () => {
    this.backdrop.classList.remove('show')
    Settings.settingsMenuHide()
    PopUp.popUpHide()
  }
}

export default function createBackdropNode() {
  const backdrop = new Backdrop()

  return backdrop
}
