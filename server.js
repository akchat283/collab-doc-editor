const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let documentContent = ""; // shared state

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.emit('document', documentContent);

    socket.on('edit', (newContent) => {
        documentContent = newContent;
        socket.broadcast.emit('document', newContent);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});