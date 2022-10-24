import { Game, PopUp, Backdrop } from './app'

import createBtn from './nodes/button'

const frameSizes = [
  { size: '3x3', value: 3 },
  { size: '4x4', value: 4 },
  { size: '5x5', value: 5 },
  { size: '6x6', value: 6 },
  { size: '7x7', value: 7 },
  { size: '8x8', value: 8 },
]

class Settings {
  constructor() {
    this.settings = null
    this.settingsBtn = null
  }

  renderSettings = async () => {
    const settings = document.createElement('div')
    const settingsBtn = document.querySelector('.settings__btn')
    settings.classList.add('settings')

    // create settingsForm
    const form = document.createElement('form')
    const formTitle = document.createElement('span')
    const shuffleBtn = await createBtn('shuffle__btn', 'Shuffle')

    form.classList.add('settings__form')
    form.action = '/'

    formTitle.classList.add('settings__title')
    formTitle.textContent = 'Frame size:'

    form.append(formTitle)

    // add frame size inputs & labels
    frameSizes.forEach((gameFrame) => {
      const input = document.createElement('input')
      const label = document.createElement('label')

      input.classList.add('settings__input')
      input.id = gameFrame.size
      input.type = 'radio'
      input.name = 'frame-size'
      input.value = gameFrame.value
      if (gameFrame.value === Game.currentGameState.frameSize)
        input.checked = true

      label.classList.add('settings__label')
      label.htmlFor = gameFrame.size
      label.textContent = gameFrame.size

      form.append(input)
      form.append(label)
    })

    form.append(shuffleBtn)

    // create soundControl
    const soundInput = document.createElement('input')
    const soundLabel = document.createElement('label')

    soundInput.classList.add('sound__input')
    soundInput.id = 'switch'
    soundInput.type = 'checkbox'
    soundInput.name = 'sound'
    soundInput.checked = Game.isSound

    soundLabel.classList.add('sound__label')
    soundLabel.htmlFor = 'switch'
    soundLabel.textContent = 'Sound'

    // collect settings
    settings.append(form)
    settings.append(soundInput)
    settings.append(soundLabel)

    // addListeners
    settingsBtn.addEventListener('click', this.settingsMenuToggle)
    shuffleBtn.addEventListener('click', Game.shuffle)
    soundInput.addEventListener('change', Game.soundHandler)

    // save state
    this.settings = settings
    this.settingsBtn = settingsBtn

    return settings
  }

  settingsMenuToggle = () => {
    this.settingsBtn.classList.toggle('active')
    this.settings.classList.toggle('show')
    if (PopUp.wrapper.classList.contains('show')) {
      PopUp.wrapper.classList.remove('show')
    } else {
      Backdrop.backdropToggle()
    }
  }

  settingsMenuHide = () => {
    this.settingsBtn.classList.remove('active')
    this.settings.classList.remove('show')
  }
}

export default function createSettings() {
  const settings = new Settings()

  return settings
}
