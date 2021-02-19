/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let conn
let openConnection = false
let myTurn = false
function initMultiplayer () {
  const joinID = new URL(window.location.href).searchParams.get('id')
  const board = document.getElementById('opponent-board')
  document.getElementById('board-container1').style.display = 'grid'
  const boardElements = []
  for (let i = 0; i < 64; i++) {
    const currentSquare = board.appendChild(document.createElement('div'))
    boardElements.push(currentSquare)
    currentSquare.addEventListener('click', () => { playerClick(i) })
  }
  startJoin(joinID)
  if (joinID) {
    startJoin(joinID)
  } else {
    startHost()
  }
}
function startHost () {
  const peer = new Peer()
  document.getElementById('turn').innerHTML = 'Awaiting other player'

  peer.on('open', function (id) {
    console.log('My peer ID is: ' + id)
    document.getElementById('invite').innerHTML = 'Invite Link'
    document.getElementById('invite').setAttribute('href', `${window.location.href}?id=${id}`)
  })
  peer.on('connection', function (connection) {
    conn = connection
    conn.on('open', function () {
      document.getElementById('turn').innerHTML = 'It\'s your turn'

      openConnection = true
      conn.on('data', function (data) {
        handleInput(data)
      })
    })
  })
}
function startJoin (joinID) {
  updateTurn()
  const peer = new Peer()
  peer.on('open', function (connection) {
    conn = peer.connect(joinID)
    conn.on('open', function () {
      openConnection = true
      conn.on('data', function (data) {
        handleInput(data)
      })
    })
  })
}
function playerClick (clickedPlace) {
  if (openConnection && myTurn) {
    updateTurn()
    conn.send({ event: 'hitQuery', place: clickedPlace })
  }
}
function handleInput (data) {
  switch (data.event) {
    case 'hitResponse':
      updateBoard(data, Array.from(document.getElementById('opponent-board').children))
      break
    case 'hitQuery':
      checkHit(data.place)
      updateTurn()
      break
    case 'winResponse':
      alert('You have won')
  }
}
function updateBoard (data, board) {
  if (data.hit) {
    board[data.place].className = 'hit'
    if (data.sunk !== '') {
      alert(`You sunk my ${data.sunk}`)
    }
  } else {
    board[data.place].className = 'miss'
  }
}
function checkHit (clickedPlace) {
  const boardResponse = hitBoard(clickedPlace)
  updateBoard({ place: clickedPlace, sunk: '', hit: boardResponse.hit }, Array.from(document.getElementById('player-board').children))
  if (allShipsSunk()) {
    updateTurn()
    alert('You have lost')
    conn.send({ event: 'winResponse' })
  }
  conn.send({ event: 'hitResponse', place: clickedPlace, hit: boardResponse.hit, sunk: boardResponse.sunk })
}
function updateTurn () {
  myTurn = !myTurn
  document.getElementById('turn').innerHTML = `It's ${myTurn ? '' : '<strong>not</strong> '}your turn`
}
