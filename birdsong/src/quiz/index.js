import '../scss/styles.scss'
import Quiz from '../modules/Quiz'

import createHeader from '../modules/components/header'
import createMain from '../modules/components/main'
import createFooter from '../modules/components/footer'

const app = document.querySelector('.app')

async function renderApp() {
  const quiz = new Quiz()

  await quiz.loadQuiz()

  const headerNode = await createHeader(quiz.lang)
  const mainNode = await createMain()
  const footerNode = await createFooter()

  app.append(headerNode)
  app.append(mainNode)
  app.append(footerNode)

  window.addEventListener('beforeunload', quiz.saveQuiz)
}

renderApp()
