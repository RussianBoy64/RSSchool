import quizData from "../data/quizData"

class Quiz {
  constructor() {
    this.lang = 'en'
    this.currentQuestion = 0
    this.score = 0
    this.answers = []
    this.isAnswered = true
  }

  loadQuiz = () => {
    const lang = localStorage.getItem('lang')
    const answers = localStorage.getItem('answers')
    const currentQuestion = localStorage.getItem('currentQuestion')
    const score = localStorage.getItem('score')
    const data = {lang, answers, currentQuestion, score}

    return data
  }

  saveQuiz = () => {
    localStorage.setItem('lang', this.lang)
    localStorage.setItem('answers', this.answers.join(''))
    localStorage.setItem('currentQuestion', this.currentQuestion)
    localStorage.setItem('score', this.score)
  }

  shuffleQuestions = () => {
    const birdsData = quizData[this.lang].birds
    const answersArr = []
    birdsData.forEach(birdsArr => {
      const randomIndex = Math.floor(Math.random() * birdsArr.length)
      answersArr.push(birdsArr[randomIndex].id)
    })

    this.answers = answersArr
  }

  startQuiz = () => {
    this.score = 0
    this.currentQuestion = 0
    this.shuffleQuestions()
  }
}


const quiz = new Quiz()
const {lang, answers, currentQuestion, score} = quiz.loadQuiz()
if (lang) quiz.lang = lang
if (answers) quiz.answers = answers.split('')
if (+currentQuestion !== 0) quiz.currentQuestion = +currentQuestion
if (+score !== 0) quiz.score = +score
console.log(quiz)


export default quiz
