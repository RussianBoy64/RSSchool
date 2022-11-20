import quizData from '../../data/quizData'
import quiz from '../Quiz'

import createPlayer from './UI/player'

export default async function createQuizPage() {
  const {lang, currentQuestion, score, answers} = quiz
  const mainInner = document.createElement('div')
  const questions = await createQuestions(lang, currentQuestion, score)
  const currentQuestionNode = await createCurrentQuestion(lang, currentQuestion, answers)

  mainInner.classList.add('main__inner')

  mainInner.append(questions)
  mainInner.append(currentQuestionNode)

  return mainInner
}

async function createQuestions(lang, currentQuestion, score) {
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
    if (questionIdx == currentQuestion) questionNode.classList.add('active')

    questionsWrapper.append(questionNode)
  }

  return questions
}

async function createCurrentQuestion(lang, currentQuestion, answers) {
  const currentQuestionNode = document.createElement('section')
  const currentImg  = document.createElement('div')
  const currentBird  = document.createElement('span')
  const player = await createPlayer(lang, currentQuestion, answers)
  

  currentQuestionNode.classList.add('quiz__current-question')
  currentImg.classList.add('current-question__img')
  currentBird.classList.add('current-question__bird')

  currentQuestionNode.append(currentImg)
  currentQuestionNode.append(currentBird)
  currentQuestionNode.append(player)

  return currentQuestionNode
}
