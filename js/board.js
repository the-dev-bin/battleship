/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function hitBoard (location) {
  for (ship of ships) {
    for (let i = 0; i < ship.body.length; i++) {
      if (ship.location + i * 8 === location) {
        ship.body[i] = false
        const sunkQuery = ship.body.every(b => { return b === false })
        return { hit: true, sunk: sunkQuery ? ship.name : '' }
      }
    }
  }
  return { hit: false, sunk: '' }
}
function placeShip (board, shipElements, ship, shipPlace) {
  if (!checkPlacement(board, ship, shipPlace)) { return }
  if (ship.location) { return }
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
function updateBoard (data, board) {
  board[data.place].className = data.hit ? 'hit' : 'miss'
}
