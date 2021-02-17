
const board = document.getElementsByClassName('board')[0]
let boardElem = []
let clickedShip;
for (let i = 0; i < 64; i++) {
  const currentSquare = board.appendChild(document.createElement('div'))
  boardElem.push(currentSquare);
  currentSquare.addEventListener('click',()=>placeShip(boardElem, i))
}

const ships = initShips()
const shipContainer = document.getElementsByClassName('ship-container')[0]
let shipElements = []
for (let i =0;i < 5; i++) {
  let ship = ships[i]
  const currentShip = shipContainer.appendChild(document.createElement('div'))
  currentShip.className = 'ship'
  shipElements.push(currentShip)
  currentShip.addEventListener('click', () => {
    shipElements.forEach((x)=>{x.style.border = 'none';})
    currentShip.style.border = '5px solid black'
    clickedShip = ship
    console.log(clickedShip)
  })
  for (square of ship.body) {
    const currentSquare = currentShip.appendChild(document.createElement('div'))
    currentSquare.className = 'ship-body'
  }
}