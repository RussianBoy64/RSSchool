import quizData from '../../data/quizData'
import quiz from '../Quiz'

import createPlayer from './UI/player'
import createButton from './UI/button'
import createMain from './main'

export default async function createQuizPage() {
  const { lang, currentQuestion, score, answers, isAnswered } = quiz
  const mainInner = document.createElement('div')
  const questions = await createQuestions(lang, currentQuestion, score)
  const currentQuestionNode = await createCurrentQuestion(
    lang,
    currentQuestion,
    answers,
    isAnswered
  )

  const answersNode = await createAnswers(lang, currentQuestion)

  mainInner.classList.add('main__inner')

  mainInner.append(questions)
  mainInner.append(currentQuestionNode)
  mainInner.append(answersNode)

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

async function createCurrentQuestion(
  lang,
  currentQuestion,
  answers,
  isAnswered
) {
  const currentBirdData = answers[currentQuestion] - 1
  const currentQuestionNode = document.createElement('section')
  const currentImg = document.createElement('div')
  const currentBird = document.createElement('span')
  const answerImgSrc =
    quizData[lang]['birds'][currentQuestion][currentBirdData].image
  const answerName =
    quizData[lang]['birds'][currentQuestion][currentBirdData].name
  const player = await createPlayer(lang, currentQuestion, currentBirdData)

  currentQuestionNode.classList.add('quiz__current-question')
  currentImg.classList.add('current-question__img')
  currentBird.classList.add('current-question__bird')

  if (isAnswered) {
    currentImg.style.backgroundImage = `url('${answerImgSrc}')`
    currentBird.textContent = answerName
  } else {
    currentImg.style.backgroundImage =
      'url(https://birds-quiz.netlify.app/static/media/bird.06a46938.jpg)'
    currentBird.textContent = '******'
  }

  currentQuestionNode.append(currentImg)
  currentQuestionNode.append(currentBird)
  currentQuestionNode.append(player)

  return currentQuestionNode
}

async function createAnswers(lang, currentQuestion) {
  const answersNode = document.createElement('section')
  const answersArr = quizData[lang]['birds'][currentQuestion]

  answersArr.forEach(async (answer, idx) => {
    const answerButton = await createButton(answer.name, idx, 'answers__btn')
    answersNode.append(answerButton)
  })

  answersNode.classList.add('quiz__answers')

  answersNode.addEventListener('click', answersNodeClickHandler)

  return answersNode
}

async function answersNodeClickHandler(event) {
  let { lang, currentQuestion, score, answers, isAnswered, points } = quiz
  const choosenAnswer = event.target.id
  const currectAnswer =
    quizData[lang]['birds'][currentQuestion][answers[currentQuestion] - 1].id

  if (choosenAnswer == currectAnswer) {
    console.log('success')
    if (!isAnswered) {
      const successSound = new Audio('../../../assets/successSound.wav')
      const questionSong = document.querySelector('.question__song')

      if (questionSong) questionSong.pause()
      successSound.play()

      event.target.classList.add('incorrect')

      quiz.score += points
      quiz.isAnswered = true
      quiz.pushedBtns += choosenAnswer

      await updateQuizPage()
    }
  } else {
    console.log('fail')
    if (!isAnswered) {
      const failSound = new Audio('../../../assets/failSound.wav')

      failSound.play()

      event.target.classList.add('incorrect')

      quiz.points = points <= 0 ? 0 : --points
      quiz.pushedBtns += choosenAnswer
    }
  }
}

async function updateQuizPage() {
  const mainInnerCurrent = document.querySelector('.main__inner')
  const mainInnerUpdated = await createQuizPage()

  mainInnerCurrent.replaceWith(mainInnerUpdated)
}
