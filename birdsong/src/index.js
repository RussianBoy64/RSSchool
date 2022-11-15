import './scss/styles.scss'

import createHeader from './modules/components/header'
import createMain from './modules/components/main'
import createFooter from './modules/components/footer'

const app = document.querySelector('.app')

async function renderApp() {
  const headerNode = await createHeader()
  const mainNode = await createMain()
  const footerNode = await createFooter()

  app.append(headerNode)
  app.append(mainNode)
  app.append(footerNode)
}

renderApp()
