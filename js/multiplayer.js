/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
<body>
    <button onclick="console.log('asd' + Math.random())">asd</button>
    <a id="invite">Invite link</a>
</body>
</html>
<script>
    var joinURL = new URL(window.location.href);
    let joinID = joinURL.searchParams.get("id");
    var peer = new Peer();
    var conn;
    function event(data){

    }
    if(!joinID){
        console.log(window.location)

    }
    else{
        peer.on('open', function(connection) {
            conn = peer.connect(joinID);
            conn.on('open', function() {
                // Receive messages
                conn.on('data', function(data) {
                    console.log('Received', data);
                });

                // Send messages
                conn.send(JSON.stringify({name: 'yolo'}));
            });
        } )
    }
*/
function initMultiplayer () {
  const joinID = new URL(window.location.href).searchParams.get('id')
  console.log(joinID)
  // Need to add opponent board here
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
        console.log('Received', JSON.parse(data))
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
      conn.send(JSON.stringify({ name: 'yolo' }))
    })
  })
}
