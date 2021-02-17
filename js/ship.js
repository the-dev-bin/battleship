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
  if(clickedShip){
    clickedShip.location = place
    if(place + (clickedShip.body.length-1) * 8 > 63){
      console.log('too big')
    } else{
      for(let i = 0; i < clickedShip.body.length; i++){
        board[place + i*8].style.background = 'green'
      }
    }
  }
}