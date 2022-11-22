import './scss/styles.scss'

import quiz from './modules/Quiz'

import createHeader from './modules/components/header'
import createMain from './modules/components/main'
import createFooter from './modules/components/footer'
import createVideoBg from './modules/components/videoBg'

const app = document.querySelector('.app')
const path = window.location.pathname

async function renderApp() {
  const headerNode = await createHeader(quiz.lang)
  const mainNode = await createMain(path)
  const footerNode = await createFooter()

  app.append(headerNode)
  app.append(mainNode)
  app.append(footerNode)

  if (path === '/') {
    const videoBg = await createVideoBg()
    app.append(videoBg)
  }

  window.addEventListener('beforeunload', quiz.saveQuiz)
}

renderApp()

export default renderApp
