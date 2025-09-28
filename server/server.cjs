const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server, {
    cors: {
        origin: '*'
    }
});

const savePath = path.join(__dirname, '..', 'saves', 'counter.json')

let counter = 0
let guests = 0
fs.access(savePath, fs.constants.R_OK, (err) => {
    if (err) {
        fs.appendFile(savePath, JSON.stringify({ counter: 0 }, null, 2), (err) => {

        });
    } else {
        counter = JSON.parse(fs.readFileSync(savePath, 'utf-8')).counter
    }
})

let users = []

io.use((socket, next) => {
    next();
})

io.on('connection', (socket) => {
    console.log("-----------")
    console.log("connection established", socket.id)
    socket.emit('gameState', { counter })

    guests++
    let username = `Guest${guests}`
    socket.username = username;
    users.push(socket)
    socket.emit('name', username)
    console.log("-----------")
    console.log(username, "logged in")
    console.log("userlist")
    users.forEach(user => console.log(user.username, user.id))

    socket.on('changeName', (username) => {
        console.log("--------")
        console.log("Changing", socket.username, "to", username)
        socket.username = username;
        socket.emit('name', username)
    })

    socket.on('sendMessage', ({ message }) => {
        console.log(socket.username, socket.id.substring(0,4), ":", message)
        socket.emit('newMessage', `${socket.username}: ${message}`)
        socket.broadcast.emit('newMessage', `${socket.username}: ${message}`)
    })

    socket.on('increment', (increment) => {
        counter = counter + increment
        console.log("-----------")
        console.log("userlist")
        users.forEach(user => console.log(user.username, user.id))
        io.emit('gameState', { counter })
    });

    socket.on('disconnect', () => {
        users = users.filter(user => user.id !== socket.id);
        console.log("-----------")
        console.log(socket.username, "logged out")
        console.log("userlist")
        users.forEach(user => console.log(user.username, user.id))
    })
});

const handleServerShutdown = () => {
    fs.writeFileSync(savePath, JSON.stringify({ counter }, null, 2));
    server.close()
    process.exit(1)
}

process.on('SIGINT', handleServerShutdown);
process.on('SIGTERM', handleServerShutdown);

server.listen(8443, () => {
    console.log("Socket.io server running")
})