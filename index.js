const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http);

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'))

io.on('connection', socket => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('signaling', msg => {
    console.log(msg)
  })
})

http.listen(3000, () => console.log('QUANTUM'))
