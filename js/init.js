
let board = document.getElementsByClassName("board")[0];
for(let i = 0; i < 64; i++){
    board.appendChild(document.createElement('div'));
}
let ships = initShips();
let shipContainer = document.getElementsByClassName("ship-container")[0];
for(ship of ships){
    let currentShip = shipContainer.appendChild(document.createElement('div'));
    currentShip.className = 'ship'
    for(square of ship.body){
        let currentSquare = currentShip.appendChild(document.createElement('div'));
        currentSquare.className = 'ship-body'
    }
}