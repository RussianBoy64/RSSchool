import quizData from "../data/quizData"

class Quiz {
  constructor() {
    this.lang = 'en'
    this.currentQuestion = 0
    this.score = 0
    this.answers = []
    this.isStarted = false
  }

  loadQuiz = () => {
    const lang = localStorage.getItem('lang')
    const answers = localStorage.getItem('answers')
    const data = {lang, answers}

    return data
  }

  saveQuiz = () => {
    localStorage.setItem('lang', this.lang)
    localStorage.setItem('answers', this.answers.join(''))
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
    this.isStarted = true
    this.shuffleQuestions()
  }
}


const quiz = new Quiz()
const {lang, answers} = quiz.loadQuiz()
if (lang) quiz.lang = lang
if (answers) quiz.answers = answers.split('')
console.log(quiz)


export default quiz
