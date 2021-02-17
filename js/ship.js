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
function placeShip(board, place) {
  if(clickedShip == null || place + (clickedShip.body.length-1) * 8 > 63){
    return
  }
  for(let i = 0; i < clickedShip.body.length; i++){
    if(board[place + i*8].className == 'square-ship-body'){
      return
    }
  }
  clickedShip.location = place
  for(let i = 0; i < clickedShip.body.length; i++){
    board[place + i*8].className = 'square-ship-body'
    let newSquare = board[place + i*8].cloneNode(true)
    board[place + i*8].parentNode.replaceChild(newSquare,board[place + i*8])
  }
  let shipElement = shipElements[ships.findIndex((x)=>clickedShip == x )]
  for( body of shipElement.children){
    body.style.background = 'none'
  }
  shipElement.style.border = 'none' 
  clickedShip = null
  shipElement.parentNode.removeChild(shipElement)
}