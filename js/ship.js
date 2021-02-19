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
  if (ship === null || shipPlace + (ship.body.length - 1) * 8 > 63) {
    return false
  }
  for (let i = 0; i < ship.body.length; i++) {
    if (board[shipPlace + i * 8].className === 'square-ship-body') {
      return false
    }
  }
  return true
}
function allShipsSunk () {
  for (ship of ships) {
    if (ship.body.some(b => { return b === true })) { return false }
  }
  return true
}
