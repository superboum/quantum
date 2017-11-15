const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http);

function* idGen() {
  counter = 0x147d3f
  while(true) {
    counter = (counter + 1) % 0xffffff
    yield ("000000"+counter.toString(16)).substr(-6)
  }
}

const idToSocket = {}
const idIter = idGen()

// express
app.set('view engine', 'pug')
app.use(express.static('public'))
app.get('/', (req, res) => res.render('index'))

// socket.io
io.on('connection', socket => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('location', msg => {
    const id = idIter.next().value
    idToSocket[id] = socket
    console.log("New socket registred with code:",id)
    socket.emit('location', {code: id})
  })

  socket.on('signaling', msg => {
    if (!msg || !msg.to) {
      console.log("No to: field in: ", msg)
      return
    }

    const target = idToSocket[msg.to]
    if (!target) {
      console.log("Unknown sender in database: ", msg)
      return
    }
    else if (target == socket) {
      console.log("to: field is same than sender: ", msg)
      return
    }

    target.emit('signaling', msg)
  })
})

http.listen(3000, () => console.log('QUANTUM'))
