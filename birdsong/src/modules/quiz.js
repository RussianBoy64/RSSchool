class Quiz {
  constructor() {
    this.lang = 'en'
    this.question = 0
    this.score = 0
  }

  loadQuiz = async () => {
    const lang = localStorage.getItem('lang')

    if (lang) this.lang = lang
  }

  saveQuiz = () => {
    localStorage.setItem('lang', this.lang)
  }
}

const quiz = new Quiz()
quiz.loadQuiz()

export default quiz
