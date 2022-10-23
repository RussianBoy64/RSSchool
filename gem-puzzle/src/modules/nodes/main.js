import { Game } from '../app'

import createWrapper from './wrapper'
import createBtn from './button'
import createStatsNode from './stats'
import createSettingsNode from './settings'

export default async function createMainNode() {
  // create main
  const main = document.createElement('main')
  main.classList.add('main')

  // create wrapper
  const wrapper = createWrapper()
  wrapper.classList.add('gameboard')

  //create controls
  const gameControls = document.createElement('div')

  const shuffleBtn = await createBtn('shuffle__btn', 'Shuffle')
  const startBtn = await createBtn(
    'start__btn',
    'Start',
    Game.currentGameState.currentState ? false : true
  )
  const resultsBtn = await createBtn('results__btn', 'Results')
  const saveBtn = await createBtn(
    'save__btn',
    'Save',
    Game.currentGameState.currentState ? false : true
  )
  const loadBtn = await createBtn(
    'load__btn',
    'Load',
    Game.savedGameState ? false : true
  )

  gameControls.classList.add('gameboard__controls')

  gameControls.append(shuffleBtn)
  gameControls.append(startBtn)
  gameControls.append(resultsBtn)
  gameControls.append(saveBtn)
  gameControls.append(loadBtn)

  //create stats
  const gameStats = await createStatsNode()

  //create gamefield
  const gamefield = document.createElement('div')
  gamefield.classList.add('gameboard__gamefield')

  //create settings
  const settings = await createSettingsNode()

  //create sound
  const tileSound = document.createElement('audio')
  const tileSoundSrc = document.createElement('source')

  tileSoundSrc.src = './assets/moveTile.mp3'
  tileSoundSrc.type = 'audio/mpeg'

  tileSound.append(tileSoundSrc)

  // collect main

  wrapper.append(gameControls)
  wrapper.append(gameStats)
  wrapper.append(gamefield)

  main.append(wrapper)
  main.append(settings)
  main.append(tileSound)

  // addListeners
  shuffleBtn.addEventListener('click', Game.shuffle)
  startBtn.addEventListener('click', Game.startGame)
  gamefield.addEventListener('click', Game.boardClickHandler)

  return main
}
