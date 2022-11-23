import quizData from '../../data/quizData'
import quiz from '../Quiz'

import createPlayer from './UI/player'
import createButton from './UI/button'

export default async function createQuizPage(choosenBirdData = null) {
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
  const descriptionNode = await createDescription(lang, currentQuestion, choosenBirdData)
  const nextButton = await createNextButton(lang)

  mainInner.classList.add('main__inner')

  mainInner.append(questions)
  mainInner.append(currentQuestionNode)
  mainInner.append(answersNode)
  mainInner.append(descriptionNode)
  mainInner.append(nextButton)

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

async function createDescription(lang, currentQuestion, choosenBirdData) {
  const descriptionNode = document.createElement('section')
  descriptionNode.classList.add('quiz__description')

  if (choosenBirdData === null) {
    descriptionNode.textContent = quizData[lang].description
  } else {
    const descriprionImg = document.createElement('div')
    const descriprionBirdName = document.createElement('span')
    const descriprionBirdSpecies = document.createElement('span')
    const descriprionBirdInfo = document.createElement('p')
    const descriptionPlayer = await createPlayer(lang, currentQuestion, choosenBirdData.id - 1)

    descriprionImg.classList.add('description__img')
    descriprionBirdName.classList.add('description__bird-name')
    descriprionBirdSpecies.classList.add('description__bird-species')
    descriprionBirdInfo.classList.add('description__info')

    descriprionImg.style.backgroundImage = `url('${choosenBirdData.image}')`
    descriprionBirdName.textContent = choosenBirdData.name
    descriprionBirdSpecies.textContent = choosenBirdData.species
    descriprionBirdInfo.textContent = choosenBirdData.description

    descriptionNode.append(descriprionImg)
    descriptionNode.append(descriprionBirdName)
    descriptionNode.append(descriprionBirdSpecies)
    descriptionNode.append(descriptionPlayer)
    descriptionNode.append(descriprionBirdInfo)
  }

  return descriptionNode
}

async function answersNodeClickHandler(event) {
  let { lang, currentQuestion, answers, isAnswered, points } = quiz
  const choosenAnswer = event.target.id
  const choosenBirdData = quizData[lang]['birds'][currentQuestion][choosenAnswer - 1]
  const currectAnswer =
    quizData[lang]['birds'][currentQuestion][answers[currentQuestion] - 1].id
  const newDescription = await createDescription(lang, currentQuestion, choosenBirdData)
  const currentDescription = document.querySelector('.quiz__description')

  if (choosenAnswer == currectAnswer) {
    if (!isAnswered) {
      const successSound = new Audio('../../../assets/successSound.mp3')
      const questionSong = document.querySelector('.question__song')

      if (questionSong) questionSong.pause()
      successSound.play()

      event.target.classList.add('incorrect')

      quiz.score += points

      if (currentQuestion === 5) {
        window.location.href = window.location.href.replace('quiz', 'results')
      }

      quiz.isAnswered = true
      quiz.pushedBtns += choosenAnswer

      await updateQuizPage(choosenBirdData)
    }
  } else {
    if (!isAnswered) {
      const failSound = new Audio('../../../assets/failSound.mp3')
      

      failSound.play()

      event.target.classList.add('incorrect')

      quiz.points = points <= 0 ? 0 : --points
      quiz.pushedBtns += choosenAnswer

      
    }
  }

  currentDescription.replaceWith(newDescription)
}

async function updateQuizPage(choosenBirdData) {
  const mainInnerCurrent = document.querySelector('.main__inner')
  const mainInnerUpdated = await createQuizPage(choosenBirdData)

  mainInnerCurrent.replaceWith(mainInnerUpdated)
}

async function createNextButton(lang) {
  const nextButton = document.createElement('button')
  const isAnswered = quiz.isAnswered

  nextButton.classList.add('next__btn')

  nextButton.textContent = lang === 'en' ? 'Next level' : 'Следующий уровень'

  if (isAnswered) {
    nextButton.disabled = false
  } else {
    nextButton.disabled = true
  }

  nextButton.addEventListener('click', async () => {

    quiz.changeQuestion()

    await updateQuizPage()
  })

  return nextButton
}

export {createDescription}