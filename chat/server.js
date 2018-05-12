const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 4001

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('New client connected')

  socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })

  socket.on('SEND_ACCEPT', function(data){
    console.log("Accepted");
      io.emit('RECEIVE_ACCEPT',data);
  });

  socket.on('SEND_REJECT',function(data){
    console.log("REJCETED");
    io.emit('RECEIVE_REJECT',data);
  });
  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  });
})

server.listen(port, () => console.log(`Listening on port ${port}`));
