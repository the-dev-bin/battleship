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
function checkPlacement (board, ship, shipPlace) {
  if (ship == null || shipPlace + (ship.body.length - 1) * 8 > 63) {
    return false
  }
  for (let i = 0; i < ship.body.length; i++) {
    if (board[shipPlace + i * 8].className === 'square-ship-body') {
      return false
    }
  }
  return true
}
function checkShipHit (location) {
  for (ship of ships) {
    for (let i = 0; i < ship.body.length; i++) {
      if (ship.location + i * 8 === location) {
        ship.body[i] = false
        const sunkQuery = ship.body.every(b => { return b === false })
        return { hit: true, sunk: sunkQuery }
      }
    }
  }
  return { hit: false, sink: '' }
}
function placeShip (board, shipElements, ship, shipPlace) {
  if (!checkPlacement(board, ship, shipPlace)) { return }
  ship.location = shipPlace
  for (let i = 0; i < ship.body.length; i++) {
    board[shipPlace + i * 8].className = 'square-ship-body'
    const newSquare = board[shipPlace + i * 8].cloneNode(true)
    board[shipPlace + i * 8].parentNode.replaceChild(newSquare, board[shipPlace + i * 8])
  }
  const shipElement = shipElements[ships.findIndex((x) => ship === x)]
  for (body of shipElement.children) {
    body.style.background = 'none'
  }
  shipElement.style.border = 'none'
  ship = null
  if (shipElement.parentNode.children.length === 1) { initMultiplayer() }
  shipElement.parentNode.removeChild(shipElement)
}
