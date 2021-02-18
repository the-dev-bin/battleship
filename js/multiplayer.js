/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let conn
let openConnection = false
function initMultiplayer () {
  const joinID = new URL(window.location.href).searchParams.get('id')
  console.log(joinID)
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
  console.log('Hey')
  peer.on('open', function (id) {
    console.log('My peer ID is: ' + id)
    document.getElementById('invite').innerHTML = 'Invite Link'
    document.getElementById('invite').setAttribute('href', `${window.origin}?id=${id}`)
  })
  peer.on('connection', function (connection) {
    conn = connection
    conn.on('open', function () {
      // Receive messages
      openConnection = true
      conn.on('data', function (data) {
        handleInput(data)
      })
    })
  })
}
function startJoin (joinID) {
  const peer = new Peer()
  console.log('hello boi')
  peer.on('open', function (connection) {
    conn = peer.connect(joinID)
    conn.on('open', function () {
      // Receive messages
      openConnection = true
      conn.on('data', function (data) {
        handleInput(data)
      })

      // Send messages
    //   conn.send({ event: 'isHit', place: 1 })
    })
  })
}
function playerClick (clickedPlace) {
  if (playerClick.called === true && openConnection) {
    return
  }
  playerClick.called = true
  conn.send({ event: 'hitQuery', place: clickedPlace })
}
function handleInput (data) {
  console.log(data)
  switch (data.event) {
    case 'hitResponse':
      console.log('got a hit')
      playerClick.called = false
      break
    case 'hitQuery':
      console.log('hit Query')
      checkHit(data.place)
      break
  }
}
function checkHit (clickedPlace) {
  // Check if hit one of the ships
  const checkResponse = checkShipHit(clickedPlace)
  conn.send({ event: 'hitResponse', place: clickedPlace, hit: checkResponse.hit, sunk: checkResponse.sink })
}
