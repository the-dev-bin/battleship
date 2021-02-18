/* eslint-disable no-undef */

const ships = initShips()
function init () {
  let clickedShip
  const shipElements = []
  const shipContainer = document.getElementsByClassName('ship-container')[0]

  const boardElements = []
  const board = document.getElementsByClassName('board')[1]

  for (let i = 0; i < 64; i++) {
    const currentSquare = board.appendChild(document.createElement('div'))
    boardElements.push(currentSquare)
    currentSquare.addEventListener('click', () => placeShip(boardElements, shipElements, clickedShip, i))
  }

  for (let i = 0; i < 5; i++) {
    const ship = ships[i]
    const currentShip = shipContainer.appendChild(document.createElement('div'))
    currentShip.className = 'ship'
    shipElements.push(currentShip)
    currentShip.addEventListener('click', () => {
      shipElements.forEach((x) => { x.style.border = 'none' })
      currentShip.className = 'ship selected-ship'
      clickedShip = ship
    })
    for (square of ship.body) {
      const currentSquare = currentShip.appendChild(document.createElement('div'))
      currentSquare.className = 'ship-body'
    }
  }
}
init()
