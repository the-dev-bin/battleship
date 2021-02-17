/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// body[true] = ship not hit at spot
function initShips () {
  return [
    {
      name: 'Destroyer',
      location: null,
      body: [true, true]
    },
    {
      name: 'Submarine',
      location: null,
      body: [true, true, true]
    },
    {
      name: 'Cruiser',
      location: null,
      body: [true, true, true]
    },
    {
      name: 'Battleship',
      location: null,
      body: [true, true, true, true]
    },
    {
      name: 'Carrier',
      location: null,
      body: [true, true, true, true, true]
    }
  ]
}
function placeShip (board, shipElements, ship, place) {
  if (ship == null || place + (ship.body.length - 1) * 8 > 63) {
    return
  }
  for (let i = 0; i < ship.body.length; i++) {
    if (board[place + i * 8].className === 'square-ship-body') {
      return
    }
  }
  ship.location = place
  for (let i = 0; i < ship.body.length; i++) {
    board[place + i * 8].className = 'square-ship-body'
    const newSquare = board[place + i * 8].cloneNode(true)
    board[place + i * 8].parentNode.replaceChild(newSquare, board[place + i * 8])
  }
  const shipElement = shipElements[ships.findIndex((x) => ship === x)]
  for (body of shipElement.children) {
    body.style.background = 'none'
  }
  shipElement.style.border = 'none'
  ship = null
  shipElement.parentNode.removeChild(shipElement)
}
