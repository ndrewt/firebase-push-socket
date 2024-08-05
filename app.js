require('dotenv').config()
const express = require('express');
const http = require('http');
const dgram = require('dgram');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

const udpClient = dgram.createSocket('udp4');

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendMessage', (message) => {
        console.log('Message received from web:', message);
        const messageBuffer = Buffer.from(JSON.stringify(message));
        udpClient.send(messageBuffer, 0, messageBuffer.length, 41234, 'localhost', (err) => {
            if (err) {
                console.error('Error sending message via UDP:', err);
            } else {
                console.log('Message sent to UDP server');
            }
        });
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});