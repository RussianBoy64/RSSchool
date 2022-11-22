import quiz from '../../Quiz'

export default async function createButton(text, idx, className = 'btn') {
  const { currentQuestion, answers, pushedBtns } = quiz
  const button = document.createElement('button')

  button.id = idx + 1
  button.classList.add(className)

  if (pushedBtns.includes(idx + 1)) {
    if (answers[currentQuestion] - 1 === idx) {
      button.classList.add('correct')
    } else {
      button.classList.add('incorrect')
    }
  }

  button.textContent = text

  return button
}
