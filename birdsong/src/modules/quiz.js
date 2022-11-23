import quizData from '../data/quizData'

class Quiz {
  constructor() {
    this.lang = 'en'
    this.currentQuestion = 0
    this.score = 0
    this.points = 5
    this.answers = []
    this.isAnswered = false
    this.pushedBtns = ''
  }

  loadQuiz = () => {
    const lang = localStorage.getItem('lang')
    const answers = localStorage.getItem('answers')
    const currentQuestion = localStorage.getItem('currentQuestion')
    const score = localStorage.getItem('score')
    const points = localStorage.getItem('points')
    const isAnswered = localStorage.getItem('isAnswered')
    const pushedBtns = localStorage.getItem('pushedBtns')
    const data = {
      lang,
      answers,
      currentQuestion,
      score,
      points,
      isAnswered,
      pushedBtns,
    }

    return data
  }

  saveQuiz = () => {
    localStorage.setItem('lang', this.lang)
    localStorage.setItem('answers', this.answers.join(''))
    localStorage.setItem('currentQuestion', this.currentQuestion)
    localStorage.setItem('score', this.score)
    localStorage.setItem('points', this.points)
    localStorage.setItem('isAnswered', this.isAnswered)
    localStorage.setItem('pushedBtns', this.pushedBtns)
  }

  shuffleQuestions = () => {
    const birdsData = quizData[this.lang].birds
    const answersArr = []
    birdsData.forEach((birdsArr) => {
      const randomIndex = Math.floor(Math.random() * birdsArr.length)
      answersArr.push(birdsArr[randomIndex].id)
    })

    this.answers = answersArr
  }

  startQuiz = () => {
    this.score = 0
    this.points = 5
    this.currentQuestion = 0
    this.isAnswered = false
    this.pushedBtns = ''
    this.shuffleQuestions()
  }

  changeQuestion = () => {
    this.currentQuestion++
    this.isAnswered = false
    this.points = 5
    this.pushedBtns = ''
  }
}

const quiz = new Quiz()
const {
  lang,
  answers,
  currentQuestion,
  score,
  points,
  isAnswered,
  pushedBtns,
} = quiz.loadQuiz()

if (lang) quiz.lang = lang
if (answers) quiz.answers = answers.split('')
if (+currentQuestion !== 0) quiz.currentQuestion = +currentQuestion
if (+score !== 0) quiz.score = +score
if (+points !== 0) quiz.points = +points
if (isAnswered) quiz.isAnswered = isAnswered === 'true' ? true : false
if (pushedBtns) quiz.pushedBtns = pushedBtns

export default quiz
