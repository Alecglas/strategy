const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server, {
    cors: {
        origin: '*'
    }
});

let counter = 0

io.on('connection', (socket) => {
    console.log("connection established")
    socket.emit('gameState', { counter })
    socket.on('increment', (increment) => {
        counter = counter + increment
        io.emit('gameState', { counter })
    });
});

server.listen(8443, () => {
    console.log("Socket.io server running")
})