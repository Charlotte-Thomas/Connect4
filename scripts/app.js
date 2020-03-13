function setupApp() {

  const gameBoard = document.querySelector('.gameBoard')
  const cells = []
  const width = 6
  const column1 = [0, 6, 12, 18, 24, 30, 36]
  // const column2 = [1, 7, 13, 19, 25, 32, 37]
  // const column3 = [2, 8, 14, 20, 26, 33, 38]
  // const column4 = [3, 9, 15, 21, 27, 33, 39]
  // const column5 = [4, 10, 16, 22, 28, 34, 40]
  const column6 = [5, 11, 17, 23, 29, 35, 41]
  const bottomRow = [36, 37, 38, 39, 40, 41]
  const topRow = [0, 1, 2, 3, 4, 5, 6]

  let turn = true

  function setUpBoard() {
    while (gameBoard.children.length < 42) {
      const node = document.createElement('div')
      node.classList.add('cell')
      gameBoard.appendChild(node)
      cells.push(node)
      // console.log(gameBoard.children.length)
    }
    startGame()
  }

  setUpBoard()

  function startGame() {
    cells.forEach((cell, i) => {
      cell.addEventListener('click', () => {
        let canAdd = false
        console.log('clicked', i)
        if (bottomRow.includes(i)) {
          canAdd = true
        } else if (cells[i + 6].classList.contains('blue') || cells[i + 6].classList.contains('red')) {
          canAdd = true
        }
        if (canAdd) {
          addCounter(cell, i)
        }
      })
    })
  }

  function addCounter(cell, i) {
    let color = 'blue'
    if (turn) {
      cell.classList.add('blue')
      color = 'blue'
      turn = false
    } else {
      cell.classList.add('red')
      color = 'red'
      turn = true
    }
    checkCounters(cell, i, color)
  }

  function checkCounters(cell, index, color) {
    let surrounding = []

    //side logic:
    if (column1.includes(index)) {
      surrounding = [index - 6, index - 5, index + 1, index + 6, index + 7]
    } else if (column6.includes(index)) {
      surrounding = [index - 7, index - 6, index - 1, index + 5, index + 6]
    } else {
      for (let i = 7; i > 4; i--) {
        surrounding.push(index - i)
      }
      surrounding.push(index - 1)
      surrounding.push(index + 1)
      for (let i = 5; i < 8; i++) {
        surrounding.push(index + i)
      }
    }
    // order: top-left, top, top-right, left, right, bottom-left, bottom, bottom-right
    const withinCell = []
    surrounding.forEach((c) => {
      if (c < 0 || c > 41) {
        return
      } else {
        withinCell.push(c)
      }
    })

    // console.log(surrounding)
    console.log(withinCell)

    const direction = []

    withinCell.forEach((c) => {
      if (cells[c].classList.contains(color)) {
        if (c === index - 7) {
          direction.push('topLeft')

        }
        // never need to check top
        // if (c === index - 6) {
        //   direction.push('top')

        // }
        if (c === index - 5) {
          direction.push('topRight')

        }
        if (c === index - 1) {
          direction.push('left')

        }
        if (c === index + 1) {
          direction.push('right')

        }
        if (c === index + 5) {
          direction.push('bottomLeft')

        }
        if (c === index + 6) {
          direction.push('bottom')

        }
        if (c === index + 7) {
          direction.push('bottomRight')
        }
      }
    })

    console.log(direction)

    direction.forEach((dir) => {
      checkMatch(dir, index, color)
    })
  }


  function checkMatch(dir, index, color) {
    let count = 0
    let nextPosition = index
    for (let i = 0; i < 3; i++) {
      if (dir === 'topLeft') {
        nextPosition -= 7
        if (column1.includes(nextPosition) || topRow.includes(nextPosition)) {
          return
        } else if (cells[nextPosition].classList.contains(color)){
          count++
        } else {
          return
        }
        console.log('count', count)
      }
      if (dir === 'top') {
        nextPosition -= 6
        if (checkNextAlong(nextPosition, color)) {
          count++
        } else {
          return
        }
        console.log('count', count)
      }


    }
    if (count === 3) {
      console.log('WINNER')
    }
  }

  function checkNextAlong(nextPosition, color) {
    if (column1.includes(nextPosition) || topRow.includes(nextPosition)) {
      return false
    } else if (cells[nextPosition].classList.contains(color)){
      return true
    } else {
      return false
    }
  }

  //create boolean for player turn
  //create class for red and blue 
  //can only click bottom row (of column) if bottom row is not full 
  //-split columns into arrays

  //check if any block surrounding it have same class (pass in classname)
  //take direction of that class
  //use direction on next class x2 to see if 4 in row match

  //corners, middle, sides

}

document.addEventListener('DOMContentLoaded', setupApp)