export default function getSolvableArr(arr) {
  const shuffledArr = [].concat(arr)

  // shuffle array
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    let randomIdx = Math.floor(Math.random() * (i + 1))
    let temp = shuffledArr[randomIdx]
    shuffledArr[randomIdx] = shuffledArr[i]
    shuffledArr[i] = temp
  }

  const solvableArr = checkSolvability(shuffledArr)

  return solvableArr
}

function checkSolvability(shuffledArr) {
  const solvableArr = [].concat(shuffledArr)
  let numberInverions = 0
  let emptyTileIdx = solvableArr.indexOf(null)
  let rowWithNull =
    Math.sqrt(solvableArr.length) -
    Math.floor(emptyTileIdx / Math.sqrt(solvableArr.length))

  solvableArr.forEach((number, idx, thisArray) => {
    if (number !== null) {
      let inv = 0
      for (let i = idx + 1; i < thisArray.length; i++) {
        if (number > thisArray[i] && thisArray[i] !== null) {
          numberInverions++
          inv++
        }
      }
    }
  })

  if (
    (solvableArr.length % 2 !== 0 && numberInverions % 2 == 0) ||
    (solvableArr.length % 2 === 0 &&
      ((rowWithNull % 2 !== 0 && numberInverions % 2 === 0) ||
        (rowWithNull % 2 === 0 && numberInverions % 2 !== 0)))
  ) {
    return solvableArr
  } else {
    let temp = null

    if (solvableArr[0] !== null && solvableArr[1] !== null) {
      temp = solvableArr[1]
      solvableArr[1] = solvableArr[0]
      solvableArr[0] = temp
    } else {
      temp = solvableArr[solvableArr.length - 1]
      solvableArr[solvableArr.length - 1] = solvableArr[solvableArr.length - 2]
      solvableArr[solvableArr.length - 2] = temp
    }

    return solvableArr
  }

  // return solvableArr
}
