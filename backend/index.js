const http = require('http');
const app = require('./app');
const { generateMessage } = require ('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require ('./utils/users');
const socketio = require('socket.io');
const Filter = require('bad-words')
require('dotenv').config();

const server = http.createServer(app)

const io = socketio(server, {
    cors: {
      // origin: "http://192.168.0.5:3000",
      origin: "http://localhost:3000",
      credentials: true
    }
});

io.on('connection', (socket) => {
  console.log('New WebSocket connection')

  socket.on('join', ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room })
    
    if (error) {
      return callback(error)
    }

    socket.join(user.room)

    socket.emit('message', generateMessage('Admin', 'Welcome!', 'white'))
    socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`, 'white'))
  
    io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
    })

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter()

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed!')
    }

    const user = getUser(socket.id)

    io.to(user.room).emit('message', generateMessage(user.username, message, user.color))
    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`, 'white'))

      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      })
    }

  })
})

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})