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
  const questionsWrapper = document.createElement('div')
  const scoreNode = document.createElement('span')
  const questionsData = quizData[lang].questions

  scoreNode.textContent = lang === 'en' ? 'Score: ' : 'Счет: '
  scoreNode.textContent += score

  questions.classList.add('quiz__questions')
  questionsWrapper.classList.add('questions__wrapper')
  scoreNode.classList.add('questions__score')

  questions.append(scoreNode)
  questions.append(questionsWrapper)

  for (let questionIdx in questionsData) {
    const questionNode = document.createElement('span') 
    
    questionNode.textContent = questionsData[questionIdx]

    questionNode.classList.add('questions__question')
    if(questionIdx==question) questionNode.classList.add('active')

    questionsWrapper.append(questionNode)
  }

  return questions
}

async function createCurrentQuestion(lang, question) {
  const currentQuestion = document.createElement('section')
  const currentImg  = document.createElement('div')
  const currentBird  = document.createElement('span')
  

  currentQuestion.classList.add('quiz__current-question')
  currentImg.classList.add('current-question__img')
  currentBird.classList.add('current-question__bird')
}
