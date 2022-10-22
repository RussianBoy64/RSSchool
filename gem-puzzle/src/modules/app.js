import createGame from './game'

// DOM
import createHeaderNode from './nodes/header'
import createMainNode from './nodes/main'
import createFooterNode from './nodes/footer'
import createBackdropNode from './nodes/backdrop'
import createResultsNode from './nodes/results'

let Game = null
const app = document.querySelector('.app')

export default async function renderApp() {
  // load game
  Game = await createGame()

  //create DOM
  const headerNode = await createHeaderNode()
  const mainNode = await createMainNode()
  const footerNode = await createFooterNode()
  const backdropNode = await createBackdropNode()
  const resultsNode = await createResultsNode()

  app.append(headerNode)
  app.append(mainNode)
  app.append(footerNode)
  app.append(backdropNode)
  app.append(resultsNode)

  let initApp = await import('../modules/settings')

  // Game.shuffle()
  // console.log(Game)
}

export { Game }
