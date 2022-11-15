import createWrapper from './wrapper'

export default async function createMain() {
  const main = document.createElement('main')
  const wrapper = await createWrapper()

  main.classList.add('main')

  main.append(wrapper)

  return main
}
