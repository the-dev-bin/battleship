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
  console.log('hello boi')
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
  console.log(data)
  switch (data.event) {
    case 'hitResponse':
      console.log('got a hit')
      updateBoardAfterHitResponse(data)
      break
    case 'hitQuery':
      console.log('hit Query')
      checkHit(data.place)
      updateTurn()
      break
  }
}
function updateBoardAfterHitResponse (data) {
  const board = Array.from(document.getElementById('opponent-board').children)
  if (data.hit) {
    board[data.place].className = 'hit'
    if (data.sunk !== '') {
      confirm(`You sunk my ${data.sunk}`)
    }
  } else {
    board[data.place].className = 'miss'
  }
}
function checkHit (clickedPlace) {
  const checkResponse = checkShipHit(clickedPlace)
  conn.send({ event: 'hitResponse', place: clickedPlace, hit: checkResponse.hit, sunk: checkResponse.sunk })
}
function updateTurn () {
  myTurn = !myTurn
  document.getElementById('turn').innerHTML = `It's ${myTurn ? '' : '<strong>not</strong> '}your turn`
}
