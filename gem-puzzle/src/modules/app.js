// classes
import createGame from './game'
import createPopUp from './popUp'
import createBackdropNode from './backdrop'
import createSettings from './settings'

// DOM
import createHeaderNode from './nodes/header'
import createMainNode from './nodes/main'
import createFooterNode from './nodes/footer'

let Game = null
let PopUp = null
let Backdrop = null
let Settings = null
const app = document.querySelector('.app')

export default async function renderApp() {
  // load game
  Game = await createGame()
  PopUp = createPopUp()
  Backdrop = createBackdropNode()
  Settings = createSettings()

  //create DOM
  const headerNode = await createHeaderNode()
  app.append(headerNode)

  const mainNode = await createMainNode()
  app.append(mainNode)

  const footerNode = await createFooterNode()
  app.append(footerNode)

  const backdropNode = await Backdrop.createBackdrop()
  app.append(backdropNode)

  const popUpWrapper = await PopUp.createPopUpWrapper()
  app.append(popUpWrapper)

  window.addEventListener('beforeunload', Game.saveGameData)
}

export { Game, PopUp, Backdrop, Settings }
