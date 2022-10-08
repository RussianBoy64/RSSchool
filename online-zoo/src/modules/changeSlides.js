import petsInfo from './petsInfo'

const leftSlide = document.querySelector('.slider-container_left')
const rightSlide = document.querySelector('.slider-container_right')

// load random sideSlides
leftSlide.innerHTML = getSlideInnerHTML()
rightSlide.innerHTML = getSlideInnerHTML()

function changeSlides(direction) {
  const [leftSlide, middleSlide, rightSlide] = document.querySelectorAll(
    '.pets .slider-container'
  )

  if (direction === 'left') {
    middleSlide.innerHTML = leftSlide.innerHTML
    rightSlide.innerHTML = getSlideInnerHTML()
    leftSlide.innerHTML = getSlideInnerHTML()
  }

  if (direction === 'right') {
    middleSlide.innerHTML = rightSlide.innerHTML
    leftSlide.innerHTML = getSlideInnerHTML()
    rightSlide.innerHTML = getSlideInnerHTML()
  }
}

function getSlideInnerHTML() {
  let innerHTML = ''
  let cards = 6

  // shuffle pets arr
  const suffledPets = sufflePets(petsInfo)

  for (let i = 0; i < cards; i++) {
    innerHTML += `<div class="slider__item">
      <div class="item__img ${suffledPets[i].petImg}">
          <div class="item__discription"><span class="petName">${suffledPets[i].petName}</span><span
                  class="petPlace">${suffledPets[i].petPlace}</span>
          </div>
      </div>
      <div class="item__discription"><span class="petName">${suffledPets[i].petName}</span><span
              class="petPlace">${suffledPets[i].petPlace}</span>
          <div class="petDiet ${suffledPets[i].petDiet}"></div>
      </div>
    </div>`
  }
  return innerHTML
}

function sufflePets(petsArr) {
  for (let i = 0; i < petsArr.length; i++) {
    let idx = Math.floor(Math.random() * (i + 1))
    let temp = petsArr[idx]
    petsArr[idx] = petsArr[i]
    petsArr[i] = temp
  }
  return petsArr
}

export default changeSlides
