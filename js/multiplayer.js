/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function initMultiplayer () {
  const joinID = new URL(window.location.href).searchParams.get('id')
  console.log(joinID)
  // Need to add opponent board here
  const board = document.getElementById('opponent-board')
  document.getElementById('board-container1').style.display = 'grid'
  const boardElements = []
  for (let i = 0; i < 64; i++) {
    const currentSquare = board.appendChild(document.createElement('div'))
    boardElements.push(currentSquare)
    // currentSquare.addEventListener('click', () => { placeShip(boardElements, shipElements, clickedShip, i); clickedShip = null })
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
      console.log('yeehaw')
      conn.on('data', function (data) {
        console.log('Received', data)
      })
      // Send messages
      conn.send('Hello!')
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
      conn.on('data', function (data) {
        console.log('Received', data)
      })

      // Send messages
      conn.send({ name: 'yolo' })
    })
  })
}
