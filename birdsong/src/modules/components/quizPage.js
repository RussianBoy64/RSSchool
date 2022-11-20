import quizData from '../../data/quizData'

export default async function createQuizPage(lang, question, score) {
  const mainInner = document.createElement('div')
  const questions = await createQuestions(lang, question, score)

  mainInner.classList.add('main__inner')

  mainInner.append(questions)

  return mainInner
}

async function createQuestions(lang, question, score) {
  const questions = document.createElement('section')
  const scoreNode = document.createElement('span')
  const questionsData = quizData[lang].questions

  scoreNode.textContent = lang === 'en' ? 'Score: ' : 'Счет: '
  scoreNode.textContent += score

  questions.classList.add('quiz__questions')
  scoreNode.classList.add('questions__score')
  console.log(score)
  questions.append(scoreNode)

  for (let questionData of questionsData) {
    console.log(questionData)
  }

  return questions
}
