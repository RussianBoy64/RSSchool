export default class Quiz {
  constructor() {
    this.lang = 'ru'
  }

  loadQuiz = async () => {
    const lang = localStorage.getItem('lang')

    if (lang) this.lang = lang
  }

  saveQuiz = () => {
    localStorage.setItem('lang', this.lang)
  }

  setLanguage = () => {
    const textsNodes = document.querySelectorAll('[data-text]')
    console.log(textsNodes)

    textsNodes.forEach((textNode) => {
      const text = textNode.dataset.text
      textNode.textContent = data[this.lang]
    })
  }
}
