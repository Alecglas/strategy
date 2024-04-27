const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server, {
    cors: {
        origin: '*'
    }
});

let counter = 0
fs.access('./saves/counter.json', fs.constants.R_OK, (err) => {
    if (err) {
        fs.appendFile('./saves/counter.json', JSON.stringify({ counter: 0 }, null, 2), (err) => {

        });
    } else {
        counter = JSON.parse(fs.readFileSync('./saves/counter.json', 'utf-8')).counter
    }
})

io.on('connection', (socket) => {
    console.log("connection established")
    socket.emit('gameState', { counter })
    socket.on('increment', (increment) => {
        counter = counter + increment
        io.emit('gameState', { counter })
    });
});

const handleServerShutdown = () => {
    fs.writeFileSync('./saves/counter.json', JSON.stringify({ counter }, null, 2));
}

process.on('SIGINT', handleServerShutdown);
process.on('SIGTERM', handleServerShutdown);

server.listen(8443, () => {
    console.log("Socket.io server running")
})