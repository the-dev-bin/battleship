
const board = document.getElementsByClassName('board')[0]
for (let i = 0; i < 64; i++) {
  const currentSquare = board.appendChild(document.createElement('div'))
  currentSquare.addEventListener('click', () => console.log(i))
}
const ships = initShips()
const shipContainer = document.getElementsByClassName('ship-container')[0]
for (ship of ships) {
  const currentShip = shipContainer.appendChild(document.createElement('div'))
  currentShip.className = 'ship'
  currentShip.addEventListener('click', () => currentShip.style.border = '5px solid black')
  for (square of ship.body) {
    const currentSquare = currentShip.appendChild(document.createElement('div'))
    currentSquare.className = 'ship-body'
  }
}
