import './scss/styles.scss'

import Quiz from './modules/Quiz'

import createHeader from './modules/components/header'
import createMain from './modules/components/main'
import createFooter from './modules/components/footer'
import createVideoBg from './modules/components/videoBg'

const app = document.querySelector('.app')

async function renderApp() {
  const quiz = new Quiz()

  await quiz.loadQuiz()

  const headerNode = await createHeader(quiz.lang)
  const mainNode = await createMain()
  const footerNode = await createFooter()
  const videoBg = await createVideoBg()

  app.append(headerNode)
  app.append(mainNode)
  app.append(footerNode)
  app.append(videoBg)

  window.addEventListener('beforeunload', quiz.saveQuiz)
}

renderApp()
