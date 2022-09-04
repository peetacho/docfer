const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
    },
    maxHttpBufferSize: 1e9
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the DocFer server.')
})

io.on('connection', socket => {
    socket.on("join-room", room => {
        socket.join(room)
    })

    socket.on("send-message", ({ msg, room, fileData }) => {
        if (room !== "") {
            socket.to(room).emit("receive-message", { msg: msg, sender: socket.id, fileData: fileData })
        }
    })
})

server.listen(8080, () => console.log(`Server has started.`));